import { Router } from 'express';

import * as OrderController from '../service-layer/controllers/Order';

export const orderRouter: Router = Router();

orderRouter.route('/store/orders')
    .get(OrderController.getOrders)
    .post(OrderController.createOrder);

orderRouter.route('/store/orders/:orderId')
    .get(OrderController.getOrder)
    .patch(OrderController.updateOrder)
    .put(OrderController.ReplaceOrder)
    .delete(OrderController.deleteOrder);

orderRouter.route('/store/orders/all/:userId')
    .get(OrderController.getOrdersForUser);
