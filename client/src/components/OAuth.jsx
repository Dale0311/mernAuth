import { app } from '../config/firebase';
import axios from 'axios';
import { signInSuccess } from '../features/users/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const handleClick = async () => {
    const res = await signInWithPopup(auth, provider);
    const randomNum = Math.floor(Math.random() * 1000);
    const displayName =
      res.user.displayName.split(' ').join('').toLowerCase() + randomNum;
    const password = Math.random().toString(36).slice(-8);
    const newUser = {
      displayName,
      username: res.user.email,
      password,
      photo: res.user.photoURL,
    };
    try {
      const data = await axios.post('/api/auth/google', newUser);
      dispatch(signInSuccess(data.data));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="p-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300"
      onClick={handleClick}
    >
      Sign in with Google
    </button>
  );
}

export default OAuth;
