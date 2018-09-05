import {getAdapterByType} from '@waves/signature-adapter'
import {BigNumber} from '@waves/data-entities';
import {moneylikeToMoney} from '../lib/moneyUtil';

import * as SG from "@waves/signature-generator"
import create from 'parse-json-bignumber';
const {stringify, parse} = create({BigNumber});


export class Wallet {
    constructor(user) {
        if (!user) throw new Error('user required')
        this.user = user
    }

    getAccount() {
        let account = Object.assign({}, this.user)
        delete account['id'];
        delete account['seed'];
        return account;
    }

    serialize() {
        return this.user
    }

    getSecret() {
        return this.user.seed
    }

    async sign(tx){
        const Adapter = getAdapterByType(this.user.type);

        Adapter.initOptions({networkCode: this.user.networkCode});
        //Todo: temporary for seed
        const adapter = new Adapter(this.user.seed);
        const signable = adapter.makeSignable(tx);
        return await signable.getDataForApi()
    }
}