function Header() {
  return (
    <header>
      <h1>This is a header!</h1>
      <div className="nav-wrapper">
        <nav className="flex flex-wrap mx-auto justify-between p-4 text-blue-500 blue bg-red-600">
          <a href="#" className="brand-logo">
            Logo
          </a>
          <ul className="left hide-on-med-and-down flex">
            <li className="mr-5">
              <a href="#">Home</a>
            </li>
            <li className="mr-5">
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
