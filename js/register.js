const btnHeader = document.querySelector('#btn-header')
btnHeader.onclick = (e) =>{  
    e.preventDefault()
    const iconMenu = document.querySelector('#icon-menu')
    const iconClose = document.querySelector('#icon-close')
    const hiddenMenu = document.querySelector('#hidden-menu')
    
    if(iconMenu.style.display != 'none'){
        iconMenu.style.display = 'none'
        iconClose.style.display = 'block'
        hiddenMenu.style.display = 'block'
    }
    else{
        iconMenu.style.display = 'block'
        iconClose.style.display = 'none'
        hiddenMenu.style.display = 'none'
    }
}