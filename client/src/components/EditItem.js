import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { UserContext } from "../MainRouter";
import { read } from "../api/category-api";
import { readById, update } from "../api/item-api";
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

const EditItem = () => {
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState({
    name: "",
    description: "",
    userId: "",
    error: "",
    redirect: false,
  });
  const [back, setBack] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    read()
      .then((data) => setCategories(data.categories))
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    readById({ id: params.itemId }).then((data) => {
      setValues({
        ...values,
        name: data.name,
        description: data.description,
        userId: data.userId,
      });
      const currentCat = categories.find((cat) => cat._id === data.categoryId);
      setCategory(currentCat);

      if (data.userId !== user.id) return navigate("/home");
    });
    // eslint-disable-next-line
  }, [categories]);

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.name.trim() === "")
      return setValues({
        ...values,
        error: "Please add item name!",
        redirect: false,
      });
    if (values.description.trim() === "")
      return setValues({
        ...values,
        error: "Please add item description!",
        redirect: false,
      });
    if (!category)
      return setValues({
        ...values,
        error: "Please select a category!",
        redirect: false,
      });
    values.id = params.itemId;
    values.categoryId = category._id;

    update(values)
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
    if (values.redirect) {
      return navigate(-1);
    }
    // eslint-disable-next-line
  }, [values.redirect]);

  useEffect(() => {
    if (back) {
      return navigate(-1);
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
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#183c44",
          padding: "4rem",
        }}
      >
        <Typography
          variant="h4"
          sx={{ marginTop: "3rem", marginBottom: "2rem", color: "#ffffff" }}
        >
          Edit Item
        </Typography>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          style={{ maxWidth: 330 }}
        >
          <TextField
            id="name"
            // label="Name"
            type="text"
            value={values.name}
            onChange={handleChange("name")}
            sx={{ margin: "1rem", width: "300px", color: "#ffffff" }}
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white" },
            }}
          />
          <br />
          <TextField
            id="description"
            // label="Description"
            type="text"
            multiline
            maxRows={4}
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
          <FormControl sx={{ margin: "1rem", width: "300px" }}>
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
              onClick={handleSubmit}
              sx={{ backgroundColor: "#204e59" }}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              onClick={() => setBack(true)}
              sx={{ backgroundColor: "#204e59", color: "#ffffff" }}
            >
              Back
            </Button>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
};

export default EditItem;
