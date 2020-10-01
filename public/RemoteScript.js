const socket = io();

socket.on('client-event', event=>{
    console.log(event);
});

socket.on('client-command', (cmd)=>{
    if(cmd == 'nav-left'){
        onLeftKey();
    }
    else if(cmd == 'nav-right'){
        onRightKey();
    }
    else if(cmd == 'nav-clear'){
        stopNav();
    }
});

btn_game.addEventListener('click', (event) => {
    show(game_panel);
    hide(options_panel);
    console.log('Game on');
});

btn_remote.addEventListener('click', (event) => {
    show(remote_control);
    hide(options_panel);
    console.log('Remote on');
});

// nav_left.addEventListener('click', (event)=>{
//     socket.emit('command', 'left');
// });

// nav_right.addEventListener('click', (event)=>{
//     socket.emit('command', 'right');
// });

nav_left.addEventListener('touchmove', (event)=>{
    socket.emit('command', 'left-down');
});

nav_left.addEventListener('touchend', (event)=>{
    socket.emit('command', 'nav-clear');
});


nav_right.addEventListener('touchmove', (event)=>{
    socket.emit('command', 'right-down');
});

nav_right.addEventListener('touchend', (event)=>{
    socket.emit('command', 'nav-clear');
});

// remote_control.addEventListener('dblclick', (event)=>{
//     socket.emit('command', 'dbl-click');
// });

let event_names = ['touchstart', 'touchmove', 'touchend'];

event_names.forEach(event_name => {
    remote_control.addEventListener(event_name, (event)=>{
        socket.emit('event', event);
        console.log(event);
    });
});

// helper methods

function hide(el){
    el.classList.remove('show');
    el.classList.add('hidden');
}

function show(el){
    el.classList.add('show');
    el.classList.remove('hidden');
}