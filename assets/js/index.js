const btn = document.querySelector('add-button');
const input = document.querySelector('.primary-input');
const todoText = document.querySelector('.todo-text');
const todoList = document.querySelector('.todos');
const filterArea = document.querySelector('.filter-area')
const activeButton = document.querySelector('.active-button')
const completedButton = document.querySelector('.completed-button')
const allButton = document.querySelector('.all-button')
const todoCounts = document.querySelector('.todo-number')
let todos = JSON.parse(localStorage.getItem("todos"))

if (!todos || typeof (todos) !== 'object' || !todos.includes) {
    console.log('array değilmiş')
    localStorage.setItem('todos', JSON.stringify([]))
    todos = []
}



const isChecked = (i) => {
    todos[i].isDone = !todos[i].isDone;
    const todo = document.getElementsByClassName('todo')[i];
    //todos[i].isDone ? todo.classList.add('isDone') : todo.classList.remove('isDone');
    todo.classList.toggle('isDone');
}
const taskDelete = (i) => {
    console.log("silinmek istenen " + i)
    const newTodo = todos.splice(i, 1)
    localStorage.setItem("todos", JSON.stringify(todos))
    showTodos(todos)
    console.log(newTodo)
    console.log(todos)
}


const readInputValue = (event) => {
    if(input.value.trim()===""){
        alert("Hiçbir şey yapmayacaksan buraya basmanın anlamı nedir?")
        return
    }
    todos.push({ todo: input.value, isDone: false });
    input.value = "";
    showTodos(todos)
    activeTodos();
}
const showTodos = (todoArray) => {
    todoList.innerHTML = "";
    if (todos.length === 1 || todos.length === 0) {
        checkTodoListLength();
        addHide();
    }
    todoArray.map((todo, i) => {
        const div = document.createElement('div');
        const innerDiv = document.createElement('div');
        const p = document.createElement('p');
        const btn = document.createElement('button');
        const input = document.createElement('input');
        div.classList.add('todo');
        p.classList.add('todo-text');
        innerDiv.classList.add('innerDiv')
        input.setAttribute("type", "checkbox");
        input.setAttribute("name", "isDone");
        input.classList.add("inpt")
        btn.addEventListener("click", () => { taskDelete(i) })
        btn.classList.add("btn")
        btn.innerHTML = "<img src='assets/images/error-svgrepo-com.svg' class='btn-icon' />"
        input.value = "1";
        input.addEventListener('change', () => { isChecked(i) })
        p.innerHTML = todo.todo;
        todo.isDone ? div.classList.add('isDone') : '';
        todo.isDone ? input.setAttribute("checked", true) : "";
        div.appendChild(p);
        innerDiv.appendChild(input);
        innerDiv.appendChild(btn);
        div.appendChild(innerDiv);
        todoList.appendChild(div);
        localStorage.setItem("todos", JSON.stringify(todos))
        //todoList.innerHTML += "<div class='todo'><p class='todo-text'>" + todo + "</p></div>";
    })
    const numberOfTodos = todos.length;
    todoCounts.innerHTML = numberOfTodos
}


const allTodos = () => {
    localStorage.getItem("todos")
    showTodos(todos)
}
const completedTodos = () => {
    localStorage.getItem("todos")
    const completedTodoList = todos.filter((todo) => todo.isDone == true);
    console.log(completedTodoList)
    showTodos(completedTodoList)
}
const activeTodos = () => {
    localStorage.getItem("todos")
    const activeTodoList = todos.filter((todo) => todo.isDone == false)
    showTodos(activeTodoList)

}
//showTodos(todos)
const checkTodoListLength = () => {
    if (todos.length > 0) {
        todoList.classList.remove('hide')
        filterArea.classList.remove('hide')
    }
}
const addHide = () => {
    if (todos.length === 0) {
        todoList.classList.add('hide')
        filterArea.classList.add('hide')
    }
}
checkTodoListLength();
allTodos(todos)
completedButton.addEventListener('click', () => { completedTodos() })
activeButton.addEventListener('click', () => { activeTodos() })
allButton.addEventListener('click', allTodos)


