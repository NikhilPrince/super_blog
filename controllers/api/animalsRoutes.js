const router = require('express').Router();
const { Animals } = require('../../models');
const withAuth = require('../../seeds/utils/auth');


router.post('/', withAuth, async (req, res) => {
  try {
    const newAnimals = await Animals.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newAnimals);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const animalsData = await Animals.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!animalsData) {
      res.status(404).json({ message: 'No pet found with this id!' });
      return;
    }

    res.status(200).json(animalsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
