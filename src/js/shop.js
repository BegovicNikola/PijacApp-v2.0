$(document).ready(() =>{
    // Set render holder 
    const productsHolder = document.getElementById('products');

    // Exec Get Products func
    (function getProducts(){
        $.ajax({
            url: "src/assets/data/products.json",
            method: "GET",
            dataType: "json",
            success: data => {
                renderProducts(data);
            },
            error: err => {
                console.log(err);
            }
        });
    })();

    // Render Products func
    const renderProducts = products => {
        let html = "";
        html += `
            <div class="row">
        `;
        products.forEach((product, index) => {
            html += `
                <div class="col-md-4 ${ index < 3 ? null : "mt-3" }">
                    <div class="card productItem" data-product="${product.name}">
                        <div class="card-body text-center">
                            <img class="w-100 border rounded" src="${product.img}" alt="${product.title}" />
                            <h5 class="mt-3">${product.title}</h5>
                            <span>${product.price}&nbsp;${product.priceType}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        html += `
            </div>
        `;
        // Populating component
        productsHolder.innerHTML = html;

        // Getting the particular product on click
        $('.productItem').click(e => {
            productName = e.currentTarget.attributes[1].value;
            getProduct(productName);
        });
    }

    // Get single product func
    const getProduct = productName => {
        $.ajax({
            url: "src/assets/data/products.json",
            method: "GET",
            dataType: "json",
            success: data => {
                let res = data.filter(product => productName == product.name);
                renderProduct(res);
            },
            error: err => {
                console.log(err);
            }
        });
    }

    // Render single product func
    const renderProduct = product =>{
        let res = product[0];
        let html = "";
        html += `
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start">
                                <div class="w-50 pr-1">
                                    <h3>${res.title}</h3>
                                    <img class="w-100" src="${res.img}" alt="${res.title}" />
                                </div>
                                <div class="w-50 pl-1 d-flex flex-column justify-content-between">
                                    <div>
                                        <input id="quantity" class="form-control mb-3" type="number" min="1" max="10" value="1" />
                                        <div class="d-flex justify-content-between">
                                            <span>Cena izražena u:</span>
                                            <span>${res.priceType}</span>
                                        </div>
                                        <div class="d-flex justify-content-between">
                                            <span>Ukupno:</span>
                                            <span id="total">${res.price}&nbsp;din</span>
                                        </div>
                                        <button id="addToCart" class="btn btn-success form-control mt-3">Kupi</button>
                                    </div>
                                    <div class="mt-3">
                                        <h3>Opis proizvoda</h3>
                                        <p>${res.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        productsHolder.innerHTML = html;

        // Reseting all checkboxes
        checkboxType.forEach(check => {
            check.checked = false;
        });
        filters.forEach(filter => {
            filter.checked = false;
        });
        // Reseting search
        searchField[0].value = null;

        // Calculating total
        const price = res.price;
        $('#total')[0].innerHTML = price + '&nbsp;din';
        const total = $('#quantity').on('input',() => {
            $('#total')[0].innerHTML = price * $('#quantity')[0].value + '&nbsp;din';
        });
        // Adding to Cart
        $('#addToCart').click(() => {
            const total = $('#total')[0].innerHTML;
            storeInCart(res, total);
        });
        // Store Products in cart
        const storeInCart = (res, total) => {
            let cartContent = {"total": total, "res": res};
            const cartContentString = JSON.stringify(cartContent);
            localStorage.setItem(res.name, cartContentString);
            console.log(JSON.parse(localStorage.getItem(res.name)));
        }
    }

    // Render Filtered Products
    const checkboxType = document.querySelectorAll('.checkboxType');
    let filters = [];
    checkboxType.forEach(check => {
        filters.push({
            param: check.value,
            checked: check.checked
        }); 
    });

    checkboxType.forEach(check => {
        check.addEventListener('change', () => {
            // Reseting search
            searchField[0].value = null;
            // New Array of Filtered Items
            const filter = filters.filter(filter => check.value == filter.param)[0];
            // False to True values for checked filter
            filter.checked = !filter.checked;
            $.ajax({
                url: `src/assets/data/products.json`,
                dataType: 'json',
                success: (data) => {

                    let filteredData = [];

                    filters.forEach(filter => {
                        if(filter.checked){
                            let res = data.filter(product => product.category == filter.param);
                            res.forEach(product => {
                                filteredData.push(product);
                            });
                        }
                    });

                    let checkedFilters = filters.filter(filter => filter.checked);

                    // IF there are checked filters render filtered ELSE render ALL
                    if(checkedFilters.length){
                        renderProducts(filteredData);
                    }else{
                        renderProducts(data);
                    }
                }
            });
        });
    });

    // Search for a Particular Product
    const searchField = $('#search');
    let timeout = null;
    let searchInput = '';
    searchField.keyup(e => {
        searchInput = e.target.value;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            // Reseting all checkboxes
            checkboxType.forEach(check => {
                check.checked = false;
            });
            filters.forEach(filter => {
                filter.checked = false;
            });
            searchProducts(searchInput);
        }, 600); 
    });

    // Get products with search param
    const searchProducts = searchInput => {
        $.ajax({
            url: "src/assets/data/products.json",
            method: "GET",
            dataType: "json",
            success: data => {
                let res = data.filter(product => product.name.startsWith(searchInput) || product.category.startsWith(searchInput));
                renderProducts(res);
            },
            error: err => {
                console.log(err);
            }
        });
    }


// End of file
});