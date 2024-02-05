import { app } from '../config/firebase';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
function OAuth() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const handleClick = async () => {
    const res = await signInWithPopup(auth, provider);
    // create a new user here
    // error: A non-serializable value was detected in an action, in the path: `register`. Value:
    // create a endpoint @server
    console.log(res);
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
