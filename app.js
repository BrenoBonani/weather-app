require('dotenv').config()

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.post("/", function(req, res){
  
    const query = req.body.cityName;
    const apiKey = process.env.API_KEY;
    const units = process.env.UNITS_KEY;
    const url = process.env.API_URI + query + "&appid=" + apiKey + "&units=" + units;

    https.get(url, function(response){
        console.log(response)


        response.on("data", function(data){

            async function run(){
            const weatherData = await JSON.parse(data)
            
            const temp = weatherData.main.temp;
            const weatherDiscription = weatherData.weather[0].description;
            const feelsLike = weatherData.main.feels_like;
            
            const icon = weatherData.weather[0].icon;
            const imgURL = process.env.IMG_URL + icon + "@2x.png";
            
            console.log(weatherData);

            res.write("<h1>The temperature in " + query + " is " +  temp + " Degrees Celcius.</h1>");
            res.write("<h3>The weather is currently " + weatherDiscription + " and the thermal sensation is " + feelsLike + " Degrees Celcius</h3>");
            res.write("<img src=" + imgURL + "></img>");
            res.send();
            }

            run().catch(e => res.sendFile(__dirname + "/failure.html"));
        });
        
    });

});

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html")

});


// LISTEN ROUTE
app.listen(port, () => console.log(`Server started at port: ${port}`)
);
