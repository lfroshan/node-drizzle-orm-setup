import { Router } from "express";

import validateAccessToken from "../../middleware/verifyAccessToken.middleware";
import { updateUserProfile, getUserProfile } from "../../controller/user-profile/userProfile.controller";

const profileRouter = Router();

profileRouter.patch('/:id', validateAccessToken, updateUserProfile);

profileRouter.get('/:id', getUserProfile);

export default profileRouter;
