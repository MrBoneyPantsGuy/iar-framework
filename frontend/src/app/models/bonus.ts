import { Order } from './../components/bonus/models/order';
import { EmployeeInfo } from '../components/bonus/models/employeeInfo';
import { OrdersEvaluation } from '../components/bonus/models/ordersEvaluation';
import {SocialPerformanceEvaluation} from '../components/bonus/models/socialPerformanceEvaluation';
import {OrdersRecord} from '../../../../backend/src/models/OrderRecord.js';
export class Bonus {
  emplInfo: EmployeeInfo;
  year: string;
  partA: OrdersRecord[];
  partB: SocialPerformanceEvaluation[];
  remarks: string;
  totalBonusA:number;
  totalBonusB:number;
  remark:string;
}
