'use strict';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../../src/app';
import { Order } from '../../src/data-layer/interfaces/Order';
import { OrderStatus } from '../../src/data-layer/enums/OrderStatus';

const chaiWithHttp = chai.use(chaiHttp);
const expect = chai.expect
const testApp = app.getServerInstance();

const order: Order = {
    id: '3',
    userId: '2',
    items: [],
    totalQty: 20,
    totalCost: 1500,
    shipDate: new Date(),
    status: OrderStatus.Placed,
    complete: false,   
};

describe('orders routes', () => {
    it('should return a 404 HTTP status code since no order matching the provided _id exists', async () => {
        return chaiWithHttp
        .request(testApp)
        .get(`/store/orders/${order.id}`)
        .then(res => {
            expect(res.status).to.be.equal(404);
        });
    });

    it('should return an empty list and a 200 HTTP status code since there are no orders', async () => {
        return chaiWithHttp
        .request(testApp)
        .get('/store/orders')
        .then(res => {
            expect(res.status).to.be.equal(200);
        });
    });

    it('should successfully create an order', async () => {
        return chaiWithHttp
        .request(testApp)
        .post('/store/orders')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(order)
        .then(res => {
            expect(res.status).to.be.equal(201);
            expect(res.body.totalQty).to.be.equal(order.totalQty);
            expect(res.body.complete).to.be.equal(false);
            expect(res.body.status).to.be.equal(OrderStatus.Placed);
        });
    });

    it('should successfully retrieve the created order matching id:order.id', async () => {
        return chaiWithHttp
        .request(testApp)
        .get(`/store/orders/${order.id}`)
        .then(res => {
            expect(res.status).to.be.equal(200);
            expect(res.body.id).to.be.equal(order.id);
        });
    });

    it('should return all orders for the matched user', async () => {
        return chaiWithHttp
        .request(testApp)
        .get(`/store/orders/all/${order.userId}`)
        .then(res => {
            expect(res.status).to.be.equal(200);
        });
    });

    it('should successfully update an existing order that matches id:order.id', async () => {
        const updatedOrder = { totalQty: 100 };
        return chaiWithHttp
        .request(testApp)
        .patch(`/store/orders/${order.id}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(updatedOrder)
        .then(res => {
            expect(res.status).to.be.equal(204);
        });
    });

    it('should return the updated order that matches id:order.id', async () => {
        return chaiWithHttp
        .request(testApp)
        .get(`/store/orders/${order.id}`)
        .then(res => {
            expect(res.body.totalQty).to.be.equal(100);
        });
    });

    it('should return a 404 status code for a non existant order', async () => {
        const updatedOrder = { totalQty: 5 };
        return chaiWithHttp
        .request(testApp)
        .patch('/store/orders/67')
        .send(updatedOrder)
        .then(res => {
            expect(res.status).to.be.equal(404);
        });
    });

    it('should successfully delete an order matching id:order.id', async () => {
        return chaiWithHttp
        .request(testApp)
        .delete(`/store/orders/${order.id}`)
        .then(res => {
            expect(res.status).to.be.equal(204);
        });
    });

    it('should return a 404 status code for a non existant order', async () => {
        return chaiWithHttp
        .request(testApp)
        .delete(`/store/orders/${order.id}`)
        .then(res => {
            expect(res.status).to.be.equal(404);
        });
    });
})