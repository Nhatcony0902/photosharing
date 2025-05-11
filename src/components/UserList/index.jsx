import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await fetchModel("/user/list");
        if (data) {
          setUsers(data);
          setLoading(false);
        } else {
          throw new Error("Không nhận được dữ liệu");
        }
      } catch (err) {
        setError("Lỗi khi lấy danh sách người dùng");
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Danh sách người dùng</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <Link to={`/users/${user._id}`}>
              {user.first_name} {user.last_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;