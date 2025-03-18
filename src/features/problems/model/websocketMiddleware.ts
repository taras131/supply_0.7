import { Middleware } from "redux";
import {updateProblemsList, wsConnected, wsDisconnected} from "./slice";

const WEBSOCKET_URL = "wss://mylittleserver.ru/api/v1/problems/ws";

export const problemsWebsocketMiddleware: Middleware = (store) => {
    let socket: WebSocket | null = null;

    const connectWebSocket = () => {
        socket = new WebSocket(WEBSOCKET_URL);

        socket.onopen = () => {
            store.dispatch(wsConnected());
            console.log("Problems WebSocket Connected");
        };

        socket.onmessage = (event) => {
            const problems = JSON.parse(event.data);
            if (problems.length) {
                store.dispatch(updateProblemsList(problems));
            }
        };

        socket.onclose = () => {
            store.dispatch(wsDisconnected());
            console.log("Problems WebSocket Disconnected");
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