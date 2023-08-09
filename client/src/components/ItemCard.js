import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  const uint8Array = new Uint8Array(item.image.data);
  let imageBase64 = "";

  uint8Array.forEach((byte) => {
    imageBase64 += String.fromCharCode(byte);
  });

  imageBase64 = btoa(imageBase64);

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia
          sx={{ height: 140 }}
          image={`data:${item.mimeType};base64,${imageBase64}`}
          title={item.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" sx={{ textAlign: "center" }}>
            {item.name.length > 13 ? item.name.slice(0, 13) + "..." : item.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Link to={`/item/${item._id}`}>
          <Button variant="contained" sx={{backgroundColor: "#204e59"}}>View Details</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
