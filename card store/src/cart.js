let label = document.getElementById('label')
let ShoppingCart = document.getElementById('shopping-cart')

let basket = JSON.parse(localStorage.getItem("shopdata")) || [];

let calculation = () =>{
    let cartIcon = basket.map((x)=>x.quantity).reduce((x,y)=>x+y,0); 
    document.getElementById("cartAmount").innerHTML = cartIcon;
}
calculation();

let generateCartItems = () => {
    if(basket.length !== 0){
        return (ShoppingCart.innerHTML= basket.map((x)=>{
            let {id,quantity}=x;
            let search = shopItemsData.find((y)=>y.id === id) || [];
            let {img,name,price}=search;
            return `
            <div class="cart-item">
                <img width="150" class="piccard" src=${img} alt=""/>
                <div class="details">
                    <div class="tilte-price-x">
                        <h4 class="title-price">
                            <p>${name}</p>
                            <p class=cart-item-price>฿${price}</p>
                        </h4>
                        <i onclick="removeItem(${id})"class="bi bi-x-circle"></i>
                    </div>

                    <div class="buttons">
                    <input type="number" id=${id} placeholder=${quantity} class="quantity">
                    <button onclick="totalQuant(${id})"><i class="bi bi-cart-plus-fill"></i></button>
                    </div>

                    <h3>฿${quantity * price}</h3>
                </div>
            </div>
            `
        }).join(""));
    }
    else{
        ShoppingCart.innerHTML= ``
        label.innerHTML= `
        <div class="cartEmpty">
        <h2>Cart is Empty</h2>
        <a href=index.html>
           <button class="StoreBtn"><i class="bi bi-shop"></i></button>
           <p class="BtnStore">Back to Store</p>
        </a>
        </div>
        `
    }
    
};
generateCartItems();

let countGoods=(cardNumb)=>{
    let value = parseInt(cardNumb) + 0;
    return value;
};

let totalQuant=(id)=>{
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);
    if(search === undefined){
        basket.push({
            id: selectedItem.id,
            quantity: parseInt(selectedItem.value)
        });
    }
    
    else{
        search.quantity = parseInt(selectedItem.value)
    }
    basket = basket.filter((x) => x.quantity > 0);
    generateCartItems();
    localStorage.setItem("shopdata",JSON.stringify(basket));
    calculation();
};
let removeItem = (id)=>{
    let selectedItem = id;
    basket = basket.filter((x)=>x.id !== selectedItem.id);
    generateCartItems();
    totalAmount();
    calculation();
    localStorage.setItem("shopdata",JSON.stringify(basket));
};

let clearCart=()=>{
    basket = []
    generateCartItems();
    calculation();
    localStorage.setItem("shopdata",JSON.stringify(basket));
};

let totalAmount = () =>{
    if(basket.length !==0){
        let amount = basket.map((x)=>{
            let {quantity,id}=x;
            let search = shopItemsData.find((y)=>y.id === id) || [];
            return quantity * search.price;
        }).reduce((x,y)=>x+y,0);
        label.innerHTML=`
        <div class="greatChoice">
        <h2>Total Bill : ฿${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()"class="removeAll">Clear Cart</button>
        </div>
        `;
    }
    else return;
};
totalAmount();