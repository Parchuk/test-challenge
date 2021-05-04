const express = require('express');
const User = require('../../models/user');

const router = express.Router();

router.get('/users', async (req, res) => {
  const { page = 1, limit = 10, filterName, filterType = -1 } = req.query;

  const filterParams = {};
  if (filterName && +filterType) {
    filterParams[filterName] = filterType;
  } else {
    filterParams[null] = -1;
  }

  try {
    // execute query with page and limit values
    const users = await User.find()
      .sort(filterParams)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Posts col lection
    const count = await User.countDocuments();

    // return response with posts, total pages, and current page
    res.status(200).json({
      users,
      // totalPages: Math.ceil(count / limit),
      collectionSize: count,
      currentPage: page,
    });
  } catch (err) {
    return res.status(400).json({ message: 'Something went wrong' });
  }
});
router.get('/users/:id', (req, res) => {
  User.findById({ _id: req.params.id })
    .then((data) => {
      // setTimeout(() => {
      return res.status(200).json(data);
      // }, 5000);
    })
    .catch((err) => {
      return res.status(400).json({ message: 'Something went wrong' });
    });
});

router.post('/users', (req, res) => {
  const {
    name,
    surname,
    dateOfBirthday,
    phone,
    email,
    lastModified,
  } = req.body;

  const newUser = new User({
    name,
    surname,
    dateOfBirthday,
    phone,
    email,
    lastModified,
  });
  newUser
    .save()
    .then((data) => {
      return res.status(201).json({ data, message: 'User has been created' });
    })
    .catch((err) => {
      return res.status(400).json({ message: 'Something went wrong' });
    });
});

router.put('/users/:id', (req, res) => {
  const {
    _id,
    name,
    surname,
    dateOfBirthday,
    phone,
    email,
    lastModified,
  } = req.body;

  const updatedUser = {
    name,
    surname,
    dateOfBirthday,
    phone,
    email,
    lastModified,
  };
  User.findByIdAndUpdate({ _id }, updatedUser)
    .then((data) => {
      return res.status(200).json({ data, message: 'User has been updated' });
    })
    .catch((err) => {
      return res.status(400).json({ message: 'Something went wrong' });
    });
});

router.delete('/users/:id', (req, res) => {
  User.findByIdAndDelete({ _id: req.params.id })
    .then((data) => {
      return res.status(200).json({ message: 'User has been delated' });
    })
    .catch((err) => {
      return res.status(400).json({ message: 'Something went wrong' });
    });
});

module.exports = router;
