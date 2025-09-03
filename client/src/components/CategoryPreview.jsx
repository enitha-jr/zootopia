import React from 'react';
import "../styles/CategoryPreview.css";
import { NavLink } from 'react-router-dom';
import { useState,useEffect } from 'react';
import services from "../services/services";

function CategoryPreview() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try{
        const data = await services.getCategories();
        // const data = await response.json();
        // console.log('Categories fetched:', data);
        setCategories(data);
      }
      catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  },[])

  return (
    <div>
      <div className="category-heading">Explore By Categories</div>
      <div className="category-wrapper">
        {categories.map((category, index) => (
          <NavLink to={`${category.slug}`} key={index}>
            <div className="category-card">
              <img src={`${BASE_URL}/${category.image_path}`} alt={category.category_name} />
              <p className="category-label">{category.category_name}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default CategoryPreview;
