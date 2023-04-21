import { Contract, ContractProvider, Sender, Address, Cell, contractAddress, beginCell, Dictionary, TupleBuilder } from "ton-core";

export default class Tonlink implements Contract {

        static createForDeploy(code: Cell, my: Address): Tonlink {
                const data = beginCell()
                        .storeAddress(my)
                        .storeUint(0, 64)
                        .storeUint(0, 64)
                        .storeDict(null)
                        .storeDict(null)
                        .storeDict(null)
                        .storeDict(null)
                .endCell();
                const workchain = 0;
                const address = contractAddress(workchain, { code, data });
                return new Tonlink(address, { code, data });
        }

        constructor(readonly address: Address, readonly init?: { code: Cell, data: Cell }) {}

        async sendDeploy(provider: ContractProvider, via: Sender) {
                await provider.internal(via, {
                        value: "0.01",
                        bounce: false
                });
        }

        async sendStake(provider: ContractProvider, via: Sender) {
                var body = beginCell()
                        .storeUint(40, 32)
                        .storeUint(0, 64)
                .endCell()
                var res = await provider.internal(via, {
                        value: "30000",
                        body: body
                });
                return res
        }

        async sendMinStake(provider: ContractProvider, via: Sender, amount: number) {
                var body = beginCell()
                        .storeUint(40, 32)
                        .storeUint(0, 64)
                .endCell()
                var res = await provider.internal(via, {
                        value: amount.toString(),
                        body: body
                });
                return res
        }

        async sendValue(provider: ContractProvider, via: Sender, amount: number) {
                var res = await provider.internal(via, {
                        value: amount.toString(),
                        bounce: false
                });
                return res
        }

        async sendCreateJob(provider: ContractProvider, via: Sender, amount: number, body: Cell) {
                var res = await provider.internal(via, {
                        value: amount.toString(),
                        body: body
                });
                return res
        }

        async sendAction(provider: ContractProvider, via: Sender, body: Cell) {
                var res = await provider.internal(via, {
                        value: "1.5",
                        body: body
                });
                return res
        }

        async get_last_job(provider: ContractProvider) {
                const { stack } = await provider.get("get_last_job", []);
                return stack.readBigNumber();
        }

        async get_max_provider(provider: ContractProvider) {
                const { stack } = await provider.get("get_max_provider", []);
                return stack.readBigNumber();
        }

        async get_info_about_provider(provider: ContractProvider, wallet: Address) {
                let args = new TupleBuilder();
                args.writeAddress(wallet);
                const { stack } = await provider.get("get_info_about_provider", args.build());
                return stack.readCell();
        }

        async get_job_by_jobid(provider: ContractProvider, jobId: number) {
                let args = new TupleBuilder();
                args.writeNumber(jobId);
                const { stack } = await provider.get("get_job_by_jobid", args.build());
                return stack.readCell();
        }

}