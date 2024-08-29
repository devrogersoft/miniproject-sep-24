const express = require('express');
const app = express();


app.use(express.json());

app.get('/api/test/', function(req, res){

    res.status(200).send('Hello World');   

});

app.listen(3000, function(){
    console.log('Server running on port 3000');
});

