const express = require("express");
const router = express.Router();
const taskControllers=require('../controllers/task.controller');

router.post('/',taskControllers.addTask);
router.get('/',taskControllers.getTask);
router.delete('/',taskControllers.deleteTask);
router.get('/assigntask',taskControllers.assignTask);
router.get('/:id',taskControllers.singleTask);

module.exports = router;