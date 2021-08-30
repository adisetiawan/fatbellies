const express = require('express');
const router = express.Router();
const { Session } = require('../libs/model');

const Joi = require('joi');

const postSchema = Joi.object({
  //id: Joi.number().integer().required(),
  branch_id: Joi.number().integer().required(),
  meal_id: Joi.number().integer().required(),
  onDemand: Joi.number().integer().required(),
  price: Joi.number().integer().required(),
  capacity: Joi.number().integer().required(),
  day: Joi.string().required(),
  capacity: Joi.number().integer().required(),
  timeStart: Joi.number().integer().required(),
  timeEnd: Joi.number().integer().required(),
});

const putSchema = Joi.object({
  //id: Joi.number().integer().required(),
  id: Joi.number().integer().required(),
  branch_id: Joi.number().integer(),
  meal_id: Joi.number().integer(),
  onDemand: Joi.number().integer(),
  price: Joi.number().integer(),
  capacity: Joi.number().integer(),
  day: Joi.string().required(),
  capacity: Joi.number().integer(),
  timeStart: Joi.number().integer(),
  timeEnd: Joi.number().integer(),
});

router.get('/:id', async (req, res, next) => {
  
  try {
    const value = Joi.attempt(parseInt(req.params.id), Joi.number().integer().required());
    const session = await Session.findByPk(parseInt(req.params.id));
    res.json({ data: session });
  
  } catch(e) {
    next(e);
  }

});

//create new branch
router.post('/', async (req, res, next) => {
  
  try {
    const value = await postSchema.validateAsync(req.body);
    const newSession = await Session.create(value);
    
    res.json({ data: newSession });
  
  } catch(e) {
    next(e);
  }

});

router.put('/:id', async (req, res, next) => {
  
  try {
    const data = Object.assign(req.body, req.params);
    const value = await putSchema.validateAsync(data);
    const session = await Session.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      }
    });

    res.json({ data: session });

  } catch(e) {
    next(e);
  }

});

router.delete('/:id', async (req, res, next) => {
  
  try {
    const value = Joi.attempt(parseInt(req.params.id), Joi.number().integer().required());
    const result = await Session.destroy({
      where: {
        id: parseInt(req.params.id)
      }
    });

    res.json({ data: result });
    
  } catch(e) {
    next(e);
  }

});

module.exports = router;