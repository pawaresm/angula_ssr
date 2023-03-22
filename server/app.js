const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const path = require('path')
const data = require('./data')
// Enable CORS
app.use(cors());

// Enable body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Sample data
let photo = data.list

// Get all photo
app.get('/api', (req, res) => {
setTimeout(() => {
    res.json(photo);
}, 10000);
});

// Get a Photos by ID
app.get('/api/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const Photos = photo.find(Photos => Photos.id === id);
    if (Photos) {
        res.json(Photos);
    } else {
        res.status(404).json({ error: `Photos with ID ${id} not found` });
    }
});


try {
    // ssr
    const universalServer = require('../server/dist/myapp/server/main');
    const publicPath = path.join(__dirname ,'dist', 'myapp', 'browser');
    const staticMiddleware = express.static(publicPath, { index: false });
    app.use(staticMiddleware);
    app.use('*', universalServer.app());
    //end ssr
} catch (error) {
console.log('error------->',error);
}





// Start the server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
