import * as chai from 'chai';
import chaiHttp = require('chai-http');
import app from '../../src/app';

const chaiWithHttp = chai.use(chaiHttp);
const expect = chai.expect
const testApp = app.getServerInstance();

describe('base route', () => {
    it('should respond with HTTP status code of 200', async() => {
        return chaiWithHttp
        .request(testApp)
        .get('/')
        .then(res => {
            expect(res.status).to.be.equal(200);
        });
    });

    it('should respond with a success message', async () => {
        return chaiWithHttp
            .request(testApp)
            .get('/')
            .then(res => {
                expect(res.body.status).to.be.equal('success');
            });
    });
});
