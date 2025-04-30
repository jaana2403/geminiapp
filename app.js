const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
app.use(bodyParser.json());
app.post("/getResponse", async (req, res) => {
  console.log(req.body.question);
  const genAI=new GoogleGenerativeAI('AIzaSyCPO2EWwXjqdTo4X_68Q8Uvhu_dKavPWUw');
  const model=genAI.getGenerativeModel({model:'gemini-2.0-flash'})
  const prompt="Explain how AI works in a few words"
  model.generateContent(req.body.question).then(result=>{
    console.log(result.response.text());
    const response = result.response.text();
    res.status(200).json({
        response:response
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
        error:err
    })
  })

});

module.exports = app;
