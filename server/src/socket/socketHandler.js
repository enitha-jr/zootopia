
const db = require("../utils/connectdb");

const sendMessage = (io) => { 
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.user.username || socket.user.user_id}`);
        socket.join(socket.user.user_id.toString());

        socket.on('send_message', async ({ receiver_id, content }) => {
            try {
                const insertQuery = "insert into messages (sender_id, receiver_id, content) values (?, ?, ?)";
                const [result]=await db.query(insertQuery, [socket.user.user_id, receiver_id, content]);

                const selectQuery = "select * from messages where msg_id = ?";
                const [row] = await db.query(selectQuery, [result.insertId]);
                const newMessage = row[0];
                
                io.to(receiver_id.toString()).emit('receive_message', newMessage);
                io.to(socket.user.user_id.toString()).emit('receive_message', newMessage);
            } catch (err) {
                console.error(err);
                socket.emit("error", { message: "Message not sent" });
            }
        });
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.user.user_id}`);
        });
    })
}

function socketHandler(io) {
    sendMessage(io);
}

module.exports = socketHandler;
