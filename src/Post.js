 import React,{useState,useEffect} from 'react';
import { Avatar, Button, Input } from '@mui/material';
import './Post.css';
import firebase from 'firebase';
import {db} from './firebase';
 function Post({user,postId,imageUrl,username,caption}) {
    console.log(username);
    const [comments,setComments] = useState([]);
    const [comment,setComment] =useState('');
    useEffect(()=>{
      let unsubscribe;
      if(postId){
          unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy('timestamp','desc')
            .onSnapshot((snapshot)=>{
                setComments(snapshot.docs.map((doc)=>doc.data()));
            });
      }
      return ()=>{
          unsubscribe();
      };
    },[postId]);
    
    const postComment =(e)=>{
        e.preventDefault();

        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }

     return (
         <div className="post">
             
             {/* header->  avatar + username */}
            <div className="post__header">
                <Avatar className="post__avatar" alt="Mita" src="/static/images/avatar/1.jpg" />
                <h3>{username}</h3>
            
            </div>
             
             {/* image */}
             <img className="post__image" alt="img" src={imageUrl}/>

             {/* username + caption */}
             
             <p className="post__text"> <b>{username}:</b> {caption}</p>
            
             <div className="post__comments">
                {
                    comments.map((comment)=>(

                        <p key={comment.id} className="para_comment">
                            <b>{comment.username}:</b> {comment.text}
                            
                        </p>
                    ))
                }

            </div>


           {user && (
                <form className="post__commentBox">
                <input
                    className="post__input"
                    type ="text"
                    placeholder="Add a Comment..."
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}

                />
                <button 
                    disabled={!comment}
                    className="post__button"
                    type="submit"
                    onClick={postComment}
                >
                    Post
                </button>
            </form>
           )}
         </div>
     )
 }
 
 export default Post
 