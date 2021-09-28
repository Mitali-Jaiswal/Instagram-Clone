import React,{useState} from 'react';
import './ImageUpload.css';
import firebase from "firebase"
import { Button, Input } from '@mui/material';
import {db, storage} from './firebase';


function ImageUpload({username}) {
    const [image,setImage] = useState(null);
    const [progress, setProgress] =useState(0);
    const [caption,setCaption] =useState('');

    
    // const imagesRef = ref(storage, 'images');
    // const spaceRef = ref(storage, 'images/space.jpg');

    
  
    const handleChange= (e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }

    
    const handleUpload =()=>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                //progress function..
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (err)=>{
                //error function...
                console.log(err);
                alert(err.message);
            },
            ()=>{
                //complete function...
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url=>{
                        //post image inside db
                        db.collection("posts").add({
                            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username : username
                        });
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    })

            }

        )

    }
    return (
        <div className="imageUpload">
            <p>Create New Posts ...</p>
            <progress value={progress} max="100" />
            <input type="text" placeholder="Enter a Caption..."
             value={caption} 
             onChange={e=>setCaption(e.target.value)}
             />
            <input className="inputFile" type="file" onChange={handleChange}  />
            <Button onClick={handleUpload} >
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
