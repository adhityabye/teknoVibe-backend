"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Logo from "../../../public/assets/logo-white.svg";
import { HiUser } from "react-icons/hi2";

export default function Navbar({ cari, ajukan }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.refresh();
      router.push("/");
    } else {
      setUser(JSON.parse(localStorage.getItem("user") || "{}"));
    }

    const checkToken = () => {
      try {
        const token = Cookies.get("token");
        setIsLoggedIn(!!token);
      } catch (error) {
        console.error("Error message: " + error);
      }
    };

    checkToken();
  }, []);

  const handleSignOut = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className="min-w-full fixed top-0 z-40 bg-purple-200 border-gray-200 h-16">
      <div className="max-w-screen-xl h-full flex flex-wrap items-center justify-between mx-auto px-10">
        <div>
          <Link className="flex items-center gap-4" href="/">
            <Image src={Logo} className="w-11" alt="TeknoVibe Logo" />
            <span className="text-2xl font-bold text-white-100">TeknoVibe</span>
          </Link>
        </div>
        <div className="relative flex md:order-2">
          {isLoggedIn ? (
            <div className="relative w-full">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex space-x-2 text-white-100 focus:outline-none font-medium py-2"
              >
                <HiUser className="w-6 h-6" />
                <span className="ml-2">Akun</span>
              </button>
              {showDropdown && (
                <div
                  className="fixed z-40 w-[150px] top-16 right-28 bg-[#7F72FF] shadow-2xl rounded-md p-2"
                  onClick={() => setShowDropdown(false)}
                >
                  <button
                    onClick={() => {
                      router.push("/profile/" + user._id);
                      setShowDropdown(false);
                    }}
                    className="w-full px-2 py-1.5 hover:bg-[#8B7EFF] text-white-100 rounded-md text-left"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setShowDropdown(false);
                    }}
                    className="w-full px-2 py-1.5 hover:bg-[#8B7EFF] text-white-100 rounded-md text-left"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth/signin">
              <button
                type="button"
                className="text-black bg-white-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 hover:bg-button-dark hover:text-white"
              >
                Masuk
              </button>
            </Link>
          )}
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li className="group hover:bg-black/30">
              <a
                href="/#tentang"
                className="block py-2 pl-3 pr-4 text-white-100 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-3 md:mt-2"
              >
                Tentang
              </a>
              {/* <div className="hidden group-hover:block self-end h-1 mt-1 w-full bg-white"/> */}
              <div className="block group-hover:hidden self-end h-1 mt-1 w-full bg-purple-200"/>
            </li>
            <li className="group hover:bg-black/30">
              <a
                href="/#panduan"
                className="block py-2 spl-3 pr-4 text-white-100 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-3 md:mt-2"
              >
                Panduan
              </a>
              <div className="block group-hover:hidden self-end h-1 mt-1 w-full bg-purple-200"/>

              {/* <div className="hidden group-hover:block self-end h-1 mt-1 w-full bg-white"/> */}
            </li>
            <li className="group hover:bg-black/30">
              <a
                href="/search"
                className="block py-2 pl-3 pr-4 text-white-100 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-3 md:mt-2"
              >
                Cari Event
              </a>
              {/* <div className="hidden group-hover:block self-end h-1 mt-1 w-full bg-white"/> */}
              {
                cari && 
                  <div className="block self-end h-1 mt-1 w-full bg-white"/> 
              }
              {/* {
                ajukan &&
                <div className="block  self-end h-1 w-full bg-transparent"/>
              } */}
              {/* <div className={`self-end h-1 w-full bg-white${
                {cari}? 'block' : 'hidden'
              }
                `}/> */}
            </li>
            <li className="group hover:bg-black/30">
              <a
                href="/addEvent"
                className="block py-2 pl-3 pr-4 text-white-100 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-3 md:mt-2"
              >
                Ajukan Event
              </a>
              {
                ajukan && 
                  <div className="block self-end h-1 mt-1 w-full bg-white"/> 
              }
              {/* <div className={`self-end h-1 w-full bg-white${
                {ajukan}? 'block' : 'hidden'
              }
                `}/> */}
              {/* {
                cari &&
                <div className="block  self-end h-1 w-full bg-purple-200"/>
              } */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
