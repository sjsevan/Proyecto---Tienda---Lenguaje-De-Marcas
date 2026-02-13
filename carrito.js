let cart = JSON.parse(localStorage.getItem('miniCarrito')) || [];

// Elementos
const modal = document.getElementById('modal-carrito');
const lista = document.getElementById('lista-carrito');
const totalTxt = document.getElementById('precio-total');
const contador = document.getElementById('cuenta-carrito');
const btnAbrir = document.getElementById('boton-abrir-carrito');

const sync = () => {
    localStorage.setItem('miniCarrito', JSON.stringify(cart));
    if (contador) contador.innerText = cart.length;
};

// --- ABRIR EL CARRITO ---
if (btnAbrir) {
    btnAbrir.onclick = function() {
        render(); 
        if (modal) modal.style.display = "block";
    };
}

// --- CERRAR EL CARRITO ---
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('close-btn') || e.target === modal) {
        if (modal) modal.style.display = "none";
    }
});

// --- AÑADIR PRODUCTOS ---
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('boton-add')) {
        const d = e.target.dataset;
        // SEGURIDAD: Nos aseguramos de que el precio sea un número siempre
        const precioSeguro = parseFloat(d.precio) || 0;
        cart.push({ nombre: d.nombre, precio: precioSeguro });
        sync();
    }
});

// --- DIBUJAR LA LISTA ---
function render() {
    if (!lista) return;
    lista.innerHTML = '';
    let suma = 0;

    if (cart.length === 0) {
        lista.innerHTML = '<p style="text-align:center; color: #333;">El carrito está vacío</p>';
    } else {
        cart.forEach((item, i) => {
            // SEGURIDAD: Si por error el precio es undefined, usamos 0
            const p = item.precio || 0;
            suma += p;
            lista.innerHTML += `
                <div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #eee; padding: 5px; color: #333;">
                    <span>${item.nombre}</span>
                    <span>${p.toFixed(2)}€ 
                        <button onclick="borrar(${i})" style="color:red; border:none; background:none; cursor:pointer; font-weight:bold; margin-left:10px;">X</button>
                    </span>
                </div>`;
        });
    }
    if (totalTxt) totalTxt.innerText = suma.toFixed(2);
}

window.borrar = (i) => {
    cart.splice(i, 1);
    sync();
    render();
};

sync();