import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { updateCurrentUser } from '../features/users/userSlice';
import axios from 'axios';
import { requestConfig } from '../config/axios';
import { useParams, useNavigate } from 'react-router-dom';

// need to perform middleware auth instead of doing this bs code

function Profile() {
  // variables
  const [currentProfile, setCurrentProfile] = useState('');
  const [editActive, setEditActive] = useState(false);
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(currentProfile.displayName);
  const imageRef = useRef(null);
  const dispatch = useDispatch();
  const { username } = useParams();

  if (!username) {
    console.log('no username');
  }
  useEffect(() => {
    const fetchUserData = async () => {
      const res = await axios.get(`http://localhost:5500/${username}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(res.data);
      setCurrentProfile(res.data);
    };
    fetchUserData();
  }, []);

  const handleImageClick = () => {
    imageRef.current.click();
  };
  const handleClickEdit = () => {
    setEditActive((val) => !val);
    setDisplayName(currentProfile.displayName);
  };
  const handleChangeDisplayName = (e) => {
    const { value } = e.target;
    setDisplayName(value);
  };
  const handleClickSave = async () => {
    console.log('yey');
    // const toUpdateUser = { id: currentUser._id, displayName };
    // try {
    //   const res = await axios.put(
    //     `http://localhost:5500/${username}/update`,
    //     toUpdateUser,
    //     requestConfig
    //   );
    //   dispatch(updateCurrentUser(res.data));
    //   navigate(`/${currentUser.username}`);
    //   setEditActive(false);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/4 border  rounded">
        <div className="flex space-x-4 items-center py-4">
          <input
            type="file"
            accept="image/*"
            ref={imageRef}
            className="hidden"
          />
          <img
            src={`${currentProfile?.photo}`}
            alt={`Photo of ${currentProfile?.displayName}`}
            className="rounded-full object-cover cursor-pointer"
            onClick={handleImageClick}
          />
          <div className="flex flex-col">
            {editActive ? (
              <div>
                <input
                  type="text"
                  className="text-2xl font-bold border rounded"
                  name="displayName"
                  value={displayName}
                  onChange={(e) => handleChangeDisplayName(e)}
                />
              </div>
            ) : (
              <div>
                <h1 className="text-2xl font-bold">
                  {currentProfile?.displayName}
                </h1>
                <h3 className="text-sm ">{currentProfile?.username}</h3>
              </div>
            )}

            <div className="flex items-center mt-2 space-x-2">
              {editActive ? (
                <>
                  <button
                    className="py-1 px-3 hover:bg-red-600 bg-red-500 text-white rounded"
                    onClick={handleClickEdit}
                  >
                    cancel
                  </button>
                  <button
                    className="py-1 px-3 hover:bg-blue-600 bg-blue-500 text-white rounded disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:bg-blue-500"
                    disabled={!displayName}
                    onClick={handleClickSave}
                  >
                    save
                  </button>
                </>
              ) : (
                <>
                  <FaRegEdit
                    className="hover:text-blue-500 text-xl cursor-pointer"
                    onClick={handleClickEdit}
                  />
                  <MdDeleteOutline className="hover:text-red-500 text-2xl cursor-pointer" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
