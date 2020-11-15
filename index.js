const express = require('express');
const passport = require('passport');
const path = require('path');

// TODO: Authentication
// - Add passport module to express

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

passport.serializeUser(function(user, done) {
    // console.log('serialzeUser');
    // console.log(`user:`);
    // console.log(user);
    done(null, user);
});
  
// passport.deserializeUser(function(user, done) {
//     console.log(`user: ${user}`);
//     done(null, user);
// });

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
        // console.log(`username: ${username}`);
        // console.log(`password: ${password}`);
        return done(null, {username: username});
    }
));

// GET method route
app.get('/', function (req, res) {
    // res.sendFile(path.join(__dirname + '/client.html'));
    res.render('login');
});

app.get('/about', function(req, res) {
    res.render("about");
})

app.post('/login', passport.authenticate('local'), function(req, res){
    // console.log(req.user.username)
    res.redirect('/');
})

app.get(
    '/info', 
    require('connect-ensure-login').ensureLoggedIn(),
    function(req,res){
        console.log(req.user);
        res.send(`user:`);
    }
);

app.listen(port, () => {
    console.log(`Webserver listening at: ${port}`);
})

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 }); // Websocket Server

// Connection is start
// ws is client
// If you to broadcast some message to all client, you need to loop over all client.s
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