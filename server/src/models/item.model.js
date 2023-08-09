import mongoose from "mongoose";

const ItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: "Item name is required!",
  },
  description: {
    type: String,
    required: "Item description is required!",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: "Item category is required!",
  },
});

ItemSchema.pre("save", async function (next) {
  const itemModel = mongoose.model("Item", ItemSchema);

  const checkName = await itemModel.findOne({ name: this.name });
  if (checkName) next(new Error("Item with this name already exists!"));

  if (this.name.length > 100)
    next(new Error("Item name can't have more than 100 characters!"));

  const nameRegex = /^[A-Za-z0-9 ]*$/;
  if (!nameRegex.test(this.name))
    next(new Error("Name can contain only letters and numbers!"));
});

export default mongoose.model("Item", ItemSchema);
