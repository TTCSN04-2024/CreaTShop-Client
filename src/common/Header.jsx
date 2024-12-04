import React from "react";
import {Link, NavLink} from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow fixed w-full z-10">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <Link to={'/'} className="text-2xl font-bold" style={{fontFamily: "cursive"}}>
            CreaT
          </Link>
          <ul className="flex space-x-4">
            <Link className="relative group inline-block hover:underline hover:transition-all hover:text-slate-500">About</Link>
            <Link className="relative group inline-block ">
              <Link className="hover:underline hover:transition-all hover:text-slate-500">Men</Link>
              <ul className="absolute left-0 mt-2 w-48 bg-white rounded shadow-lg hidden group-hover:block">
                <li className="px-4 py-3 hover:bg-blue-500 hover:text-white">
                  <Link to={"/profile"}>Shoe-1</Link>
                </li>
                <li className="px-4 py-3 hover:bg-blue-500 hover:text-white">
                  <Link to={"/profile"}>Shoe-2</Link>
                </li>
              </ul>
            </Link>
            <Link className="relative group inline-block hover:underline hover:transition-all hover:text-slate-500">Women</Link>
            <Link className="relative group inline-block hover:underline hover:transition-all hover:text-slate-500">Kids</Link>

          </ul>
          <div className="">
            <input type="text" placeholder="Search...." className="border-2 border-gray-300 rounded-md py-2 px-4 w-full" />
          </div>
          <div>
            <NavLink to={'/login'}>Login</NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
