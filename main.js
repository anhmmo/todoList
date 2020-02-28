window.onload = checkExitsLocalStorage();

function checkExitsLocalStorage() {
    //return 0 if not exists, if exists localStorageLength > 1 or = 1.

    if(localStorage.length < 1){
        //set an sample data, this data can remove like this: const jsonData = JSON.stringify([]);
        const jsonData = JSON.stringify([]);
        localStorage.setItem("TODO-LIST", jsonData);
    }
}



let list = document.querySelector('#todo-list'),
    form = document.querySelector('#submit-form'),
    input = document.querySelector('#input'),
    storeKey = "TODO-LIST";

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
 

form.addEventListener("submit", addNewItem, false);
  function addNewItem(e) {
    e.preventDefault();

    todoList.add(`${input.value}`);
    todoList.save();
    
    window.location.reload();
}


todoList.load();
renderTodoList();




function renderTodoList () {
    if(localStorage.length > 0) {
    
      let item = todoList.data;
      let output = "";
      for (let index = 0; index < item.length; index++) {
        output += `<li class="item">${item[index]}<i class="delete fas fa-trash" onclick="deleteItem(${index})"></i><i class="edit fas fa-user-edit" onclick="editItem(${index})"></i><i class="info fas fa-info-circle" onclick="infoItem(${index})"></i></li>`;
      }
      list.innerHTML = output;
    }
    
}

function deleteItem(index) {
  preventListFunction();

  let deletePopup = document.getElementById("delete-popup");
  let yes = document.getElementById("yes");
  let no = document.getElementById("no");

  deletePopup.style.display = "block";

  yes.addEventListener("click", function() {
    todoList.delete(index);
    todoList.save();
    window.location.reload();
  });
 
  no.addEventListener("click", function() {
    deletePopup.style.display = "none";
    window.location.reload();
  });
}

function editItem(index) {
  preventListFunction();

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
    window.location.reload();
  }
  
  cancel.addEventListener("click", function(){
    editPopup.style.display = "none";
    window.location.reload();
  });
}


function infoItem(index) {
  preventListFunction();
  todoList.save();
}


list.addEventListener('click', chooseItem ,false);
function chooseItem(e) {
  let t = e.target;
  if(t.classList.contains('checked')){
    t.classList.remove('checked');
  } else {
    t.classList.add('checked');
  }
}

function preventListFunction () {
  list.removeEventListener("click", chooseItem);
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