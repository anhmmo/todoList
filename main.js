
    let list = document.querySelector('#todo-list'),
        form = document.querySelector('#submit-form'),
        item = document.querySelector('#item');
    
    form.addEventListener('submit', addNewItem , false);

    function addNewItem (e) {
        e.preventDefault();
        list.innerHTML += '<li>' + item.value + '</li>';
        store();
        item.value = "";
    }
    
    list.addEventListener('click', selectItem , false);

   function selectItem(e) {
      let t = e.target;
      if(t.classList.contains('checked')){
        t.classList.remove('checked');
      } else {
        t.classList.add('checked');
      }
      store();
   }
    
    function store() {
      window.localStorage.myitems = list.innerHTML;
      
    }
    
    function getValues() {
      let storedValues = window.localStorage.myitems;
      if(!storedValues) {
        list.innerHTML = '';
      }
      else {
        list.innerHTML = storedValues;
      }
    }
    getValues();



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