import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/userSlice';
const OAuth = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleClick = async () => {
        try {
            const provider=new GoogleAuthProvider();
            const auth=getAuth(app);
            const res=await signInWithPopup(auth, provider)

            const data=await fetch ('/api/auth/googleLogin/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: res.user.displayName, email: res.user.email, photo: res.user.photoURL
                }),
            })

            const jsonData=await data.json()
            dispatch(login(jsonData));
            navigate("/");
            //console.log(jsonData)
        } catch (error) {
            console.log(error)  
        }
    }

  return (
    <div>
        <button type="button" className="bg-slate-800 text-white py-2 px-5 rounded-lg hover:bg-slate-900 disabled:opacity-80 w-72" onClick={handleClick}>CONTINUE WITH GOOGLE</button>
    </div>
  )
}

export default OAuth