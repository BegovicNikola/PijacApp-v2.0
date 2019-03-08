$(document).ready(() =>{
    // Get cart items
    getCart();
    function getCart(){
        // Getting key value pairs
        const storageItems = {...localStorage};
        const itemKeys = Object.keys(storageItems);
        if(itemKeys == 0){
            $('#cart')[0].innerHTML = "Nema proizvoda";
        }else{
            let currentItem;
            let html = `<ul class="list-group list-group-flush">`;
            itemKeys.forEach(key => {
                currentItem = JSON.parse(storageItems[key]);
                html += `
                    <li class="list-group-item">
                        <h5>${key}</h5>
                        <p>${currentItem.total}</p>
                        <button class="removeItem">X</button>
                    </li>
                `;
            });
            html += `</ul>`;
            $('#cart')[0].innerHTML = html;
        }
    }
});