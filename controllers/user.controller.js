const User = require("../modals/user.modal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
exports.createUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(500).json({
        message: "User Already Exist",
      });
    }
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      color: req.body.color,
      password,
    });
    newUser
      .save()
      .then((doc) => {
        res.status(200).send({
          message: "User Register succssfully",
          data: doc,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Registration Failed",
        });
      });
  } catch (error) {
    res.status(500).json({
      message: "Registration Failed",
    });
  }
}

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // throw error when email is wrong
    if (!user) return res.status(400).json({
      message: 'User Doesnot Exist'
    });

    // check for password correctness
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    //password match condition
    if (!validPassword)
      return res.status(400).json({
        message: "Wrong Password"
      });
    let isAdmin = false;
    console.log(user.email);
    if (user.email === 'qranjeet1@gmail.com' ||user.email === 'sranjeet022@gmail.com') {
      isAdmin = true;
    }
    else {
      isAdmin = false
    }
    const payload = { email: user.email, userId: user._id, admin: isAdmin, color: user.color };
    const options = { expiresIn: "1h", issuer: "http://localhost:3000" };
    // const secret = "secret";
    const token = jwt.sign(payload, secret = process.env.SECRET_KEY, options,);

    res.status(200).json({
      expiresIn: 3600,
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

}

exports.getUser = (req, res) => {
  User.aggregate([{ $project: { color: 1, email: 1 } }])
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

exports.resetLink = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({
      message: 'User Doesnot Exist. Please Register First'
    });
    const payload = { email: user.email, userId: user._id, color: user.color };
    const options = { expiresIn: "1h", issuer: "http://localhost:3000" };
    const token = jwt.sign(payload, secret = process.env.NEW_SECRET, options);
    var transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: 'sranjeet022',
        pass: 'Ranjeet@1singh',
      },
    });
  
    var mailOptions = {
      from: "sranjeet022@gmail.com",
      to: `${ user.email}`,
      subject: 'Reset Email Link',
      text: `Hello .You can reset your password here http://localhost:4200/auth/reset-password?token=${token}`,
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
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
  } catch (error) {
    res.status(200).json({
      error: "Error Ocurred",
    });
  }
}
exports.resetPassword = async(req,res)=>{
  const password = await bcrypt.hash(req.body.password, 10);
  const obj = {
    email: req.body.email,
    color: req.body.color,
    password,
  }
  User.findByIdAndUpdate(req.params.id, { $set: obj })
  .then((doc) => {
    if (doc) {
      res.status(200).json({
        message: "Password Updated Successfully",
      });
    } else {
      res.status(401).json({
        message: "Updation Failed",
      });
    }
  })
  .catch((error) => {
    res.status(500).json({
      message: "Coludnot Update Password",
    });
  });
}