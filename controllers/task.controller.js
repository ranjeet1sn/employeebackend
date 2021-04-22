const task = require('../modals/task.modal');
exports.addTask = (req, res) => {
  const data = new task({
    name: req.body.name,
    description: req.body.description,
    assignee: req.body.assignee,
    priority: req.body.priority,
    date: req.body.date,
    status:req.body.status
  })
  data.save().then(doc => {
    res.status(200).json({
      message: 'Task created Succssfully',
      data: doc
    })
  }).catch(error => {
    res.status(200).json({
      message: 'Error Occured'
    })
  })
}
exports.getTask = (req, res) => {
  let currentPage = +req.query.currentPage;
  let pageSize = +req.query.pageSize;
  let assignee = req.query.assignee;
  let query = task.find();
  let fetchedPost;
  if (currentPage && pageSize) {
    if (assignee && assignee !== null) {
      query = task.find({ 'assignee.email': assignee });
    }
    else {
      query.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }

  }
  query
    .find()
    .then((data) => {
      fetchedPost = data;
      return task.count();
    })
    .then((count) => {
      let total = 0;
      if (assignee && assignee !== null) {
        total = 0;
      }
      else {
        total = count;
      }
      res.status(200).json({
        message: "Post Fetch Successfully",
        data: fetchedPost,
        totalPost: total,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fecthing Post Failed ",
      });
    });
}
exports.assignTask = (req, res) => {
  task.aggregate([{ $project: { assignee: 1, _id: 0 } }])
    .then((doc) => {

      res.status(200).json({
        data: doc,
      });
    })
    .catch((error) => {
      res.status(200).json({
        error: "Error Ocurred",
      });
    });
}

exports.singleTask = (req, res) => {
  task.find({ 'assignee._id': req.params.id }).then(doc => {
    res.status(200).json({
      message: 'Task fetch Successfully',
      data: doc
    })
  }).catch(error => {
    res.status(200).json({
      message: 'Error Occured'
    })
  })
}

exports.deleteTask=(req,res)=>{
  const item = JSON.parse(req.query.item);
  task.deleteMany({_id:{$in:item} })
  .then((data) => {
    res.status(200).json({
      message: "Task Deleted Succesfully",
      data: data,
    });
  })
  .catch((error) => {
    res.status(500).json({
      message: "Task Delete Failed ",
    });
  });
}