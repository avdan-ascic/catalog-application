import { useContext } from "react";
import { Box, Button, CardMedia, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../MainRouter";
import welcomeImg from "../assets/images/welcome.jpg";

const Cover = () => {
  const { loggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  if (loggedIn) return navigate("/home");

  return (
    <Stack sx={{ height: "87vh", backgroundColor: "#204e59", display: "flex" }}>
      <CardMedia
        component="img"
        image={welcomeImg}
        alt="Welcome"
        sx={{ height: "60vh", objectFit: "cover" }}
      />
      <Box
        sx={{
          width: "100%",
          height: "24.5vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#204e59",
        }}
      >
        <Link to="/register">
          <Button
            variant="outlined"
            size="large"
            sx={{ color: "#fff", borderColor: "#fff", fontSize: "2rem" }}
          >
            Get Started
          </Button>
        </Link>
      </Box>
    </Stack>
  );
};

export default Cover;
