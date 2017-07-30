window.onload = function(){
}


function getData(){
  var ajax = new XMLHttpRequest();
  ajax.open('get','./api/infos.json',function(x){
    document.getElementById('value').innerHTML=x;
    console.log(x);
  });
  ajax.send();
}
