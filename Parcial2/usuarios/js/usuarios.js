// modificar la clase Usuario:
/**
 * id, nombre, contrasenia, foto de perfil, correo.
 */
export class Usuario {
    constructor(id, nombre, correo, contrasenia) {
        this.id = id ?? 0;
        this.nombre = nombre ?? "";
        this.correo = correo ?? "";
        this.contrasenia = contrasenia ?? "";
    }
    mostrarInformacion(){
        console.log(`Id: ${this.id} \nNombre: ${this.nombre} \nCorreo: ${this.correo}`);
    }
}

/**Investigar:
 * || ?? && !== ===/== 
 */

//export{Usuario};

/*Id: 1
**Nombre: Amancio
**Correo: amancio.torres@uacj.mx
*/ 
/**
 * Inicio: formulario para iniciar sesion o registrarse.
 * Registro o Iniciar sesion 
 * Inicio.
 */

