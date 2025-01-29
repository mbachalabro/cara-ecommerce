const cartTable = document.querySelector(".cartTable")

// Get all the items from local storage
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

const products = [];
const fetchAndFilter = async () => {
    const fetchedData = await fetch('../products.json')
    const data = await fetchedData.json()
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        for (let j = 0; j < cartItems.length; j++) {
            if (element.id == cartItems[j]) {
                products.push(element)
            }
        }
    }
}   


// Display the photo, name and price of each product
const displayProducts = async ()=> {
    products.forEach((product) => {
        cartTable.innerHTML +=
            `<tr>
                <td>
                    <i class="far fa-times-circle removeCircle" id="rm-${product.id}"></i>
                </td>
                <td><img src="${product.images[0]}" alt="" /></td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td><input class="qty-input" type="number" value="1" id="qty-${product.id}" /></td> <!-- Quantity -->
                <td class="total-price" id="total-${product.id}">${product.price}</td> <!-- Total Price -->
            </tr>`;
    });

    let qtyInput = document.querySelectorAll(".qty-input")
    qtyInput.forEach((inp)=>{
    inp.addEventListener("change", (e)=>{
        let qty = e.target.value
        if (qty < 1) {
            e.target.value = 1
        }
        let totalElem = e.target.parentElement.nextElementSibling
        let productID = e.target.id.split("-")[1]
        let product = products.filter((prod)=> prod.id == productID);
        totalElem.innerHTML = (qty * product[0].price) || product[0].price   
        })
    })

    let removeBtn = document.querySelectorAll(".removeCircle")
    removeBtn.forEach(icon => {
        icon.addEventListener("click", (e)=>{
            let rmID = e.target.id.split("-")[1]
            removeFromCart(rmID)
            cartTable.removeChild(e.target.parentElement.parentElement)
        })
    });
}

// Calculate and display the subtotal for each product based on the quantity

// Remove product
function removeFromCart(itemID) {
    const cartStorage = localStorage.getItem('cart')
    const arr = JSON.parse(cartStorage) || [];
    const updatedArr = arr.filter((id)=> id !== itemID)
    localStorage.setItem('cart', JSON.stringify(updatedArr))
}

// Display Cart Subtotal and shipping and total
const asyncFunction = async function() {
    await fetchAndFilter();
    await displayProducts();
}

asyncFunction()