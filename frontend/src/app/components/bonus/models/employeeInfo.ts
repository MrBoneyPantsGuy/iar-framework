export class EmployeeInfo {
  name!: string;
  employeeId!: string;
  department!: string;
  constructor(name,employeeId,department){
    this.name = name;
    this.employeeId = employeeId;
    this.department = department;
  }
}
