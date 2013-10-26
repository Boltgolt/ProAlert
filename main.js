if (window.location.host != "www.probux.com"){
alert("You can only use ProAlert on probux.com... (DUH)")}

var doAlert = false}
var timeOut = 60
var oldTitle = document.title
var flashVar = true

var div = document.createElement("div");
div.style.width = screen.availWidth + "px";
div.style.height = "21px";
div.style.background = "#b30000";
div.style.color = "#ffffff";
div.style.textAlign="center";
div.style.fontSize="15px";
div.style.paddingTop="5px" 
div.style.position="relative";
div.style.borderBottom="3px solid #960000";
div.id = "ProAlertbar"
div.style.cursor="pointer";
div.innerHTML = "Loading ProAlert code...";

document.getElementById("header-menu").insertBefore(div,document.getElementById("header-menu").childNodes[0]);

function getName(){
getHttp(true)
var xmlhttp=new XMLHttpRequest()
xmlhttp.onreadystatechange=function(){ if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
xmlhttp.responseText.indexOf("My Account Details")
var done = false
var num = 0
while (done == false){
var num = num + 1
if (xmlhttp.responseText.slice(xmlhttp.responseText.indexOf("My Account Details")+21,xmlhttp.responseText.indexOf("My Account Details")+21+num).indexOf("<") != -1){
var num = num - 1
var done = true}}
div.onclick = function(){openOptions()};
div.innerHTML = "Welcome back " + xmlhttp.responseText.slice(xmlhttp.responseText.indexOf("My Account Details")+21,xmlhttp.responseText.indexOf("My Account Details")+21+num) + "! ProAlert has started successfully, click here to open the options."
timeSet = setTimeout(function(){time(timeOut + 1)},4500)}}
xmlhttp.open("GET","http://www.probux.com/account.php",true);
xmlhttp.send()
}

function openOptions(){
if(typeof timeSet !== "undefined"){clearTimeout(timeSet)}
div.style.height = "82px"
if (doAlert == true){var temp="checked='checked'"}
else {var temp=""}
div.innerHTML= "<form action='' method='post' onsubmit='return closeOptions();'>Change your tab to Probux when new ads are available. <input type='checkbox' id='checkform' " + temp + " ><br>Refresh data after <input type='text' id='textform' value='" + timeOut + "' maxlength='3' style='width: 25px;text-align: center;height:17px;border:none;box-shadow:none;'> seconds<br><a href='https://github.com/Boltgolt/ProAlert' style='color:white;text-decoration:none;'>github </a><input type='submit' value='Save & close' style='margin-top:9px;border:none;box-shadow:none;height:27px;width:auto;'><a href='#' style='color:white;text-decoration:none;'> forum</a></form>"
div.onclick=""
div.style.cursor="default";
}

function cancelOptions(){
div.style.height = "21px";
div.style.cursor="pointer";
div.onclick = function(){openOptions()};
time(timeOut + 1)
return false;
}

function closeOptions(){
if (document.getElementById("textform").value == ""){
error("That text field can't be empty!")
return false;}
if (parseInt(document.getElementById("textform").value) < 20){
error("The minimum is 20 seconds!")
return false;}
if (parseInt(document.getElementById("textform").value) > 600){
error("The maximum is 10 minutes!")
return false;}
if (parseInt(document.getElementById("textform").value) == "NaN"){
error("You can only enter numbers!")
return false;}
window.doAlert = document.getElementById('checkform').checked
setCookie("ProAlert-Alert",doAlert,365)
window.timeOut = parseInt(document.getElementById("textform").value)
setCookie("ProAlert-Time",timeOut,365)
div.innerHTML="Your settings have been saved!"
div.style.height = "21px";
div.onclick = function(){openOptions()};
div.style.cursor="pointer";
timeSet = setTimeout(function(){time(window.timeOut + 1)},3000)
return false;
}

function error(e){
div.innerHTML= "Error: " + e
setTimeout(function(){openOptions()},3000);
div.style.height = "21px";
div.onclick = function(){openOptions()};
}

function getHttp(g){
var xmlhttp=new XMLHttpRequest()
xmlhttp.onreadystatechange=function(){ if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
var purple = getNumbers(xmlhttp.responseText,"ballon-purple",33)
var green = getNumbers(xmlhttp.responseText,"ballon-green",32)
var orange = getNumbers(xmlhttp.responseText,"ballon-orange",33)
if (purple != 0 || green != 0 || orange != 0){
document.title = purple + " " + green + " " + orange + " - " + oldTitle;
if (g == false){
if (doAlert == true){
if(typeof timeSet !== "undefined"){clearTimeout(timeSet)}
div.innerHTML= "New ads have been detected and ProAlert is now disabled <button onclick='time(timeOut + 1)' style='margin-top:0px;border:none;box-shadow:none;height:27px;width:100px;'>Reanable</button>"
alert("New ads have been detected! \n" + purple + " daily, " + green + " extra and " + orange +" fixed ads have been found.");}
else {
flash(purple,green,orange)
time(timeOut + 1)}}}
else {
time(timeOut + 1)
document.title = "0 0 0 - " + oldTitle;}}}
xmlhttp.open("GET","http://www.probux.com/viewads.php",true);
xmlhttp.send();}

function flash(p,g,o){
if (window.flashVar == true){
document.title = p + " " + g + " " + o + " ! " + oldTitle;
window.flashVar = false
doFlash = setTimeout(function(){flash(p,g,o)},300)}
else {
document.title = p + " " + g + " " + o + " - " + oldTitle;
window.flashVar = true
doFlash = setTimeout(function(){flash(p,g,o)},600)}}

function getNumbers(response,id,space){
if (response.indexOf(id) != -1) {
var temp = response.slice(response.indexOf(id) + space,response.indexOf(id) + space + 2)
if (temp.indexOf("<") != -1) {
var temp = response.slice(response.indexOf(id) + space,response.indexOf(id) + space + 1)}}
else {
var temp = "0"}
return temp}

function time(tempTime){
var tempTime = tempTime - 1;
if (tempTime == -1){
if(typeof doFlash !== "undefined"){clearTimeout(doFlash);}
div.innerHTML= "Refreshing now."
document.title = "? ? ? - " + oldTitle
getHttp(false)}
else {
div.innerHTML= "Next refresh in " + tempTime + " seconds."
timeSet = setTimeout(function(){time(tempTime)},1000);}}

function getCookie(c_name){
var c_value = document.cookie;
var c_start = c_value.indexOf(" " + c_name + "=");
if (c_start == -1){
c_start = c_value.indexOf(c_name + "=");}
if (c_start == -1){
c_value = null;}
else{
c_start = c_value.indexOf("=", c_start) + 1;
var c_end = c_value.indexOf(";", c_start);
if (c_end == -1){
c_end = c_value.length;}
c_value = unescape(c_value.substring(c_start,c_end));}
return c_value;}

div.innerHTML = "Preparing ProAlert...";
getName()
