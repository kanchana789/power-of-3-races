let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("shopdata")) || [];


function generateShop(){
    return (shop.innerHTML=shopItemsData.map((x)=>{
        let {id,name,price,desc,img} = x;
       return `<div id=product-id-${id} class="item">
       <img class="piccard" width="320" src=${img} alt="">
       <div class="details">
           <h3>${name}</h3>
           <p>${desc} </p>
           <div class="price-quantity">
               <h2>${price}</h2>
               <div class="buttons">
                    <input type="number" id=${id} class="quantity">
                    <button onclick="totalQuant(${id})"><i class="bi bi-cart-plus-fill"></i></button>
               </div>
           </div>
       </div>
   </div>
   `;
    }).join(""));
};

generateShop();


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
    localStorage.setItem("shopdata",JSON.stringify(basket));
    calculation();
};
let calculation = () =>{
    let cartIcon = basket.map((x)=>parseInt(x.quantity)).reduce((x,y)=>x+y,0); 
    document.getElementById("cartAmount").innerHTML = cartIcon;
};
calculation();












