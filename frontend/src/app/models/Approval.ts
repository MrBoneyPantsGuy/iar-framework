 export class Approval {
    status = {"ceo": false, "hr": false, "salesman": false};
    constructor(public ceo:boolean,public hr:boolean,public salesman:boolean) { // three booleans to track the state of approval
        this.status["ceo"] = ceo;
        this.status["hr"] = hr;
        this.status["salesman"] = salesman;
    }
}
