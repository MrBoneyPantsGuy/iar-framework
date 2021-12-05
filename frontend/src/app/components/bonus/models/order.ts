import { ClientRankingEnum } from './clientRankingEnum';
export class Order{
    productname:string;
    client:string;
    clientRanking?: number;
    itemsSold:string;
    bonus:number;
    remark:string;
    clientRankingText?: ClientRankingEnum

    constructor(){
        this.clientRankingText = this.clientRanking;
    }
}