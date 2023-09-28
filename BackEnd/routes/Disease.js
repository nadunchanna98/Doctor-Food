const { Disease } = require('../models/Disease');
const express = require('express');
const router = express.Router();
require('dotenv/config');

// get Disease info by id
router.get('/disease/:id', async (req, res) => {
    const item = await Disease.findById(req.params.id);

    if (!item) {
        return res.status(404).json({ success: false, message: 'item not found.' });
    }

    res.json({ success: true, data: item });

})


//check topic is exist or not
router.post('/disease/checktitle', async (req, res) => {

    const { title } = req.body;

    try {

      const item = await Disease.findOne({ title: title });
      if (item) {
        return res.status(200).json({ message: ' already registered' });
      }
  
      res.status(200).json({ message: 'title is available' });
    } catch (error) {
      console.error("err",error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


router.post('/disease/add', async (req, res) => {

    try {
      let newDisease = new Disease({
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        important: req.body.important,
        veryimportant: req.body.veryimportant,
        causes: req.body.causes,
        recommondation: req.body.recommondation,
        symptoms: req.body.symptoms,
        image: req.body.image,
      });
  
      newDisease = await newDisease.save();
  
      if (!newDisease) {
        return res.status(400).send('cannot be added!');
      }
  
      res.send(newDisease);
    } catch (error) {
      res.status(500).send('Error adding user ' + error);
      console.log(error);
    }
  });

// Get all diesese
router.get('/', async (req, res) => {

    const DiseaseList = await Disease.find().sort({ $natural: -1 });

    if (!DiseaseList) {
        res.status(500).json({ success: false })
    }
    res.send(DiseaseList);
})


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
router.put('/disease/edit/:id', async (req, res) => {

    const item = await Disease.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            subtitle: req.body.subtitle,
            description: req.body.description,
            important: req.body.important,
            veryimportant: req.body.veryimportant,
            causes: req.body.causes,
            recommondation: req.body.recommondation,
            symptoms: req.body.symptoms,
            image: req.body.image,
        },
        { new: true }  
    )

    if (!item)
        return res.status(400).send('cannot be edit!')

    res.send(item);
})


//delete the post
router.delete('/disease/:id', (req, res) => {

  Disease.findByIdAndRemove(req.params.id).then(item => {
        if (item) {
            return res.status(200).json({ success: true, message: 'deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
})


module.exports = router;
