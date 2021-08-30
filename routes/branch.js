const express = require('express');
const router = express.Router();
const { Branch } = require('../libs/model');

const Joi = require('joi');

const postSchema = Joi.object({
  //id: Joi.number().integer().required(),
  name: Joi.string().required(),
  latitude: Joi.string().required(),
  longitude: Joi.string().required(),
});


router.get('/', async (req, res, next) => {
  
  try {

  
  } catch(e) {
    next(e);
  }

});

//create new branch
router.post('/', async (req, res, next) => {
  
  try {
    const value = await postSchema.validateAsync(req.body);

    res.json({ data: value });
  
  } catch(e) {
    next(e);
  }

});

router.put('/', async (req, res, next) => {
  
  try {
    
  
  } catch(e) {
    next(e);
  }

});

router.delete('/', async (req, res, next) => {
  
  try {
    
  
  } catch(e) {
    next(e);
  }

});

module.exports = router;