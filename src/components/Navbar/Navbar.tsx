import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="mb-4">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-xxl">
          <Link to="/" className="navbar-brand">
            Finance Tracker
          </Link>
          <div className="navbar-nav flex-row gap-2 flex-nowrap">
            <Link to="/categories" className="nav-link">
              Categories
            </Link>
            <button className="nav-link">Add</button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;