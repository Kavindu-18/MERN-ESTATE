import { useSelector } from "react-redux";
import { useRef,useState,useEffect } from "react";
import {getStorage} from "firebase/storage"




//firebase code for allow photo
// rules_version = '2';

// // Craft rules based on data in your Firestore database
// // allow write: if firestore.get(
// //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write: if
//       request.resource.size < 2 * 1024 * 1024 &&
//       request.resource.contentType.matches('image/.*')
//     }
//   }
// }

export default function Profile() {
  // Profile page
  const fileRef = useRef(null); // reference to file input
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined); // file to be uploaded
  console.log(file);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {

    const storage  = getStorage();
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form className="flex flex-col gap-4">
        <input onChange={(e)=>setFile(e.target.files[0])}  type="file" ref={fileRef} hidden accept="image/*"></input>
        <img
          onClick={() => fileRef.current.click()}// when clicked, click the file input
          src={currentUser.profilePicture}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        ></img>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
        ></input>
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
        ></input>
        <input
          type="text"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        ></input>

        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer ">Delete Account</span>
        <span className="text-red-700 cursor-pointer ">Sign Out</span>
      </div>
    </div>
  );
}
