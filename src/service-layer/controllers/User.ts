import { Request, Response } from 'express';
import { User } from '../../data-layer/interfaces/User';

let users: Array<User> = [];

export const getUsers = (req: Request, res: Response) => {
    return users;
};

export const createUser = (req: Request, res: Response) => {
    const { body } = req;

    const newUser = { ...body, id: Math.floor(Math.random() * 100) + 1 };
    users.push(newUser);

    return res.status(201).send(newUser);
};

export const getUser = (req: Request, res: Response) => {
    const { params: { username } } = req;

    const user = users.find(obj => obj.username === username);
    const httpStatusCode = user ? 200 : 404;

    return res.status(httpStatusCode).send(user);
}

export const updateUser = (req: Request, res: Response) => {
    const { body, params: { username } } = req;
    
    const userIndex = users.findIndex(user => user.username === username);
    if (userIndex === -1) res.status(404).send('Not Found');

    const user = users[userIndex];
    
    user.username = body.username || user.username;
    user.firstName = body.firstName || user.firstName;
    user.lastName = body.lastName || user.lastName;
    user.email = body.email || user.email;
    user.phone = body.phone || user.phone;
    user.password = body.password || user.password;
    user.userStatus = body.status || user.userStatus;

    users[userIndex] = user;

    return res.status(204).send();
}

export const ReplaceUser = (req: Request, res: Response) => {
    const { body, params: { username } } = req;

    const userIndex = users.findIndex(user => user.username === username);
    if (userIndex === -1) res.status(404).send('Not Found');

    const user = users[userIndex];

    user.username = body.username || user.username;
    user.firstName = body.firstName || user.firstName;
    user.lastName = body.lastName || user.lastName;
    user.email = body.email || user.email;
    user.phone = body.phone || user.phone;
    user.password = body.password || user.password;
    user.userStatus = body.status || user.userStatus;

    users[userIndex] = user;


    return res.status(204).send();
};

export const deleteUser = (req: Request, res: Response) => {
    const { params: { username } } = req;

    const userMatch = users.some(user => user.username === username);
    if (!userMatch) res.status(404).send('Not Found');

    users = users.filter(user => user.username !== username);

    return res.status(204).send();
}