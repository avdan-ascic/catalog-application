import Category from "../models/category.model"


const create = (req, res, next) => {
  const category = new Category(req.body)
  
  category.save()
    .then(() => res.status(200).json({ message: "New category added successfully." }))
    .catch(err => res.status(400).json({ error: err.message }))
}

const read = (req, res, next) => {
  Category.find({})
    .then(items => res.status(200).json({ categories: items }))
    .catch(err => res.status(400).json({ error: err.message }))
}

export default { create, read }