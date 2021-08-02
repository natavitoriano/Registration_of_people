//loads the home page and places click events in the menus
window.onload = () => {
    const menuBarLink = document.getElementsByClassName('menu-bar-link')
    const menuSmallLink = document.getElementsByClassName('menu-small-device-link')

    formOnSubmit();
    focusInput('#register-name', '#register-message-name')
    focusInput('#register-email', '#register-message-email')
    focusInput('#register-country', '#register-message-country')
    focusInput('#register-city', '#register-message-city')
    btnMenuClick(menuBarLink, 'menu-bar-active')
    btnMenuClick(menuSmallLink, 'menu-small-active')   
}

//function that places click events on menus 
const btnMenuClick = (btnClass, btnClassActive) => {
    if(window.location.href.indexOf('index.html') != -1)
        btnClass[0].classList.add(btnClassActive)
    if(window.location.href.indexOf('register.html') != -1)
        btnClass[1].classList.add(btnClassActive)
    if(window.location.href.indexOf('control.html') != -1)
        btnClass[2].classList.add(btnClassActive)    
    Array.from(btnClass).forEach(btn => {
        btn.onclick = e => {
            e.preventDefault()
            
            //check if the clicked link is the same as the previous one
            const previousMenuLink = document.querySelector('.' + btnClassActive)
            if(previousMenuLink.text != btn.text){
                location.href = btn.href
            }
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

//form data submission event
function formOnSubmit (){
    const formRegister = document.querySelector('#form-register')
    const msg = document.querySelector('#register-message')
    try{
                formRegister.onsubmit = function(e){
                    e.preventDefault();
                    inputBorder('#register-name', '#register-message-name')
                    inputBorder('#register-email', '#register-message-email')
                    inputBorder('#register-country', '#register-message-country')
                    inputBorder('#register-city', '#register-message-city')
                    if(emptyOrNull("#register-name") || emptyOrNull("#register-email") || emptyOrNull("#register-country") || emptyOrNull("#register-city")) {
                        messageForm('failed', 'Error: fill in all fields!')
                    }else{
                    const url = 'http://localhost:3000/auth/register';
                    formRegister.action = url;
                    const formdata = new FormData(formRegister);
                    const data = `{"name":"${formdata.get('name')}","email":"${formdata.get('email')}","country":"${formdata.get('country')}","city":"${formdata.get('city')}"}`;
                    const jsondata = JSON.parse(data)

                    fetch(url,{
                        method: 'POST',
                        body: JSON.stringify(jsondata),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    }).then(resp => resp.json().then(data => ({status: resp.status, body: data})))
                    .then(user => {
                        if(user.status === 400){
                            messageForm('failed', user.body.error)
                            if(user.body.error === 'User alredy exists'){
                                cleanFields('#register-email')  
                                inputBorder('#register-email', '#register-message-email')
                            }     
                        }
                        else{
                            messageForm('success',`Thank you for registering ${user.body.name}!`)
                        }
                    }).catch(err => console.log(err))
                }
            }
            }
            catch(err){
                
            }
}

//function that shows a message to the user if an error occurred or if the data was sent correctly
const messageForm = (sucOrFail, strMsg) => {
    const msg = document.querySelector('#register-message')
    if(sucOrFail === 'failed'){
        msg.textContent = strMsg
        msg.classList.remove('register-message-success')
        msg.classList.add('register-message-failed')
        alert(strMsg)
    }else{
        msg.textContent = strMsg
        msg.classList.add('register-message-success')
        msg.classList.remove('register-message-failed')
        alert(strMsg)

        cleanFields('#register-name')
        cleanFields('#register-email')
        cleanFields('#register-country')
        cleanFields('#register-city')
    }
    msg.style.display = 'block'
}

//function to clear the fields
const cleanFields = (field) => {
    document.querySelector(field).value = ""
    document.querySelector(field).classList.remove('input-register-no-empty')
}

//function that checks if fields are empty or null
const emptyOrNull = (input) => {
    const inpt = document.querySelector(input).value
    return inpt == null || inpt.trim() == ""
}

//function to place out of focus event in fields
const focusInput = (input, idMsg) => {
    try{
        const inpt = document.querySelector(input)
        inpt.addEventListener('focusout', (e) => {
           inputBorder(input, idMsg)
        })
    }catch(err){
       
    }
}

//function that checks and changes the color of the field if it is empty or null
const inputBorder = (input, idMsg) => {
    try{
        const inpt = document.querySelector(input)
        const msg = document.querySelector(idMsg)

        if(!emptyOrNull(input)){
            inpt.classList.remove('input-register-empty')
            inpt.classList.remove('input-register-focus')
            inpt.classList.add('input-register-no-empty')
            msg.style.display = 'none'
        } else {
            inpt.classList.add('input-register-empty')
            inpt.classList.add('input-register-focus')
            inpt.classList.remove('input-register-no-empty')
            msg.style.display = 'block'
        }
    } catch(err) {

    }
}




