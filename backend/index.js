const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
var cors = require('cors');
const passport = require('passport');
var http = require("http").createServer(express);
var io = require("socket.io")(http);
require('./config/config');
require('./models/db');
require('./config/passportConfig');


const app = express();
const port = 5000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Will be in db in real world
const users = [];
const messages = [];
const pmessages = [];
let currentId = 0;


mongoose.connect('mongodb://localhost:27017/admin-panel', { useNewUrlParser: true,useUnifiedTopology: true }).
catch(error => handleError(error));
// Routers
const login = require('./routers/authRouter');
const setting = require('./routers/settingRouter');

const rtsIndex = require('./routers/index.router');
app.use(passport.initialize());
app.use('/admin', rtsIndex);

// error handler
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
      var valErrors = [];
      Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
      res.status(422).send(valErrors)
  }
});

// var app = express();
// app.use(bodyParser.json());

const path = require('path')
var dir = path.join(__dirname, '/uploads');
app.use('/uploads', express.static(dir));

// Route Lists
app.use('/admin', login);
app.use('/admin/setting', setting);
// app.get('/', (req, res) => res.send('Hello World!'))



io.on("connection", function(socket) {
  console.log("LOG:: a user connected");
  socket.emit("get users list", JSON.stringify(users));
  socket.emit("get messages history", JSON.stringify(messages));

  socket.on("message", function(msg) {
    console.log(
      "LOG:: message from UserId: " + msg.userId + " --> " + msg.text
    );
    const message = {
      ...msg,
      timestamp: new Date()
    };
    messages.push(message);
    io.emit("message", JSON.stringify(message));
  });


  socket.on("pmessage", function(msg) {
    console.log(
      "LOG:: message from UserId: " + msg.userId + " --> " + msg.text
    );
    const pmessage = {
      ...msg,
      timestamp: new Date()
    };
    messages.push(pmessage);
    io.emit("pmessage", JSON.stringify(pmessage));
  });


  socket.on("user name added", function(name) {
    console.log("LOG:: user '" + name + "' entered the room");
    const newUser = {
      name,
      id: ++currentId,
      isCurrent: false
    };

    users.push(newUser);
    socket.emit("my user added", JSON.stringify(newUser));
    io.emit("user name added", JSON.stringify(newUser));
  });

  socket.on("disconnect", function() {
    console.log("LOG:: user disconnected");
  });
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

http.listen(3000, function() {
  console.log("LOG:: listening on *:3000");
});




