import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "../api/signin-auth";
import { onAuthStateChanged, User } from "firebase/auth";

function Header({ onSearch }: { onSearch: (query: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <header>
      <div className="nav-wrapper">
        <nav className="flex items-center justify-between h-14 p-4 text-black bg-background">
          <Link href={"/users/home"} className="cursor-pointer">
            <div className="flex items-center mr-auto">
              <Image
                src="/Graphics/icon.svg"
                alt="Icon"
                width={40}
                height={40}
                className="ml-5"
              />
              <h1 className="ml-8 mt-1 font-[Mayor] text-[hsl(var(--primary-color))] text-[22px]">
                West
              </h1>
              <h1 className="ml-0 mt-1 font-[Mayor] text-[hsl(var(--accent-color))] text-[22px]">
                Track
              </h1>
            </div>
          </Link>

          <div className="flex items-center space-x-5 ml-auto mr-5">
            <form
              onSubmit={handleSearchSubmit}
              className="flex justify-center items-center"
            >
              <div className="search-container">
                <input
                  type="search"
                  name="q"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="w-[440px] h-9 pl-4 rounded-[40px] mr-12 bg-westTrackGray outline-none pr-4 align-middle border-[1px] border-gray"
                />
              </div>
            </form>
            <Link href={""}>
              <ul className="flex space-x-5 items-center cursor-pointer">
                <li>
                  <Bell size={28} color="#0f0f0f" />
                </li>
              </ul>
            </Link>
            <div className="relative">
              {user ? (
                <div className="flex items-center space-x-3 cursor-pointer relative">
                  <Image
                    src={user?.photoURL ?? "/icons/op.png"}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle"
                      onClick={() => {
                        setDropdownOpen(!dropdownOpen);
                      }}
                    >
                      ▼
                    </button>
                    {dropdownOpen && (
                      <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                        <Link href="/profile">
                          <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Profile
                          </p>
                        </Link>
                        <Link href="/settings">
                          <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Settings
                          </p>
                        </Link>
                        <button
                          onClick={() => signOut()}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Link href="/sign-in">
                  <button className="login-button">Login</button>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
