var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set("port", (process.env.PORT || 5000));

app.get("/data/:food", function(req,res){

    var dataFood = {
      "food": req.params.food
    }

    res.send(dataFood);


    // if(gremlins == "Pizza"){
    //    res.send("hey we got Pizza!");
    // } else {
    //    res.send("You are not Pizza");
    // }
});

app.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "./public/", file));
});

app.listen(app.get("port"), function(){
    console.log("Listening on port: " , app.get("port"));
});
