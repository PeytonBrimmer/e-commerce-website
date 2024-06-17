const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  }
  catch (err) {
    console.error(err);
    res.status(500).json('err connecting to categories.');
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) 
      return res.status(404).json('No category found with that id.'); 
      res.status(200).json(categoryData);
    }
  catch (err) {
    res.status(500).json('err connecting to categories.');
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(400).json('error with router.post');
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) return res.status(404).json('No category found with that id.');
    res.status(200).json(categoryData);
    }
    catch (err) {
      res.status(400).json('error updating category');
    }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) return res.status(404).json('No category found with that id.');
    res.status(200).json(categoryData);
    }
    catch (err) {
      res.status(400).json('error deleting category');
    }
});

module.exports = router;
