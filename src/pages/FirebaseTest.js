import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../firebase";

export default function FirebaseTest() {
  const [imageName, setImageName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [status, setStatus] = useState("");

  let test = () => {
    const storageRef = ref(storage, `${imageName}`);
    const uploadTask = uploadBytesResumable(storageRef, imageURL);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setStatus(`Upload is ${progress}% done`);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");

            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
        setStatus(`Upload failed`);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setStatus(`File available at :  ${downloadURL}`);
        });
      }
    );
  };
  return (
    <div>
      <a href="http://"></a>
      <input
        type="file"
        onChange={(e) => {
          setImageURL(e.target.files[0]);
        }}
      />

      <input
        type="text"
        onChange={(e) => {
          setImageName(e.target.value);
        }}
      />
      <button onClick={test}>click</button>
      <p>{status}</p>
    </div>
  );
}
