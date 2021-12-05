import { Order } from './../components/bonus/models/order';
import { EmployeeInfo } from '../components/bonus/models/employeeInfo';
import { OrdersEvaluation } from '../components/bonus/models/ordersEvaluation';
import {SocialPerformanceEvaluation} from '../components/bonus/models/socialPerformanceEvaluation';

export class Bonus {
  emplInfo: EmployeeInfo;
  year: string;
  partA: Order[];
  partB: SocialPerformanceEvaluation[];
  remarks: string;
  totalBonusA:number;
  totalBonusB:number;
  remark:string;
}
