const WebSocket = require('ws');

// Initialize server.
const wss = new WebSocket.Server({ port: 8080 });

// Connection is start
// ws เป็น connection ระหว่าง server กับ client หนึ่ง ๆ
// ถ้าต้องการทำ broadcase ต้องใช้ wss (Websocket Server Object) ส่งหา client ทุกคน
wss.on('connection', function connection(ws) {
    // เมื่อเปิดเซิฟเวอร์ แล้วส่งข้อความหา User นั้น
    ws.send('Connection is start');

    // เมื่อเชื่อมต่อเซิฟเวอร์ แล้วเปิด Event Listener
    ws.on('message', function incoming(message) {
      console.log('received: %s', message);

      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });

    });

});