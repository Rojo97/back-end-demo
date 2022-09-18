import { createServer } from "./Server";

/**
 * Server initialization
 */
const app = createServer();
app.connectMongo();
app.listen();
