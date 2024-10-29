    const formElement           = document.querySelector("#todoAddForm");
    const addInputElement       = document.querySelector("#todoName");
    const todoListElement       = document.querySelector(".list-group");
    const firstCardBodyElement  = document.querySelectorAll(".card-body")[0];
    const secondCardBodyElement = document.querySelectorAll(".card-body")[1];
    const clearButtonElement    = document.querySelector("#clearButton");
    const filterInputElement    = document.querySelector("#todoSearch");

    let todos = [];
    runEvents();


    function runEvents() {
        formElement.addEventListener('submit', addTodo);
        document.addEventListener('DOMContentLoaded',pageLoaded);
        secondCardBodyElement.addEventListener('click', removeTodotoUI);
        clearButtonElement.addEventListener('click', allTodosEverywhere);
        filterInputElement.addEventListener('keyup', filter);
    }

    function filter (e) {
        const filterValue = e.target.value.toLowerCase().trim();
        const todoList = document.querySelectorAll('.list-group-item');
        if (todoList.length> 0) {            
            todoList.forEach(todo => {
                if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
                    todo.setAttribute("style", "display : block");
                } else {
                    todo.setAttribute("style", "display : none !important");
                }
            });
        } else {
            showAlert("warning","Filitreleme yapmak için en az 1 tane eklemeniz gerekmektedir")
        }
    }

    function allTodosEverywhere (e) {
        const todoList = document.querySelectorAll('.list-group-item');
        if(todoList.length > 0) {
            todoList.forEach(function(todo) {
                todo.remove();
            });
            todos = [];
            localStorage.setItem("todos",JSON.stringify(todos));
            showAlert("success","Başarı ile hepsi silindi");
        } else{
            showAlert("danger", "Silmek için todo ekleyin");
        }
    }

    //sayfada görüntüleme
    function pageLoaded () {
        checkTodosFromStorage();
        todos.forEach((todo) => {
            addTodoToUI(todo);             
        });        
    }

    function removeTodotoUI (e) {
        const deleteElement = e.target.className ==="fa fa-remove";
        if (deleteElement) {
            // ekrandan silme
            const todoDelete = e.target.parentElement.parentElement;
            todoDelete.remove();
            //storageden Silme
            removeTodoToStorage(todoDelete.textContent);
            showAlert("success"," Todo başarı ile silindi");
        }
        
    }

    function removeTodoToStorage (removeTodo) {
        checkTodosFromStorage();
         todos.forEach(function  (todo,index) { 
            if (removeTodo ===todo) {
                todos.splice(index,1);
            }
         });
         localStorage.setItem("todos",JSON.stringify(todos))
    }

    function addTodo(e) {
        const inputText = addInputElement.value.trim();
        if (inputText == null || inputText == "") {
            showAlert("warning", "Lütfen boş bırakmayınız !")
        } else {
              // Arayüze ve storage ekleme , Alert
            addTodoToUI(inputText)
            addTodoToStorage(inputText)
            showAlert("success", "Görev eklendi");
        }
        e.preventDefault();
    }

    function addTodoToUI(newTodo) {
        let liElement           = document.createElement("li");
        let aElement            = document.createElement("a");
        let iElement            = document.createElement("i");
            liElement.className = "list-group-item d-flex justify-content-between";
            liElement.innerHTML = newTodo;
            aElement.className  = "delete-item";
            aElement.href       = "#";
            iElement.className  = "fa fa-remove"
        aElement.appendChild(iElement);
        liElement.appendChild(aElement);
        todoListElement.appendChild(liElement);
        addInputElement.value = "";
    }

    function addTodoToStorage(newTodo) {
        checkTodosFromStorage();
        todos.push(newTodo);
        localStorage.setItem("todos", JSON.stringify(todos))
    }

    function checkTodosFromStorage() {
        const todoCheck = localStorage.getItem("todos");
        if (todoCheck === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
    }

    function showAlert(type, message) {
        const existingAlert = document.querySelector(".alert");
        if (existingAlert) {
            existingAlert.remove();
        }
        const divElement           = document.createElement("div");
              divElement.className = "alert alert-" + type;
              divElement.innerHTML = message;
        firstCardBodyElement.appendChild(divElement);
        setTimeout(() => {
            divElement.remove();
        }, 2000);
    }






