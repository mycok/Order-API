'use strict';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../../src/app';
import { User } from '../../src/data-layer/interfaces/User'

const chaiWithHttp = chai.use(chaiHttp);
const expect = chai.expect
const testApp = app.getServerInstance();

const user: User = {
    id: (Math.floor(Math.random() * 1000) + 1).toString(),
    username: 'John',
    firstName: 'First',
    lastName: 'Last',
    email: 'test@email.com',
    password: 'password',
    phone: '777777',
    userStatus: 1,
};
describe('user routes', () => {
    it('should return a 404 status code for a non exisistant user', async () => {
        return chaiWithHttp
            .request(testApp)
            .get(`/users/${user.username}`)
            .then(res => {
                expect(res.status).to.be.equal(404);
            });
    });

    it('should successfully create a user', async () => {
        return chaiWithHttp
            .request(testApp)
            .post('/users')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(user)
            .then(res => {
                expect(res.status).to.be.equal(201);
                expect(res.body.username).to.be.equal(user.username);
            });
    });

    it('should successfully retrieve the created user matching username:John', async () => {
        return chaiWithHttp
            .request(testApp)
            .get(`/users/${user.username}`)
            .then(res => {
                expect(res.status).to.be.equal(200);
                expect(res.body.username).to.be.equal(user.username);
            });
    });

    it('should successfully update a user that matches a name:John', async () => {
        const updatedUser = { username: 'kelly' };
        return chaiWithHttp
            .request(testApp)
            .patch(`/users/${user.username}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(updatedUser)
            .then(res => {
                expect(res.status).to.be.equal(204);
            });
    });

    it('should return the updated user that matches username:Kelly', async () => {
        return chaiWithHttp
            .request(testApp)
            .get('/users/kelly')
            .then(res => {
                expect(res.body.username).to.be.equal('kelly');
            });
    });

    it('should successfully replace a user that matches a name:John', async () => {
        const updatedUser = {
            username: 'kelly',
            firstName: 'nina',
            lastName: 'carol',
            email: 'kelly@email.com',
            password: 'kelly#pass',
            phone: '999999',
            userStatus: 1,
        }
        return chaiWithHttp
            .request(testApp)
            .put('/users/kelly')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(updatedUser)
            .then(res => {
                expect(res.status).to.be.equal(204);
            });
    });

    it('should return the repalced user that matches username:Kelly', async () => {
        return chaiWithHttp
            .request(testApp)
            .get('/users/kelly')
            .then(res => {
                expect(res.body.username).to.be.equal('kelly');
            });
    });

    it('should successfully delete a user matching username:Kelly', async () => {
        return chaiWithHttp
            .request(testApp)
            .delete('/users/kelly')
            .then(res => {
                expect(res.status).to.be.equal(204);
            });
    });

    it('should return a 404 status code for a non existant user', async () => {
        return chaiWithHttp
            .request(testApp)
            .delete(`/users/${user.username}`)
            .then(res => {
                expect(res.status).to.be.equal(404);
            });
    });
})