import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "../api/signin-auth";
import { onAuthStateChanged, User } from "firebase/auth";
import { db } from "@/lib/firebase";
import { query, getDocs, collection, where } from "firebase/firestore";

function Header({ onSearch }: { onSearch: (query: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<
    { id: string; title: string; status: string; time: string }[]
  >([]);

  const [user, setUser] = useState<User | null>(null);

  const fetchNotifications = async () => {
    try {
      const q = query(
        collection(db, "processing"),
        where("userId", "==", user?.uid)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        filename: doc.data().fileName,
        status: doc.data().status,
        time: doc.data().time,
      }));
      setNotifications(
        data.map((item) => ({
          id: item.id,
          title: item.filename,
          status: item.status,
          time: item.time,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

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
            <button
              onClick={() => {
                if (user) {
                  fetchNotifications();
                  setNotificationsOpen(!notificationsOpen);
                }
              }}
            >
              <Bell size={28} color="#0f0f0f" className="relative" />
            </button>
            {notificationsOpen && (
              <div className="notification-center absolute right-20 top-0 mt-20 w-[30rem] bg-white border border-gray-200 rounded-md">
                <h2 className="px-4 py-2 text-lg font-semibold">
                  Notifications
                </h2>
                <ul className="max-h-64 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((doc) => (
                      <li key={doc.id} className="px-4 py-2 border-t">
                        <p className="font-medium">{doc.title}</p>
                        <div className="flex flex-row items-center justify-around">
                          <p className="text-sm text-gray-600">
                            Last Update: {doc.time}
                          </p>
                          <p className="text-sm text-gray-600">
                            Status: {doc.status}
                          </p>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p className="px-4 py-2 text-gray-500">No notifications</p>
                  )}
                </ul>
              </div>
            )}
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
