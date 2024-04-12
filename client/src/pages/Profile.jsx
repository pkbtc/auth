import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRef,useState ,useEffecr} from 'react';
import app from '../components/Fire';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  console.log(file)
  const fileRef=useRef(null);
  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }

  })
  const handleFileUpload=(file)=>{
      const storage=getStorage(app);
      const fileName= new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
    (snapshot)=>{
      const progress =
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
   
    console.log(progress)
    },
  )


  }
  return (
    <div>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
      <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img
          src={currentUser.avatar}
          onClick={() => fileRef.current.click()}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <input
          type='text'
          placeholder='username'
          defaultValue={currentUser.username}
          id='username'
          className='border p-3 rounded-lg'
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          defaultValue={currentUser.email}
          className='border p-3 rounded-lg'
        />
        <input
          type='password'
          placeholder='password'
          
          id='password'
          className='border p-3 rounded-lg'
        />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span
         
          className='text-red-700 cursor-pointer'
        >
          Delete account
        </span>
        <span  className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>
    </div>
  );
};

export default Profile;
