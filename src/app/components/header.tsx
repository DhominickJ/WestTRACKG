import {
  Bell,
  FilesIcon,
  HomeIcon,
  PackageIcon,
  UploadCloud,
  UserCircle,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from 'react';

function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setIsVisible(false); // Hide header on scroll down
      } else {
        setIsVisible(true); // Show header on scroll up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);


  return (
    <header
    className={`sticky top-0 z-50 transition-transform duration-100 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="nav-wrapper z-10">
        <nav className="flex flex-wrap align-middle justify-between p-4 text-white bg-[#0b5ca6]">
          <div className="brand-logo left">
            <Image
              src="/images/Icon_white.png"
              alt="Icon"
              width={60}
              height={60}
              color="#f5f5f"
            />
          </div>
          <ul className="left hide-on-med-and-down flex">
            <li className="w-[100px] mr-10 flex items-center">
              <a href="/sign-in" className="flex items-center space-x-3">
                <UserCircle size={32} />
                <span>Sign in</span>
              </a>
            </li>
          </ul>          
        </nav>
      </div>
    </header>
  );
}

export default Header;
