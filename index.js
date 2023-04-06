const express = require('express');
const connectDB = require('./config/db');
const Url = require('./models/Url');
const app = express();
const shortid = require('shortid');



//connect to database
connectDB();

app.set('view engine', 'ejs');
//middleware to accept post url as json data
app.use(express.json({extended: false}));
app.use(express.urlencoded({extended: false}));
//Define Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

//Show index
app.get('/', async (req, res) => {
    //get all the urls inside of url table
    const shortUrls = await Url.find();
    res.render('index', {shortUrls: shortUrls})
});

//send url creation as post request
// app.post('/shortUrls', async (req, res) => {
//     const urlCode = shortid.generate();
//     const shortUrl = "http://localhost:5000/goto/"+urlCode;
//     const longUrl = req.body.longUrl;
//     // await url.create({ longUrl: req.body.longUrl, shortUrl, urlCode, date: new Date()})
//     let url = await Url.findOne({longUrl});

//         url = new Url({
//         longUrl: req.body.longUrl,
//         shortUrl,
//         urlCode,
//         date: new Date()
//     });

//     await url.save();
//     // await url.save(); 
//     res.redirect('/');
// });

// app.get('/:shortUrl', async (req, res) => {
//     const shortUrl = await Url.findOne({shortUrl: req.params.shortUrl})
//     if(shortUrl == null){
//         console.log("SHOWING ERROR");
//         return res.sendStatus(404)
//     }
//     res.redirect(shortUrl.longUrl);
// });

app.listen(process.env.PORT || 5000);