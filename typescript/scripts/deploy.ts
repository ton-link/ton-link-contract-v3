import { beginCell, Cell, TupleBuilder } from "ton-core";
import fs from "fs";
import Tonlink from "../tests/contract";
import { getHttpEndpoint } from "@orbs-network/ton-access"
import { mnemonicToWalletKey } from "ton-crypto";
import { WalletContractV3R2, internal } from "ton";
import { TonClient, SendMode, Address, contractAddress, } from "ton";
import dotenv from "dotenv"

dotenv.config()

const netmode: string = process.env.MODE || ""
const mnemonic: string = process.env.MNEMONIC || ""

const jWallet: string = process.env.jWallet || ""
const jMinter: string = process.env.jMinter || ""
const admin: string = process.env.admin || ""

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

async function initData(jWallet: Address, jMinter: Address, admin: Address) {
        const data = beginCell()
                .storeAddress(jWallet)
                .storeAddress(jMinter)
                .storeAddress(admin)
                .storeUint(0, 64)
                .storeUint(0, 64)
                .storeDict(null)
                .storeDict(null)
                .storeDict(null)
                .storeDict(null)
        .endCell();
        return data;
}

async function getJWFromMinter(client: TonClient, address: Address, jMinter: Address) {
        let args = new TupleBuilder();
        args.writeAddress(address);
        const { stack } = await client.callGetMethod(jMinter, "get_wallet_address", args.build());
        return stack.readAddress(); 
}

async function get_tlink_wallet(client: TonClient, oracle: Address) {
        const { stack } = await client.callGetMethod(oracle, "get_tlink_wallet");
        return stack.readAddress(); 
}

async function deploy() {
        try {
                const key = await mnemonicToWalletKey(mnemonic.toString().split(" "));
                const wallet = WalletContractV3R2.create({
                        publicKey: key.publicKey,
                        workchain: 0,
                });
                const endpoint = await getHttpEndpoint({
                        network: netmode == 'testnet' ? "testnet" : "mainnet"
                });
                const client = new TonClient({ endpoint });
                console.log("wallet: " + wallet.address);
                const initDataCell = await initData(Address.parse(jWallet), Address.parse(jMinter), Address.parse(admin));
                const initCodeCell = Cell.fromBoc(fs.readFileSync("./output/ton-link.cell"))[0];
                const mainContract = contractAddress(0, { code: initCodeCell, data: initDataCell });
                console.log(`address oracle:  ${mainContract}`);
                fs.writeFileSync("oracle.txt", mainContract.toString());
                const contract = client.open(wallet);
                let seqno = await contract.getSeqno(); 
                const transfer = contract.createTransfer({
                        seqno,
                        messages: [
                                internal({
                                        to: mainContract.toString(),
                                        value: '0.01',
                                        init: { data: initDataCell, code: initCodeCell },
                                        bounce: false,
                                }),
                        ],
                        secretKey: key.secretKey,
                        sendMode: SendMode.PAY_GAS_SEPARATLY + SendMode.IGNORE_ERRORS,
                });
                console.log("change jw")

                const jettonWallet = await getJWFromMinter(client, Address.parse(mainContract.toString()), Address.parse(jMinter.toString()))
                const messageBody = beginCell()
                        .storeUint(210, 32)
                        .storeUint(0, 64)
                        .storeAddress(jettonWallet)
                .endCell();

                seqno = await contract.getSeqno(); 
                const transfer2 = contract.createTransfer({
                        seqno,
                        messages: [
                                internal({
                                        to: mainContract.toString(),
                                        value: '0.07',
                                        bounce: false,
                                        body: messageBody
                                }),
                        ],
                        secretKey: key.secretKey,
                        sendMode: SendMode.PAY_GAS_SEPARATLY + SendMode.IGNORE_ERRORS,
                });

                await client.sendExternalMessage(wallet, transfer); //DEPLOY
                await client.sendExternalMessage(wallet, transfer2); //CHANGE JettonWallet


                console.log(jettonWallet.toString() == (await get_tlink_wallet(client, Address.parse(mainContract.toString()))).toString())

        } catch (e) {
                console.log(e)
        }
}


deploy()