import Item from "../models/item.model";
import Image from "../models/image.model";

const create = async (req, res, next) => {
  try {
    let item = new Item(JSON.parse(req.body.item));
    item.userId = req.user._id;

    await item.save();

    const tempItem = await Item.findOne({ name: item.name });
    const image = new Image({
      file: { data: req.file.buffer, contentType: req.file.mimetype },
      itemId: tempItem._id,
    });
    await image.save();

    return res.status(200).json({ message: "New item added successfully." });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const readById = async (req, res, next) => {
  try {
    const item = await Item.findById(req.body.id);
    if (!item) return res.status(400).json({ error: "Item not found!" });

    const image = await Image.findOne({ itemId: item._id });
    if (!image) return res.status(400).json({ error: "Image not found!" });

    return res.status(200).json({
      id: item._id,
      name: item.name,
      description: item.description,
      categoryId: item.categoryId,
      userId: item.userId,
      image: image.file.data,
      mimeType: image.file.contentType,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const readByCat = async (req, res, next) => {
  try {
    const items = [];
    const tempItems = await Item.find(
      { categoryId: req.body.categoryId },
      "name description categoryId"
    );

    if (tempItems.length > 0) {
      await Promise.all(
        tempItems.map(async (item) => {
          const image = await Image.findOne({ itemId: item._id });
          let tempItem = {};
          tempItem._id = item._id;
          tempItem.name = item.name;
          tempItem.descrpition = item.description;
          tempItem.categoryId = item.categoryId;
          tempItem.image = image.file.data;
          tempItem.mimeType = image.file.contentType;
          items.push(tempItem);
        })
      );
    }

    return res.status(200).json({ items: items });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const readAllItems = async (req, res, next) => {
  try {
    const items = [];
    const tempItems = await Item.find({});

    if (tempItems.length > 0) {
      await Promise.all(
        tempItems.map(async (item) => {
          const image = await Image.findOne({ itemId: item._id });
          let tempItem = {};
          tempItem._id = item._id;
          tempItem.name = item.name;
          tempItem.descrpition = item.description;
          tempItem.categoryId = item.categoryId;
          tempItem.image = image.file.data;
          tempItem.mimeType = image.file.contentType;
          items.push(tempItem);
        })
      );
    }

    return res.status(200).json({ items: items });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const update = (req, res, next) => {
  Item.findOneAndUpdate(
    { _id: req.body.id },
    {
      name: req.body.name,
      description: req.body.description,
      categoryId: req.body.categoryId,
    }
  )
    .then(() => res.status(200).json({ message: "Item updated successfully." }))
    .catch((err) => res.status(400).json({ error: err.message }));
};

const remove = (req, res, next) => {
  Item.findByIdAndDelete(req.body.id)
    .then(() =>
      Image.findOneAndDelete({ itemId: req.body.id }).catch((err) =>
        res.status(400).json({ error: err.message })
      )
    )
    .then(() => res.status(200).json({ message: "Item deleted successfully." }))
    .catch((err) => res.status(400).json({ error: err.message }));
};

export default { create, readById, readByCat, readAllItems, update, remove };
