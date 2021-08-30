const express = require('express');
const router = express.Router();
const { Reservation } = require('../libs/model');

const Joi = require('joi');

const postSchema = Joi.object({
  //id: Joi.number().integer().required(),
  guest_id: Joi.number().integer().required(),
  session_id: Joi.number().integer().required(),
  reserveDate: Joi.string().required(),
});

const putSchema = Joi.object({
  id: Joi.number().integer().required(),
  guest_id: Joi.number().integer(),
  session_id: Joi.number().integer(),
  reserveDate: Joi.string(),
});

router.get('/:id', async (req, res, next) => {
  
  try {
    const value = Joi.attempt(parseInt(req.params.id), Joi.number().integer().required());
    const reservation = await Reservation.findByPk(parseInt(req.params.id));
    res.json({ data: reservation });
  
  } catch(e) {
    next(e);
  }

});

//create new branch
router.post('/', async (req, res, next) => {
  
  try {
    const value = await postSchema.validateAsync(req.body);
    const newReservation = await Reservation.create(value);
    
    res.json({ data: newReservation });
  
  } catch(e) {
    next(e);
  }

});


router.delete('/:id', async (req, res, next) => {
  
  try {
    const value = Joi.attempt(parseInt(req.params.id), Joi.number().integer().required());
    const result = await Reservation.destroy({
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