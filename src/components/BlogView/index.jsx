import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
function BLogView() {
  const [blogs, setBLog] = useState([]);
  const [content1, setContent1] = useState("");
  const [content2, setContent2] = useState("");
  const { userId } = useParams();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/blog/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setBLog(data);
        } else {
          if (response.status === 401 || response.status === 403) {

          }
          else {
            const data = await response.json();

          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);

      }
    };

    fetchUser();
  }, [userId]);
  const handleAdd = async () => {
    try {
      const res = await fetch(`http://localhost:8081/api/blog/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: content1,
          description: content2,
        }),
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div>
       
        <div variant="body1" className="user-detail-field">

          <label className="comment-label">
            <title></title>:
            <input
              type="text"
              className="comment-input"
              onChange={(e) => setContent1(e.target.value)}
            />
          </label>
          <label className="comment-label">
            desc:
            <input
              type="text"
              className="comment-input"
              onChange={(e) => setContent2(e.target.value)}
            />
          </label>
          <button
            className="comment-button"
            onClick={() => handleAdd()}
          >
            add blog
          </button>

        </div>
      </div>
    </>
  )
}
export default BLogView;