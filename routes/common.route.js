const express = require("express");
const router = express.Router();
const status= require('../modals/status.modal')
router.post('/',(req,res)=>{
 const state = new status({
    status:req.body.mainstatus
 })
 state.save().then(doc=>{
     res.status(200).json({
         message:'Status Added Successfully',
         data:doc
     })
 }).catch(error=>{
    res.status(500).json({
        message:'Status Add Failed',
    });
 });
})
router.get('/',(req,res)=>{
 status.find().then(doc=>{
    res.status(200).json({
        message:'Status Fetch Successfully',
        data:doc
    })
 }).catch(error=>{
    res.status(500).json({
        message:'Status Fetch Failed',
    });
})
})

router.put('/:id',(req,res)=>{
    const state = {
       status:req.body.mainstatus
    }
    status.findByIdAndUpdate(req.params.id, { $set: state }).then(doc=>{
        res.status(200).json({
            message:'Status Updated Successfully',
            data:doc
        })
    }).catch(error=>{
        console.log(error);
       res.status(500).json({
           message:'Status Updated Failed',
       });
    });
   })

module.exports =router