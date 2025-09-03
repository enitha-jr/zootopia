import React from 'react'
import { useState, useEffect } from 'react';
import services from '../services/services';
import '../styles/Profile.css';
import petsbanner from "../assets/images/petsbanner1.jpg";
import { TbSend2 } from "react-icons/tb";
import { useParams, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { IoCloseCircleOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Profile = () => {

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [userDetails, setUserDetails] = useState([]);
  const [posts, setPosts] = useState([]);
  const { userId } = useParams();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // console.log('Fetching user details');
        const response = await authService.getUser(userId);
        setUserDetails(response);
        console.log('User details:', response);
      }
      catch {
        console.error('Error fetching user details:', error);
      }
    }
    fetchUserDetails();
  }, [userId]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await services.getUserPosts(userId);
        setPosts(response.posts);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  const [selectedPost, setSelectedPost] = useState(null);
  const [showpopup, setShowpopup] = useState(false);
  const showDetails = (post) => {
    setSelectedPost(post);
    setShowpopup(true);
  }

  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate(`/message/${userDetails.user_id}`);
    setShowpopup(false);
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-left">
          <div className="profile-details">
            <p className="profile-username">{userDetails.username}
              {
                auth.user_id !== userDetails.user_id && (
                  <TbSend2 className="chat-icon" onClick={handleRedirect} />
                )
              }
            </p>
            <p className="profile-info">{userDetails.email}</p>
            <p className="profile-info">{userDetails.location}</p>
          </div>
        </div>
        <div className="profile-right">
          <img src={petsbanner} alt="Pets Banner" className="profile-banner" />
        </div>
      </div>

      <hr className="divider" />

      <div className="profile-posts">
        <p className="profile-posts-title">Your Posts</p>
        {!posts || posts.length === 0 ? (
          <p className="no-posts-message">Haven't posted anything yet.</p>
        ) : (
          <div className="profile-posts-grid">
            {posts.map((post, index) => (
              <div className="profile-post-card" key={index}>
                <img src={`${BASE_URL}${post.post_path}`} alt={post.post_title} onClick={() => showDetails(post)} />
                <p className="post-label">{post.post_title}</p>
              </div>
            ))}
            {showpopup && (
              <div className="details-content">
                <div className="overlay" onClick={() => setShowpopup(false)}></div>
                <div className="details-popup-container">
                  <div className="popup-image-wrapper">
                    <img src={`${BASE_URL}${selectedPost.post_path}`} alt={selectedPost.post_title} className="popup-image" />
                  </div>
                  <span className="popup-close" onClick={() => setShowpopup(false)}><IoCloseCircleOutline /></span>
                  <div className="popup-right-side">
                    <div>

                      <p>{selectedPost.post_title}</p>
                      <div className="popup-description"> {selectedPost.post_description}</div>
                    </div>
                    <div>
                      <div className="popup-detail"> Age : {selectedPost.age} </div>
                      <div className="popup-detail"> Location : {selectedPost.location} </div>
                    </div>
                    {selectedPost.user_id !== auth.user_id && (
                      <NavLink
                        className="contact-button"
                        to={`/message/${selectedPost.user_id}`}
                        state={{ username: userDetails.username }}
                      >
                        Contact Seller
                      </NavLink>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>

  )
}

export default Profile