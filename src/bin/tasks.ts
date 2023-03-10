
import http from "http"
import app from "../app"

var port = process.env.PORT || '8080';
app.set('port', port);


var server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});

export default server;

