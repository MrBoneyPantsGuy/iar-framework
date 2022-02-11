/**
 * this model specifies the format to exchange approvals
 * @param {Object} status
 */
class Approval {
    status = {"ceo": false, "hr": false, "salesman": false};
    constructor(ceo, hr, salesman) { // three booleans to track the state of approval
        this.status["ceo"] = ceo;
        this.status["hr"] = hr;
        this.status["salesman"] = salesman;
    }
}

module.exports = Approval;