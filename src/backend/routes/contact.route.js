const express = require('express');
const db = require('../database/db');
const app = express();
const contactRoute = express.Router();

let ContactModel = require('../model/Contact');

// Add Contact
contactRoute.route('/create-contact').post((req, res, next) => {
  ContactModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all contacts
contactRoute.route('/').get((req, res) => {
    ContactModel.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  

// Get single contact
contactRoute.route('/get-contact/:id').get((req, res,next) => {
    ContactModel.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  

  //in progress
  contactRoute.route('/find-contact-by-name/:name').get((req, res,next) => {
    // ContactModel.findBy(req.params.id, (error, data) => {
    //   if (error) {
    //     return next(error)
    //   } else {
    //     res.json(data)
    //   }
    // })

    db.ContactModel.find({
        "first_name": new RegExp(req.params.name)

    },(error,data)=>{
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    })
  })

  
  // Update contact
  contactRoute.route('/update-contact/:id').put((req, res, next) => {
    ContactModel.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        return next(error);
        console.log(error)
      } else {
        res.json(data)
        console.log('Contact successfully updated!')
      }
    })
  })

  // Delete contact
  contactRoute.route('/delete-contact/:id').delete((req, res, next) => {
    ContactModel.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })
  
  module.exports = contactRoute;