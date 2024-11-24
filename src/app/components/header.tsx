import { Bell, UserCircle } from "lucide-react";
import Image from "next/image";

function Header() {
  return (
    <header className="sticky">
      <div className="nav-wrapper">
        <nav className="flex flex-wrap mx-auto justify-between p-4 text-white bg-[#0b5ca6]">
          <div className="brand-logo left">
            <Image
              src="/images/Icon_white.png"
              alt="Icon"
              width={60}
              height={60}
            />
          </div>
          <ul className="left hide-on-med-and-down flex">
            <li className="mr-5">
              <Bell size={32} />
            </li>
            <li className="mr-5">
              <UserCircle size={32} />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
