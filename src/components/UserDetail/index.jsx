import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Typography } from "@mui/material";
import './styles.css';

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
    const [content1, setContent1] = useState("");
      const [content2, setContent2] = useState("");
  const token = localStorage.getItem("token");
  const nav = useNavigate();
  const [message, setMessage] = useState("");

  // Fetch user details from the backend API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          if(response.status === 401 || response.status === 403){
            nav("/login");
          }
          else {
            const data = await response.json();
            setMessage(data.message);
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setMessage(error);
      }
    };

    fetchUser();
  }, [userId]);
  const handleEdit =async() =>{
    console.log(content1);
    console.log(content2);
   try {
     const res = await fetch(`http://localhost:8081/api/user/edituser/${userId}`, {
        method: "POST" ,
        headers : {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            first_name: content1,
            password: content2,
       }),
      })
   } catch (error) {
    console.log(error)
   }
  }
   return (
    <div className="user-detail-container">
      {user ? (
        <>
          <Typography variant="h5" className="user-detail-title">
            User Details
          </Typography>
          <Typography variant="body1" className="user-detail-field">
            <strong>Name:</strong> {user.first_name}
          </Typography>
          <Typography variant="body1" className="user-detail-field">
            <strong>Location:</strong> {user.location}
          </Typography>
          <Typography variant="body1" className="user-detail-field">
            <strong>Description:</strong> {user.description}
          </Typography>
          <Typography variant="body1" className="user-detail-field">
            <strong>Occupation:</strong> {user.occupation}
          </Typography>
          <Link to={`/photos/${user._id}`} className="user-detail-link">
            View Photos
          </Link>
          <Link to={`/viewblog/${user._id}`} className="user-detail-link">View Blog</Link>
          <Typography variant="body1" className="user-detail-field">
            
              <label className="comment-label">
               login_name:
                <input
                  type="text"
                  className="comment-input"
                  onChange={(e) => setContent1(e.target.value)}
                />
              </label>
              <label className="comment-label">
               pass:
                <input
                  type="text"
                  className="comment-input"
                  onChange={(e) => setContent2(e.target.value)}
                />
              </label>
              <button
                className="comment-button"
                onClick={() => handleEdit()}
              >
               edit
              </button>
            
          </Typography>
        </>
      ) : (
        <Typography variant="body1" className="user-detail-not-found">
          User not found!
        </Typography>
      )}
    </div>
  );
}

export default UserDetail;