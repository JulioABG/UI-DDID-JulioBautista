import { Usuario } from "./usuarios.js";

/**
 * CRUD: Create, Read, Update, Delete.
 * Guardar datos, crear, controlar los datos, eliminar.
 * No correos Repetidos, contraseñas de 6 caracteres, no ID repetidos
 */

/** Se implemento: 
 * Clase gestora optimizada con un método de búsqueda genérico (#buscarPorCampo) 
 * para evitar redundancia de código. Incluye las validaciones necesarias para registrar, 
 * iniciar sesión, actualizar datos del perfil y eliminar cuentas del arreglo de memoria.
 */

export const GestorUsuarios = class {
    #usuarios;

    constructor(listaUsuarios) {
        this.#usuarios = listaUsuarios || [];
    }

    #buscarPorCampo(campo, valor) {
        return this.#usuarios.find((usuario) => usuario[campo] === valor) || null;
    }

    crearUsuario(nombre, correo, contrasenia) {
        if (!this.#buscarPorCampo('nombre', nombre)) {
            if (!this.#buscarPorCampo('correo', correo)) {
                let temp = contrasenia.toString().split('');
                if (temp.length >= 6) {
                    const usuario = new Usuario(this.#usuarios.length + 1, nombre, correo, contrasenia);
                    this.#usuarios.push(usuario);
                    return usuario;
                } else {
                    throw new Error("La contraseña es demasiado corta");
                }
            } else {
                throw new Error("El correo ya se registró");
            }
        } else {
            throw new Error("El nombre de usuario ya existe");
        }
    }

    iniciarSesionPorCorreoYContrasenia(correo, contrasenia) {
        return new Promise((resolve, reject) => {
            try {
                if (!correo || !contrasenia)
                    throw new Error("No has ingresado correo o contraseña");
                
                const usuario = this.#buscarPorCampo('correo', correo);
                
                if (!usuario)
                    throw new Error("No se encontró el correo registrado");
                
                if (usuario.contrasenia !== contrasenia)
                    throw new Error("La contraseña ingresada es incorrecta");
                
                resolve(usuario);
            } catch (error) {
                reject(error);
            }
        });
    }

    // Actualizar correo, contraseña y nombre
    actualizarUsuario(id, nuevoNombre, nuevoCorreo, nuevaContrasenia) {
        const usuario = this.#buscarPorCampo('id', id);
        
        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }
        if (nuevoNombre) {
            usuario.nombre = nuevoNombre;
        }
        if (nuevoCorreo) {
            const existeCorreo = this.#buscarPorCampo('correo', nuevoCorreo);
            if (existeCorreo && existeCorreo.id !== id) {
                throw new Error("Ese correo ya está registrado por otro usuario");
            }
            usuario.correo = nuevoCorreo;
        }
        if (nuevaContrasenia) {
            if (nuevaContrasenia.toString().length < 6) {
                throw new Error("La nueva contraseña es demasiado corta");
            }
            usuario.contrasenia = nuevaContrasenia;
        }

        return usuario;
    }

    // Borrar usuario
    eliminarUsuario(id) {
        const usuario = this.#buscarPorCampo('id', id);
        if (!usuario) {
            throw new Error("No se encontró un usuario con ese id");
        }
    
        this.#usuarios = this.#usuarios.filter(u => u.id !== id);
        
        return true;
    }
}

// 10 usuarios de prueba
const gestor = new GestorUsuarios([
    new Usuario(1, "Amancio", "amancio@uacj.mx", 123456),
    new Usuario(2, "Beatriz", "beatriz@uacj.mx", 234567),
    new Usuario(3, "Carlos", "carlos@uacj.mx", 345678),
    new Usuario(4, "Daniela", "daniela@uacj.mx", 456789),
    new Usuario(5, "Eduardo", "eduardo@uacj.mx", 567890),
    new Usuario(6, "Fernanda", "fernanda@uacj.mx", 678901),
    new Usuario(7, "Gerardo", "gerardo@uacj.mx", 789012),
    new Usuario(8, "Hilda", "hilda@uacj.mx", 890123),
    new Usuario(9, "Iván", "ivan@uacj.mx", 901234),
    new Usuario(10, "Julia", "julia@uacj.mx", 102345)
]);

// Prueba de inicio de sesión
gestor.iniciarSesionPorCorreoYContrasenia("amancio@uacj.mx", 123456)
    .then((usuario) => {
        console.log("Sesión iniciada:", usuario);
    }).catch(error => {
        console.error(error.message);
    });