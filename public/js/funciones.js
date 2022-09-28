function validar(params) {
  window.location.href = params
}



function eliminar(params){

  return confirm('Desea Continuar Con la operacion?') ? window.location.href=params : console.log('operacion Abortada')

}