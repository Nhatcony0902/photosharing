import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Thêm Link từ react-router-dom
import fetchModel from "../../lib/fetchModelData";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await fetchModel(`/user/${userId}`);
         console.log(" data:", data);
        if (data) {
          setUser(data);
          setLoading(false);
        } else {
          throw new Error("Không nhận được dữ liệu");
        }
      } catch (err) {
        setError("Không tìm thấy người dùng hoặc ID không hợp lệ");
        setLoading(false);
      }
    }
    fetchUser();
  }, [userId]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>Không tìm thấy người dùng</div>;

  return (
    <div>
      <h2>Chi tiết người dùng</h2>
    
      <p><strong>Tên:</strong> {user.last_name}</p>
      <p><strong>Địa điểm:</strong> {user.location || "Chưa cung cấp"}</p>
      <p><strong>Mô tả:</strong> {user.description || "Chưa cung cấp"}</p>
      <p><strong>Nghề nghiệp:</strong> {user.occupation || "Chưa cung cấp"}</p>
      <p>
        <strong>Xem ảnh của người dùng:</strong>{" "}
        <Link to={`/users/${userId}/photos`}>Xem bộ sưu tập ảnh</Link>
      </p>
    </div>
  );
}

export default UserDetail;