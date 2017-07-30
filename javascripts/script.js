var ajax = new XMLHttpRequest();

ajax.open('get','./api/info',function(x){
  console.log(x);
});
ajax.send();
