window.onload = () => {
    const menuBarLink = document.getElementsByClassName('menu-bar-link')
    const menuSmallLink = document.getElementsByClassName('menu-small-device-link')

    btnMenuClick(menuBarLink, 'menu-bar-active')
    btnMenuClick(menuSmallLink, 'menu-small-active')
}

//function that places click events on menus 
const btnMenuClick = (btnClass, btnClassActive) => {
    if(window.location.href.indexOf('index.html') != -1)
        btnClass[0].classList.add(btnClassActive)
    Array.from(btnClass).forEach(btn => {
        btn.onclick = e => {
            e.preventDefault()
            const previousMenuLink = document.querySelector('.' + btnClassActive)
            previousMenuLink.classList.remove(btnClassActive)
            btn.classList.add(btnClassActive)
        }
    })
}

//Event header button
const btnHeader = document.querySelector('#btn-header')
btnHeader.onclick = (e) =>{  
    e.preventDefault()
    const iconMenu = document.querySelector('#icon-menu')
    const iconClose = document.querySelector('#icon-close')
    const hiddenMenu = document.querySelector('#hidden-menu')
    
    //Check if the menu icon is showing
    if(iconMenu.style.display != 'none'){
        iconMenu.style.display = 'none'
        iconClose.style.display = 'block'
        hiddenMenu.classList.remove('menu-display-none')
        hiddenMenu.classList.add('menu-display-block')
    }
    else{
        iconMenu.style.display = 'block'
        iconClose.style.display = 'none'
        hiddenMenu.classList.remove('menu-display-block')
        hiddenMenu.classList.add('menu-display-none')
    }
}




