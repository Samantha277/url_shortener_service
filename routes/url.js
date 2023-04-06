const express = require('express');
const router = express.Router();

const validUrl = require('valid-url');
const shortid= require('shortid');
const config = require('config');

const Url = require('../models/Url');

// @route POST/api/url/shorten
// @desc  Create short URL
router.post('/shorten', async (req, res) => {

    console.log("Request is: ", req.body);
    // console.log("Result is: ", res);
    const { longUrl }  = req.body
    const baseUrl = config.get('baseUrl');
   

    //Check base url
    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json('Invalid base url: ');
    }

    // Create url code
    const urlCode = shortid.generate();
    // console.log("Long url is: ",  longUrl);
    // Check long url
    if(validUrl.isUri(longUrl)){
        try{
            let url = await Url.findOne({longUrl});
            if(url){
                res.json(url);
            } else{
                const shortUrl = 'goto/'+urlCode;
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();
                // res.json(url);
                res.redirect('/');
            }
        }catch(err){
            console.error(err);
            res.status(500).json('Server error');
        }
    }else{
        res.status(401).json('Invalid long url');
    }
});

// router.post('/shortUrls', async (req, res) => {
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

module.exports = router;