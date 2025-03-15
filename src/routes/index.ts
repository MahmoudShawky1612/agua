import express from 'express';
import user from './user.route';
import drink from './drank.route';

const router = express.Router();
router.get('/', (req, res) => {
    res.json({ message: "API is working!" });
  });
router.use('/user', user);
router.use('/drink', drink);

export default router;