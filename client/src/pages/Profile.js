import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../firebase";
import { updatedUser } from "../redux/userSlice";

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const photoRef = useRef(null);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [photo, setPhoto] = useState(undefined);
  const [uploadedPercentage, setUploadedPercentage] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [formData, setFormData] = useState({
    username: currentUser?.username,
    email: currentUser?.email,
    avatar: currentUser?.avatar,
    password: currentUser?.password,
  });

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

  const handleDataChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit=async(e) => {
    
    e.preventDefault();
    try {
      console.log("clicked")
      const res=await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(formData),
      });

      const data=await res.json();
      if (data.success !== false) dispatch(updatedUser(data));
      else dispatch(updatedUser(data.error.message));
    } catch (error) {
      console.log(error.message)
      dispatch(updatedUser(error.message));
    }
  }

  const handleDeleteAccount = async () => {
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success !== false) {
        dispatch(updatedUser(null));
        navigate("/login")
      } else {
        dispatch(updatedUser(data.error.message));
      }
    } catch (error) {
      dispatch(updatedUser(error.message));
    }
  }

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success !== false) {
        dispatch(updatedUser(null));
        navigate("/login");
      } else {
        dispatch(updatedUser(data.error.message));
      }
    } catch (error) {
      dispatch(updatedUser(error.message));
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-center my-10">Profile</h1>

      <input type="file" ref={photoRef} className="hidden" accept="image/*" id="photo" onChange={handleFileChange} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <img
          src={formData?.avatar || currentUser?.avatar}
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
          defaultValue={currentUser?.username}
          onChange={handleDataChange}
        />

        <input
          type="email"
          placeholder="Email"
          className="border rounded-lg px-3 py-2 focus:outline-none self-center mt-3"
          id="email"
          autoComplete="off"
          defaultValue={currentUser?.email}
          onChange={handleDataChange}
        />

        <input
          type="password"
          placeholder="Password"
          className="border rounded-lg px-3 py-2 focus:outline-none self-center mt-3"
          id="password"
          autoComplete="off"
          onChange={handleDataChange}
        />

        <button className="bg-slate-700 text-white rounded-lg px-3 py-2 uppercase hover:opacity-95 disabled:opacity-80 w-52 self-center mt-3">
          Update
        </button>

        <Link to="/create-listing" className="bg-slate-700 text-white rounded-lg px-3 py-2 uppercase hover:opacity-95 disabled:opacity-80 w-52 text-center self-center mt-2">CREATE LISTING</Link>
      
        <Link to="/user-listing" className="bg-slate-700 text-white rounded-lg px-3 py-2 uppercase hover:opacity-95 disabled:opacity-80 w-52 text-center self-center mt-2">SHOW LISTINGS</Link>        
      </form>

      <div className="flex flex-col justify-center items-center mt-5">
        <span className="text-red-700 cursor-pointer hover:underline" onClick={handleDeleteAccount}>Delete account</span>

        <span className="text-red-700 cursor-pointer hover:underline mt-3" onClick={handleSignOut}>Sign out</span>
      </div>
      
    </div>
  );
};

export default Profile;
