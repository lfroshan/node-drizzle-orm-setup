import { UserProfileUpdate } from "../../interface/user-profile/userProfile.update.interface";

export function getSelectedUserProfileKeys(payload: any) {
  const allowedFields: Array<keyof UserProfileUpdate> = [
    'temporaryAddress',
    'permanentAddress',
    'profilePicture',
    'country',
    'designation',
    'updatedAt'
  ];

  return Object.fromEntries(
    allowedFields.map((key) => [key, payload[key]])
  );
}
