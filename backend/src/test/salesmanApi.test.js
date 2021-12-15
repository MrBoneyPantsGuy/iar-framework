process.env.NODE_ENV = 'test';
const chai = require('chai');
const should = chai.should();
const request = require('request');
const expect = chai.expect;
const sinon = require('sinon');
const salesmanApi = require('../apis/salesman-api');
const baseUrl = 'http://localhost:8080/api';

describe("when stubbed", () => {
    let responseObject = null;
    let responseBody = null;
    beforeEach(() => {
        responseObject = {
            statusCode: 200,
            headers: {
                'content-type': 'application/json'
            }
        };
        responseBody = {
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
        this.get = sinon.stub(request, 'get');
    });

    describe('GET /salesman/employeeid', () => {
        it('should return the respective salesman with the given employeeId', (done) => {
            this.get.yields(null, responseObject, JSON.stringify(responseBody));
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
})
