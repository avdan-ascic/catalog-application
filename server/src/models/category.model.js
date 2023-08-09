import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: "Category name is required!",
  },
});

CategorySchema.pre("save", async function (next) {
  const categoryModel = mongoose.model("Category", CategorySchema);

  const checkCat = await categoryModel.findOne({ name: this.name });
  if (checkCat) next(new Error("Category already exists!"));

  if (this.name.length > 100)
    next(new Error("Category name can't have more than 100 characters!"));

  const nameRegex = /^[A-Za-z0-9 ]*$/;
  if (!nameRegex.test(this.name))
    next(new Error("Name can contain only letters and numbers!"));

  next();
});

export default mongoose.model("Category", CategorySchema);
