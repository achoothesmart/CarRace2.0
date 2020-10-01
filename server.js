const express = require('express');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const app = express();

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static('public'));

// app.use((req, res, next)=>{
//     res.status(404).sendFile(path.join(app_path.views,'404.html'));
// });

let server = app.listen(port = 4200, callback = ()=>{
    console.log('Server started and listening to http://localhost:4200');
});

// Socket Setup
const io = socket(server);

io.on('connection', socket => {
    console.log('Made Socket Connection');

    socket.on('command', cmd =>{
        if(cmd == 'left-down'){
            io.emit('client-command','nav-left');
        }
        else if(cmd== 'right-down'){
            io.emit('client-command','nav-right');
        }
        else if(cmd == 'nav-clear'){
            io.emit('client-command', 'nav-clear');
        }

        console.log('Command : ' + cmd);
    });

    socket.on('event', event=>{
        io.emit('client-event', event);
    });
});