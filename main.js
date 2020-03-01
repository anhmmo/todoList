
let list = document.querySelector('#todo-list'),
form = document.querySelector('#submit-form'),
input = document.querySelector('#input'),
storeKey = "todoList",
createKey = "createtime",
modifyKey = "modifytime";


window.onload = checkExitsLocalStorage();

function checkExitsLocalStorage() {
    //return 0 if not exists, if exists localStorageLength > 1 or = 1.

    if(!localStorage.todoList){
        //set an sample data, this data can remove like this: const jsonData = JSON.stringify([]);
        const jsonData = JSON.stringify([]);
        localStorage.setItem(storeKey, jsonData);
    }

    if(!localStorage.createtime){
      const createTime = JSON.stringify([]);
      localStorage.setItem(createKey, createTime);
    }

    if(!localStorage.modifytime){
      const modifyTime = JSON.stringify([]);
      localStorage.setItem(modifyKey, modifyTime);
    }

}

let todoList = {
  itemData : [],
  load: function (){
    const jsonData = localStorage.getItem(storeKey);
    try {
            this.itemData = JSON.parse(jsonData);
    } catch (e) {
        alert("some thing wrong !");
    }
  },
  add: function(items){
    this.itemData.push(items);
  },
  edit:function(index, items){
    this.itemData[index] = items;
  },
  delete: function(index){
    this.itemData.splice(index,1);
  },
  save: function(){
    const jsonData = JSON.stringify(this.itemData);
    localStorage.setItem(storeKey, jsonData);
  },
  get data(){
    return this.itemData;
  },
  set changeData(newContent) {
    return this.itemData = newContent;
  }
}
 

let dateTime = {
  cTime : [],
  mTime: [],
  loadCTime: function (){
    const jsonDataC = localStorage.getItem(createKey);
    try {
            this.cTime = JSON.parse(jsonDataC);
    } catch (e) {
        alert("some thing wrong !");
    }
  },
  loadMTime: function (){
    const jsonDataM = localStorage.getItem(modifyKey);
    try {
            this.mTime = JSON.parse(jsonDataM);
    } catch (e) {
        alert("some thing wrong !");
    }
  },
  addC: function(timer){
    this.cTime.push(timer);
  },
  addM: function(index,content){
    this.mTime[index] = content;
  },
  saveC: function() {
    const createT = JSON.stringify(this.cTime);
    localStorage.setItem(createKey, createT);
  },
  saveM : function() {
    const createM = JSON.stringify(this.mTime);
    localStorage.setItem(modifyKey, createM);
  },
  deleteC: function(index){
    this.cTime.splice(index,1);
  },
  deleteM: function(index){
    this.mTime.splice(index,1);
  },

  get currentTime(){
    return this.cTime;
  },
  get modifiedTime() {
    return this.mTime;
  }
}

form.addEventListener("submit", addNewItem, false);
  function addNewItem(e) {
    e.preventDefault();

    let createdTime = getCurrentDateTime();
    dateTime.addC(createdTime);
    dateTime.saveC();
    
    todoList.add(`${input.value}`);
    todoList.save();

    window.location.reload();
}

dateTime.loadMTime();
dateTime.loadCTime();
todoList.load();
renderTodoList();




function renderTodoList () {
    if(localStorage.length > 0) {
    
      let item = todoList.data;
      let output = "";
      for (let index = 0; index < item.length; index++) {
        output += `<li class="item" onclick="selectItemBox(${index})">${item[index]}<i class="delete fas fa-trash" onclick="deleteItem(${index})"></i><i class="edit fas fa-user-edit" onclick="editItem(${index})"></i><i class="info fas fa-info-circle" onclick="infoItem(${index})"></i><a id="mobile" href="#" class="mobile-select"></a></li>`;
      }
      list.innerHTML = output;
    }
    
}

function deleteItem(index) {
  preventListFunction(index);

  let deletePopup = document.getElementById("delete-popup");
  let yes = document.getElementById("yes");
  let no = document.getElementById("no");

  deletePopup.style.display = "block";

  yes.addEventListener("click", function() {
    todoList.delete(index);
    todoList.save();
    dateTime.deleteC(index);
    dateTime.deleteM(index);
    dateTime.saveC();
    dateTime.saveM();
    window.location.reload();
  });
 
  no.addEventListener("click", function() {
    deletePopup.style.display = "none";
    window.location.reload();
  });
}

function editItem(index) {
  preventListFunction(index);

  let editPopup = document.getElementById("edit-popup");
  let oldItem = document.getElementById("old-item");
  let change = document.getElementById("change");
  let cancel = document.getElementById("cancel");
  
  editPopup.style.display = "block";
  oldItem.value = todoList.data[index];


  change.addEventListener("click", getNewContent);
  let newContent;
  function getNewContent() {
    newContent = oldItem.value;
    todoList.edit(index, newContent);
    todoList.save();
    let createdTime = getCurrentDateTime();
    dateTime.addM(index,createdTime);
    dateTime.saveM();
    window.location.reload();
  }
  
  cancel.addEventListener("click", function(){
    editPopup.style.display = "none";
    window.location.reload();
  });
}


function infoItem(index) {
  preventListFunction(index);
  let infoPopup = document.getElementById("info-popup");
  let content = document.getElementById("content");
  let createdDate = document.getElementById("created-date");
  let modifidedDate = document.getElementById("modifited-date");
  let exit = document.getElementById("exit");

  infoPopup.style.display = "block";
  exit.addEventListener("click",function(){
    infoPopup.style.display = "none";
    window.location.reload();
  });

  content.innerHTML = todoList.data[index];
  createdDate.innerHTML = "Created date : " + dateTime.currentTime[index];

  typeof dateTime.modifiedTime[index] !== "string" ? modifidedDate.innerHTML = "Modifided date : not yet modify" : modifidedDate.innerHTML = "Modifided date : " + dateTime.modifiedTime[index];
  
}

function preventListFunction (index) {
  list.removeEventListener("click", chooseItem);
  list.querySelectorAll("li")[index].onclick = null;
}

function getCurrentDateTime () {
  let currentTime = new Date();
  return currentTime.toString();
}



//select all and delete

list.addEventListener('click', chooseItem ,false);
function chooseItem(e) {
  let t = e.target;
  if(t.classList.contains('checked')){
    t.classList.remove('checked');
  } else {
    t.classList.add('checked');
  }
}

let deleteArray = [];
let filtedArray = [];

let selectedAllPersons = document.getElementById("delete-box");
let selectedAllStudents = document.getElementById("delete-all-item");
let counterDelete = document.getElementById("delete-counter");

selectedAllStudents.addEventListener("click", function() {
  console.log(filtedArray);
    deteteSelectedStudents(filtedArray);
});

function selectItemBox(index) {

  deleteArray.indexOf(index) === -1 ? deleteArray[index] = index : deleteArray[index] = undefined;

  filtedArray = deleteArray.filter(item => typeof item === "number");
  
  filtedArray.length > 9 ? counterDelete.innerText = filtedArray.length : counterDelete.innerText = "0" + filtedArray.length;

  filtedArray.length < 1 ? selectedAllPersons.style.display = "none" : selectedAllPersons.style.display = "block";
}

function deteteSelectedStudents (filtedArray) {
 
for (let i = filtedArray.length - 1; i >= 0; i--) {
  if(typeof filtedArray[i] !== "undefined"){
    todoList.delete(filtedArray[i]); 
    dateTime.deleteC(filtedArray[i]);
    dateTime.deleteM(filtedArray[i]);
   console.log(filtedArray[i]);
  }      
}  
dateTime.saveC();
dateTime.saveM();
todoList.save();
 window.location.reload();
}


let selectItem = list.querySelectorAll("li");
let todoListLength = selectItem.length;
document.getElementById("select-all").innerHTML = `Check all ${todoListLength} items`;

let selectAll = document.getElementById("select-all");
selectAll.addEventListener('click', chooseAll ,false);

function chooseAll() {
  if(this.classList.contains('select-checked')){
    this.classList.remove('select-checked');
    this.innerHTML = `Check all ${todoListLength} items`;
    for (let index = 0; index < todoListLength; index++) {
      selectItem[index].classList.remove("checked");
      
    }

    deleteArray = [];
    deleteArray.length < 1 ? selectedAllPersons.style.display = "none" : selectedAllPersons.style.display = "block";


  } else {
    this.classList.add('select-checked');
    this.innerHTML = `Uncheck ${todoListLength} items`;
    for (let index = 0; index < todoListLength; index++) {
      selectItem[index].classList.add("checked");
      deleteArray[index] = index;
      deleteArray.length < 1 ? selectedAllPersons.style.display = "none" : selectedAllPersons.style.display = "block";
      deleteArray.length > 9 ? counterDelete.innerText = deleteArray.length : counterDelete.innerText = "0" + deleteArray.length;
      filtedArray = deleteArray;
    }
    
  }
  console.log(deleteArray);
console.log(filtedArray);
}

/*

  let ay;
  //create
  document.getElementById("create").addEventListener("click", createContent);
  function createContent() {
    let req = new XMLHttpRequest();

req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    console.log("file created succefullly");
    let as = JSON.parse(req.responseText);
    ay = as.id;
  }
};

req.open("POST", "https://api.jsonbin.io/b", true);
req.setRequestHeader("Content-type", "application/json");
req.setRequestHeader("secret-key", "$2b$10$US/v6OfdpvD6Xf6hinIxoOm4cPleG6nnrVJm6IQraeTwPOyoGQ4Li");
req.send('[{"name":"Aliisa Takkula","address":"Akonmäentie 15 74100 IISALMI","phone":"0501071498","email":"AliisaTakkula@jourrapide.com","age":"56","job":"Student"}]');
}

//open- request

document.getElementById("read").addEventListener("click", readContent);
  function readContent() {
    let req = new XMLHttpRequest();

req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    console.log(req.responseText);
  }
};

req.open("GET", "https://api.jsonbin.io/b/"+ay+"/1", true);  //read version 1
req.setRequestHeader("secret-key", "$2b$10$US/v6OfdpvD6Xf6hinIxoOm4cPleG6nnrVJm6IQraeTwPOyoGQ4Li");
req.send();
}



// update - edit 
document.getElementById("edit").addEventListener("click", editContent);
function editContent(){
  let req = new XMLHttpRequest();

req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    console.log(req.responseText);
  }
};

req.open("PUT", "https://api.jsonbin.io/b/"+ay, true);
req.setRequestHeader("Content-type", "application/json");
req.setRequestHeader("secret-key", "$2b$10$US/v6OfdpvD6Xf6hinIxoOm4cPleG6nnrVJm6IQraeTwPOyoGQ4Li");
req.send('[{"name":"nguyen tran","address":"Akonmäentie 15 74100 IISALMI","phone":"0501071498","email":"AliisaTakkula@jourrapide.com","age":"56","job":"Student"}]');
}


//delete
document.getElementById("delete").addEventListener("click", deleteContent);
function deleteContent () {
  let req = new XMLHttpRequest();

req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    console.log(req.responseText);
  }
};

req.open("DELETE", "https://api.jsonbin.io/b/"+ay, true);
req.setRequestHeader("secret-key", "$2b$10$US/v6OfdpvD6Xf6hinIxoOm4cPleG6nnrVJm6IQraeTwPOyoGQ4Li");
req.send();

}


*/