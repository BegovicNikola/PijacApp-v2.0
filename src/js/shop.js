$(document).ready(() =>{
    const productsholder = document.getElementById('products');
    // Calling func
    getProducts();
    // Getting Products func
    function getProducts(){
        $.ajax({
            url: "src/assets/data/products.json",
            method: "GET",
            dataType: "json",
            success: data => {
                console.log(data);
                renderProducts(data);
            },
            error: err => {
                console.log(err);
            }
        });
    }
    // Render Products func
    function renderProducts(products){
        let html = "";
        html += `
            <div class="row">
        `;
        products.forEach(product => {
            html += `
                <div class="col-md-3">
                    <div class="card">
                        ${product.name}, ${product.category}
                    </div>
                </div>
            `;
        });
        html += `
            </div>
        `;
        productsholder.innerHTML = html;
    }
});