document.addEventListener("DOMContentLoaded", () => {
    const btnDropdown = document.getElementById("btn-dropdown");
    const dropdown = document.querySelector(".dropdown");
    
    btnDropdown.addEventListener("click", () => {
        dropdown.classList.toggle("show");
    });

    window.addEventListener("click", (e) => {
        if (!e.target.matches('.dropbtn')) {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        }
    });

    // --- parallax ---
    const capa1 = document.getElementById("capa1");
    const capa2 = document.getElementById("capa2");

    window.addEventListener("scroll", () => {
        let scroll = window.scrollY;

        capa1.style.transform = `translateY(-${scroll * 0.5}px)`;
        capa1.style.opacity = Math.max(1 - (scroll / 400), 0);
        capa2.style.transform = `scale(${Math.max(1 - (scroll / 600), 0.5)})`;
        capa2.style.opacity = Math.max(1 - (scroll / 500), 0);
    });


    // --- agregar / eliminar bebidas ---
    const bandeja = document.getElementById("bandeja-bebidas");

    const btnHotLatte = document.getElementById("btn-hotlatte");
    const btnAmericano = document.getElementById("btn-americano");
    const btnEliminar = document.getElementById("btn-eliminar");

    const limiteBebidas = 5;

    function agregarBebida(rutaImagen, nombre) {
        if (bandeja.children.length >= limiteBebidas) {
            bandeja.removeChild(bandeja.firstElementChild);
        }

        const nuevaImg = document.createElement("img");
        nuevaImg.src = rutaImagen;
        nuevaImg.alt = nombre;
        nuevaImg.classList.add("bebida-item");

        bandeja.appendChild(nuevaImg);
    }

    btnHotLatte.addEventListener("click", () => {
        agregarBebida("recursos/img/HotLatte360x360.png", "Hot Latte"); 
    });

    btnAmericano.addEventListener("click", () => {
        agregarBebida("recursos/img/Americano360x360.png", "Americano"); 
    });

    btnEliminar.addEventListener("click", () => {
        if (bandeja.lastElementChild) {
            bandeja.removeChild(bandeja.lastElementChild);
        }
    });

    bandeja.addEventListener("click", (e) => {
        if (e.target.tagName === "IMG") {
            e.target.classList.toggle("seleccionada");
        }
    });

    function actualizarContador() {
        contadorTexto.innerText = `Bebidas en la bandeja: ${bandeja.children.length}`;
    }

    const vaso = document.getElementById("vaso-animado");
    
    const animacionVaso = vaso.animate([
        { transform: 'translateY(-50%) translateX(0)' },
        { transform: 'translateY(-50%) translateX(calc(100vw - 150px))' }
    ], {
        duration: 6000,
        iterations: Infinity, 
        direction: 'alternate',
        easing: 'ease-in-out'
    });

    // animacion cafe - controles
    document.getElementById("btn-play").addEventListener("click", () => animacionVaso.play());
    document.getElementById("btn-pause").addEventListener("click", () => animacionVaso.pause());
    document.getElementById("btn-reverse").addEventListener("click", () => animacionVaso.reverse());
    document.getElementById("btn-cancel").addEventListener("click", () => animacionVaso.cancel());
});