import React from 'react'
import NavbarOne from '../../components/Navbar'
import "../../styles/Landing.css"
import { NavLink } from 'react-router-dom'

import dog1 from '../../assets/images/landing/dog1.jpg'
import cat1 from '../../assets/images/landing/cat1.jpg'
import cow1 from '../../assets/images/landing/cow1.jpg'
import bird1 from '../../assets/images/landing/bird1.jpg'

import Hero from './Hero'
import hero4 from "../../assets/images/landing/hero4.jpeg"


function Landing() {

  return (
    <div className="landing-page">
      <div className="navbarone-wrapper">
        <NavbarOne />
      </div>
      <div className="scroll-container">
        <div className="section">
          <Hero />
        </div>

        <div className="section second-section">
          <div>Find Your Fur-Ever Friend</div>
          <div className="second-section-imgholder">
            <NavLink to="/explore/dogs" className="second-section-imgbox">
              <img src={dog1} alt="DOGS" />
              <p className="section-img-label">Dogs</p>
            </NavLink>
            <NavLink to="/explore/cats" className="second-section-imgbox">
              <img src={cat1} alt="CATS" />
              <p className="section-img-label">Cats</p>
            </NavLink>
            <NavLink to="/explore/cows" className="second-section-imgbox">
              <img src={cow1} alt="COWS" />
              <p className="section-img-label">Cows</p>
            </NavLink>
            <NavLink to="/explore/birds" className="second-section-imgbox">
              <img src={bird1} alt="BIRDS" />
              <p className="section-img-label">Birds</p>
            </NavLink>
          </div>
          <div className="section-explore">
            <p>“A Family Member Waiting for You”</p>
            <NavLink to="/explore" className="explore-link">
              Explore
            </NavLink>
          </div>
        </div>

        <div className="section third-section">
          <div className="third-section-imholder">
            <img src={hero4} alt="Hero Image" className="third-section-img" />
          </div>
          <div className="section-explore">
            <p>500+ Happy Homes</p>
            <p>1000+ Lives Made Better</p>
            <NavLink to="/explore" className="explore-link">
              Explore
            </NavLink>
          </div>
        </div>

        <div className="section fourth-section">
          <div className="section-card-holder">
            <div className="section-card">
              <div>Explore creative interior design ideas from top designers around the world.</div>
            </div>
            <div className="section-card">
              <div><p>Let your designs speak to the world.</p> <p>Showcase your creativity and captivate a global audience.</p></div>
            </div>
            <div className="section-card">
              <div>
                <p>Like and save your favorite designs.</p>
                <p>Collaborate with inspiring designers across the globe.</p></div>
            </div>
          </div>
          <div className="section-explore">
            <hr/>
            <p>Discover. Inspire. Connect.</p>
            <NavLink to="/explore" className="explore-link">
              Explore
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
