import "../../styles/Landing.css";
import { FaArrowDown } from "react-icons/fa6";

import hero1 from '../../assets/images/landing/hero1.jpg';
import hero2 from '../../assets/images/landing/hero2.png';
import hero3 from '../../assets/images/landing/hero3.jpg';


import Login from '../../components/Login';
import SignUp from '../../components/SignUp';
import { useLocation } from 'react-router-dom';

function Hero() {
  const location = useLocation();
  const isHero = location.pathname === '/';
  const isSignUp = location.pathname === '/signup';

  return (
    <div className="hero-section">
      <div className="hero-bg-row">
        <div className="bg-img" style={{ backgroundImage: `url(${hero1})` }}></div>
        <div className="bg-img" style={{ backgroundImage: `url(${hero2})` }}></div>
        <div className="bg-img" style={{ backgroundImage: `url(${hero3})` }}></div>
      </div>

      {isSignUp ? (
        <div className="hero-center">
          <SignUp />
        </div>
      ) : isHero ? (
        <>
          <div className="hero-row">
            <div className="hero-text">
              <h1>Zootopia</h1>
              <p>"A space for your furry friends"</p>
            </div>
            <div className="login-wrapper">
              <Login />
            </div>
          </div>
          <div className="scroll-arrow">
            <FaArrowDown />
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Hero;
