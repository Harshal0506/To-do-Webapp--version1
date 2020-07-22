const express = require('express');
const date = require(__dirname+'/date.js');

const app = express();
const bodyparser=require('body-parser');
//constant in javascript refers to not assigning it to completely new array or object
const items=["Buy Food","Cook Food","Eat Food"];
const workItems=[];
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get('/',function(req,res){

	var day=date.getDate();
	
	res.render("list",{listTitle:day,listItems:items});
});

app.post("/",function(req,res){
	if (req.body.button=="work"){
	let item=req.body.newItem;
	workItems.push(item);
	res.redirect("/work");
	}
	else{
	let item=req.body.newItem;
	items.push(item);
	res.redirect("/");
	}

});


app.get("/work",function(req,res){
	res.render("list",{listTitle:"work",listItems:workItems});
})

app.get("/about",function(req,res){
	res.render("about");
})

app.listen(3000,function(){
	console.log('server is running on port 3000');
});
