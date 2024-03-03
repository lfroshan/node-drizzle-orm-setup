import bcrypt from "bcrypt";

import { UserRegisterPayload } from "../../zod.domain/user/userRegister.domain";

export async function prepareUserData(userPayload: UserRegisterPayload): Promise<UserRegisterPayload> {
  const hashedPassword = await bcrypt.hash(userPayload.password, 10);

  // replace the hashed password with the actual password.
  const userData = { ...userPayload, password: hashedPassword };

  return userData;
};
