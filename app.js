const app = require("./config/server");


const port = process.env.PORT || 3000;


// LISTEN ROUTE
app.listen(port, () => console.log(`Server started at port: ${port}`)
);
