/**
 * this model specifies the format to exchange salesmandata with the frontend and store it in mongoDB
 * @param {string} salesmanId
 * @param {string} firstname
 * @param {string} lastname
 * @param {string} employeeId
 * @param {string} department
 */
class Salesman{
    constructor(salesmanId, firstname, lastname, employeeId, department) {
        this._salesmanId = salesmanId;
        this.firstname = firstname;
        this.lastname = lastname;
        this.employeeId = employeeId;
        this.department = department;
    }
}

module.exports = Salesman;