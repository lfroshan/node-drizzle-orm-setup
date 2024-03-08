// Create a Map to store active users
export const activeUsers = new Map();

// Function to add a user to the active users map
export function addUserToMap(userId: string, socketId: string) {
  activeUsers.set(userId, socketId);
};

// Function to remove a user from the active users map
export function removeUserFromMap(userId: string) {
  activeUsers.delete(userId);
};

// Function to get the socket ID of a user from the active users map
export function getSocketId(userId: string) {
  return activeUsers.get(userId);
};
