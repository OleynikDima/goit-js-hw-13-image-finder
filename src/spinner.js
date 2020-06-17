const spinner = document.querySelector('.sk-cube-grid')

export default {
    show(){
        spinner.classList.remove('is-hidden')
    },
    hide(){
        spinner.classList.add('is-hidden')
    }
}