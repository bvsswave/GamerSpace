const express = require('express');
const exphbs = require("express-handlebars")
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

server.engine('handlbars', exphbs({ defaultLayout: 'main'}));
server.set('view engine', 'handlebars');

require('./routes/api-routes.js')(app);
require("./routes/html-routes.js")(app);

//THIS came from socket.io, commented out to see if handlebars will work

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected')
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });
});

//TODO - need models folder with index.js, and users.js
//need to require models folder here example: const db - require('./models')
//instead of server.listen you need a db.sequelize.sync().then(() => {
// server.listen 
// })

server.listen(3000, () => {
  console.log('listening on *:3000');
});