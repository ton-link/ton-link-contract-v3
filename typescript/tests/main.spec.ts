import * as fs from "fs";
import { beginCell, Cell, loadTransactionComputePhase } from "ton-core";
import { Blockchain, OpenedContract, TreasuryContract } from "@ton-community/sandbox";
import Tonlink from "./contract"; // this is the interface class from tutorial 2
import { expect } from 'chai';
import {
        FlatTransaction,
        FlatTransactionComparable,
        flattenTransaction
} from './transaction';
 
describe("ton-link-v3 tests", async () => {
        let blockchain = await Blockchain.create();
        let tonlinkContract: OpenedContract<Tonlink>;
        let tonlinkContractForError: OpenedContract<Tonlink>;
        let blockchainForErr = await Blockchain.create();

        /*let deployerForErr = await blockchainForErr.treasury("deployer");
        let walletForErr = await blockchainForErr.treasury("wallet");*/

        let deployer = await blockchain.treasury("deployer");
        let wallet = await blockchain.treasury("wallet");
        let minter = await blockchain.treasury("minter");
        let my = await blockchain.treasury("my");

        let val2 = await blockchain.treasury("val2");
        let val3 = await blockchain.treasury("val3");
        let val4 = await blockchain.treasury("val4");
        let val5 = await blockchain.treasury("val5");
        let val6 = await blockchain.treasury("val6");
        let val7 = await blockchain.treasury("val7");
        let val8 = await blockchain.treasury("val8");
        let val9 = await blockchain.treasury("val9");
        let val10 = await blockchain.treasury("val10");
        let val11 = await blockchain.treasury("val11");
        let val12 = await blockchain.treasury("val12");
        let val13 = await blockchain.treasury("val13");
        let val14 = await blockchain.treasury("val14");

        let deployerForErr = await blockchainForErr.treasury("deployer");
        let walletForErr = await blockchainForErr.treasury("wallet");
        let minterForErr = await blockchainForErr.treasury("minter");
        let myForErr = await blockchainForErr.treasury("my");

        let val2ForErr = await blockchainForErr.treasury("val2");
        let val3ForErr = await blockchainForErr.treasury("val3");
        let val4ForErr = await blockchainForErr.treasury("val4");
        let val5ForErr = await blockchainForErr.treasury("val5");
        let val6ForErr = await blockchainForErr.treasury("val6");
        let val7ForErr = await blockchainForErr.treasury("val7");
        let val8ForErr = await blockchainForErr.treasury("val8");
        let val9ForErr = await blockchainForErr.treasury("val9");
        let val10ForErr = await blockchainForErr.treasury("val10");
        let val11ForErr = await blockchainForErr.treasury("val11");
        let val12ForErr = await blockchainForErr.treasury("val12");
        let val13ForErr = await blockchainForErr.treasury("val13");
        let val14ForErr = await blockchainForErr.treasury("val14");


        let validatorArrayOrig: Array<OpenedContract<TreasuryContract>> = [val2, val3, val4, val5, val6, val7, val8, val9, val10, val11, val12, val13, val14]
        let validatorArrayOrigForErr: Array<OpenedContract<TreasuryContract>> = [val2ForErr, val3ForErr, val4ForErr, val5ForErr, val6ForErr, val7ForErr, val8ForErr]//, val9ForErr, val10ForErr, val11ForErr, val12ForErr, val13ForErr, val14ForErr]

        describe("ton-link-v3 init tests", () => {
                beforeEach(async () =>  {
                        const tonlinkCode = Cell.fromBoc(fs.readFileSync("./output/ton-link.cell"))[0]; 
                        const tonlink = Tonlink.createForDeploy(tonlinkCode, wallet.address, minter.address, my.address);
                        tonlinkContract = blockchain.openContract(tonlink);
                        await tonlinkContract.sendDeploy(deployer.getSender());
                });
                it("get_last_job - for example", async () => {
                        const value = await tonlinkContract.get_last_job();
                        expect(value).to.equal(0n);
                });
                it("get_max_provider - for example", async () => {
                        const value = await tonlinkContract.get_max_provider();
                        expect(value).to.equal(0n);
                });
        });

        describe("ton-link-v3 error module", async () => {
                beforeEach(async () =>  {
                        const tonlinkCode = Cell.fromBoc(fs.readFileSync("./output/ton-link.cell"))[0]; 
                        const tonlink = Tonlink.createForDeploy(tonlinkCode, wallet.address, minter.address, my.address);
                        tonlinkContractForError = blockchainForErr.openContract(tonlink);
                        await tonlinkContractForError.sendDeploy(deployerForErr.getSender());
                });

                it("[ERROR - 99 exitcode] registration", async () => {
                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(40, 64)
                                .storeCoins(25000000000000)
                                .storeAddress(myForErr.address)
                        .endCell()
                        var result = await tonlinkContractForError.sendAction(walletForErr.getSender(), body);
                        var res = flattenTransaction(result.transactions[1]);
                        expect(res.exitCode).to.equal(99)
                        expect(res.aborted).to.equal(true)
                });

                it("[ERROR - 100 exitcode] registration", async () => {
                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(40, 64)
                                .storeCoins(30000000000000)
                                .storeAddress(myForErr.address)
                        .endCell()
                        var result = await tonlinkContractForError.sendAction(walletForErr.getSender(), body);
                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(40, 64)
                                .storeCoins(30000000000000)
                                .storeAddress(myForErr.address)
                        .endCell()
                        var result = await tonlinkContractForError.sendAction(walletForErr.getSender(), body);
                        var res = flattenTransaction(result.transactions[1]);
                        expect(res.exitCode).to.equal(100)
                        expect(res.aborted).to.equal(true)
                });

                it("[ERROR - 101 exitcode] registration", async () => {
                        var body = beginCell()
                                .storeUint(140, 32)
                                .storeUint(0, 64)
                        .endCell()
                        var result = await tonlinkContractForError.sendAction(val2ForErr.getSender(), body);
                        var res = flattenTransaction(result.transactions[1]);
                        expect(res.exitCode).to.equal(101)
                });

                it("[ERROR - 102 exitcode] registration", async () => {
                        var body = beginCell()
                                .storeUint(140, 32)
                                .storeUint(0, 64)
                        .endCell()
                        var result = await tonlinkContractForError.sendAction(myForErr.getSender(), body);
                        var body = beginCell()
                                .storeUint(140, 32)
                                .storeUint(0, 64)
                        .endCell()
                        var result = await tonlinkContractForError.sendAction(myForErr.getSender(), body);
                        var res = flattenTransaction(result.transactions[1]);
                        expect(res.exitCode).to.equal(102)
                });

                it("[ERROR - 103 exitcode] registration", async () => {
                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(40, 64)
                                .storeCoins(30000000000000)
                                .storeAddress(val2ForErr.address)
                        .endCell()
                        var result = await tonlinkContractForError.sendAction(walletForErr.getSender(), body);
                        var body = beginCell()
                                .storeUint(140, 32)
                                .storeUint(0, 64)
                        .endCell()
                        var result = await tonlinkContractForError.sendAction(val2ForErr.getSender(), body);
                        var res = flattenTransaction(result.transactions[1]);
                        expect(res.exitCode).to.equal(0)
                        var body = beginCell()
                                .storeUint(150, 32)
                                .storeUint(0, 64)
                        .endCell()
                        var result = await tonlinkContractForError.sendAction(myForErr.getSender(), body);
                        var res = flattenTransaction(result.transactions[1]);
                        expect(res.exitCode).to.equal(103)
                });
                
                it ("Unpause + delete",async () => {
                        var body = beginCell()
                                .storeUint(130, 32)
                                .storeUint(0, 64)
                        .endCell()
                        var result = await tonlinkContractForError.sendAction(val2ForErr.getSender(), body);
                        var res = flattenTransaction(result.transactions[1]);
                        expect(res.exitCode).to.equal(0)

                        var body = beginCell()
                                .storeUint(150, 32)
                                .storeUint(0, 64)
                        .endCell()
                        var result = await tonlinkContractForError.sendAction(val2ForErr.getSender(), body);
                        var res = flattenTransaction(result.transactions[1]);
                        expect(res.exitCode).to.equal(0)

                        var validatorCell = await tonlinkContractForError.get_info_about_provider(val2ForErr.address);
                        var resSlice = validatorCell.beginParse()
                        resSlice.loadAddress()
                        expect(resSlice.loadUint(2)).to.equal(2)
                })
                

                it("Registration all validators", async () => {
                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(40, 64)
                                .storeCoins(30000000000000)
                                .storeAddress(val2ForErr.address)
                        .endCell()
                        var result = await tonlinkContractForError.sendAction(walletForErr.getSender(), body);
                        var res = flattenTransaction(result.transactions[1]);
                        expect(res.exitCode).to.equal(0)
                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(40, 64)
                                .storeCoins(30000000000000)
                                .storeAddress(val3ForErr.address)
                        .endCell()
                        var result = await tonlinkContractForError.sendAction(walletForErr.getSender(), body);
                        var res = flattenTransaction(result.transactions[1]);
                        expect(res.exitCode).to.equal(0)
                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(40, 64)
                                .storeCoins(30000000000000)
                                .storeAddress(val4ForErr.address)
                        .endCell()
                        var result = await tonlinkContractForError.sendAction(walletForErr.getSender(), body);
                        var res = flattenTransaction(result.transactions[1]);
                        expect(res.exitCode).to.equal(0)
                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(40, 64)
                                .storeCoins(30000000000000)
                                .storeAddress(val5ForErr.address)
                        .endCell()
                        var result = await tonlinkContractForError.sendAction(walletForErr.getSender(), body);
                        var res = flattenTransaction(result.transactions[1]);
                        expect(res.exitCode).to.equal(0)
                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(40, 64)
                                .storeCoins(30000000000000)
                                .storeAddress(val6ForErr.address)
                        .endCell()
                        var result = await tonlinkContractForError.sendAction(walletForErr.getSender(), body);
                        var res = flattenTransaction(result.transactions[1]);
                        expect(res.exitCode).to.equal(0)
                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(40, 64)
                                .storeCoins(30000000000000)
                                .storeAddress(val7ForErr.address)
                        .endCell()
                        var result = await tonlinkContractForError.sendAction(walletForErr.getSender(), body);
                        var res = flattenTransaction(result.transactions[1]);
                        expect(res.exitCode).to.equal(0)
                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(40, 64)
                                .storeCoins(30000000000000)
                                .storeAddress(val8ForErr.address)
                        .endCell()
                        var result = await tonlinkContractForError.sendAction(walletForErr.getSender(), body);
                        var res = flattenTransaction(result.transactions[1]);
                        expect(res.exitCode).to.equal(0)
                        const value = await tonlinkContractForError.get_max_provider();
                        expect(value).to.equal(8n);
                });
                
                it("[ERROR - 300 exitcode] job", async () => {
                        var link = beginCell()
                                .storeRef(beginCell().storeUint(0, 32).storeAddress(myForErr.address).endCell())
                                .storeRef(beginCell().storeUint(0, 1).endCell()) // example link
                        .endCell();

                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(50, 64)
                                .storeCoins(55000000000)
                                .storeAddress(myForErr.address)
                                .storeRef(beginCell().storeUint(0, 32).storeAddress(myForErr.address).endCell())
                                .storeRef(beginCell().storeUint(0, 1).endCell()) // example link
                        .endCell();

                        const result = await tonlinkContractForError.sendAction(walletForErr.getSender(), body);
                        var res = flattenTransaction(result.transactions[1]);
                        expect(res.exitCode).to.equal(300)
                        expect(res.aborted).to.equal(true)
                });

                it("Create 1 job", async () => {
                        var link = beginCell()
                                .storeRef(beginCell().storeUint(0, 32).storeAddress(myForErr.address).endCell())
                                .storeRef(beginCell().storeUint(0, 1).endCell()) // example link
                        .endCell();

                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(50, 64)
                                .storeCoins(60000000000)
                                .storeAddress(myForErr.address)
                                .storeRef(beginCell().storeUint(0, 32).storeAddress(myForErr.address).endCell())
                                .storeRef(beginCell().storeUint(0, 1).endCell()) // example link
                        .endCell();

                        const result = await tonlinkContractForError.sendAction(walletForErr.getSender(), body);
                        var res = flattenTransaction(result.transactions[1]);
                        expect(res.exitCode).to.equal(0)
                        expect(res.aborted).to.equal(false)

                });

                let validatorArray: string[] = [];
                it("Get validator array from first job", async () => {
                        const res = await tonlinkContractForError.get_job_by_jobid(1);
                        var slice = res.beginParse()
                        var jobID = slice.loadUint(64)
                        var start = slice.loadUint(64)
                        var end = slice.loadUint(64)
                        var status = slice.loadUint(1)
                        const content = slice.loadRef(); 
                        var address_slice = (slice.loadRef()).beginParse();
                        var first_address_slice = (address_slice.loadRef()).beginParse()
                        var second_address_slice = (address_slice.loadRef()).beginParse()
                        var key = 0;
                        var count = 0
                        for (let index = 0; index < 3; index++) {
                                var temp_address = first_address_slice.loadAddress();
                                validatorArray.push(temp_address.toString())
                        }
                        for (let index = 0; index < 2; index++) {
                                var temp_address = second_address_slice.loadAddress();
                                validatorArray.push(temp_address.toString())
                        }
                        expect(validatorArray.length).to.equal(5);
                })

                it("[ERROR - 203 exitcode] job", async () => {
                        var address = validatorArray[0];
                        for (let index = 0; index < validatorArrayOrigForErr.length; index++) {
                                const validator = validatorArrayOrigForErr[index]
                                if(validator.address.toString() == address) {                                        
                                        var body = beginCell()
                                                .storeUint(160, 32)
                                                .storeUint(0, 64)
                                                .storeUint(2, 64)
                                                .storeUint(5, 64)
                                        .endCell()
                                        var result = await tonlinkContractForError.sendAction(validator.getSender(), body);
                                        var res = flattenTransaction(result.transactions[1]);
                                        expect(res.exitCode).to.equal(203)
                                        expect(res.aborted).to.equal(true)
                                }
                        }
                });
                
                it("[ERROR - 205 exitcode] job", async () => {
                        var address = validatorArray[0];
                        for (let index = 0; index < validatorArrayOrigForErr.length; index++) {
                                var num = 0;
                                const validator = validatorArrayOrigForErr[index];
                                if(validator.address.toString() != address) {  
                                        num++;
                                }
                                if(num == 5) {                                        
                                        var body = beginCell()
                                                .storeUint(160, 32)
                                                .storeUint(0, 64)
                                                .storeUint(1, 64)
                                                .storeUint(5, 64)
                                        .endCell()
                                        var result = await tonlinkContractForError.sendAction(validator.getSender(), body);
                                        var res = flattenTransaction(result.transactions[1]);
                                        expect(res.exitCode).to.equal(205)
                                        expect(res.aborted).to.equal(true)
                                }
                        }
                });

                it("Sending a response from all val", async () => {
                        for (let i = 0; i < validatorArray.length; i++) {
                                var address = validatorArray[i];
                                for (let index = 0; index < validatorArrayOrigForErr.length; index++) {
                                        const validator = validatorArrayOrigForErr[index]
                                        if(validator.address.toString() == address) {                                        
                                                var body = beginCell()
                                                        .storeUint(160, 32)
                                                        .storeUint(0, 64)
                                                        .storeUint(1, 64)
                                                        .storeUint(5, 64)
                                                .endCell()
                                                var result = await tonlinkContractForError.sendAction(validator.getSender(), body);
                                                var res = flattenTransaction(result.transactions[1]);
                                                expect(res.exitCode).to.equal(0)
                                                expect(res.aborted).to.equal(false)
                                        }
                                }
                        }
                });

                it("Check status job",async () => {
                        const res = await tonlinkContractForError.get_job_by_jobid(1);
                        var slice = res.beginParse()
                        var jobID = slice.loadUint(64)
                        var start = slice.loadUint(64)
                        var end = slice.loadUint(64)
                        var status = slice.loadUint(1)
                        expect(status).to.equal(1);
                });

                it("Check result job",async () => {
                        const res = await tonlinkContractForError.get_job_by_jobid(1);
                        var slice = res.beginParse()
                        var jobID = slice.loadUint(64)
                        var start = slice.loadUint(64)
                        var end = slice.loadUint(64)
                        var status = slice.loadUint(1)
                        const content = slice.loadRef().beginParse();
                        content.loadRef()
                        expect(content.loadUint(64)).to.equal(5);
                })

                it("[ERROR - 204 exitcode] job", async () => {
                        var address = validatorArray[0];
                        for (let index = 0; index < validatorArrayOrigForErr.length; index++) {
                                const validator = validatorArrayOrigForErr[index]
                                if(validator.address.toString() == address) {                                        
                                        var body = beginCell()
                                                .storeUint(160, 32)
                                                .storeUint(0, 64)
                                                .storeUint(1, 64)
                                                .storeUint(5, 64)
                                        .endCell()
                                        var result = await tonlinkContractForError.sendAction(validator.getSender(), body);
                                        var res = flattenTransaction(result.transactions[1]);
                                        expect(res.exitCode).to.equal(204)
                                        expect(res.aborted).to.equal(true)
                                }
                        }
                });

                it("Create 2 job", async () => {
                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(50, 64)
                                .storeCoins(60000000000)
                                .storeAddress(myForErr.address)
                                .storeRef(beginCell().storeUint(0, 32).storeAddress(myForErr.address).endCell())
                                .storeRef(beginCell().storeUint(0, 1).endCell()) // example link
                        .endCell();

                        const result = await tonlinkContractForError.sendAction(walletForErr.getSender(), body);
                        var res = flattenTransaction(result.transactions[1]);
                        expect(res.exitCode).to.equal(0)
                        expect(res.aborted).to.equal(false)
                });

                let validatorArraySecond: string[] = [];
                it("Get validator array from second job", async () => {
                        const value = await tonlinkContractForError.get_last_job();
                        expect(value).to.equal(2n);
                        const res = await tonlinkContractForError.get_job_by_jobid(2);
                        var slice = res.beginParse()
                        var jobID = slice.loadUint(64)
                        var start = slice.loadUint(64)
                        var end = slice.loadUint(64)
                        var status = slice.loadUint(1)
                        const content = slice.loadRef(); 
                        var address_slice = (slice.loadRef()).beginParse();
                        var first_address_slice = (address_slice.loadRef()).beginParse()
                        var second_address_slice = (address_slice.loadRef()).beginParse()
                        var key = 0;
                        var count = 0
                        for (let index = 0; index < 3; index++) {
                                var temp_address = first_address_slice.loadAddress();
                                validatorArraySecond.push(temp_address.toString())
                        }
                        for (let index = 0; index < 2; index++) {
                                var temp_address = second_address_slice.loadAddress();
                                validatorArraySecond.push(temp_address.toString())
                        }
                        expect(validatorArraySecond.length).to.equal(5);
                })

                it("[ERROR - 207 exitcode] job", async () => {
                        var address = validatorArraySecond[0];
                        for (let index = 0; index < validatorArrayOrigForErr.length; index++) {
                                const validator = validatorArrayOrigForErr[index]
                                if(validator.address.toString() == address) {                                        
                                        var body = beginCell()
                                                .storeUint(160, 32)
                                                .storeUint(0, 64)
                                                .storeUint(2, 64)
                                                .storeUint(5, 64)
                                        .endCell()
                                        var result = await tonlinkContractForError.sendAction(validator.getSender(), body);
                                        var res = flattenTransaction(result.transactions[1]);
                                        expect(res.exitCode).to.equal(0)
                                        expect(res.aborted).to.equal(false)
                                        var body = beginCell()
                                                .storeUint(160, 32)
                                                .storeUint(0, 64)
                                                .storeUint(2, 64)
                                                .storeUint(5, 64)
                                        .endCell()
                                        var result = await tonlinkContractForError.sendAction(validator.getSender(), body);
                                        var res = flattenTransaction(result.transactions[1]);
                                        expect(res.exitCode).to.equal(207)
                                        expect(res.aborted).to.equal(true)
                                }
                        }
                });
        });

        
        
        describe("ton-link-v3 registration tests", async () => {
                it("Registration of 1 validator", async () => {
                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(40, 64)
                                .storeCoins(30000000000000)
                                .storeAddress(my.address)
                        .endCell()
                        await tonlinkContract.sendAction(wallet.getSender(), body);
                        const value = await tonlinkContract.get_max_provider();
                        expect(value).to.equal(1n);
                        var res = await tonlinkContract.get_info_about_provider(my.address);
                        var resSlice = res.beginParse()
                        expect(resSlice.loadAddress().toString()).to.equal(my.address.toString())
                        expect(resSlice.loadUint(2)).to.equal(0)

                });
                it("Pause + Unpause 1 validator", async () => {
                        var body = beginCell()
                                .storeUint(140, 32)
                                .storeUint(0, 64)
                        .endCell()
                        await tonlinkContract.sendAction(my.getSender(), body);
                        var res = await tonlinkContract.get_info_about_provider(my.address);
                        var resSlice = res.beginParse()
                        expect(resSlice.loadAddress().toString()).to.equal(my.address.toString())
                        expect(resSlice.loadUint(2)).to.equal(1)

                        var body = beginCell()
                                .storeUint(130, 32)
                                .storeUint(0, 64)
                        .endCell()
                        await tonlinkContract.sendAction(my.getSender(), body);
                        res = await tonlinkContract.get_info_about_provider(my.address);
                        resSlice = res.beginParse()
                        expect(resSlice.loadAddress().toString()).to.equal(my.address.toString())
                        expect(resSlice.loadUint(2)).to.equal(0)
                });
                it("Delete 1 validator", async () => {
                        var body = beginCell()
                                .storeUint(150, 32)
                                .storeUint(0, 64)
                        .endCell()
                        await tonlinkContract.sendAction(my.getSender(), body);
                        const res = await tonlinkContract.get_info_about_provider(my.address);
                        var resSlice = res.beginParse()
                        expect(resSlice.loadAddress().toString()).to.equal(my.address.toString())
                        expect(resSlice.loadUint(2)).to.equal(2)
                        resSlice.loadUint(64)
                        expect(resSlice.loadCoins()).to.equal(0n)
                });
        }); 
            
        describe("ton-link-v3 registration of all val", async () => {
                it("Registration of 1 validator", async () => {
                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(40, 64)
                                .storeCoins(30000000000000)
                                .storeAddress(val2.address)
                        .endCell()
                        await tonlinkContract.sendAction(wallet.getSender(), body);
                });
                it("Registration of 2 validator", async () => {
                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(40, 64)
                                .storeCoins(30000000000000)
                                .storeAddress(val3.address)
                        .endCell()
                        await tonlinkContract.sendAction(wallet.getSender(), body);
                });
                it("Registration of 3 validator", async () => {
                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(40, 64)
                                .storeCoins(30000000000000)
                                .storeAddress(val4.address)
                        .endCell()
                        await tonlinkContract.sendAction(wallet.getSender(), body);
                });
                it("Registration of 4 validator", async () => {
                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(40, 64)
                                .storeCoins(30000000000000)
                                .storeAddress(val5.address)
                        .endCell()
                        var res = await tonlinkContract.sendAction(wallet.getSender(), body);
                });
                it("Registration of 5 validator", async () => {
                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(40, 64)
                                .storeCoins(30000000000000)
                                .storeAddress(val6.address)
                        .endCell()
                        var res = await tonlinkContract.sendAction(wallet.getSender(), body);
                });
                it("Registration of 6 validator", async () => {
                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(40, 64)
                                .storeCoins(30000000000000)
                                .storeAddress(val7.address)
                        .endCell()
                        var res = await tonlinkContract.sendAction(wallet.getSender(), body);
                });
                it("Registration of 7 validator", async () => {
                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(40, 64)
                                .storeCoins(30000000000000)
                                .storeAddress(val8.address)
                        .endCell()
                        var res = await tonlinkContract.sendAction(wallet.getSender(), body);
                });
                it("Registration of 8 validator", async () => {
                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(40, 64)
                                .storeCoins(30000000000000)
                                .storeAddress(val9.address)
                        .endCell()
                        var res = await tonlinkContract.sendAction(wallet.getSender(), body);
                });
                it("Registration of 9 validator", async () => {
                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(40, 64)
                                .storeCoins(30000000000000)
                                .storeAddress(val10.address)
                        .endCell()
                        var res = await tonlinkContract.sendAction(wallet.getSender(), body);
                });
                it("Registration of 10 validator", async () => {
                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(40, 64)
                                .storeCoins(30000000000000)
                                .storeAddress(val11.address)
                        .endCell()
                        var res = await tonlinkContract.sendAction(wallet.getSender(), body);
                });
                it("Registration of 11 validator", async () => {
                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(40, 64)
                                .storeCoins(30000000000000)
                                .storeAddress(val12.address)
                        .endCell()
                        var res = await tonlinkContract.sendAction(wallet.getSender(), body);
                });
                it("Registration of 12 validator", async () => {
                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(40, 64)
                                .storeCoins(30000000000000)
                                .storeAddress(val13.address)
                        .endCell()
                        var res = await tonlinkContract.sendAction(wallet.getSender(), body);
                });
                it("Registration of 13 validator", async () => {
                        var body = beginCell()
                                .storeUint(0x7362d09c, 32)
                                .storeUint(40, 64)
                                .storeCoins(30000000000000)
                                .storeAddress(val14.address)
                        .endCell()
                        var res = await tonlinkContract.sendAction(wallet.getSender(), body);
                });
                it("Check all registration", async () => {
                        const value = await tonlinkContract.get_max_provider();
                        expect(value).to.equal(14n);
                })
        });

        describe("ton-link-v3 job tests", async () => {
                describe("ton-link-v3 100% consensus tests",async () => {
                        let validatorArray: string[] = [];
                        it("Create job", async () => {
                                var link = beginCell()
                                        .storeRef(beginCell().storeUint(0, 32).storeAddress(my.address).endCell())
                                        .storeRef(beginCell().storeUint(0, 1).endCell()) // example link
                                .endCell();
        
                                var body = beginCell()
                                        .storeUint(0x7362d09c, 32)
                                        .storeUint(50, 64)
                                        .storeCoins(60000000000)
                                        .storeAddress(my.address)
                                        .storeRef(beginCell().storeUint(0, 32).storeAddress(my.address).endCell())
                                        .storeRef(beginCell().storeUint(0, 1).endCell()) // example link
                                .endCell();
        
                                const createJobResult = await tonlinkContract.sendAction(wallet.getSender(), body);
                                const value = await tonlinkContract.get_last_job();
                                expect(value).to.equal(1n);
                        });
        
                        it("Get validator array", async () => {
                                
                                const res = await tonlinkContract.get_job_by_jobid(1);
                                var slice = res.beginParse()
                                var jobID = slice.loadUint(64)
                                var start = slice.loadUint(64)
                                var end = slice.loadUint(64)
                                var status = slice.loadUint(1)
                                const content = slice.loadRef(); 
                                var address_slice = (slice.loadRef()).beginParse();
                                var first_address_slice = (address_slice.loadRef()).beginParse()
                                var second_address_slice = (address_slice.loadRef()).beginParse()
                                var key = 0;
                                var count = 0
                                for (let index = 0; index < 3; index++) {
                                        var temp_address = first_address_slice.loadAddress();
                                        validatorArray.push(temp_address.toString())
                                }
                                for (let index = 0; index < 2; index++) {
                                        var temp_address = second_address_slice.loadAddress();
                                        validatorArray.push(temp_address.toString())
                                }
                                expect(validatorArray.length).to.equal(5);
                        })
                        it("Sending a response from the 1 val", async () => {
                                var address = validatorArray[0];
                                for (let index = 0; index < validatorArrayOrig.length; index++) {
                                        const validator = validatorArrayOrig[index]
                                        if(validator.address.toString() == address) {                                        
                                                var body = beginCell()
                                                        .storeUint(160, 32)
                                                        .storeUint(0, 64)
                                                        .storeUint(1, 64)
                                                        .storeUint(5, 64)
                                                .endCell()
                                                var res = await tonlinkContract.sendAction(validator.getSender(), body);
                                        }
                                }
                        })
                        it("Sending a response from the 2 val", async () => {
                                var address = validatorArray[1];
                                for (let index = 0; index < validatorArrayOrig.length; index++) {
                                        const validator = validatorArrayOrig[index]
                                        if(validator.address.toString() == address) {                                        
                                                var body = beginCell()
                                                        .storeUint(160, 32)
                                                        .storeUint(0, 64)
                                                        .storeUint(1, 64)
                                                        .storeUint(5, 64)
                                                .endCell()
                                                var res = await tonlinkContract.sendAction(validator.getSender(), body);
                                        }
                                }
                        })
                        it("Sending a response from the 3 val", async () => {
                                
                                var address = validatorArray[2];
                                for (let index = 0; index < validatorArrayOrig.length; index++) {
                                        const validator = validatorArrayOrig[index]
                                        if(validator.address.toString() == address) {                                        
                                                var body = beginCell()
                                                        .storeUint(160, 32)
                                                        .storeUint(0, 64)
                                                        .storeUint(1, 64)
                                                        .storeUint(5, 64)
                                                .endCell()
                                                var res = await tonlinkContract.sendAction(validator.getSender(), body);
                                        }
                                }
                        })
                        it("Sending a response from the 4 val", async () => {
                                var address = validatorArray[3];
                                for (let index = 0; index < validatorArrayOrig.length; index++) {
                                        const validator = validatorArrayOrig[index]
                                        if(validator.address.toString() == address) {                                        
                                                var body = beginCell()
                                                        .storeUint(160, 32)
                                                        .storeUint(0, 64)
                                                        .storeUint(1, 64)
                                                        .storeUint(5, 64)
                                                .endCell()
                                                var res = await tonlinkContract.sendAction(validator.getSender(), body);
                                        }
                                }
                        })
                        it("Sending a response from the 5 val", async () => {
                                var address = validatorArray[4];
                                for (let index = 0; index < validatorArrayOrig.length; index++) {
                                        const validator = validatorArrayOrig[index]
                                        if(validator.address.toString() == address) {                                        
                                                var body = beginCell()
                                                        .storeUint(160, 32)
                                                        .storeUint(0, 64)
                                                        .storeUint(1, 64)
                                                        .storeUint(5, 64)
                                                .endCell()
                                                var res = await tonlinkContract.sendAction(validator.getSender(), body);
                                        }
                                }
                        })

                        it("Check status job",async () => {
                                const res = await tonlinkContract.get_job_by_jobid(1);
                                var slice = res.beginParse()
                                var jobID = slice.loadUint(64)
                                var start = slice.loadUint(64)
                                var end = slice.loadUint(64)
                                var status = slice.loadUint(1)
                                expect(status).to.equal(1);
                        });

                        it("Check result job",async () => {
                                const res = await tonlinkContract.get_job_by_jobid(1);
                                var slice = res.beginParse()
                                var jobID = slice.loadUint(64)
                                var start = slice.loadUint(64)
                                var end = slice.loadUint(64)
                                var status = slice.loadUint(1)
                                const content = slice.loadRef().beginParse();
                                content.loadRef()
                                expect(content.loadUint(64)).to.equal(5);
                        })
                });  
                describe("ton-link-v3 80% consensus tests", async () => {
                        let validatorArray: string[] = [];
                        it("Create job", async () => {
                                var mp = await tonlinkContract.get_max_provider();
                                var link = beginCell()
                                        .storeRef(beginCell().storeUint(0, 32).storeAddress(my.address).endCell())
                                        .storeRef(beginCell().storeUint(0, 1).endCell()) // example link
                                .endCell();
        
                                var body = beginCell()
                                        .storeUint(0x7362d09c, 32)
                                        .storeUint(50, 64)
                                        .storeCoins(60000000000)
                                        .storeAddress(my.address)
                                        .storeRef(beginCell().storeUint(0, 32).storeAddress(my.address).endCell())
                                        .storeRef(beginCell().storeUint(0, 1).endCell()) // example link
                                .endCell();
        
                                const createJobResult = await tonlinkContract.sendAction(wallet.getSender(), body);
                                const value = await tonlinkContract.get_last_job();
                                expect(value).to.equal(2n);
                        });
        
                        it("Get validator array", async () => {
                                
                                const res = await tonlinkContract.get_job_by_jobid(2);
                                var slice = res.beginParse()
                                var jobID = slice.loadUint(64)
                                expect(jobID).to.equal(2);
                                var start = slice.loadUint(64)
                                var end = slice.loadUint(64)
                                var status = slice.loadUint(1)
                                const content = slice.loadRef(); 
                                var address_slice = (slice.loadRef()).beginParse();
                                var first_address_slice = (address_slice.loadRef()).beginParse()
                                var second_address_slice = (address_slice.loadRef()).beginParse()
                                var key = 0;
                                var count = 0
                                for (let index = 0; index < 3; index++) {
                                        var temp_address = first_address_slice.loadAddress();
                                        validatorArray.push(temp_address.toString())
                                }
                                for (let index = 0; index < 2; index++) {
                                        var temp_address = second_address_slice.loadAddress();
                                        validatorArray.push(temp_address.toString())
                                }
                                expect(validatorArray.length).to.equal(5);
                        })
                        
                        it("Sending a response from the 1 val", async () => {
                                var address = validatorArray[0];
                                for (let index = 0; index < validatorArrayOrig.length; index++) {
                                        const validator = validatorArrayOrig[index]
                                        if(validator.address.toString() == address) {                                        
                                                var body = beginCell()
                                                        .storeUint(160, 32)
                                                        .storeUint(0, 64)
                                                        .storeUint(2, 64)
                                                        .storeUint(1, 64)
                                                .endCell()
                                                var res = await tonlinkContract.sendAction(validator.getSender(), body);
                                        }
                                }
                        })
                        it("Sending a response from the 2 val", async () => {
                                var address = validatorArray[1];
                                for (let index = 0; index < validatorArrayOrig.length; index++) {
                                        const validator = validatorArrayOrig[index]
                                        if(validator.address.toString() == address) {                                        
                                                var body = beginCell()
                                                        .storeUint(160, 32)
                                                        .storeUint(0, 64)
                                                        .storeUint(2, 64)
                                                        .storeUint(1, 64)
                                                .endCell()
                                                var res = await tonlinkContract.sendAction(validator.getSender(), body);
                                        }
                                }
                        })
                        
                        it("Sending a response from the 3 val", async () => {
                                var address = validatorArray[2];
                                for (let index = 0; index < validatorArrayOrig.length; index++) {
                                        const validator = validatorArrayOrig[index]
                                        if(validator.address.toString() == address) {                                        
                                                var body = beginCell()
                                                        .storeUint(160, 32)
                                                        .storeUint(0, 64)
                                                        .storeUint(2, 64)
                                                        .storeUint(1, 64)
                                                .endCell()
                                                var res = await tonlinkContract.sendAction(validator.getSender(), body);
                                        }
                                }
                        })
                        it("Sending a response from the 4 val", async () => {
                                var address = validatorArray[3];
                                for (let index = 0; index < validatorArrayOrig.length; index++) {
                                        const validator = validatorArrayOrig[index]
                                        if(validator.address.toString() == address) {                                        
                                                var body = beginCell()
                                                        .storeUint(160, 32)
                                                        .storeUint(0, 64)
                                                        .storeUint(2, 64)
                                                        .storeUint(1, 64)
                                                .endCell()
                                                var res = await tonlinkContract.sendAction(validator.getSender(), body);
                                        }
                                }
                        })
                        
                        it("Sending a response from the 5 val", async () => {
                                var address = validatorArray[4];
                                for (let index = 0; index < validatorArrayOrig.length; index++) {
                                        const validator = validatorArrayOrig[index]
                                        if(validator.address.toString() == address) {                                        
                                                var body = beginCell()
                                                        .storeUint(160, 32)
                                                        .storeUint(0, 64)
                                                        .storeUint(2, 64)
                                                        .storeUint(4, 64)
                                                .endCell()
                                                var res = await tonlinkContract.sendAction(validator.getSender(), body);
                                        }
                                }
                        })

                        it("Check status job",async () => {
                                const res = await tonlinkContract.get_job_by_jobid(2);
                                var slice = res.beginParse()
                                var jobID = slice.loadUint(64)
                                var start = slice.loadUint(64)
                                var end = slice.loadUint(64)
                                var status = slice.loadUint(1)
                                expect(status).to.equal(1);
                        });

                        it("Check result job",async () => {
                                const res = await tonlinkContract.get_job_by_jobid(2);
                                var slice = res.beginParse()
                                var jobID = slice.loadUint(64)
                                var start = slice.loadUint(64)
                                var end = slice.loadUint(64)
                                var status = slice.loadUint(1)
                                const content = slice.loadRef().beginParse();
                                content.loadRef()
                                expect(content.loadUint(64)).to.equal(1);
                        })
                })
                describe("ton-link-v3 20% consensus tests", async () => {
                        let validatorArray: string[] = [];
                        it("Create job", async () => {
                                var link = beginCell()
                                        .storeRef(beginCell().storeUint(0, 32).storeAddress(my.address).endCell())
                                        .storeRef(beginCell().storeUint(0, 1).endCell()) // example link
                                .endCell();
        
                                var body = beginCell()
                                        .storeUint(0x7362d09c, 32)
                                        .storeUint(50, 64)
                                        .storeCoins(60000000000)
                                        .storeAddress(my.address)
                                        .storeRef(beginCell().storeUint(0, 32).storeAddress(my.address).endCell())
                                        .storeRef(beginCell().storeUint(0, 1).endCell()) // example link
                                .endCell();
        
                                const createJobResult = await tonlinkContract.sendAction(wallet.getSender(), body);
                                //console.log(createJobResult.transactions[1].description)
                                const value = await tonlinkContract.get_last_job();
                                expect(value).to.equal(3n);
                        });
        
                        it("Get validator array", async () => {
                                
                                const res = await tonlinkContract.get_job_by_jobid(3);
                                var slice = res.beginParse()
                                var jobID = slice.loadUint(64)
                                expect(jobID).to.equal(3);
                                var start = slice.loadUint(64)
                                var end = slice.loadUint(64)
                                var status = slice.loadUint(1)
                                const content = slice.loadRef(); 
                                var address_slice = (slice.loadRef()).beginParse();
                                var first_address_slice = (address_slice.loadRef()).beginParse()
                                var second_address_slice = (address_slice.loadRef()).beginParse()
                                var key = 0;
                                var count = 0
                                for (let index = 0; index < 3; index++) {
                                        var temp_address = first_address_slice.loadAddress();
                                        validatorArray.push(temp_address.toString())
                                }
                                for (let index = 0; index < 2; index++) {
                                        var temp_address = second_address_slice.loadAddress();
                                        validatorArray.push(temp_address.toString())
                                }
                                expect(validatorArray.length).to.equal(5);
                                //console.log(validatorArray)
                        })
                        it("Sending a response from the 1 val", async () => {
                                var address = validatorArray[0];
                                for (let index = 0; index < validatorArrayOrig.length; index++) {
                                        const validator = validatorArrayOrig[index]
                                        if(validator.address.toString() == address) {                                        
                                                var body = beginCell()
                                                        .storeUint(160, 32)
                                                        .storeUint(0, 64)
                                                        .storeUint(3, 64)
                                                        .storeUint(1, 64)
                                                .endCell()
                                                var res = await tonlinkContract.sendAction(validator.getSender(), body);
                                        }
                                }
                        })
                        
                        it("Sending a response from the 2 val", async () => {
                                var address = validatorArray[1];
                                for (let index = 0; index < validatorArrayOrig.length; index++) {
                                        const validator = validatorArrayOrig[index]
                                        if(validator.address.toString() == address) {                                        
                                                var body = beginCell()
                                                        .storeUint(160, 32)
                                                        .storeUint(0, 64)
                                                        .storeUint(3, 64)
                                                        .storeUint(3, 64)
                                                .endCell()
                                                var res = await tonlinkContract.sendAction(validator.getSender(), body);
                                        }
                                }
                        })
                        
                        it("Sending a response from the 3 val", async () => {
                                var address = validatorArray[2];
                                for (let index = 0; index < validatorArrayOrig.length; index++) {
                                        const validator = validatorArrayOrig[index]
                                        if(validator.address.toString() == address) {                                        
                                                var body = beginCell()
                                                        .storeUint(160, 32)
                                                        .storeUint(0, 64)
                                                        .storeUint(3, 64)
                                                        .storeUint(3, 64)
                                                .endCell()
                                                var res = await tonlinkContract.sendAction(validator.getSender(), body);
                                        }
                                }
                        })
                        
                        it("Sending a response from the 4 val", async () => {
                                var address = validatorArray[3];
                                for (let index = 0; index < validatorArrayOrig.length; index++) {
                                        const validator = validatorArrayOrig[index]
                                        if(validator.address.toString() == address) {                                        
                                                var body = beginCell()
                                                        .storeUint(160, 32)
                                                        .storeUint(0, 64)
                                                        .storeUint(3, 64)
                                                        .storeUint(3, 64)
                                                .endCell()
                                                var res = await tonlinkContract.sendAction(validator.getSender(), body);
                                        }
                                }
                        })
                        
                        it("Sending a response from the 5 val", async () => {
                                var address = validatorArray[4];
                                for (let index = 0; index < validatorArrayOrig.length; index++) {
                                        const validator = validatorArrayOrig[index]
                                        if(validator.address.toString() == address) {                                        
                                                var body = beginCell()
                                                        .storeUint(160, 32)
                                                        .storeUint(0, 64)
                                                        .storeUint(3, 64)
                                                        .storeUint(4, 64)
                                                .endCell()
                                                var res = await tonlinkContract.sendAction(validator.getSender(), body);
                                        }
                                }
                        })

                        it("Check status job",async () => {
                                const res = await tonlinkContract.get_job_by_jobid(3);
                                var slice = res.beginParse()
                                var jobID = slice.loadUint(64)
                                var start = slice.loadUint(64)
                                var end = slice.loadUint(64)
                                var status = slice.loadUint(1)
                                expect(status).to.equal(1);
                        });

                        it("Check result job",async () => {
                                const res = await tonlinkContract.get_job_by_jobid(3);
                                var slice = res.beginParse()
                                var jobID = slice.loadUint(64)
                                var start = slice.loadUint(64)
                                var end = slice.loadUint(64)
                                var status = slice.loadUint(1)
                                const content = slice.loadRef().beginParse();
                                content.loadRef()
                                expect(content.loadUint(64)).to.equal(3);
                        })
                })
        });
        
})