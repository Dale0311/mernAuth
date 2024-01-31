import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
function Layout() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <nav className="bg-slate-400">
        <div className="flex justify-between items-center w-4/5 mx-auto p-4">
          <h1 className="text-xl font-bold">Auth App</h1>
          <ul className="flex space-x-8">
            <li>
              <NavLink to=".">Home</NavLink>
            </li>
            <li>
              <NavLink to="about">About</NavLink>
            </li>
            <li>
              <NavLink to="signin">Signin</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
      <footer className="py-8 px-4 bg-zinc-700 text-white flex justify-center">
        <p>All rights are reserved</p>
      </footer>
    </div>
  );
}

export default Layout;
