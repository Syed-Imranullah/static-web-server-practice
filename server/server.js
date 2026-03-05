const express = require('express');
const path = require('path');

const app = express();


const users = [{
    name: 'Syed',
    Age: 19,
    Gender: 'male'
}]

function logRoutes(req, res, next) {
  console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
  next();
}
app.use(logRoutes);

// the file path to the dist directory
const pathToFrontend = path.join(__dirname, '../frontend/dist');

// generate middleware using the file path
const serveStatic = express.static(pathToFrontend);

// Register the serveStatic middleware before the remaining controllers
app.use(serveStatic);

// other controllers 

const serverUser = (req, res, next) => {
    res.send(users)
}

const serverHello = (req, res, next) => {
    const name = req.query.name || 'Stranger'
    res.send({ message: `hello ${name}` });
}




//EndPoints 
app.get('/api', serverUser)
app.get('/api/name', serverHello)

const serve404 = (req, res, next) => {
  res.status(404).send({ error: `Not found: ${req.originalUrl}` });
}
app.use(serve404);
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


