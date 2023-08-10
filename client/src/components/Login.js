import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { UserContext } from "../MainRouter";
import {
  CardContent,
  Typography,
  Button,
  CardActions,
  Icon,
} from "@mui/material";
import { StyledCard, StyledTextField } from "../helpers/styled";
import { login } from "../api/user-api";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirect: false,
  });
  const { setLoggedIn, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = () => {
    const user = {
      email: values.email,
      password: values.password,
    };

    login(user)
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            redirect: false,
            error: data.error,
          });
        } else {
          setLoggedIn(true);
          setUser(data.user);
          setValues({ ...values, redirect: true, error: "" });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (values.redirect) return navigate("/home");
    // eslint-disable-next-line
  }, [values.redirect]);

  return (
    <StyledCard>
      <CardContent>
        <Typography
          variant="h4"
          sx={{
            marginTop: "3rem",
            marginBottom: "2rem",
            color: "#fff",
          }}
        >
          Login
        </Typography>
        <StyledTextField
          id="email"
          label="Email"
          type="email"
          variant="standard"
          value={values.email}
          onChange={handleChange("email")}
          margin="normal"
          InputLabelProps={{
            style: { color: "white" },
          }}
          InputProps={{
            style: { color: "white" },
          }}
        />
        <br />
        <StyledTextField
          id="password"
          label="Password"
          type="password"
          variant="standard"
          value={values.password}
          onChange={handleChange("password")}
          margin="normal"
          InputLabelProps={{
            style: { color: "white" },
          }}
          InputProps={{
            style: { color: "white" },
          }}
        />
        <br />

        {values.error && (
          <Typography component="p" color="error">
            <Icon
              color="error"
              sx={{
                verticalAlign: "middle",
              }}
            />
            {values.error}
          </Typography>
        )}
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#204e59",
            marginRight: "2em",
          }}
        >
          Login
        </Button>
        <Link to="/home">
          <Button
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: "#204e59",
            }}
          >
            Home
          </Button>
        </Link>
      </CardActions>
      <Typography component="p" sx={{ color: "#eee", marginTop: "1em" }}>
        No Account?{" "}
        <Link to="/register" style={{ color: "red" }}>
          Click here
        </Link>{" "}
        to register.
      </Typography>
    </StyledCard>
  );
};

export default Login;
