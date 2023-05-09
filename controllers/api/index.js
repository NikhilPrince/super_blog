const router = require('express').Router();
const userRoutes = require('./userRoutes');
const animalsRoutes = require('./animalsRoutes');
const adoptableRoutes = require('./adoptableRoutes');

router.use('/users', userRoutes);
router.use('/animals', animalsRoutes);
router.use('/adoptable', adoptableRoutes);

module.exports = router;