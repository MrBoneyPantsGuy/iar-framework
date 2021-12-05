import { EmployeeInfo } from '../components/bonus/models/employeeInfo';
import { OrdersEvaluation } from '../components/bonus/models/ordersEvaluation';
import {SocialPerformanceEvaluation} from '../components/bonus/models/socialPerformanceEvaluation';

export class Bonus {
  emplInfo: EmployeeInfo;
  year: string;
  partA: OrdersEvaluation;
  partB: SocialPerformanceEvaluation;
  remarks: string;
}
