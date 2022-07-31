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
            const weatherData = JSON.parse(data)
            
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
        });
    });

});

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html")

});


// LISTEN ROUTE
app.listen(port, () => console.log(`Server started at port: ${port}`)
);

/* 

So far, o que eu fiz foi recriar outro projeto, com outro arquivo js e colocar o boilerplate da library express do node. Em seguida, eu coloquei o https nativo do node:

const https = require("https");

criei uma const url = minha key da API de weather e usei o:

https.get(url, function(){

});

que vai fazer uma solicitação pela internet, usando o protocolo HTTPS. Quando obtiver a reposta, a callback function vai mostrar no console.

Dentro do console.log(response.statusCode); Podemos usar esse statusCode para checar o status do nosso código (200 = ok).

Em seguida, eu uso response.on("data", function(data){
    console.log(data)
});

Para verificar que dado está sendo retornado. No hyper terminal, aparece um buffer com um codigo hexadecimal, eu converto ele e descubro que 
era o inicio do meu arquivo json da API. Sendo assim, seria muito mais interessante receber de volta um arquivo objeto de js. Para isso, preciso con
verter os dados para um arquivo js.

Para fazer isso, vou usar JSON.parse():

app.get("/", function(req, res){

    const url = "https://api.openweathermap.org/data/2.5/weather?q=Vitoria,Brazil&appid=a4ff23a5dcf1e5eabf6e032febc4e949&units=metric";

    https.get(url, function(response){
        console.log(response)


        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            console.log(weatherData)
        });
    });

Eu retiro o console.log, passo ele para baixo, coloco uma const com o JSON.parse(data), com os dados que serão retornados da API.
Depois, dentro do console.log eu adiciono a minha const. É possível ver no hyper terminal que printamos um arquivo objeto inteiro
de js.

Se eu quiser puxar um dado ou outros em específico, eu preciso usar outra const:

const temp = weatherData.main.temp

Agora eu posso console.log(temp); para saber especificamente só a temperatura.

Dica: caso o arquivo seja muito grande, é bom colocar a url da api no chrome e usar a extensão JSON viewer para achar o dado que eu 
quero e copiar o caminho (copy path).

Lembrar: Só pode ter um res.send no código todo. Mas eu posso ter vários res.write();. Para isso, eu mudo todos para res.write(); e
coloco o que eu quero e no final eu uso res.send();, desse jeito:

res.write("<h1>The temperature in Vitoria is " +  temp + " Degrees Celcius.</h1>")
res.write("The weather is currently" + weatherDiscription)
res.send()

Agora, falta uma image. Para isso, eu crio outra const para selecionar o icone e coloco o seu caminho (path):

const icon = weatherData.weather[0].icon
const imgURL = "http://openweathermap.org/img/wn/10d@2x.png"

Depois crio outra const para a URL da imagem do icone como uma string. Depois mudo na parte do icone ID dentro da URL para o ID do
icone que eu quero. Usando concatenação:

const icon = weatherData.weather[0].icon
const imgURL = "http://openweathermap.org/img/wn/" + "icon" + "@2x.png"

Por fim, escrevemos outro res.write() para adicionar a img ao site (concatenando também):

res.write("<img src=" + imgURL + "></img>")

*/


/* 

FASE 2
========

Comecei agora a criar a parte html, coloquei o plate normal e fiz como o projeto do calculator node. Agora, trouxe tudo para o app.js
Retirei toda parte do const e https.get, por enquanto, e add o arquivo html no app.get com res.sendFile(__dirname + "/index.html").

Agora, usei app.post() para postar que o nosso input de fato está sendo recebido. Mas agora, ainda preciso adicionar outro package que
eu estava usando antes, que é o bodyParser. Ele vai permitir que a gente entre em qualquer uma das rotas definidas e que possamos acessar 
algo que foi pedido. É a versão analisada do HTTP Request. Para isso, vamos entrar em alguma rota que já temos e colocar:

req.body. Que vai te retornar o form data armazenado que o user colocou. 

Para inicializar o bodyParser, basta digitar: npm i body-parser.

Agora preciso criar a const bodyParser = require("body-parser"). Depois, usar o app.use(bodyParser.urlencoded({extended: true})); para
começar a nossa solicitação de análise.




*/