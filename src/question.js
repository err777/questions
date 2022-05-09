//Создаем новый класс (заглавная буква)
export class Question {
    //создаем статичный метод для класса
    static create(question) {
        //создаем запрос через метод fetch, кототрый возращает промис, поэтому после него можно использовать контекстный метод then, так как fetch возвращает промис, мы можем поставить перед ним return
        //В поле input fetch принимает ссылку на базу данных, в данном случае, realtime Database от firebase, в конце ссылки вставляем обязательный маркер с названием папки, в которой будут храниться данные в базе с расширением blablalba.json
        return fetch('https://questions-32c44-default-rtdb.europe-west1.firebasedatabase.app/questions.json', {
            //Настраиваем метод fetch
            method: 'POST', // указываем, что работаем с методом POST, согласно рест api этот метод созает новый элемент в базе данных
            body: JSON.stringify(question), //Поле для основного контента, обязательно передавать в формате JSON строки, для этого используем метод JSON.stringify
            headers: {
                'Content-Type': 'application/json' //Оборачиваем в кавычки, потому что название содержит дефиз, а он невалиден для ключа в объектах
            }
        })
            //response - то что мы получаем с сервера, но обернутое в fetch api
            .then(response => response.json())  //приводим response к json, чтобы можно было с ним работать в дальнейшем(получим массив объектов), по молчания response возвращает нам объект с множеством параметров, но параметр body с типом ReadableStream, чтобы облегчить загрузку в случае больших данных.
            .then(response => {
                question.id = response.name//у response есть поле name, которое содержит уникальный ID, передаем эти данные в question.id
                return question
            })
            .then(addToLocalStorage)
            .then(Question.renderList)
    }
    static renderList() {
        const questions = getQuestionsFromLocalStorage() //получаем список всех вопросов(массив объектов)
        const html = questions.length //создаем условие, если в массиве нет данных то создает див notice, если данные есть, то создает шаблон из функции toCard
        ? questions.map(toCard).join('') //метод мап возвращает новый массив и к каждому элементу рименяет функцию toCard, после мы соединяем все элементы массива в строку методом join
        : `<div class="notice">Вы пока ничего не спрашивали</div>`
        const content = document.getElementById('content') //получаем данные с обертки и меняем ее на содержимое html
        content.innerHTML = html
    }
}

const addToLocalStorage = (question) => {
    let all = getQuestionsFromLocalStorage() //собираем данные в переменную, получаем массив с объектом
    all.push(question)  //на каждой итерации пушим в массив новый вопрос
    localStorage.setItem('questions', JSON.stringify(all))  //Отправляем в локал localStorage через метод setItem массив all(сначала приводим его к строке, потому что localStorage принимает данные только в формате JSON строки)
}
//Нужно передавать данные в localStorage в виде массива объектов, чтобы каждый новый объект не затирался, а пушился вниз, для этого создаем функцию, которая вернет нам массив
const getQuestionsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('questions') || '[]')
}//Суть функции, забираем данные из localStorage, но если он пуст, то присваиваем ему значение пустого массива []. Через метод getItem получаем строку, парсим ее, чтобы получить из нее объект.

const toCard = (question) => {
    return `
      <div class="content__question">
        <div class="content__date">
          ${new Date(question.date).toLocaleDateString()}  
          ${new Date(question.date).toLocaleTimeString()}
        </div>
        <div class="content__text">
          ${question.text}
        </div>
      </div>`
}























