var express=require('express');
var app=express();
var request=require('request');
homePage = '11Movie.ejs';
resultPage = '11MovieResult.ejs';
staticPath = "static";

app.use(express.static(staticPath));

app.get('/',function(req,res){
  res.render(homePage);
});

app.get('/result',function(req,res){

  var name=req.query.movieName;
   var url='https://api.themoviedb.org/3/search/movie?api_key=1688ae9f017a64ffd9f2354d03945d4e&language=en-US&query='+name;

  request(url,function(error,response,body){
    if(!error && response.statusCode==200){
      var parsedResult=JSON.parse(body);
      res.render(resultPage,{Result:parsedResult});
    }
    else
    {
      res.send("error");
    }
  });

});

app.listen(3000,function(){
  console.log("Server Started");
})
