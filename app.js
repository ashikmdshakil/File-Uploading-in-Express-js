var express = require('express');
//var route = require('./Routes');
var multer = require('multer')
var path = require('path');
var app = express();


const storage = multer.diskStorage({
    destination : './Public/uploads/',
    filename : function(request, file, cb){
        cb(null , Date.now()+'-'+file.originalname);
    }
});
const upload = multer({
    storage : storage
}).single('myFile');

const uploadMulti = multer({
    storage : storage
}).array('myFile',3);

app.set('views', path.join(__dirname, 'View'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'Public')));
  
app.get('/', (request, response)=>{
    response.render('index');
});

app.post('/upload', (request, response) =>{
    upload(request, response, (err) =>{
        if(err){
            console.log("error occured .....");
        }
        else{
            console.log(request.file.filename);
            response.render('display',{name : request.file.filename});
        }
    })
});

app.post('/uploadMulti', (request, response) =>{
    uploadMulti(request, response, (err) =>{
        if(err){
            console.log("error occured .....");
        }
        else{
            console.log(request.files);
        }
    })
});


app.listen(3000, ()=>{  
    console.log("server is running .......");
})