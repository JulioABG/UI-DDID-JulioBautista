import { GestorUsuarios } from "./gestorUsuarios.js";
import { Usuario } from "./usuarios.js";

/** Se implemento: 
 * API
 * Este archivo controla la interacción del usuario y la navegación entre pantallas de
 * Login, Registro y PokeAPI ocultando y mostrando contenedores estilo Single Page Application
 * 
 * Referencia PokeAPI: La lógica asíncrona con fetch() y el diseño de la tarjeta de resultados 
 * fueron estructurados basándose en la documentación oficial (https://pokeapi.co/docs/v2) 
 * y conceptos de tutoriales de consumo de APIs apoyandose en los canales de YouTube midudev y fazt
 */

const gestor = new GestorUsuarios([
    new Usuario(1, "Amancio", "amancio@uacj.mx", "123456"),
    new Usuario(2, "Beatriz", "beatriz@uacj.mx", "234567")
]);

let usuarioActual = null;

// elementos html (DOM)
const pantallaAuth = document.getElementById("pantalla-auth"); 
const formLogin = document.getElementById("formulario-login");
const formRegistro = document.getElementById("formulario-registro");
const pantallaDashboard = document.getElementById("pantalla-dashboard"); 
const linkIrRegistro = document.getElementById("link-ir-registro");
const linkIrLogin = document.getElementById("link-ir-login");

// elementos del perfil
const vistaPokeapi = document.getElementById("vista-pokeapi");
const vistaPerfil = document.getElementById("vista-perfil");
const btnFlotantePerfil = document.getElementById("btn-flotante-perfil");
const btnVolverPoke = document.getElementById("btn-volver-poke");
const formEditar = document.getElementById("formulario-editar");
const spanDashNombre = document.getElementById("dash-nombre");
const inputEditNombre = document.getElementById("edit-nombre");
const inputEditCorreo = document.getElementById("edit-correo");
const inputEditContrasenia = document.getElementById("edit-contrasenia");
const btnEliminarCuenta = document.getElementById("btn-eliminar-cuenta");
const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");

// elementos pokeapi
const pokeInput = document.getElementById("poke-input");
const btnBuscarPoke = document.getElementById("btn-buscar-poke");
const pokeResultado = document.getElementById("poke-resultado");
const pokeNombre = document.getElementById("poke-nombre");
const pokeImagen = document.getElementById("poke-imagen");
const pokePeso = document.getElementById("poke-peso");
const pokeError = document.getElementById("poke-error");
const pokeInstruccion = document.getElementById("poke-instruccion");

linkIrRegistro.addEventListener("click", (e) => {
    e.preventDefault();
    formLogin.style.display = "none";
    formRegistro.style.display = "block";
});

linkIrLogin.addEventListener("click", (e) => {
    e.preventDefault();
    formRegistro.style.display = "none";
    formLogin.style.display = "block";
});

formRegistro.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(formRegistro);
    const datos = Object.fromEntries(formData.entries());

    if (datos.contrasenia !== datos.confirmacion) {
        alert("Las contraseñas no coinciden");
        return;
    }

    try {
        gestor.crearUsuario(datos.nombre, datos.correo, datos.contrasenia);
        alert(`¡Usuario ${datos.nombre} registrado con éxito!`);
        formRegistro.reset();
        formRegistro.style.display = "none";
        formLogin.style.display = "block";
    } catch (error) {
        alert(error.message);
    }
});

formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(formLogin);
    const correo = formData.get("correo");
    const contrasenia = formData.get("contrasenia");

    gestor.iniciarSesionPorCorreoYContrasenia(correo, contrasenia)
        .then((usuario) => {
            usuarioActual = usuario;
            spanDashNombre.innerText = usuario.nombre;
            inputEditNombre.value = usuario.nombre;
            inputEditCorreo.value = usuario.correo;
            inputEditContrasenia.value = usuario.contrasenia;

            pantallaAuth.style.display = "none"; 
            pantallaDashboard.style.display = "block"; 
            vistaPokeapi.style.display = "flex"; 
            vistaPerfil.style.display = "none";
            btnFlotantePerfil.style.display = "block";
        })
        .catch(error => {
            alert(error.message);
        });
});

btnFlotantePerfil.addEventListener("click", () => {
    vistaPokeapi.style.display = "none";
    vistaPerfil.style.display = "block";
    btnFlotantePerfil.style.display = "none"; 
});

btnVolverPoke.addEventListener("click", () => {
    vistaPerfil.style.display = "none";
    vistaPokeapi.style.display = "flex";
    btnFlotantePerfil.style.display = "block"; 
});

formEditar.addEventListener("submit", (e) => {
    e.preventDefault();
    const nuevoNombre = inputEditNombre.value;
    const nuevoCorreo = inputEditCorreo.value;
    const nuevaContrasenia = inputEditContrasenia.value;

    try {
        const usuarioActualizado = gestor.actualizarUsuario(usuarioActual.id, nuevoNombre, nuevoCorreo, nuevaContrasenia);
        usuarioActual = usuarioActualizado;
        spanDashNombre.innerText = usuarioActual.nombre;
        alert("¡Tus datos se han actualizado correctamente!");
    } catch (error) {
        alert(error.message);
    }
});

btnEliminarCuenta.addEventListener("click", () => {
    const confirmacion = confirm("¿Estás seguro de que quieres eliminar tu cuenta para siempre?");
    if (confirmacion) {
        try {
            gestor.eliminarUsuario(usuarioActual.id);
            alert("Cuenta eliminada con éxito.");
            btnCerrarSesion.click(); 
        } catch (error) {
            alert(error.message);
        }
    }
});

btnCerrarSesion.addEventListener("click", () => {
    usuarioActual = null;
    pantallaDashboard.style.display = "none";
    pantallaAuth.style.display = "flex"; 
    formLogin.style.display = "block";
    formLogin.reset();
    
    pokeInput.value = "";
    pokeResultado.style.display = "none";
    pokeInstruccion.style.display = "block";
    pokeError.style.display = "none";
});

btnBuscarPoke.addEventListener("click", () => {
    const nombrePokemon = pokeInput.value.toLowerCase().trim();
    
    if (nombrePokemon === "") {
        alert("Por favor escribe el nombre de un Pokémon.");
        return;
    }

    pokeInstruccion.style.display = "none"; 
    pokeResultado.style.display = "none";
    pokeError.style.display = "none";

    fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`)
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error("Pokémon no encontrado");
            }
            return respuesta.json();
        })
        .then(datos => {
            pokeNombre.innerText = datos.name;
            pokeImagen.src = datos.sprites.front_default;
            
            const pesoEnKilos = datos.weight / 10;
            pokePeso.innerText = `Peso: ${pesoEnKilos} kg`;

            pokeResultado.style.display = "block";
        })
        .catch(error => {
            pokeError.style.display = "block";
        });
});