import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../MainRouter";
import { create, read } from "../api/category-api";
import { readByCategory, readAllItems } from "../api/item-api";
import ItemCard from "./ItemCard";
import {
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  Button,
  Box,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    width: "100%",
    height: "84.5vh",
    display: "flex",
  },
  part1: {
    width: "22%",
    color: "#204e59",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    position: "fixed",
    top: 130,
    bottom: 0,
  },
  part2: {
    width: "78%",
    marginTop: "6px",
    display: "flex",
    flexDirection: "column",
    marginLeft: "23%",
    overflowY: "auto",
    marginRight: 0,
  },
  box1: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  box2: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "1em",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  dialog: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});

const Home = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState({ name: "", error: "" });
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [error, setError] = useState(false);
  const { loggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);

  const handleChangeCategory = (e) => {
    setCategory({ ...category, name: e.target.value });
  };

  const updateCategories = () => {
    read()
      .then((data) => setCategories(data.categories))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    updateCategories();
    readAllItems()
      .then((data) => setItems(data.items))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = () => {
    if (category.name.length === 0)
      return setCategory({
        ...category,
        error: "Please insert category name!",
      });
    create(category)
      .then((data) => {
        if (data.error) {
          return setCategory({ ...category, error: data.error });
        } else {
          setCategory({ name: "", error: "" });
          updateCategories();
          setOpen(false);
          setError(false)
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSelectCategory = (id) => {
    readByCategory({ categoryId: id })
      .then((data) => setItems(data.items))
      .catch((err) => console.log(err));
    setCurrentCategory(id);
  };

  const handleAddItem = () => {
    if (categories.length === 0) return setError(true);
    else navigate("/addItem");
  };

  return (
    <div className={classes.container}>
      <Stack className={classes.part1}>
        {loggedIn && (
          <Button
            variant="contained"
            sx={{ color: "#ffffff", backgroundColor: "#204e59" }}
            onClick={handleOpen}
          >
            Add New Category
          </Button>
        )}
        <Typography
          sx={{ marginLeft: "1em", marginTop: "1.5em", fontSize: "1.2em" }}
        >
          Categories:
        </Typography>
        <List>
          {categories.map((cat, index) => {
            return (
              <ListItem
                key={index}
                onClick={() => handleSelectCategory(cat._id)}
                sx={{ marginLeft: "1em", cursor: "pointer" }}
              >
                <ListItemText
                  sx={{ color: cat._id === currentCategory && "#ff4081" }}
                >
                  {cat.name}
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
        {error && (
          <Typography component="p" color="error" sx={{ textAlign: "center" }}>
            Please, add category before adding item.
          </Typography>
        )}
      </Stack>
      <div className={classes.part2}>
        <Box className={classes.box1}>
          {loggedIn && (
            <Button
              variant="contained"
              sx={{
                color: "#ffffff",
                width: "10rem",
                backgroundColor: "#204e59",
              }}
              onClick={handleAddItem}
            >
              Add Item
            </Button>
          )}
        </Box>
        <Box className={classes.box2}>
          {items.length > 0 && (
            <Grid container spacing={8} sx={{ padding: "2rem" }}>
              {items.map((item, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <ItemCard item={item} />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="category"
            label="Category Name"
            type="text"
            variant="standard"
            fullWidth
            value={category.name}
            onChange={handleChangeCategory}
          />
          {category.error && (
            <DialogContentText color="error">
              {category.error}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
