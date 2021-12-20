process.env.NODE_ENV = 'test';
const chai = require('chai');
const should = chai.should();
const axios = require('axios');
const request = require('request');
const sinon = require('sinon');
const baseUrl = 'http://localhost:8080/api';
const record = require('./fixtures/performanceRecord.json');

describe('Performance Record Api', () => {
    describe('when not stubbed', () => {
        describe('GET /record/{id}', () => {
            it('should return the respective performance record with the given employeeId', (done) => {
                axios.get(`${baseUrl}/record/9`).then( res => {
                    res.statusCode.should.eql(200);
                    res.headers['content-type'].should.contain('application/json');
                    body = JSON.parse(body);
                    body.status.should.eql('success');
                    body.data.should.include.keys(
                        '_id', 'year', 'employeeId', 'socialRecords', 'orderRecords', 'totalBonusA', 'totalBonusB', 'remark'
                    )

                    body.data._id.should.eql('61bd9ad4a1765f03983ee398');
                    body.data.year.should.eql('2020');
                    //body.data.socialRecords.should.eql('');//TODO social vergleich
                    body.data.employeeId.should.eql('9');
                    //body.data.orderRecords.should.eql('');//TODO order vergleich
                    body.data.totalBonusA.should.eql(0);
                    body.data.totalBonusB.should.eql(0);
                    body.data.remark.should.eql('');
                });
                done();
            });
            it('should throw an error if the record does not exist', (done) => {
                request.get(`${baseUrl}/record/999999`, (err, res, body) => {
                    res.statusCode.should.eql(404);
                    res.headers['content-type'].should.contain('application/json');
                    body = JSON.parse(body);
                    body.status.should.eql('error');
                    body.message.should.eql('That record does not exist.');

                })
                done();
            })
        });
    });
    describe('when stubbed', () => {
        this.get = sinon.stub(request, 'get');

        describe('GET /record/{id}', () => {
            it('should return the respective performance record with the given employeeId', (done) => {
                this.get.yields(null, record.recordId9.success.res, JSON.stringify(record.recordId9.success.body));
                request.get(`${baseUrl}/record/9`, (err, res, body) => {
                    res.statusCode.should.eql(200);
                    res.headers['content-type'].should.contain('application/json');
                    body = JSON.parse(body);
                    body.status.should.eql('success');
                    body.data.should.include.keys(
                        '_id', 'year', 'employeeId', 'socialRecords', 'orderRecords', 'totalBonusA', 'totalBonusB', 'remark'
                    )

                    body.data._id.should.eql('61bd9ad4a1765f03983ee398');
                    body.data.year.should.eql('2020');
                    //body.data.socialRecords.should.eql('');//TODO social vergleich
                    body.data.employeeId.should.eql('9');
                    //body.data.orderRecords.should.eql('');//TODO order vergleich
                    body.data.totalBonusA.should.eql(0);
                    body.data.totalBonusB.should.eql(0);
                    body.data.remark.should.eql('');
                    done();
                });
            });
            it('should throw an error if the record does not exist', (done) => {
                const obj = record.recordId9.failure;
                this.get.yields(null, obj.res, JSON.stringify(obj.body));
                request.get(`${baseUrl}/record/999999`, (err, res, body) => {
                    res.statusCode.should.eql(404);
                    res.headers['content-type'].should.contain('application/json');
                    body = JSON.parse(body);
                    body.status.should.eql('error');
                    body.message.should.eql('That record does not exist.');
                    done();
                })
            })
        });
    });
});

