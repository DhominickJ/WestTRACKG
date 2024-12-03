import { Bell, UserCircle } from "lucide-react";
import Image from "next/image";

function Header( _type: any ) {
  return (
    <header>
      <div className="nav-wrapper h-12">
        <nav className="flex flex-wrap align-middle justify-between p-4 text-white bg-[#0b5ca6]">
          <div className="brand-logo left">
            <Image
              src="/images/Icon_white.png"
              alt="Icon"
              width={40}
              height={40}
              color="#f5f5f"
            />
          </div>
          <div className="mt-[-4px]">
          <ul className="left hide-on-med-and-down flex">
            <li className="mr-5">
              <Bell size={28} color="#f5f5f5" />
            </li>
            <li className="mr-5">
              <UserCircle size={28} color="#f5f5f5"/>
            </li>
          </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
