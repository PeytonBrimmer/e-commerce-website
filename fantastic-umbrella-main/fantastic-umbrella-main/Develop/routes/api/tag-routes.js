const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: productTag }],
    });
    res.status(200).json(tagData);
  }
  catch (err) {
    console.log(err)
    res.status(500).json('err getting tags');
  }
  // be sure to include its associated Product data

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: productTag }],
    });
    if (!tagData)
      return res.status(404).json({ message: 'No tag found with this id!' });
    res.status(200).json(tagData);
  }
  catch (err) {
    console.log(err)
    res.status(500).json('err getting tags');
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try { 
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  }
  catch (err) {
    console.log(err)
    res.status(500).json('err creating tags');
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try { 
    const tag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tag[0])
      return res.status(404).json({ message: 'No tag found with this id!' });
    res.status(200).json(tag);
  }
  catch (err) {
    console.log(err)
    res.status(500).json('err updating tags');
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const Tag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tag)
      return res.status(404).json({ message: 'No tag found with this id!' });
    res.status(200).json('tag deleted');
    }
    catch (err) {
      console.log (err);
      res.status(500).json('err deleting tags');
    }
});

module.exports = router;
