const express = require('express'),
  cors = require('cors'),
  path = require('path'),
  log = console.log,
  DEFAULT_ROUTER = '/api/',
  mongoose = require('mongoose'),
  config = require('./config/db'),
  mongodb = config.db,
  users = require('./routes/users/users'),
  subscribeEmail = require('./routes/subscribeEmail/subscribeEmail'),
  items = require('./routes/items/items');
(port = process.env.PORT || 3000), (fileUpload = require('express-fileupload')), (app = express());

// * Config
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

//  Connect to DB
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });

//  Succes
mongoose.connection.on('connected', () => {
  log('Connected to DB !');
});

//  Error
mongoose.connection.on('error', () => {
  log(`Connected to failed: ${error} !`);
});

// Authorization/Registraion
app.use(`${DEFAULT_ROUTER}users`, users);

// Subscribe to the newsletter
app.use(`${DEFAULT_ROUTER}subscribeEmail`, subscribeEmail);

// Add/Get/Change/Delete items
app.use(`${DEFAULT_ROUTER}items`, items);

// UPLOAD FILE
app.post('/upload', async (request, response) => {
  console.log('req: ', request.body);
  try {
    if (!request.files) {
      if (request.body) {
        response.status(200).json({
          status: true,
          message: 'File is uploaded',
          data: {
            name: request.body.file.replace(`http://localhost:3000/getFile/`, ''),
          },
        });
      } else {
        response.status(420).json({
          succes: false,
          message: 'No file is uploaded!',
        });
      }
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let image = request.files.file;
      const name = new Date().getTime() + image.name;
      //Use the mv() method to place the file in the upload directory (i.e. "uploads")
      image.mv('./uploads/' + name);

      //send response
      response.status(200).json({
        status: true,
        message: 'File is uploaded',
        data: {
          name,
        },
      });
    }
  } catch (err) {
    response.status(500).send(err);
  }
});

app.get('/getFile/:name', async (request, response) => {
  try {
    const { name } = request.params;
    response.sendFile(path.join(__dirname, 'uploads/', name));
  } catch (error) {
    response.status(500).json({
      succes: false,
      message: 'Strange error1!',
    });
  }
});

//  Default routes
app.get('**', (request, response) => {
  response.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
  log(`App has been started in port ${port}`);
});
