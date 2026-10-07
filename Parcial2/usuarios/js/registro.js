import { GestorUsuarios } from "./gestorUsuarios.js";

const formularioRegistro = document.querySelector("#formulario-registro");
const gestor = new GestorUsuarios();

formularioRegistro.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const formData = new FormData(formularioRegistro);
    const datos = Object.fromEntries(formData.entries());
    if (datos.contraseña !== datos.confirmacion) {
        alert("Las contraseñas no coinciden");
        return; 
    }

    try {
        gestor.crearUsuario(datos.nombre, datos.correo, datos.contraseña);
        alert(`¡Usuario ${datos.nombre} registrado con éxito!`);
        window.location.href = "index.html";
    } catch (error) {
        alert(error.message);
    }
});