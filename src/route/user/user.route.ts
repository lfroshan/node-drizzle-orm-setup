import { Router } from "express";

import { UserLoginSchema } from "../../zod.domain/user/userLogin.domain";
import { validateSchema } from "../../middleware/validateSchema.middleware";
import { validateRefreshToken } from "../../middleware/validateRefreshToken";
import { UserRegisterSchema } from "../../zod.domain/user/userRegister.domain";
import { registerUser, loginUser, refreshToken, accountExists } from "../../controller/user/user.controller";

const userRouter = Router();

userRouter.post('/register', validateSchema(UserRegisterSchema), registerUser);

userRouter.post('/login', validateSchema(UserLoginSchema), loginUser);

userRouter.post('/refresh-token', validateRefreshToken, refreshToken);

userRouter.post('/check-user', accountExists);

export default userRouter;
