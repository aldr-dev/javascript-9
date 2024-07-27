import {NavLink} from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="mb-4">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-xxl">
          <NavLink to="/" className="navbar-brand">
            Finance Tracker
          </NavLink>
          <div className="navbar-nav flex-row gap-2 flex-nowrap">
            <NavLink to="/categories" className="nav-link">
              Categories
            </NavLink>
            <button className="nav-link">Add</button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;