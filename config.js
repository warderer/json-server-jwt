/* Ojo: Esto es mejor manejarlo en una variable de entorno y usar una palabra secreta más fuerte, sin embargo para fines didácticos de poder clonar y desplegar rápidamente este servidor de prueba se maneja en un archivo de configuración */
const secret = 'your-secret-key'

module.exports = {
  secret
}
