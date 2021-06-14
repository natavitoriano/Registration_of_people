const btnHeader = document.querySelector('#btn-header')
btnHeader.onclick = (e) =>{  
    e.preventDefault()
    const iconMenu = document.querySelector('#icon-menu')
    const iconClose = document.querySelector('#icon-close')
    const hiddenMenu = document.querySelector('#hidden-menu')
    
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
