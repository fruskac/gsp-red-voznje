const Joi = require('joi');

const { username, password } = require('../config/secret');

// validation schema for day e.g. weekday, saturday, sunday
const daySchema = Joi.object().keys({
  info: Joi.array().required(),
  from: Joi.object().keys({
    times: Joi.array().required(),
    label: Joi.string().allow("")
  }).required(),
  to: Joi.object().keys({
    times: Joi.array().required(),
    label: Joi.string().allow("")
  }).required()
}).required();

// validation schema for line
const lineSchema = Joi.object().keys({
  number:   Joi.string().required(),
  weekday:  daySchema,
  saturday: daySchema,
  sunday:   daySchema
});

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);

      if (result.error) {
        return res.status(400).json(result.error);
      }

      if (!req.value) { req.value = {}; }

      req.value['body'] = result.value;
      next();
    }
  },

  // validate user
  validateSecret: () => {
    return (req, res, next) => {

      if (req.headers['authorization']) {
        const tmp  = req.headers['authorization'].split(' ');   

        const buf   = new Buffer(tmp[1], 'base64');
        const auth  = buf.toString();

        const creds = auth.split(':');

        if (username == creds[0] && password == creds[1]) {
          next();
          return;
        } 
      }

      res.status(401).json({ error: 'Unauthorized' });
    }
  },

  schemas: { lineSchema }
};