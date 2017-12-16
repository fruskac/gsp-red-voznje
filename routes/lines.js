const router = require('express-promise-router')();

// Controller
const LineController = require('../controllers/lines');

router.route('/')
  .get(LineController.getLine)
  .post(LineController.setLine)
  .put(LineController.updateLine)
  .delete(LineController.deleteLine);

module.exports = router;