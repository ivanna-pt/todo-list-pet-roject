// Select elements
let clear = document.querySelector(".clear");
let taskList = document.querySelector("#list");
let taskInput = document.querySelector("#input");
let addTaskButton = document.querySelector(".add-btn");
let startMessage = document.querySelector(".start-message");
let filter = document.querySelector(".filter-nav");
let counter = document.querySelector("#counter");
let tasks = [];

//event Listeners
clear.addEventListener("click", clearAll);

addTaskButton.addEventListener("click", addTaskHandler);
taskInput.addEventListener("keydown", function (e){
    if (e.code == "Enter") addTaskHandler();
})

filter.addEventListener("click", function (e){
    switch (e.target.innerText){
        case "All":
            showAllHandler();
            addSelectedClass(e);
            break;
        case "Active":
            showActiveHandler();
            addSelectedClass(e);
            break;
        case "Completed":
            showCompletedHandler();
            addSelectedClass(e);
            break;
    }
})
document.querySelector("#sort").addEventListener("click", sort);

//functions
function addTaskHandler(){
    if (taskInput.value){
        if(!startMessage.hidden) startMessage.hidden = true;

        let newTask = new Task (taskInput.value);
        newTask.createIn(taskList);
        tasks.push(newTask);

        taskInput.value = "";
        let count = tasks.length;
        displayCounter(count);
    } else {
        alert ("Type a task name!")
    }
}

function addSelectedClass(element){
    let tags = element.path[1].children;
    for (let i = 0; i < tags.length; i++){
        tags[i].classList.remove("selected");
    }
    element.target.classList.toggle("selected");
}
//Another way to change css properties of selected item
// function makeSelected(element){
//     document.querySelectorAll(".filter-item").forEach(item => {
//         item.style.color = '#000000';
//         item.style.fontWeight = '400';
//     })
//
//     element.target.style.color = '#1a64d6';
//     element.target.style.fontWeight = '700';
// }


function displayCounter(count){
    counter.textContent = count;
}

function showAllHandler(){
    let count = 0;
    taskList.innerHTML = "";
    tasks.forEach(task => {
        task.createIn(taskList);
        count++;
    })
    displayCounter(count);
    
}

function showActiveHandler() {
    let count = 0;
    taskList.innerHTML = "";
    tasks
        .filter(task => task.isDone == false)
        .forEach(task => {
            task.createIn(taskList);
            count++;
        })
    displayCounter(count);
}

function showCompletedHandler(){
    let count = 0;
    taskList.innerHTML = "";
    tasks
        .filter(task => task.isDone == true)
        .forEach(task => {
            task.createIn(taskList);
            count++;
        })
    displayCounter(count);
}

// function markAllCompletedHandler(e){
//     taskList.innerHTML = "";
//     tasks.forEach(task => {
//         task.isDone = true;
//         task.createIn(taskList);
//     })
// }

function sort(){
    taskList.innerHTML = "";
    tasks.sort((x, y) => x.isDone - y.isDone);
    tasks.forEach(task => {
        task.createIn(taskList);
    })
}

function clearAll(){
    taskList.innerHTML = "";
    tasks = [];
    counter.innerHTML = "0";
}


class Task {
    constructor(text){
        this.text = text;
        this.isDone = false;
        this.li = null;
    }

    createIn(element) {
        this.li = document.createElement("li");
        this.li.classList.add("item");

        let check = document.createElement("i");
        if (this.isDone == false){
            check.classList.add("fa-regular", "fa-circle");
        } else {
            check.classList.add("fa-solid", "fa-circle-check");
            this.li.classList.add("completed");
        }

        check.addEventListener("click", () => this.changeState(this.li));
        // input.type = "checkbox";

        let p = document.createElement("p");
        p.innerText = this.text;
        p.classList.add("text");

        let deleteBtn = document.createElement("i");
        deleteBtn.classList.add("fa-solid", "fa-trash", "delete");
        //add eventListener and method
        deleteBtn.addEventListener("click", () => this.removeTask(this.li));

        this.li.append(check);
        this.li.append(p);
        this.li.append(deleteBtn)
        element.append(this.li);
    }

    changeState(element){
        this.isDone = !this.isDone;
        element.classList.toggle("completed");
        let icon = element.querySelector("i");

        if (this.isDone === true){
            icon.classList.remove("fa-regular");
            icon.classList.remove("fa-circle");
            icon.classList.add("fa-solid");
            icon.classList.add("fa-circle-check");
        } else {
            icon.classList.toggle("fa-regular", true);
            icon.classList.toggle("fa-circle",true);
            icon.classList.toggle("fa-solid", false);
            icon.classList.toggle("fa-circle-check", false);
        }
    }

    removeTask(element){
        element.remove();
        let index = tasks.findIndex(n => n.text === this.text);
        if (index !== -1){
            tasks.splice(index, 1);
        }
        let count = tasks.length;
        displayCounter(count);
    }
}

//Date
function formatDate() {
    let currentDate = document.querySelector("#date");
    let date = now.getDate();
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let month = months[now.getMonth()];
    let daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wensday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = daysOfWeek[now.getDay()];

    currentDate.innerHTML = `${day}, ${month} ${date}`;
}
let now = new Date();
formatDate();






