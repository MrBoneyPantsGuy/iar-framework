import { ClientRankingEnum } from './clientRankingEnum';

export class OrdersEvaluation {
  nameOfProduct!: string ;
  client!: string;
  clientRanking!: ClientRankingEnum;
  items!: number;
  bonus!: number;
}
