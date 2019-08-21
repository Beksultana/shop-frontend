const express = require('express');
const Category = require('../models/Category');

const router = express.Router();

router.get('/', (req, res) => {
  Category.find()
    .then(categories => res.send(categories))
    .catch(() => res.sendStatus(500));
});

router.post('/', (req, res) => {
  const category = new Category(req.body);

  category.save()
    .then(result => res.send(result))
    .catch(error => res.status(400).send(error));
});

module.exports = router;
