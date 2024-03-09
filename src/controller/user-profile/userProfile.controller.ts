import { eq } from 'drizzle-orm';
import { Request, Response, NextFunction } from 'express';

import db from '../../db';
import { Exception } from '../../error/Exception';
import { Return } from '../../utils/successResponse';
import { STATUS_CODES } from '../../constants/statusCodes';
import { ERROR_MESSAGES } from '../../constants/errorMessages';
import { UserProfile } from '../../db/postgres/schema/userProfile.schema';
import { getSelectedUserProfileKeys } from '../../service/user-profile/getSelectedUserProfileKeys';

export async function updateUserProfile(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const profileId = req.params.id;
    const { userId } = req.body.userId;

    const profile = (await db.select({ id: UserProfile.id, userId: UserProfile.userId })
      .from(UserProfile)
      .where(eq(UserProfile.id, profileId))).at(0);

    if (!profile) throw new Exception(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND);

    if (profile.userId !== userId) throw new Exception(STATUS_CODES.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED);

    const updatedProfile = (await db.update(UserProfile)
      .set(getSelectedUserProfileKeys(req.body))
      .where(eq(UserProfile.id, profileId))
      .returning()).at(0);

    Return(res, STATUS_CODES.OK, { ...updatedProfile });
  } catch (err) {
    next(err);
  }
}

export async function getUserProfile(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const profileId = req.params.id;

    const profile = (await db.select().from(UserProfile).where(eq(UserProfile.id, profileId))).at(0);

    if (!profile) throw new Exception(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND);

    Return(res, STATUS_CODES.OK, { ...profile })
  } catch (err) {
    next(err);
  }
}
