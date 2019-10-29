const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

// @route Get api/posts/test
// @Desc Tests customers route
// @access Public
router.get('/test', (req, res) =>
  res.json({ msg: 'customers works' }),
);

module.exports = router;
