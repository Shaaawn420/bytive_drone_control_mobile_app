/**
 * WebSocket Wrapper Class
 */
export default class ws {
    /**
     * Initiate the Websocket Server
     * @param serverAddress
     */
    constructor(serverAddress) {
        this.ws = new WebSocket(serverAddress);

        /**
         * On connection event
         */
        this.ws.onopen = () => {
            this.ws.send('app connected');
        };

        /**
         * On message event
         * @param e
         */
        this.ws.onmessage = e => {
            console.log(e.data);
        };

        /**
         * On error event
         * @param e
         */
        this.ws.onerror = e => {
            console.log(e.message);
        };

        /**
         * On close event
         * @param e
         */
        this.ws.onclose = e => {
            console.log(e.code, e.reason)
        };
    }

    /**
     * Send a message to the Websocket Server.
     * @param payload
     */
    send(payload) {
        this.ws.send(JSON.stringify(payload))
    }
}