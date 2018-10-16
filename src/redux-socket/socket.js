import * as io from 'socket.io-client';
import { onlineUsers, userJoined, userLeft, receiveMessages, newMessage } from './actions';

let socket;

export function init(store) {
    if (!socket) {
        socket = io.connect();

        socket.on('onlineUsers', users => {
            //redux
            //dispatch is just the method we use to call a function we wrote on the actions file
            store.dispatch(onlineUsers(users))
        });

        socket.on('userJoined', user => {
            store.dispatch(userJoined(user))
        })

        socket.on('userLeft', userId => {
            store.dispatch(userLeft(userId))
        })

        socket.on("chatMessages", messages => {
            store.dispatch(receiveMessages(messages))
        })

        socket.on("newMessage", message => {
            console.log("4- socket newChatMessage RECEIVE 2 with message text: ", message);
            store.dispatch(newMessage(message))
        })

        // socket.on('welcome', function(data) {
        //     socket.emit('thanks', {
        //         message: 'Thank you. It is great to be here.'
        //     });
        // });
    }
}

export function newChatMessage(newMessage) {
    console.log("1- socket newChatMessage EMIT 1 with message text: ", newMessage);
    socket.emit("newMessage", newMessage)
}
