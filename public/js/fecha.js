module.exports = function(){
    date = new Date();
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    minute = date.getMinutes();
    seconds = date.getSeconds()
    fecha = month + "/" + day + "/" + year +" Hora: " +minute+":"+seconds;
    return fecha;
  }
  