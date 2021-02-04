let HOST, PORT, BASE, SCOKET_HOST, SOCKET_BASE;
HOST = "loaclhost";
PORT = "8000";
SCOKET_HOST = "ws://localhost";

// eslint-disable-next-line no-unused-vars
BASE = HOST + ":" + PORT;
// eslint-disable-next-line no-unused-vars
SOCKET_BASE = SCOKET_HOST + ":" + PORT;

export const socketUrls = {
  ConnectSocket: "ws://localhost:8000/ws/display_date/",
};
