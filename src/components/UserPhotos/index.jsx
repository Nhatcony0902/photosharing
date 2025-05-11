import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        console.log(`Fetching photos for userId: ${userId}`);
        const data = await fetchModel(`/photo/photosOfUser/${userId}`);
        console.log("Photos data:", data);
        if (data) {
          setPhotos(data);
          setLoading(false);
        } else {
          throw new Error("Không nhận được dữ liệu");
        }
      } catch (err) {
        console.error("Error fetching photos:", err);
        setError("Lỗi khi lấy ảnh của người dùng");
        setLoading(false);
      }
    }
    fetchPhotos();
  }, [userId]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Ảnh của người dùng</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {photos.length === 0 ? (
          <p>Người dùng chưa đăng ảnh nào.</p>
        ) : (
          photos.map((photo) => (
            <div key={photo._id} style={{ margin: "10px", border: "1px solid #ddd", padding: "10px" }}>
              <img
                src={`/images/${photo.file_name}`}
                alt={photo.file_name}
                style={{ width: "200px", height: "auto" }}
                onError={(e) => {
                  e.target.src = "/placeholder.jpg";
                  console.error(`Failed to load image: ${photo.file_name}`);
                }}
              />
              <p><strong>Ngày đăng:</strong> {new Date(photo.date_time).toLocaleString()}</p>
              <div>
                <strong>Bình luận:</strong>
                {photo.comments && photo.comments.length > 0 ? (
                  <ul>
                    {photo.comments.map((comment) => (
                      <li key={comment._id}>
                        {comment.user ? (
                          <strong>{`${comment.user.first_name} ${comment.user.last_name}`}</strong>
                        ) : null}
                        {comment.user && ": "} {/* Chỉ thêm dấu ":" nếu có tên người dùng */}
                        {comment.comment}
                        <br />
                        <small>{new Date(comment.date_time).toLocaleString()}</small>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Chưa có bình luận</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserPhotos;