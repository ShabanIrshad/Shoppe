

module.exports=countTotal=(cart)=>{
    let total=0;
    for(let i=0;i<cart.length;i++){
        total+=cart[i].price;
        total-=cart[i].discount;
    }
    total+=20 //Shipping fee
    return total
}