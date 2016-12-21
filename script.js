function showup(i){
var x = document.getElementsByClassName("hiddenbox");
var y = document.getElementsByClassName("linkbox")

if(y[i].style.backgroundColor=="white"){
	y[i].style.backgroundColor="#cedff0";
}


if(x[i].style.display=="block"){
	x[i].style.display="none";
	}else{
x[i].style.display="block";
}
}