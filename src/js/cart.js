$(document).ready(() =>{
    // Get cart items
    getCart();
    function getCart(){
        // Getting key value pairs
        const storageItems = {...localStorage};
        const itemKeys = Object.keys(storageItems);
        if(itemKeys == 0){
            $('#cart')[0].innerHTML = `<h6 class="text-center my-5">Nema proizvoda</h6>`;
        }else{
            let currentItem;
            let html = `<ul class="list-group list-group-flush">`;
            itemKeys.forEach(key => {
                currentItem = JSON.parse(storageItems[key]);
                html += `
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <img class="cart-img border rounded" src="${currentItem.product.img}" alt="${currentItem.product.title} />"
                        <p class="mb-0">${key}</p>
                        <p class="mb-0">${currentItem.total}</p>
                        <button class="btn btn-danger removeItem font-weight-bold" data-product="${key}"><span class="fa fa-times"></span></button>
                    </li>
                `;
            });
            html += `</ul>`;
            $('#cart')[0].innerHTML = html;
            $('.removeItem').click(e => {
                const item = e.currentTarget.attributes[1].value;
                localStorage.removeItem(item);
                getCart();
            });
        }
    }

    $('#submitCart').click(() => {checkoutCart()});
    const checkoutCart = () => {
        localStorage.length > 0 ? alert("Uspešna kupovina.") : alert("Korpa je prazna.");
        localStorage.clear();
        getCart();
    }
});