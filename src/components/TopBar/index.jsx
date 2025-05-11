import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useLocation, matchRoutes } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchModel from "../../lib/fetchModelData";

function TopBar() {
  const location = useLocation();
  const [userName, setUserName] = useState("PhotoShare");

  const routes = [
    { path: "/users/:userId" },
    { path: "/photos/:userId" }
  ];

  const matched = matchRoutes(routes, location);
  const userId = matched?.[0]?.params?.userId;

  useEffect(() => {
    if (userId) {
      fetchModel(`/user/${userId}`).then((data) => {
        if (data) {
          setUserName(`${data.first_name} ${data.last_name}`);
        } else {
          setUserName("PhotoShare");
        }
      });
    } else {
      setUserName("PhotoShare");
    }
  }, [userId]);

  let contextText = "PhotoShare";

  if (location.pathname.startsWith("/users/") && !location.pathname.includes("/photos")) {
    contextText = `Thông tin người dùng ${userId}`;
  } else if (location.pathname.includes("/photos")) {
    contextText = `Ảnh của người dùng ${userId}`;
  } else if (location.pathname === "/users") {
    contextText = "Danh sách người dùng";
  }

  return (
    <AppBar position="absolute">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">{userName}</Typography>
        </Box>
        <Typography variant="h6">{contextText}</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
