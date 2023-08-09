import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { read } from "../api/category-api";
import { create } from "../api/item-api";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Button,
} from "@mui/material";

const AddItem = () => {
  const inputRef = useRef(null);
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [back, setBack] = useState(false);
  const [values, setValues] = useState({
    name: "",
    description: "",
    error: "",
    redirect: false,
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    read()
      .then((data) => setCategories(data.categories))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.name)
    return setValues({
      ...values,
      error: "Please write a name!",
      redirect: false,
    });
    if (!values.description)
    return setValues({
      ...values,
      error: "Please describe item!",
      redirect: false,
    });
    if (!category)
      return setValues({
        ...values,
        error: "Please select a category!",
        redirect: false,
      });
    const selectedFile = inputRef.current.files[0];
    if (!selectedFile) {
      return setValues({
        ...values,
        error: "Please select an image!",
        redirect: false,
      });
    }
    values.categoryId = category._id;

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("item", JSON.stringify(values));

    create(formData)
      .then((data) => {
        if (data.error) {
          return setValues({
            ...values,
            error: data.error,
            redirect: false,
          });
        } else {
          setValues({ ...values, redirect: true });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (values.redirect) return navigate("/home");

    // eslint-disable-next-line
  }, [values.redirect]);

  useEffect(() => {
    if (back) {
      if (location.key === "default") return navigate("/home");
      else return navigate(-1);
    }
    // eslint-disable-next-line
  }, [back]);

  return (
    <Stack
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "3rem",
      }}
    >
      <Box
        sx={{
          width: "450px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#183c44",
        }}
      >
        <Typography
          variant="h4"
          sx={{ marginTop: "3rem", marginBottom: "2rem", color: "#ffffff" }}
        >
          Add New Item
        </Typography>
        <form encType="multipart/form-data" style={{ maxWidth: 330 }}>
          <TextField
            id="name"
            label="Name"
            type="text"
            variant="standard"
            value={values.name}
            onChange={handleChange("name")}
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white" },
            }}
            sx={{ margin: "1rem", width: "300px", color: "#ffffff" }}
          />
          <br />
          <TextField
            id="description"
            label="Description"
            type="text"
            multiline
            maxRows={4}
            variant="standard"
            value={values.description}
            onChange={handleChange("description")}
            sx={{ margin: "1rem", width: "300px" }}
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white" },
            }}
          />
          <br />
          <TextField
            id="image"
            type="file"
            name="image"
            variant="standard"
            accept="image/*"
            sx={{ margin: "1rem" }}
            InputProps={{
              style: { color: "white" },
            }}
            inputRef={inputRef}
          />
          <br />
          <FormControl
            variant="standard"
            sx={{ margin: "1rem", width: "300px" }}
          >
            <InputLabel id="select-category" sx={{ color: "white" }}>
              Category
            </InputLabel>
            <Select
              labelId="select-category"
              value={category?.name !== undefined ? category.name : ""}
              label="Category"
            >
              {categories.map((cat, index) => (
                <MenuItem
                  key={index}
                  value={cat.name}
                  onClick={() => setCategory(cat)}
                >
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {values.error && (
            <Typography
              component="p"
              color="error"
              sx={{ textAlign: "center" }}
            >
              {values.error}
            </Typography>
          )}

          <Stack
            direction="row"
            spacing={2}
            sx={{ margin: "1rem", display: "flex", justifyContent: "center" }}
          >
            <Button
              variant="contained"
              sx={{ backgroundColor: "#204e59" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#204e59", color: "#ffffff" }}
              onClick={() => setBack(true)}
            >
              Back
            </Button>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
};

export default AddItem;
