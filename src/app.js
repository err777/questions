import './style.css'
import {isValid} from "./utils";
import {createModal} from "./utils";
import {Question} from "./question";

const form = document.getElementById('main-form')
const modalButton = document.getElementById('modal-button')
const formInput = form.querySelector('#main-form__input')
const formButton = form.querySelector('#main-form__button')


const submitFormHandler = (e) => {
    e.preventDefault() //запретить дефолтное поведение слушателя типа 'submit'
    if (isValid(formInput.value)) { //проверка на валидность введенного вопроса (больше ли 10 символов)
        const question = { //создаем объект с необходимыми параметрами
            text: formInput.value.trim(), //trim() для того, чтобы убрать пустоты спереди и сзади сообщения
            date: new Date().toJSON()
        }
        formButton.disabled = true //обязательно нужно блокировать кнопку, пока не обработается запрос, чтобы юзер не заспамил окнами
        //отправляем ассинхронный запрос на сервер
        Question.create(question).then(() => {
            formInput.value = ''
            formButton.disabled = false
        })


    }
}
//
// const openModal = () => {
//
// }



modalButton.addEventListener('click', openModal)
window.addEventListener('load', Question.renderList) //призагрузке страницы, рендерим список, который лежит в localStorage, с помощью созданного нами статичного метода renderList
form.addEventListener('submit', submitFormHandler)
formInput.addEventListener('input', () => {
    formButton.disabled = !isValid(formInput.value)
})
console.log('app working...')

function openModal () {
    createModal('Авторизация', '<h1>Test</h1>>')
}