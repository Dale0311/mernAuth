import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const imageRef = useRef(null);
  const handleImageClick = () => {
    imageRef.current.click();
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
            src={`${currentUser.photo}`}
            alt={`Photo of ${currentUser.displayName}`}
            className="rounded-full object-cover cursor-pointer"
            onClick={handleImageClick}
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">{currentUser.displayName}</h1>
            <h3 className="text-sm ">{currentUser.username}</h3>
            <div className="flex items-center mt-2">
              <FaRegEdit className="hover:text-blue-500 text-xl cursor-pointer" />
              <MdDeleteOutline className="hover:text-red-500 text-2xl cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
