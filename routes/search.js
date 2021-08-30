const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const { Branch, Guest, Meal, Session } = require('../libs/model');
const redis = require('../libs/redis');

const Joi = require('joi');

const searchSchema = Joi.object({
  radius: Joi.number().integer().min(10).required(),
  latitude: Joi.string().required(),
  longitude: Joi.string().required(),
  day: Joi.string().required(),
  time: Joi.number().integer().required(),
});

const isMaxOut = async (sessionId) => {
  try {
    const session = await Session.findByPk(parseInt(sessionId));
    const numReservation = await Reservation.count({ 
      where: { 
        session_id : sessionId
      } 
    });
    if(session & numReservation) {
      if(session.capacity < numReservation) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch(e) {
    throw e; 
  }
  

}

router.get('/', async (req, res, next) => {
  
  try {
    const value = await searchSchema.validateAsync(req.query);
    //search nearby branch first
    const redisResult = await redis.georadius('branch', value.longitude, value.latitude, value.radius, 'm')
    
    if (redisResult.length > 0) {
      const branches = redisResult.map(x => parseInt(x));

      //find matched sessions
      const sessions = await Session.findAll({
        where: {
          branch_id: branches,
          day: value.day,
          timeStart: value.time,
        }
      });

      if(sessions.length > 0) {
        //get session that not maxed out first
        let filteredSessions = sessions.filter(async (session) => {
          let isMaxedOut = await isMaxOut(session.id);
          if(!isMaxedOut) {
            if(session.onDemand == true) {
              return session;
            }
            
          }
        });

        res.json({ data: filteredSessions });
      } else {
        res.json({ data: {} });
      }
      


    } else {
      res.json({ data: {} });
    }
    
  
  } catch(e) {
    next(e);
  }

});



module.exports = router;