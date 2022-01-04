process.env.NODE_ENV = 'test';
const chai = require('chai');
const should = chai.should();
const request = require('request');
const expect = chai.expect;
const sinon = require('sinon');
const salesmanApi = require('../apis/salesman-api');
const baseUrl = 'http://localhost:8080/api';

describe("when stubbed", () => {
    beforeEach(() => {
        this.get = sinon.stub(request, 'get');
    });

    afterEach(() => {
        request.get.restore();
    })

    const responseObject = {
        statusCode: 200,
        headers: {
            'content-type': 'application/json'
        }
    };
    const responseBody_sm1 = {
        status: 'success',
        data: {
            "_id": "61af34e85d8223271c747c5b",
            "firstname": "John",
            "lastname": "Doe",
            "employeeId": "85",
            "department": "Sales",
            "governmentId": "91338"
        }
    }
    const responseBody_smAll = {
        status: 'success',
        data: [
            {
                "_id": "61af34e85d8223271c747c5b",
                "firstname": "John",
                "lastname": "Doe",
                "employeeId": "85",
                "department": "Sales",
                "governmentId": "91338"
            },
            {
                "_id": "61af34e85d8223271c747c5c",
                "firstname": "Paul",
                "lastname": "Kaye",
                "employeeId": "31",
                "department": "Sales",
                "governmentId": "90732"
            },
            {
                "_id": "61af34e85d8223271c747c5d",
                "firstname": "Mary-Ann",
                "lastname": "Sallinger",
                "employeeId": "9",
                "department": "Sales",
                "governmentId": "90124"
            },
            {
                "_id": "61af34e85d8223271c747c5e",
                "firstname": "John",
                "lastname": "Smith",
                "employeeId": "2",
                "department": "Sales",
                "governmentId": "90123"
            },
            {
                "_id": "61af34e85d8223271c747c5f",
                "firstname": "Toni",
                "lastname": "Tomato",
                "employeeId": "84",
                "department": "Sales",
                "governmentId": "91337"
            }
        ]
    }

    describe('GET /salesman/employeeid/:employeeid', () => {
        it('should return the respective salesman with the given employeeId', (done) => {
            this.get.yields(null, responseObject, JSON.stringify(responseBody_sm1));
            request.get(`${baseUrl}/salesman/employeeid/85`, (err, res, body) => {
                res.statusCode.should.eql(200);
                res.headers['content-type'].should.contain('application/json');
                body = JSON.parse(body);
                body.status.should.eql('success');
                body.data.should.include.keys(
                    '_id', 'firstname', 'lastname', 'employeeId', 'department', 'governmentId'
                )
                body.data._id.should.eql('61af34e85d8223271c747c5b');
                body.data.firstname.should.eql('John');
                body.data.lastname.should.eql('Doe');
                body.data.employeeId.should.eql('85');
                body.data.department.should.eql('Sales');
                body.data.governmentId.should.eql('91338');
                done();
            })
        })
    })

    describe('GET /salesman', () => {
        it('should return all salesmen', (done) => {
            this.get.yields(null, responseObject, JSON.stringify(responseBody_smAll));
            request.get(`${baseUrl}/salesman`, (err, res, body) => {
                res.statusCode.should.eql(200);
                res.headers['content-type'].should.contain('application/json');
                body = JSON.parse(body);
                body.status.should.eql('success');
                body.data[0].should.include.keys(
                    '_id', 'firstname', 'lastname', 'employeeId', 'department', 'governmentId'
                )

                for(let i=0; i<responseBody_smAll.length; ++i) {
                    body.data._id.should.eql(responseBody_smAll[i]._id);
                    body.data.firstname.should.eql(responseBody_smAll[i].firstname);
                    body.data.lastname.should.eql(responseBody_smAll[i].lastname);
                    body.data.employeeId.should.eql(responseBody_smAll[i].employeeId);
                    body.data.department.should.eql(responseBody_smAll[i].department);
                    body.data.governmentId.should.eql(responseBody_smAll[i].governmentId);
                }

                done();
            })
        })
    })
})
