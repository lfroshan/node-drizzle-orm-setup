import { io } from "../app";

import { activeUsers, addUserToMap, removeUserFromMap } from "./service/mapping.service";

io.on('connection', function (socket) {
  const socketId = socket.id;
  const userId = socket.handshake.query.userId as string;

  if (typeof userId === 'string') {
    return;
  }

  addUserToMap(userId, socketId);

  socket.on('disconnect', function () {
    removeUserFromMap(userId);
    io.emit('returnActiveUsers', Object.keys(activeUsers));
  })
});
