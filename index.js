const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const MONGO_URL =
  'mongodb+srv://admin:1q2w3e4r@cluster0.vyjc7.mongodb.net/mern?retryWrites=true&w=majority';

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/', require('./routes/api/users'));

if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/client/dist/test-challenge'));

  // Handle SPA
  app.get(/.*/, (req, res) =>
    res.sendFile(__dirname + '/client/dist/test-challenge/index.html')
  );
}

const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(PORT, () =>
      console.log(`Server has been started on port ${PORT}...`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
