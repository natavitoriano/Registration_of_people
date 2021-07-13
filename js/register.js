//loads the home page and places click events in the menus
window.onload = () => {
    const menuBarLink = document.getElementsByClassName('menu-bar-link')
    const menuSmallLink = document.getElementsByClassName('menu-small-device-link')

    const homePage = document.querySelector('.menu-bar-link')
    const content = document.querySelector('#content')
    fetch(homePage.getAttribute('href'))
        .then(resp => resp.text())
        .then(html => content.innerHTML = html)

    btnMenuClick(menuBarLink, 'menu-bar-active')
    btnMenuClick(menuSmallLink, 'menu-small-active')   
}

//function that places click events on menus 
const btnMenuClick = (btnClass, btnClassActive) => {
    const content = document.querySelector('#content')
    const menuBarLink = document.getElementsByClassName('menu-bar-link')
    const menuSmallLink = document.getElementsByClassName('menu-small-device-link')
    if(window.location.href.indexOf('index.html') != -1)
        btnClass[0].classList.add(btnClassActive)
    Array.from(btnClass).forEach(btn => {
        btn.onclick = e => {
            e.preventDefault()

            //check if the clicked link is the same as the previous one
            const previousMenuLink = document.querySelector('.' + btnClassActive)
            if(previousMenuLink.text != btn.text){
                //deselect the previous link and select the current one
                previousMenuLink.classList.remove(btnClassActive)
                btn.classList.add(btnClassActive)

                //hide the hidden menu if any link is clicked
                const iconMenu = document.querySelector('#icon-menu')
                const iconClose = document.querySelector('#icon-close')
                const hiddenMenu = document.querySelector('#hidden-menu')
                iconMenu.style.display = 'block'
                iconClose.style.display = 'none'
                hiddenMenu.classList.remove('menu-display-block')
                hiddenMenu.classList.add('menu-display-none')

                //redirects the content of the clicked link to the main container of the main page
                fetch(btn.getAttribute('href'))
                    .then(resp => resp.text())
                    .then(html => content.innerHTML = html)

                //identifies which menu was used, and selects the same option in the other menu
                if(btnClassActive === 'menu-bar-active')
                    otherMenu(menuSmallLink, 'menu-small-active', btn.text)
                else
                    otherMenu(menuBarLink, 'menu-bar-active', btn.text)    
        }
    }
    })
}

//function to leave both menus with the same selection
const otherMenu = (btnClass, btnClassActive, text) => {
    Array.from(btnClass).forEach(btn => {
        if(btn.text == text){
            const previousMenuLink = document.querySelector('.' + btnClassActive)
            previousMenuLink.classList.remove(btnClassActive)
            btn.classList.add(btnClassActive)
        }
    })
}

//Event header button from hidden menu
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




