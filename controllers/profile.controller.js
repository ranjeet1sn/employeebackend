const Profile = require("../modals/profile.modal");

exports.createProfile = async (req, res) => {
  try {
    const post = new Profile({
      name: req.body.name,
      email: req.body.email,
      image: req.body.image,
      number: req.body.number,
      address: req.body.address,
    });
    try {
      const newPost = await post.save();
      res.status(200).send({
        messgae: "Profile Created Successfully",
        data: newPost,
      });
    } catch (error) {
       
      res.status(500).json({
        error: "Error a Post Failed",
      });
    }
  } catch (error) {
  
    res.status(500).json({
      error: "Connection Failed ",
    });
  }
};

exports.getProfile = (req, res) => {
  Profile.findOne({ email: req.params.email })
    .then((doc) => {
      if (doc) {
        res.status(201).json({
          messge: "Profile get Successfully",
          data: doc,
        });
      }
    })
    .catch((error) => {
      res.status(401).json({
        messge: "Error Occured",
      });
    });
};

exports.updateProfile = (req, res) => {
  let user = {
    name: req.body.name,
    email: req.body.email,
    image: req.body.image,
    number: req.body.number,
    address: req.body.address,
  };
  Profile.findByIdAndUpdate(req.params.id, { $set: user })
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          message: "Profile Updated Successfully",
        });
      } else {
        res.status(401).json({
          message: "Not Authorized",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Coludnot Update Profile",
      });
    });
};
