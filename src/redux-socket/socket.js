import * as io from 'socket.io-client';
import { onlineUsers, userJoined, userLeft, receiveMessages, newMessage, newPrivateMessage } from './actions';

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

        socket.on("newMessage", messages => {
            store.dispatch(newMessage(messages))
        })

        socket.on("privateMessage", messages => {
            console.log("I have received I new message: ", messages);
            store.dispatch(newPrivateMessage(messages))
        })

        // socket.on("newPrivateMessage", message => {
        //     store.dispatch(newPrivateMessage(message));
        // });

        // socket.on('welcome', function(data) {
        //     socket.emit('thanks', {
        //         message: 'Thank you. It is great to be here.'
        //     });
        // });
    }
}

export function newChatMessage(newMessages) {
    socket.emit("newMessage", newMessages)
}
export function emitPrivateMessage(newMessages, profile) {
    console.log("socket newPrivateMessage newMessages: ", newMessages, " profile: ", profile);
    socket.emit("privateMessage", {messages: newMessages, profile: profile})
}
