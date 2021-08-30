const express = require('express');
const router = express.Router();
const { Guest } = require('../libs/model');

const Joi = require('joi');

const postSchema = Joi.object({
  //id: Joi.number().integer().required(),
  name: Joi.string().required(),
});

const putSchema = Joi.object({
  //id: Joi.number().integer().required(),
  id: Joi.number().integer().required(),
  name: Joi.string(),
});


router.get('/:id', async (req, res, next) => {
  
  try {
    const value = Joi.attempt(parseInt(req.params.id), Joi.number().integer().required());
    const guest = await Guest.findByPk(parseInt(req.params.id));
    res.json({ data: guest });
  
  } catch(e) {
    next(e);
  }

});

//create new branch
router.post('/', async (req, res, next) => {
  
  try {
    const value = await postSchema.validateAsync(req.body);
    const newGuest = await Guest.create(value);

    res.json({ data: newGuest });
  
  } catch(e) {
    next(e);
  }

});

router.put('/:id', async (req, res, next) => {
  
  try {
    const data = Object.assign(req.body, req.params);
    const value = await putSchema.validateAsync(data);
    const guest = await Guest.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      }
    });

    res.json({ data: guest });

  } catch(e) {
    next(e);
  }

});

router.delete('/:id', async (req, res, next) => {
  
  try {
    const value = Joi.attempt(parseInt(req.params.id), Joi.number().integer().required());
    const guest = await Guest.update({ isActive: 0 }, {
      where: {
        id: parseInt(req.params.id),
      }
    });

    res.json({ data: value });
    
  } catch(e) {
    next(e);
  }

});

module.exports = router;