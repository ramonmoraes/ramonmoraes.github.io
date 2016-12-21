function showup(i){
var x = document.getElementsByClassName("hiddenbox");

if(x[i].style.display=="block"){
	x[i].style.display="none";
	}else{
x[i].style.display="block";
}
}