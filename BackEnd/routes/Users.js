const { Users } = require('../models/Users');
const express = require('express');
const router = express.Router();
require('dotenv/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// get user info by id
router.get('/user/:id', async (req, res) => {
    const  User = await Users.findById(req.params.id);

    if (!User) {
        return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.json({ success: true, data: User });

})


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await Users.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, user.password);
  
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user._id }, 'your_secret_key');
  
      const userDetails = {
        _id: user._id,
        name: user.name,
        email: user.email,
        theme: user.theme,
        blood: user.blood,
        dob: user.dob,
        Allergies: user.Allergies,
        role : user.role,
      };
  
  
      res.json({ token, user: userDetails });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


router.post('/user/checkemail', async (req, res) => {

    const { email } = req.body;
    console.log(email);

    try {

      const user = await Users.findOne({ email: email });
      if (user) {
        return res.status(200).json({ message: 'email already registered' });
      }
  
      res.status(200).json({ message: 'email is available' });
    } catch (error) {
      console.error("err",error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


router.post('/user/register', async (req, res) => {
    hashedPassword = await bcrypt.hash(req.body.password, 10);
  
    console.log(req.body);
  
    try {
      let newUser = new Users({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        dob : req.body.dob,
        theme : req.body.theme,
        blood : req.body.blood,
        Allergies : req.body.Allergies,
      });
  
      console.log(newUser);

      newUser = await newUser.save();
  
      if (!newUser) {
        return res.status(400).send('New user cannot be added!');
      }
  
      res.send(newUser);
    } catch (error) {
      res.status(500).send('Error adding user ' + error);
      console.log(error);
    }
  });

// // Get all users 
// router.get(`/token/`, async (req, res) => {

//     const UserList = await Users.find().sort({ $natural: -1 });

//     if (!UserList) {
//         res.status(500).json({ success: false })
//     }
//     res.send(UserList);
// })


// //check token is exist or not
// router.get(`/token/:token`, async (req, res) => {
//     const User = await Users.findOne({ token: req.params.token });

//     if (!User) {
//         return res.status(404).json({ success: false, message: 'Token not found.' });
//     }
//     res.json({ success: true, data: User });

// })

// //get by token
// router.get(`/user/:token`, async (req, res) => {
//     const User = await Users.findOne({ token: req.params.token });

//     if (!User) {
//         return res.status(404).json({ success: false, message: 'Token not found.' });
//     }
//     res.json({ success: true, data: User });

// })

// //add  
// router.post('/user/', async (req, res) => {
//     const token = req.body.token;
//     const theme = req.body.theme;

//     const user = await Users.findOne({ token });

//     if (user) {
//         return res.status(400).send('User token already exists!');
//     }

//     let newUser = new Users({ token , theme });

//     newUser = await newUser.save();

//     if (!newUser) {
//         return res.status(400).send('User token cannot be added!');
//     }

//     res.send(newUser);
// });


// //change by token
// router.put('/user/:token', async (req, res) => {

//     const User = await Users.findOneAndUpdate(
//         { token: req.params.token },
//         {
//             theme: req.body.theme,
//         },
//         { new: true }  // to get the updated data
//     )

//     if (!User)
//         return res.status(400).send('User cannot be edit!')

//     res.send(User);
//     console.log(User);
// })



//update the user
router.put('/user/edit/:id', async (req, res) => {

    const User = await Users.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            dob : req.body.dob,
            theme : req.body.theme,
            blood : req.body.blood,
            Allergies : req.body.Allergies,
        },
        { new: true }  
    )

    if (!User)
        return res.status(400).send('User cannot be edit!')

    res.send(User);
})


// //delete the post
// router.delete('/token/:id', (req, res) => {

//     Users.findByIdAndRemove(req.params.id).then(user => {
//         if (user) {
//             return res.status(200).json({ success: true, message: 'user deleted!' })
//         } else {
//             return res.status(404).json({ success: false, message: "user not found!" })
//         }
//     }).catch(err => {
//         return res.status(500).json({ success: false, error: err })
//     })
// })


module.exports = router;
