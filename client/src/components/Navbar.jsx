import { NavLink } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import "../styles/Navbar.css"
import { useDispatch } from 'react-redux'
import { setAuth } from '../store/authSlice';
function Navbar({ isLoggedin }) {

  const location = useLocation();
  const isLanding = location.pathname === '/';
  // const isExplore = location.pathname === '/explore';

  return (
    <div className="navbarone">
      <div className="navbar-left">
        <NavLink
          to="/"
          className="logo">
          DecorSphere
        </NavLink>
        <NavLink
          to="/explore"
          end
          className={({ isActive }) =>
            isActive ? 'nav-explore active' : 'nav-explore'
          }
        >
          Explore
        </NavLink>
      </div>
      <div className="navbar-right">
        {
          !isLanding && (
            <input
              type="text"
              className="nav-search"
              placeholder="Search decor ideas..." />
          )
        }
        <>
          <NavLink
            to="/"
            className="nav-login">
            Log in
          </NavLink>
          <NavLink
            to="/signup"
            className="nav-signup">
            Sign up
          </NavLink>
        </>
      </div>
    </div>
  )
}

export default Navbar
