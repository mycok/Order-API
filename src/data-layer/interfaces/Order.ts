'use strict';
import { OrderStatus } from '../enums/OrderStatus';
import { Item } from './Item';

export interface Order {
    id: String;
    userId: string;
    items?: Item[];
    totalQty: number;
    totalCost: number;
    shipDate?: Date;
    status: OrderStatus;
    complete: boolean;
}
