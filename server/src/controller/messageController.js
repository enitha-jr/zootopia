const db = require("../utils/connectdb");

class messageController {

    getMessage = async (req, res) => {
        const sender_id = req.user.user_id;
        const receiver_id = req.params.receiver_id;
        try {
            const query = "select * from messages where (sender_id = ? and receiver_id = ?) or (sender_id = ? and receiver_id = ?) order by created_at ASC";
            const [messages] = await db.query(query, [sender_id, receiver_id, receiver_id, sender_id]);
            res.json(messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
            res.status(500).json({ error: err.message });
        }
    }

    getInboxUsers = async (req, res) => {
        const user_id = req.user.user_id;
        try {
            const query = `
                SELECT 
                    u.user_id,
                    u.username
                FROM messages m
                JOIN users u 
                    ON u.user_id = CASE 
                                    WHEN m.sender_id = ? THEN m.receiver_id
                                    ELSE m.sender_id
                                END
                WHERE m.sender_id = ? OR m.receiver_id = ?
                GROUP BY u.user_id, u.username
                ORDER BY MAX(m.created_at) DESC
            `;

            const [inboxUsers] = await db.query(query, [user_id, user_id, user_id]);

            res.status(200).json(inboxUsers);

        } catch (error) {
            console.error("Error fetching inbox users:", error);
            res.status(500).json({ error: error.message });
        }
    };

}


module.exports = new messageController();