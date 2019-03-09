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
        })
    }

    const renderRecipes = (recipes) => {
        let html = "";
        html += `<div class="row">`;
        recipes.forEach(recipe => {
            html += `
                <div class="col-md-6 mt-3">
                    <div class="card">
                        <img class="card-img-top" src="${recipe.img}" alt="${recipe.title}" />
                        <div class="card-body">
                            <h3 class="card-title">${recipe.title}</h3>
                            <p clas="card-text">${recipe.description}</p>
                            <button class="btn btn-danger form-control">Više o receptu</button>
                        </div>
                    </div>
                </div>    
            `;
        });
        html += `</div>`;
        recipesHolder.innerHTML = html;
    }
});