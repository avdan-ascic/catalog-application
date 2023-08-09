import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { UserContext } from "../MainRouter";
import {
  StyledAppBar,
  StyledButton,
  StyledStack,
  StyledToolbar,
} from "../helpers/styled";
import { logout } from "../api/user-api";
import { CardMedia, Typography, Stack } from "@mui/material";
import logo from "../assets/images/logo.webp";

const Header = () => {
  const { user, loggedIn, setLoggedIn, setUser } = useContext(UserContext);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path
      ? { color: "#ff4081" }
      : { color: "#ffffff" };
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        setLoggedIn(false);
        setUser({ id: "", name: "" });
      })
      .catch((err) => console.log(err));
  };

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Stack
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <CardMedia
            component="img"
            height="110"
            image={logo}
            alt="image"
            sx={{ width: "120px" }}
          />
          {loggedIn && (
            <Typography sx={{ marginLeft: "1em", fontSize: "1.3em" }}>
              Welcome {user.name}
            </Typography>
          )}
        </Stack>
        <StyledStack direction="row">
          <Link to="/home">
            <StyledButton style={isActive("/home")}>Home</StyledButton>
          </Link>
          <Link to="/about">
            <StyledButton style={isActive("/about")}>About</StyledButton>
          </Link>
          <Link to="/contact">
            <StyledButton style={isActive("/contact")}>Contact</StyledButton>
          </Link>
          {!loggedIn ? (
            <Link to="/login">
              <StyledButton style={isActive("/login")}>Login</StyledButton>
            </Link>
          ) : (
            <StyledButton onClick={handleLogout}>Logout</StyledButton>
          )}
        </StyledStack>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
