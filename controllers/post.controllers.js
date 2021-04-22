const Post = require("../modals/post.modal");
const nodemailer = require("nodemailer");

exports.createPost = async (req, res) => {
  try {
    const post = new Post({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      image: req.body.image,
      department: req.body.department,
      gender: req.body.gender,
      userId: req.userData.userId
    });

    try {
      const newPost = await post.save();
      res.status(200).send({
        messgae: "Post Created Successfully",
        data: newPost,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Creating a Post Failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Connection Failed ",
    });
  }
};

exports.getPost = (req, res) => {

  let currentPage = +req.query.currentPage;
  let PageSize = +req.query.PageSize;
  let search = req.query.text;
  let fetechPost;
  let query = Post.find();
  if (currentPage && PageSize) {
    if (search) {
      query = Post.find({ name: search });
    } else {
      query.skip(PageSize * (currentPage - 1)).limit(PageSize);
    }
  }
  query
    .find()
    .then((data) => {
      fetechPost = data;
      return Post.count();
    })
    .then((count) => {
      res.status(200).json({
        message: "Post Fetch Successfully",
        data: fetechPost,
        totalPost: count,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fecthing Post Failed ",
      });
    });
};

exports.deletePost = (req, res) => {
  Post.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).json({
        message: "Employee Deleted Succesfully",
        data: data,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Employee Delete Failed ",
      });
    });
};

exports.updatePost = (req, res) => {
  var post = {
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    image: req.body.image,
    department: req.body.department,
    gender: req.body.gender,
    userId: req.userData.userId
  };
  Post.findByIdAndUpdate(req.params.id, { $set: post })
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          message: "Post Updated Successfully",
        });
      } else {
        res.status(401).json({
          message: "Not Authorized",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Coludnot Update Post",
      });
    });
};

exports.sendMail = (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.EMAIL}`,
      pass: `${process.env.PASSWORD}`,
    },
  });

  var mailOptions = {
    from: "sranjeet022@gmail.com",
    to: `${req.body.to}`,
    subject: `${req.body.subject}`,
    html: `${req.body.description}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).json({
        message: "Email Send Failed",
      });
    } else {
      res.status(200).json({
        message: "Email Send Successfully",
        data: info.response,
      });
    }
  });
};

exports.getSingle = (req, res) => {
  Post.aggregate([{ $project: { name: 1, _id: 0 } }])
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
};

exports.singlePost = (req, res) => {
  const id = req.params.id;
  Post.findOne({ _id: id }).then(doc => {
    res.status(201).json({
      message: "Post Fetch Successfully",
      data: doc
    }).catch(error => {
      res.status(500).json({
        message: "Post Fetch Failed"
      })
    })
  })
}
exports.uniqueEmail = (req, res) => {
  Post.aggregate([{ $project: { email: 1, _id: 0 } }])
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
};
