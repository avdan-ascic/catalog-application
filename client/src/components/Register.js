import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { StyledCard, StyledTextField } from "../helpers/styled";
import {
  CardContent,
  Typography,
  Button,
  CardActions,
  Icon,
} from "@mui/material";
import { create } from "../api/user-api";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
    redirect: false,
  });
  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = () => {
    create(values)
      .then((data) => {
        if (data.errors && data.errors.length > 0) {
          const errorMessage = data.errors.map((error) => error.msg).join(", ");
          setValues({ ...values, error: errorMessage });
        } else {
          setValues({ ...values, redirect: true });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (values.redirect) navigate("/login");
    // eslint-disable-next-line
  }, [values.redirect]);

  return (
    <div>
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
            Register
          </Typography>
          <StyledTextField
            id="name"
            label="Name"
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
            variant="standard"
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white" },
            }}
          />
          <br />
          <StyledTextField
            id="email"
            label="Email"
            type="email"
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
            variant="standard"
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
            value={values.password}
            onChange={handleChange("password")}
            margin="normal"
            variant="standard"
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white" },
            }}
          />
          <br />
          <StyledTextField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange("confirmPassword")}
            margin="normal"
            variant="standard"
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
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#204e59",
            }}
          >
            Submit
          </Button>
          <Link to="/">
            <Button
              color="primary"
              variant="contained"
              sx={{
                backgroundColor: "#204e59",
                marginLeft: "2em",
              }}
            >
              Cancel
            </Button>
          </Link>
        </CardActions>
      </StyledCard>
    </div>
  );
};

export default Register;
