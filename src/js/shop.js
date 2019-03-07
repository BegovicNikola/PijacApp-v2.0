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
        products.forEach(product => {
            html += `
                <div class="col-md-3">
                    <div class="card productItem" data-product="${product.name}">
                        ${product.name}, ${product.category}
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
        let pro = product[0];
        let html = "";
        html += `
            <div class="row">
        `;
            html += `
                <div class="col-12">
                    <div class="card">
                        ${pro.name}, ${pro.category}
                    </div>
                </div>
            `;
        html += `
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

                    let parsedData = [];

                    filters.forEach(filter => {
                        if(filter.checked){
                            let res = data.filter(product => product.category == filter.param);
                            res.forEach(product => {
                                parsedData.push(product);
                            });
                        }
                    });

                    let checkedFilters = filters.filter(filter => filter.checked);

                    // IF there are checked filters render filtered ELSE render ALL
                    if(checkedFilters.length){
                        renderProducts(parsedData);
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