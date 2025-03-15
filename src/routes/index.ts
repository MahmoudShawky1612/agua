import express from 'express';
import user from './user.route';
import drink from './drank.route';

const router = express.Router();

router.use('/user', user);
router.use('/drink', drink);
router.get('/', (req, res) => {
    res.send("testing");
})
export default router;