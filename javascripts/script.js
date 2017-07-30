
function getData(){
  var ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       document.getElementById("value").innerHTML = ajax.responseText;
       console.log(ajax.responseText);
    }
};
  ajax.open('get','./api/infos.json',true);
  ajax.send();
}
