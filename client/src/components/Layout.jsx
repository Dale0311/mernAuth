import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Layout() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <nav className="bg-slate-400">
        <div className="flex justify-between items-center w-4/5 mx-auto p-4">
          <NavLink className="text-xl font-bold" to=".">
            Auth App
          </NavLink>
          <ul className="flex space-x-8 items-center">
            <li>
              <NavLink to=".">Home</NavLink>
            </li>
            <li>
              <NavLink to="about">About</NavLink>
            </li>
            <li>
              <NavLink to="profile">
                {currentUser ? (
                  <img
                    src={`${currentUser.photo}`}
                    alt={`Photo of ${currentUser.displayName}`}
                    className="h-10 w-10 object-cover rounded-full"
                  />
                ) : (
                  'Sign in'
                )}
              </NavLink>
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
