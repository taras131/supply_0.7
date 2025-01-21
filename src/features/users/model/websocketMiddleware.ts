import { Middleware } from "redux";
import {updateUsersList, wsConnected, wsDisconnected} from "./slice";

const WEBSOCKET_URL = "ws://127.0.0.1:8000/api/v1/auth/ws";

export const usersWebsocketMiddleware: Middleware = (store) => {
    let socket: WebSocket | null = null;

    const connectWebSocket = () => {
        socket = new WebSocket(WEBSOCKET_URL);

        socket.onopen = () => {
            store.dispatch(wsConnected());
            console.log("WebSocket Connected");
        };

        socket.onmessage = (event) => {
            const users = JSON.parse(event.data);
            console.log(users);
            // Игнорируем сообщения "ping"
            if (users.length) {
                store.dispatch(updateUsersList(users));
            }
        };

        socket.onclose = () => {
            store.dispatch(wsDisconnected());
            console.log("WebSocket Disconnected");
            // Переподключение через 5 секунд
            setTimeout(() => {
                connectWebSocket();
            }, 5000);
        };

        socket.onerror = (error) => {
            console.error("WebSocket Error:", error);
            socket?.close();
        };
    };

    connectWebSocket();

    return (next) => (action) => next(action);
};