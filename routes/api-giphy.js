const router = require("express").Router();
const axios = require("axios");

//=======GIF========//
// GET GIF
router.get("/:name", async function(req, res) {
    try{
      const key = process.env.GIF_API_KEY;
      const data = await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${key}&tag=${req.params.name}&lang=eng&limit=1`);
      res.json(data.data);
  
    }
    catch(err){
      res.json(err)
    }
  
  })
  
  
  
  module.exports = router