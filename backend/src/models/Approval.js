/**
 * this model specifies the format to exchange approvals
 * @param {Array} approval
 */
class Approval {
    status = {"ceo": false, "hr": false, "salesman": false};
    constructor(ceo, hr, salesman) {
        this.status["ceo"] = ceo;
        this.status["hr"] = hr;
        this.status["salesman"] = salesman;
    }
}

module.exports = Approval;