const router = require('express').Router();
const authenticate = require('../middleware/auth');
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/validate', authenticate, (req, res) => {
    res.json({ valid: true });
});

module.exports = router;
