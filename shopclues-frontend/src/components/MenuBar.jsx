import React from "react";
import { Link, NavLink } from "react-router-dom";

const MenuBar = () => {
  return (
    <header>
      <nav className="bg-slate-800 py-4">
      <div className="container">
        <div className="flex items-center justify-between text-gray-200">
          <div className="">
            <Link to="/">
                <img
                className="mx-auto h-6 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <ul className="flex items-center gap-3">
              <li>
                <NavLink to="/" 
                  className={({isActive}) => 
                    `text-gray-200 text-base rounded py-1 px-3 font-medium ${ isActive ? 'bg-slate-700' : 'bg-transparent' } hover:bg-slate-700`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about"
                  className={({isActive}) => 
                    `text-gray-200 text-base rounded py-1 px-3 font-medium ${ isActive ? 'bg-slate-700' : 'bg-transparent' } hover:bg-slate-700`
                  }>
                  About
                </NavLink>
              </li>
            </ul>
            <ul className="flex items-center gap-3">
              <li>
                <NavLink to="/login"
                  className={({isActive}) => 
                    `text-gray-200 text-base rounded py-1 px-3 font-medium ${ isActive ? 'bg-slate-700' : 'bg-transparent' } hover:bg-slate-700`
                  }>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register"
                  className={({isActive}) => 
                    `text-gray-200 text-base rounded py-1 px-3 font-medium ${ isActive ? 'bg-slate-700' : 'bg-transparent' } hover:bg-slate-700`
                  }>
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </nav>
    </header>
  );
};

export default MenuBar;
