import { Router } from 'express';

import * as UserController from '../service-layer/controllers/User';

export const userRouter: Router = Router();

userRouter.route('/users')
    .get(UserController.getUsers)
    .post(UserController.createUser);

userRouter.route('/users/:username')
    .get(UserController.getUser)
    .patch(UserController.updateUser)
    .put(UserController.ReplaceUser)
    .delete(UserController.deleteUser);
