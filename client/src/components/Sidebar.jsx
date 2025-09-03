import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css'; // Make sure this path is correct
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

import { MdOutlineExplore } from "react-icons/md";
import { TbOctagonPlus } from "react-icons/tb";
import { BsPersonCircle } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { FaClinicMedical } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { TbMessage } from "react-icons/tb";
import { ImSearch } from "react-icons/im";
import { disconnectSocket } from "../socketio/connectSocket";


function Sidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = useSelector((state) => state.auth);
    const userId = auth.user_id;

    const handleLogOut = () => {
        dispatch(setAuth({}));
        disconnectSocket();
        navigate('/');
    };

    return (
        <div className="sidebar">
            <div className="sidebar-list">
                <div className="tooltip">
                    <NavLink to="/explore" className="sidebar-link"><MdOutlineExplore /></NavLink>
                    <span className="tooltip-text">Explore</span>
                </div>
                <div className="tooltip">
                    <NavLink to="/post" className="sidebar-link"><TbOctagonPlus /></NavLink>
                    <span className="tooltip-text">New Post</span>
                </div>
                <div className="tooltip">
                    <NavLink to={`/profile/${userId}`} className="sidebar-link"><BsPersonCircle /></NavLink>
                    <span className="tooltip-text">Profile</span>
                </div>
                <div className="tooltip">
                    <NavLink to="/clinic" className="sidebar-link"><FaClinicMedical /></NavLink>
                    <span className="tooltip-text">Clinic</span>
                </div>
                <div className="tooltip">
                    <NavLink to="/message" className="sidebar-link"><TbMessage /></NavLink>
                    <span className="tooltip-text">Messages</span>
                </div>
                <div className="tooltip">
                    <NavLink to="/chatbot" className="sidebar-link"><LuSend /></NavLink>
                    <span className="tooltip-text">Chatbot</span>
                </div>
                <div className="tooltip">
                    <NavLink to="/search" className="sidebar-link"><ImSearch /></NavLink>
                    <span className="tooltip-text">Search</span>
                </div>
                <div className="tooltip">
                    <div className="sidebar-link" onClick={handleLogOut}><BiLogOut /></div>
                    <span className="tooltip-text">Logout</span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
