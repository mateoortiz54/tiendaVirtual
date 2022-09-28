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
function validar(params) {
  window.location.href = params
}



function eliminar(params){

  return confirm('Desea Continuar Con la operacion?') ? window.location.href=params : console.log('operacion Abortada')

}


$(document).ready(function () {
  $('#example').DataTable({
      dom: 'Bfrtip',
      buttons: [
          //'print'
      ],
      language: {
        "decimal": ",",
        "thousands": ".",
        "lengthMenu": "Mostrar _MENU_ registros",
        "zeroRecords": "No se encontraron resultados",
        "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
        "infoFiltered": "(filtrado de un total de _MAX_ registros)",
        "sSearch": "Buscar:",
        "oPaginate": {
            "sFirst": "Primero",
            "sLast":"Último",
            "sNext":"Siguiente",
            "sPrevious": "Anterior"
        },
        "sProcessing":"Cargando..."
    }
      
  });
});
