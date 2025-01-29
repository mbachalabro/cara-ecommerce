const bar = document.getElementById('bar')
const close = document.getElementById('close')
const nav = document.getElementById('navbar')

const pro = document.querySelectorAll('.pro')
const cart = document.querySelector(".cart");


if(bar){
    bar.addEventListener('click', ()=>{
        nav.classList.add('active');
    })
}
if(close){
    close.addEventListener('click', ()=>{
        nav.classList.remove('active');
    })
}

// Cart Functions
function addToCart(itemID) {
    const cartStorage = localStorage.getItem('cart')
    const arr = JSON.parse(cartStorage) || [];
    if (!arr.includes(itemID)) {
        arr.push(itemID);
    }    
    localStorage.setItem('cart', JSON.stringify(arr))
}

function removeFromCart(itemID) {
    const cartStorage = localStorage.getItem('cart')
    const arr = JSON.parse(cartStorage) || [];
    const updatedArr = arr.filter((id)=> id !== itemID)
    localStorage.setItem('cart', JSON.stringify(updatedArr))
}

pro.forEach((elem)=>{
    elem.addEventListener('click', (e)=>{
        if (e.target.classList.contains("addCartButton")) {
            itemId = e.target.parentElement.id;
            addToCart(itemId);
        }
    })
})

