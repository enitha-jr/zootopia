import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import services from "../../services/services";
import "../../styles/Category.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Category() {
    const { slug } = useParams();
    // console.log('Category slug:', slug);
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState(null);
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await services.getPosts(slug);
                // console.log('Posts:', data);
                setPosts(data.posts);
                setCategory(data.category);
            }
            catch (error) {
                console.error('Error fetching posts:', error);
            }
        }
        fetchPosts();
    }, [slug])

    const [selectedPost, setSelectedPost] = useState(null);
    const [showpopup, setShowpopup] = useState(false);
    const showDetails = (post) => {
        setSelectedPost(post);
        setShowpopup(true);
    }

    const navigate = useNavigate();
    const handleRedirect = (userId) => {
        navigate(`/profile/${userId}`);
        setShowpopup(false);
    }

    return (
        <div className="explore-container">
            <div className="category-heading">{category?.category_name}</div>
            <div className="category-wrapper">
                {posts.map((post, index) => (
                    <div className="category-card" key={index}>
                        <img src={`${BASE_URL}${post.post_path}`} alt={post.post_title} onClick={() => showDetails(post)} />
                        <p className="category-label">{post.post_title}</p>
                    </div>
                ))}
            </div>
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
                            <div className="popup-seller" onClick={() => handleRedirect(selectedPost.user_id)}> Seller : {selectedPost.username} </div>
                            {selectedPost.user_id !== auth.user_id && (
                                <NavLink
                                    className="contact-button"
                                    to={`/message/${selectedPost.user_id}`}
                                    state={{ username: selectedPost.username }}
                                >
                                    Contact Seller
                                </NavLink>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Category;