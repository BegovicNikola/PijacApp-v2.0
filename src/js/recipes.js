$(document).ready(() => {
    const recipesHolder = document.getElementById('recipesHolder');
    // Calling func
    getRecipes();
    // Getting nav func
    function getRecipes(){
        $.ajax({
            url: "src/assets/data/recipes.json",
            method: "GET",
            dataType: "json",
            success: data => {
                renderRecipes(data);
            },
            error: err => {
                console.log(err);
            }
        });
    }

    const renderRecipes = recipes => {
        let html = "";
        html += `<div class="row">`;
        recipes.forEach(recipe => {
            html += `
                <div class="col-md-6 mt-3">
                    <div class="card">
                        <img class="card-img-top" src="${recipe.img}" alt="${recipe.title}" />
                        <div class="card-body">
                            <h3 class="card-title">${recipe.title}</h3>
                            <p>Ocena: ${recipe.rating}</p>
                            <p class="card-text text-justify">${recipe.description}</p>
                            <button class="openRecipe btn btn-danger form-control" data-id="${recipe.id}">
                                <span class="fa fa-search"></span>
                                Više o receptu
                            </button>
                        </div>
                    </div>
                </div>    
            `;
        });
        html += `</div>`;
        // Populating component
        recipesHolder.innerHTML = html;

        // Getting the particular recipe on click
        $('.openRecipe').click(e => {
            const recipeId = e.currentTarget.attributes[1].value;
            getRecipe(recipeId);
        });
    }

    const getRecipe = recipeId => {
        $.ajax({
            url: "src/assets/data/recipes.json",
            method: "GET",
            dataType: "json",
            success: data => {
                const res = data.filter(recipe => recipeId == recipe.id);
                renderRecipe(res[0]);
            },
            error: err => {
                console.log(err);
            }
        });
    }

    const renderRecipe = recipe => {
        let html = "";
        html += `
            <button id="reRecipes" class="btn btn-danger form-control mt-3">
                <span class="fa fa-share"></span>
                Nastavi razgledanje
            </button>
            <div class="card mt-3">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            <h3 class="mb-3">${recipe.title}</h3>
                        </div>
                        <div class="col-md-6 d-flex flex-column justify-content-center">
                            <img class="w-100" src="${recipe.img}" alt="${recipe.title}" />
                            <h5 class="my-3">Priprema:</h5>
                            <p class="text-justify">${recipe.preparation}</p>
                        </div>
                        <div class="col-md-6">
                            <h5 class="mb-3">Opis:</h5>
                            <p class="text-justify">${recipe.description}</p>
                            <h5>Sastojci:</h5>
                            <ul class="list-group list-group-flush">
                                <!-- Ingredients render -->
                                ${ingredients(recipe.ingredients)}
                            </ul>
                        </div>
                        <div class="col-12">
                            <h5>Koraci:</h5>
                            <ul class="list-group list-group-flush">
                                <!-- Steps render -->
                                ${steps(recipe.steps)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
        // Populate the container
        recipesHolder.innerHTML = html;

        // Populate ingredients container
        function ingredients(ingredients){
            let html = "";
            ingredients.forEach(ingredient => {
                html += `
                    <li class="list-group-item">${ingredient}</li>
                `;
            });
            return html;
        }

        // Populate steps container
        function steps(steps){
            let html = "";
            steps.forEach(step => {
                html += `
                    <li class="list-group-item">${step}</li>
                `;
            });
            return html;
        }

        // Return to main recipes
        $('#reRecipes').click(() => {
            getRecipes();
        });
    }

    $('#recipeSort').change(e=>{
        console.log(e.target.value);
        const sortParam = e.target.value;
        sortRecipes(sortParam);
    });

    const sortRecipes = sortParam => {
        $.ajax({
            url: "src/assets/data/recipes.json",
            method: "GET",
            dataType: "json",
            success: data => {
                const res = data.sort((a, b) => {
                    if(sortParam == 1){
                        return a.rating-b.rating;
                    }else if(sortParam == 2){
                        return b.rating-a.rating;
                    }
                });
                renderRecipes(res);
            },
            error: err => {
                console.log(err);
            }
        });
    }
});