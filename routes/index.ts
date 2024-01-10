import express from 'express';

const router = express.Router();

// controllers
import User from '../controllers/User';

router
  .get('/', (req, res) => {
    res.send("hey, how are you? this is a restful api");
  })
  
  // user management
  .post('/users/add', User.newUser)
  .post('/users/save', User.saveUser)
  .get('/users/get', User.getUsers)
  .get('/users/get/:userId', User.getUserInfo)
  .delete('/users/:userId', User.deleteUser)

export default router;