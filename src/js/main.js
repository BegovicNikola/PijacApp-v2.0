$(document).ready(() => {
    const navholder = document.getElementById('navholder');
    // Calling func
    getNav();
    // Getting nav func
    function getNav(){
        $.ajax({
            url: "src/assets/data/navigation.json",
            method: "GET",
            dataType: "json",
            success: data => {
                renderNav(data);
            },
            error: err => {
                console.log(err);
            }
        })
    }
    // Render nav func
    function renderNav(navigation){
        let currentPage = window.location.href;
        function activeNav(data, param){
            if(data.path == param){
                return data.imga;
            }else{
                return data.img;
            }
        }
        let html = `
            <button class="navbar-toggler w-100 bg-white" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav w-100 d-flex justify-content-between">
        `;
        navigation.forEach(nav => {
            html += `
                <li class="nav-item d-flex justify-content-center">
                    <a class="nav-link d-flex flex-column align-items-center font-weight-bold" href="${nav.path}">
                        <img style="width: 100px;" src="${activeNav(nav, currentPage)}" alt="${nav.name}" />
                        ${nav.name}
                    </a>
                </li>
            `;
        })
        html += `
                </ul>
            </div>
        `;
        navholder.innerHTML = html;
    }
});