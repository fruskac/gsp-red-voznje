const router = require('express-promise-router')();

const { validateSecret, validateBody, schemas }  = require('../helpers/route');

// controller
const controller = require('../controllers/lines');

router.route('/')
  .get(controller.getAll)
  .post(validateSecret(), validateBody(schemas.lineSchema), controller.create);

router.route('/:id')
  .get(controller.get)
  .patch(validateSecret(), validateBody(schemas.lineSchema), controller.update)
  .delete(validateSecret(), controller.delete);

module.exports = router;