const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// Load Custoemr Model
const Customer = require('../../models/Customer');

// eslint-disable-next-line new-cap
const router = express.Router();

// @route Get api/customers/test
// @Desc Tests customers route
// @access Public
router.get('/test', (req, res) =>
  res.json({ msg: 'customers works' }),
);

// @route Get api/customers/register
// @Desc Register customer
// @access Public
router.post('/register', (req, res) =>
  Customer.findOne({ email: req.body.email }).then(customer => {
    if (customer) {
      return res.status(400).json({ email: 'email already exsists' });
    } else {
      const newAvatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm', // Default
      });

      const newCustomer = new Customer({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        avatar: newAvatar,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newCustomer.password, salt, (err, hash) => {
          if (err) throw err;
          newCustomer.password = hash;
          newCustomer
            .save()
            .then(customer => res.json(customer))
            .catch(err => console.log(err));
        });
      });
    }
  }),
);

module.exports = router;
