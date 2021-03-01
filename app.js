const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res)
{
  res.sendFile(__dirname + "/index.html");
 });
 app.post("/",function(req,res){
   const query = req.body.cityName;
   const unit = "metric";
   const apiKey = "8c599a265e09d236f42460675dafeff9";
     const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit;
     https.get(url,function(response)
     {
       console.log(response.statusCode);
       response.on("data",function(data)
       {
         //console.log(data);we get a hexadecimal values and we need to convert
         const weatherData = JSON.parse(data);
         //console.log(weatherData);
         const temp = weatherData.main.temp;
         const weatherDescription = weatherData.weather[0].description;
         const icon = weatherData.weather[0].icon
         const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
         //console.log(temp);
         //console.log(weatherDescription);
         res.write("<p> The Weather is currently " + weatherDescription + "<p>");
         res.write("<h1>The Temperature in"+ query +" is "+ temp +"degree celcius</h1>");
         res.write("<img src ="+imageURL+">");
       });

     });
 });





app.listen(3000,function(){
  console.log("Server Is Running On Port:3000.");
});
