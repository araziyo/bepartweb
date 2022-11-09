const express = require('express'); //requires express module
const socket = require('socket.io'); //requires socket.io module
const fs = require('fs');
const app = express(); // express app
var PORT = process.env.PORT || 8080;
const server = app.listen(PORT); //tells to host server on localhost:8080



//register view engine
app.set('view engine', 'ejs');


//middleware & static files
app.use(express.static('public'));
console.log('Server is running at port 8080...');
const io = socket(server);


//Socket.io Connection------------------
io.on('connection', (socket) => {

    console.log("New socket connection: " + socket.id)

    socket.on('disconnect', () => {
        console.log('user disconnected: ' + socket.id);
      });

      socket.on('initColor', (color, sec) => {
        console.log('initColor: ' + color+ ", " + sec);
        io.emit('initColor', color, sec);
      });

    //   socket.on('initLyrics', (song, timestamp) => {
    //     console.log('initLyrics: ' + song+ ", " + timestamp);
    //     io.emit('initLyrics', song, timestamp);
    //   });

      socket.on('initLyrics', (song) => {
        console.log('initLyrics: ' + song);
        io.emit('initLyrics', song);
      });

})


app.get('/', (req, res) => {
    const blogs = [
        {title: 'First title', snippet: 'First snippet'},
        {title: 'Second Title', snippet: 'Second snippet'}
    ]
    res.render('index', { title: 'Home' , blogs });
});

app.get('/index.html', (req, res) => {
    console.log("User at home page");
    res.redirect('/');
});

app.get('/admin_login.html', (req, res) => {
    //res.sendFile('./views/admin_login.html', { root: __dirname });
    res.render('admin_login');
});

app.get('/admin.html', (req, res) => {
    //res.sendFile('./views/admin.html', { root: __dirname });
    res.render('admin');
});

app.get('/event.html', (req, res) => {
    //res.sendFile('./views/event.html', { root: __dirname });
    res.render('event');
});

app.get('/lyrics.html', (req, res) => {
    //res.sendFile('./views/event.html', { root: __dirname });
    res.render('lyrics');
});

app.use((req, res) => {
    //res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.status(404).render('404');
})