const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    const query = req.body.cityName;
    const document = req.body;
    const apiKey = "20812717238ec6f4c45496aeeed0c2a9";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url,function(response){
        response.on("data",function(data){
           const weatherData = JSON.parse(data);
        //    console.log(weatherData);
        //    const temp = weatherData.main.temp;
      const  name  = weatherData.name;
      const description  = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const temp  = weatherData.main.temp;
      const humidity = weatherData.main.humidity;
      const  speed  = weatherData.wind.speed;
      // document.querySelector(".city").innerText = "Weather in " + name;
      // document.querySelector(".icon").src =
      //   "https://openweathermap.org/img/wn/" + icon + ".png";
      // document.querySelector(".description").innerText = description;
      // document.querySelector(".temp").innerText = temp + "°C";
      // document.querySelector(".humidity").innerText =
      //   "Humidity: " + humidity + "%";
      // document.querySelector(".wind").innerText =
      //   "Wind speed: " + speed + " km/h";
      // document.querySelector(".weather").classList.remove("loading");
      // document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + ")";
      res.write("<h1>weather in "+name+" "+description+"</h1>");
      res.write("<h3>and temperature is "+temp+" humidity is "+humidity+"</h3>");
      res.write("<img src=https://openweathermap.org/img/wn/"+icon+"@2x.png>");
       res.send();
           
        })
    })
})


app.listen(PORT,function(){
    console.log("server started at ${PORT}");
})