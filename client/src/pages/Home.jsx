import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-1/4">
        <h1 className="p-2 text-xl font-bold text-center">Sign up</h1>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            className="p-4 border rounded bg-slate-100"
            placeholder="Username"
          />

          <input
            type="password"
            className="p-4 border rounded bg-slate-100"
            placeholder="Password"
          />
          <button className="p-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
            Sign up
          </button>
          <p>
            Already have an account?{' '}
            <Link to={'signin'} className="text-blue-500 mx-2 hover:underline">
              sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
