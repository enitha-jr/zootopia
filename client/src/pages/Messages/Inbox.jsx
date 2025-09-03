import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import messageServices from '../../services/messageServices';
import "../../styles/Message.css";

const Inbox = () => {
    const [inboxUsers, setInboxUsers] = useState([]);
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await messageServices.getInboxUsers();
                setInboxUsers(data);
            } catch (error) {
                console.error("Error fetching inbox users:", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="inbox-container">
            <p> Inbox * {auth.username} *</p>
            <div className="inbox-list">
                {inboxUsers.length > 0 ? (
                    inboxUsers.map((inboxItem) => (
                        <NavLink
                            to={`/message/${inboxItem.user_id}`}
                            state={{ username: inboxItem.username }}
                            key={inboxItem.user_id}
                            className={({ isActive }) =>
                                isActive ? "inbox-item active" : "inbox-item"
                            }
                        >
                            {inboxItem.username}
                        </NavLink>
                    ))
                ) : (
                    <div className="no-messages">No messages found</div>
                )}
            </div>
        </div>
    );
};

export default Inbox;
