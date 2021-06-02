const express = require('express');
const {
  validateUserId,
  validateUser,
  validatePost,

} = require('../middleware/middleware')

const User = require('./users-model')
const Post = require('../posts/posts-model')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res, next) => {
  User.get()
    .then(users=>{
      res.json(users)
    })
    .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  User.inster({ name: req.name})
    .then(newUser =>{
      res.status(201).json(newUser)
    })
    .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  
  console.log(req.name)
  console.log(req.user)
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
   
  console.log(req.user)
  console.log(req.text)
});

router.use((err, req, res, next)=>{ //eslint-disable-line
  res.status(err.status || 500).json(
    {
      customMessage: "sorry, something went wrong!",
      message: err.message,
      stack: err.stack,
    }
  )
})

// do not forget to export the router
module.exports = router