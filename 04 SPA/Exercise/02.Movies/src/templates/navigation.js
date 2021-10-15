export const getNavigationTemplate = (email) => {

    return `<nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="navBar">
                <a class='navbar-brand text-light' id='navBarMovies' href='javascript:void(0)'>Movies</a>
                <ul class="navbar-nav ml-auto">
                    ${ 
                        email ?
                        `<li class="nav-item">
                                    <a class="nav-link" id="navEmail" href="javascript:void(0)">Welcome ${sessionStorage.email}</a>
                         </li>
                         <li class="nav-item">
                             <a class="nav-link" id="navLogout" href="javascript:void(0)">Logout</a>
                         </li>`
                        :
                        `<li class="nav-item">
                             <a class="nav-link" id="navLogin" href="javascript:void(0)">Login</a>
                         </li>
                         <li class="nav-item">
                             <a class="nav-link" id="navRegister" href="javascript:void(0)" >Register</a>
                         </li>`
                    }
                </ul>
            </nav>`;
};