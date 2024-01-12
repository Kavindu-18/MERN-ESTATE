import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);

  console.log(formData);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i])); // store each image in storage
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData, // copy the form data
            imageUrls: formData.imageUrls.concat(urls), // add the new image urls to the form data
          }); // set the image urls in the form data
          setImageUploadError(false);
        })
        .catch((error) => {
          console.log(error);
          setImageUploadError("image upload failed (2mb max per image)");
        });
    } else {
      setImageUploadError("image upload failed 6 image per listing");
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app); // get the storage ref
      const fileName = new Date().getTime() + file.name; // create a unique name for the image
      const storageRef = ref(storage, fileName); // create a reference to the storage
      const uploadTask = uploadBytesResumable(storageRef, file); // upload the image to the storage
      uploadTask.on(
        "state_changed", // listen to the state change
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100; // get the progress
          console.log(`Upload is ${progress}% done`); // log the progress
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL); // get the download url of the image
          });
        }
      );
    });
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <div className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </div>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="name"
            className="boarder p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />

          <textarea
            type="text"
            placeholder="description"
            className="boarder p-3 rounded-lg"
            id="description"
            required
          />

          <input
            type="text"
            placeholder="address"
            className="boarder p-3 rounded-lg"
            id="address"
            required
          />
          <div className="flex gap-6 flex-wrap ">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking Spot</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg "
              />
              <p>Beds</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg "
              />
              <p>Bath</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg "
              />
              <div className="flex flex-col items-center">
                <p>Regular price </p>
                <span className="text-xs">($/Month)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg "
              />

              <div className="flex flex-col items-center">
                <p>Discounted Price</p>

                <span className="text-xs">($/Month)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold ">
            Image :
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>

          <div className=" flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/* "
              multiple
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              Upload
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button >
                  Delete
                </button>
              </div>
            ))}
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
