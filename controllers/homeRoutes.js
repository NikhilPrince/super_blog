const router = require('express').Router();
const { Adoptable, Users } = require('../models');
const withAuth = require('../seeds/utils/auth');
router.get('/', async (req, res) => {
  try {
    //console.log (req)
    // Get all Adoptable and JOIN with user data
    const adoptableData = await Adoptable.findAll({});
    // console.log (adoptableData)
    // Serialize data so the template can read it
    const adoptables = adoptableData.map((adoptable) => adoptable.get({ plain: true }));
    console.log(adoptables)
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      adoptables, 
      logged_in: req.session.logged_in 

    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/adoptable/:id', async (req, res) => {
  try {
    const adoptableData = await Adoptable.findByPk(req.params.id, {
      include: [
        {
          model: Users,
          attributes: ['name'],
        },
      ],
    });
    console.log('hello')
    const adoptable = adoptableData.get({ plain: true });

    res.render('adoptable', {
      ...adoptable,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await Users.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Adoptable }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
