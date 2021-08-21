const express = require('express');
const app = express();
const path = require('path');
const api = require('./server/routes/api');
const bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));


app.use(express.static(path.join(__dirname, 'dist/training-project')));

app.use('/api',api);

app.get('*', function(req,res){
    res.sendFile(path.join(__dirname,'dist/training-project/index.html'));
})

app.listen(4000, ()=>{
    console.log("server is listening at port 4000");
});