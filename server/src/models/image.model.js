import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  file: {
    data: Buffer,
    contentType: String,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  },
});

export default mongoose.model("Image", ImageSchema);
