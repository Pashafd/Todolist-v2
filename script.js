"use strict";

function onPageLoaded () {
    const saveButton = document.querySelector(".save");
    const clearButton = document.querySelector(".clear");
    const showTipsButton = document.querySelector(".showTips");
    const closeTipsButton = document.querySelector(".closeTips");
    const overlay = document.querySelector("#overlay");
    const input = document.querySelector("input[type='text']");
    const  ul = document.querySelector("ul.todos");

    saveButton.addEventListener("click", () => {
        localStorage.setItem("todos", ul.innerHTML);
    });

    clearButton.addEventListener("click", () => {
        ul.innerHTML = "";
        localStorage.removeItem('todos', ul.innerHTML);
    });

    showTipsButton.addEventListener("click", () => {
        overlay.style.height = "100%";
    });

    closeTipsButton.addEventListener("click", () => {
        overlay.style.height = "0";
    });    

    function createTodo () {
        if (!input.value == "") {
            const li = document.createElement("li"); //create new li element
            const textSpan = document.createElement("span");    //create new span element
            const newTodo = input.value;        // put input.value in variabl
            const deleteBtn = document.createElement("span");   //create span
            const icon = document.createElement("i");       //create elem i

            textSpan.classList.add("todo-text");    // add to span class todo-text            
            textSpan.append(newTodo);           //push string in span
            deleteBtn.classList.add("todo-trash");              //add class todo-trash
            icon.classList.add("fas", "fa-trash-alt");       //give i class fron fancy icon
            deleteBtn.appendChild(icon);                      //push img to the i
            ul.appendChild(li).append(textSpan, deleteBtn);     //push all to the list
            input.value = "";                                   //clear input
            listenDeleteTodo(deleteBtn);                        //delete todo
         }
    }  

    function listenDeleteTodo(element) {
        element.addEventListener("click", (event) => { //create func when todo create every icon trash can delete todo
        element.parentElement.remove();
        event.stopPropagation();
        });
    }

    function loadTodos() {
        const data = localStorage.getItem("todos");
        if (data) {
            ul.innerHTML = data;
        }
    }
    const deleteButtons = document.querySelectorAll("span.todo-trash");
    for (const button of deleteButtons) {
        listenDeleteTodo(button);
    }

    function onClickTodo(event) {
        if (event.target.tagName == "LI") { //if we click at li element
            event.target.classList.toggle("checked");//switch class checked
        }
    }

    input.addEventListener("keypress", (keyPressed) => {
        const keyEnter = 13;
        if (keyPressed.which == keyEnter) {  //if press enter create todo
            createTodo();
        }
    });

    ul.addEventListener("click", onClickTodo);

    loadTodos();
}


document.addEventListener("DOMContentLoaded", onPageLoaded); //run all after DOM loaded


