//check to see if anything exist in localstorage, else create empty array
const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [] ;

console.log(itemsArray);

window.onload = function(){
  displayItems();
}

document.querySelector('.add-btn').addEventListener('click', () => {
  
  const item = document.querySelector('.input-area');
  /*
  if(item.value == ""){
    alert(`Don't be lazy! type something before click on Add button.`);
  } else {
    createItem(item);  //create item
  }
  */
  createItem(item)
});

//create itemsArray in localstorage
function createItem(item){
  itemsArray.push(item.value);
  localStorage.setItem('items', JSON.stringify(itemsArray));
  location.reload();
}

//display each todo items by looping 
function displayItems(){
  let items = "";
  for(let i=0; i<itemsArray.length; i++){
    items += `<div class="todo-list">
                <div class="todo-item">
                  <textarea class="todo-text" disabled>${itemsArray[i]}</textarea>
                  <div class="todo-icons">
                    <i class="fa-solid fa-check check-mark-btn"></i>
                    <i class="fa-solid fa-pen-to-square edit-btn"></i>
                    <i class="fa-solid fa-trash delete-btn"></i>
                  </div>
                </div>
                <div class="save-cancle-box">
                  <button class="save-btn">Save</button>
                </div>
              </div>`;
  }
  document.querySelector('.bottom-container').innerHTML = items;
  activateDeleteListeners();
  activateEditListeners();
  activateCheckMarkListeners();
  activateSaveBtnListenrs();
}

function activateEditListeners(){
  const editBtns = document.querySelectorAll('.edit-btn');
  const textArea = document.querySelectorAll('.todo-text');
  const saveCancleDiv = document.querySelectorAll('.save-cancle-box');
  editBtns.forEach((eb, index) => {
    eb.addEventListener('click', () => {
      textArea[index].disabled = false;
      textArea[index].focus();
      saveCancleDiv[index].style.display = "inline-block";
      //console.log(saveCancleDiv);
    });
  });
}

function activateSaveBtnListenrs(){
  const saveBtn = document.querySelectorAll('.save-btn');
  const textArea = document.querySelectorAll('.todo-text');
  saveBtn.forEach((sb, index) => {
    sb.addEventListener('click', () => {
      saveItem(textArea[index].value, index);
    });
  });
}

function saveItem(text, index){
  itemsArray[index] = text;
  localStorage.setItem('items', JSON.stringify(itemsArray));
  location.reload();
  console.log(itemsArray);
}

function activateDeleteListeners(){
  let deleteBtns = document.querySelectorAll('.delete-btn');
  deleteBtns.forEach((db, index) => {
    db.addEventListener('click', () => deleteItem(index))
  });
}

function deleteItem(index){
  itemsArray.splice(index, 1);
  localStorage.setItem('items', JSON.stringify(itemsArray));
  location.reload();
}
function activateCheckMarkListeners(){
  const markBtns = document.querySelectorAll('.check-mark-btn');
  const todoItem = document.querySelectorAll('.todo-item');
  markBtns.forEach((mb, index) => {
    mb.addEventListener('click', () =>{
      todoItem[index].classList.toggle('completed');
      //console.log(todoList[index]);
      //activeCompletedItemListeners(todoList[index]);
    });
  });
}
function activeCompletedItemListeners(item){
  console.log(item);

}
