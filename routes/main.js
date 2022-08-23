const https = require("https");

module.exports = (app) => {

app.get("/", function(req, res){

    res.render("index");

});

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
            

            // res.write("<h1>The temperature in " + query + " is " +  temp + " Degrees Celcius.</h1>");
            // res.write("<h3>The weather is currently " + weatherDiscription + " and the thermal sensation is " + feelsLike + " Degrees Celcius</h3>");
            // res.write("<img src=" + imgURL + "></img>");
            res.render("post", {query: query, temp: temp, weatherDiscription: weatherDiscription, feelsLike: feelsLike, imgURL: imgURL});
            }

            run().catch(e => res.render("failure"));
        });
        
    });

});
}
