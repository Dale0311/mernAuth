import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { requestConfig } from '../config/axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  signInError,
  signInStart,
  signInSuccess,
} from '../features/users/userSlice';
import axios from 'axios';

function SignIn() {
  const [form, setForm] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  console.log(loading);
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
      dispatch(signInStart);
      const data = await axios.post(
        `http://localhost:5500/signin`,
        form,
        requestConfig
      );
      dispatch(signInSuccess(data.data));
      navigate('/');
    } catch (err) {
      dispatch(signInError(err));
      setForm((oldForm) => ({ ...oldForm, password: '' }));
    }
  };
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-1/4">
        <h1 className="p-2 text-xl font-bold text-center">Sign In</h1>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <span className="text-red-500 text-sm">{error ? 'Error' : ''}</span>
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
            {loading ? 'Loading' : 'Sign in'}
          </button>
          <p>
            Don't have an account?{' '}
            <Link to={'/signup'} className="text-blue-500 mx-2 hover:underline">
              sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
