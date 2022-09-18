import { createServer } from "./Server";

const app = createServer();
app.connectMongo();
app.listen();
