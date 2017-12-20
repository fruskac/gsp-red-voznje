const router = require('express-promise-router')();

const { validateSecret }  = require('../helpers/route');

// controller
const controller = require('../controllers/setup');

router.route('/:id')
  .get(validateSecret(), controller.get)
  .put(validateSecret(), controller.create);

module.exports = router;