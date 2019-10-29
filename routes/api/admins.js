const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

// @route Get api/admins/test
// @Desc Tests admins route
// @access Public
router.get('/test', (req, res) => {
  res.json({ msg: 'admins works' });
});

module.exports = router;
