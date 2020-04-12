import { Request, Response } from 'express';

import { Order } from '../../data-layer/interfaces/Order';

let orders: Array<Order> = [];

export const getOrders = (req: Request, res: Response) => {
    return res.status(200).send(orders);
};

export const createOrder = (req: Request, res: Response) => {
    const { body } = req;
    const newOrder = { ...body };
    orders.push(newOrder);

    return res.status(201).send(newOrder);
};

export const getOrder = (req: Request, res: Response) => {
    const { params: { orderId } } = req;
    const order = orders.find(order => order.id === orderId);
    const httpStatusCode = order ? 200 : 404;

    return res.status(httpStatusCode).send(order);
}

export const updateOrder = (req: Request, res: Response) => {
    const { body, params: { orderId } } = req;
    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) res.status(404).send('Not Found');

    const order = orders[orderIndex]

    order.items = body.items || order.items;
    order.shipDate = body.shipDate || order.shipDate;
    order.status = body.status || order.status;
    order.totalCost = body.totalCost || order.totalCost;
    order.totalQty = body.totalQty || order.totalQty;
    order.userId = body.userId || order.userId;
    order.complete = body.complete || order.complete;

    orders[orderIndex] = order;

    return res.status(204).send();
}

export const ReplaceOrder = (req: Request, res: Response) => {
    const { body, params: { orderId } } = req;
    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) res.status(404).send('Not Found');

    const order = orders[orderIndex];

    order.items = body.items || order.items;
    order.shipDate = body.shipDate || order.shipDate;
    order.status = body.status || order.status;
    order.totalCost = body.totalCost || order.totalCost;
    order.totalQty = body.totalQty || order.totalQty;
    order.userId = body.userId || order.userId;
    order.complete = body.complete || order.complete;
    
    orders[orderIndex] = order;

    return res.status(204).send();
};

export const deleteOrder = (req: Request, res: Response) => {
    const { params: { orderId } } = req;
    const orderMatch = orders.some(order => order.id === orderId);
    if (!orderMatch) res.status(404).send('Not Found');

    orders = orders.filter(order => order.id !== orderId);

    return res.status(204).send();
};

export const getOrdersForUser = (req: Request, res: Response) => {
    const { params: { userId } } = req;
    const orderMatch = orders.some(order => order.userId === userId);
    if (!orderMatch) res.status(404).send('Not Found');

    orders = orders.filter(order => order.userId === userId);

    return res.status(200).send(orders);
};
