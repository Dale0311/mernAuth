import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { requestConfig } from '../config/axios';
import axios from 'axios';

function Home() {
  // next is loaders
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((oldForm) => {
      return { ...oldForm, [id]: value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`http://localhost:5500/`, form, requestConfig);
      setLoading(false);
      setErr('');
      navigate('signin');
    } catch (error) {
      setErr(error.response.data.message);
      setForm((oldForm) => ({ ...oldForm, password: '' }));
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-1/4">
        <h1 className="p-2 text-xl font-bold text-center">Sign up</h1>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <span className="text-red-500 text-sm">{err ?? ''}</span>
            <input
              type="text"
              className="p-4 border rounded bg-slate-100"
              placeholder="Username"
              id="username"
              value={form.username}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <input
            type="password"
            className="p-4 border rounded bg-slate-100"
            placeholder="Password"
            id="password"
            value={form.password}
            onChange={(e) => handleChange(e)}
          />
          <button
            disabled={!form.username || !form.password}
            className="p-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300"
            onClick={(e) => handleSubmit(e)}
          >
            {loading ? 'Loading' : 'Sign up'}
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
