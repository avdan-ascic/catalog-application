import { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { readById, remove } from "../api/item-api";
import { UserContext } from "../MainRouter";

import {
  Card,
  CardMedia,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    width: "100%",
    height: "84.5vh",
    display: "flex",
    marginTop: "1em",
    flexDirection: "column",
  },
  part1: {
    display: "flex",
    height: "65vh",
  },
  box: {
    display: "flex",
    marginLeft: "1em",
    color: "#183c44",
  },
  text: {
    marginLeft: "2em",
    marginTop: "1em",
  },
  part2: {
    height: "22vh",
    display: "flex",
    justifyContent: "space-around",
  },
});

const WiewItem = () => {
  const classes = useStyles();
  const [item, setItem] = useState({});
  const [image, setImage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [dialog, setDialog] = useState(false);

  const { user } = useContext(UserContext);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    readById({ id: params.itemId })
      .then((data) => {
        setItem(data);

        const uint8Array = new Uint8Array(data.image.data);
        let imageBase64 = "";
        uint8Array.forEach((byte) => {
          imageBase64 += String.fromCharCode(byte);
        });
        imageBase64 = btoa(imageBase64);
        setImage(imageBase64);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  const handleDeleteItem = () => {
    remove({ id: item.id })
      .then(() => {
        console.log("Item deleted successfully.");
        setRedirect(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (redirect) return navigate("/home");
    // eslint-disable-next-line
  }, [redirect]);

  return (
    <div className={classes.container}>
      <div className={classes.part1}>
        <div className={classes.box}>
          <Card>
            <CardMedia
              component="img"
              image={`data:${item.mimeType};base64,${image}`}
              alt={item.name}
              sx={{ maxWidth: "850px" }}
            />
          </Card>
          <Box className={classes.text}>
            <Typography variant="h3">{item.name}</Typography>
            <Typography sx={{ marginTop: "1em", fontSize: "20px" }}>
              {item.description}
            </Typography>
          </Box>
        </div>
      </div>
      {user.id === item.userId && (
        <div className={classes.part2}>
          <Box sx={{ marginTop: "5em" }}>
            <Link to={`/editItem/${item.id}`}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#183c44",
                  height: "4em",
                  width: "10em",
                  color: "white",
                  marginRight: "18em",
                }}
              >
                Edit
              </Button>
            </Link>

            <Button
              variant="contained"
              onClick={() => setDialog(true)}
              sx={{
                backgroundColor: "#183c44",
                height: "4em",
                width: "10em",
                color: "white",
              }}
            >
              Delete
            </Button>
          </Box>
        </div>
      )}

      <Dialog
        open={dialog}
        onClose={() => setDialog(false)}
        aria-labelledby="delete-item-title"
        aria-describedby="delete-item-description"
      >
        <DialogTitle id="delete-item-title">Delete Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)}>Cancel</Button>
          <Button color="error" onClick={handleDeleteItem}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WiewItem;
