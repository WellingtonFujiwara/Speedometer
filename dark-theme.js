const bodyElement = document.querySelector('.body-theme')
const btnDarkMode = document.querySelector('.btn-dark-mode')
const btnWhiteMode = document.querySelector('.btn-white-mode')

btnDarkMode.addEventListener ('click', () => {
    const theme = bodyElement.classList.toggle('dark-theme')


    btnDarkMode.classList.add('d-none')
    btnWhiteMode.classList.remove('d-none')
})

btnWhiteMode.addEventListener ('click', () => {
    const theme = bodyElement.classList.toggle('dark-theme')


    btnDarkMode.classList.remove('d-none')
    btnWhiteMode.classList.add('d-none')
})