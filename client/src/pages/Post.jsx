import React, { useState, useEffect } from 'react';
import '../styles/Post.css';
import services from '../services/services';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Post = () => {
  const [postData, setPostData] = useState({
    cid: '',
    title: '',
    description: '',
    age: '',
    location: ''
  });
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const userId = auth.user_id;
  // console.log('User:', auth.user_id);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await services.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value, }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please select an image.');
      return;
    }
    // console.log('PostData:', postData);
    // console.log('Selected image:', image);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('cid', postData.cid);
    formData.append('title', postData.title);
    formData.append('description', postData.description);
    formData.append('age', postData.age);
    formData.append('location', postData.location);
    formData.append('userId', userId);

    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }

    try {
      const response = await services.createPost(formData);
      if (response) {
        console.log('Post created successfully:', response);
        alert('Post created successfully!');
        navigate('/explore');
      }
      setPostData({ cid: '', title: '', description: '', age: '' , location: '' });
      setImage(null);

    } catch (error) {
      console.error('Errror:', error);
      alert('Failed to create post.');
    }
  }
  return (
    <div className="post-page">
      <h2>Create New Post</h2>
      <form className="post-form" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="post-form-left">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="post-form-right">
          <select
            name="cid"
            value={postData.cid}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.cid} value={cat.cid}>
                {cat.category_name}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={postData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={postData.description}
            onChange={handleChange}
            required
          >
          </textarea>
          <input
            type="text"
            name="age"
            placeholder="Age"
            value={postData.age}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={postData.location}
            onChange={handleChange}
            required
          />
          <button type="submit">Create Post</button>
        </div>
      </form>
    </div>
  );
};

export default Post;
