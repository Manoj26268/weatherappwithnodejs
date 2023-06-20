const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

const app = express();
      let  name  = "Warangal";
      let description  = "little cloudy";
      let icon = "https://openweathermap.org/img/wn/04n.png";
      let temp  = "31";
      let humidity = "30";
      let  speed  = "5";
app.set('view engine','ejs');
app.use(express.static('Public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    
    res.render("list",{weathericon:icon,city:name,temperature:temp,weatherdescription:description,humid:humidity,windspeed:speed});
})

app.post("/",function(req,res){
    const query = req.body.cityName;
    const document = req.body;
    const apiKey = "20812717238ec6f4c45496aeeed0c2a9";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url,function(response){
        if(response.statusCode === 200){
            response.on("data",function(data){
                const weatherData = JSON.parse(data);
             //    console.log(weatherData);
             //    const temp = weatherData.main.temp;
            name  = weatherData.name;
            description  = weatherData.weather[0].description;
            const icon1 = weatherData.weather[0].icon;
            icon="https://openweathermap.org/img/wn/" + icon1+ "@2x.png";
            temp  = weatherData.main.temp;
            humidity = weatherData.main.humidity;
            speed  = weatherData.wind.speed;
            res.redirect("/");   
             })
        }
        else {
            res.sendFile(__dirname+"/failure.html");
        }
       
        
       
    })
})
app.post("/failure",function(req,res){
    res.redirect("/");
})


app.listen(PORT,function(){
    console.log("server started at ${PORT}");
})