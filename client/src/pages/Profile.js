import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const photoRef = useRef(null);

  const [photo, setPhoto] = useState(undefined);
  const [uploadedPercentage, setUploadedPercentage] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [formData, setFormData] = useState({});

  const handlePhotoUpload = (photo) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + photo.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, photo);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadedPercentage(Math.round(progress));
      },
      (error) => {
        setUploadError(error.message);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  useEffect(() => {
    if (photo) {
      handlePhotoUpload(photo);
    }
  }, [photo]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-center my-10">Profile</h1>

      <input type="file" ref={photoRef} className="hidden" accept="image/*" id="photo" onChange={handleFileChange} />
      <form className="flex flex-col gap-4">
        <img
          src={formData.avatar || currentUser.avatar}
          onClick={() => photoRef.current.click()}
          alt="profile"
          className="rounded-full w-20 h-20 object-cover cursor-pointer self-center"
        />

        <p className="self-center text-sm">
          { uploadError ? "Error uploading photo" :
            uploadedPercentage > 0 && uploadedPercentage < 100
            ? `Uploading ${uploadedPercentage}%`
            : uploadError
            ? uploadError
            : " "}
        </p>

        <input
          type="username"
          placeholder="Username"
          className="border rounded-lg px-3 py-2 focus:outline-none self-center mt-3"
          id="username"
          autoComplete="off"
        />

        <input
          type="email"
          placeholder="Email"
          className="border rounded-lg px-3 py-2 focus:outline-none self-center mt-3"
          id="email"
          autoComplete="off"
        />

        <input
          type="password"
          placeholder="Password"
          className="border rounded-lg px-3 py-2 focus:outline-none self-center mt-3"
          id="password"
          autoComplete="off"
        />

        <button className="bg-slate-700 text-white rounded-lg px-3 py-2 uppercase hover:opacity-95 disabled:opacity-80 w-52 self-center mt-3">
          Update
        </button>
      </form>

      <div className="flex flex-col justify-center items-center mt-5">
        <span className="text-red-700 cursor-pointer hover:underline">Delete account</span>

        <span className="text-red-700 cursor-pointer hover:underline mt-3">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
