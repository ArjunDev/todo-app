//check to see if anything exist in localstorage, else create empty items array
const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [] ;

//check to see if anything exist in localstorage, else create empty completed items array
const completedItemsArray = localStorage.getItem('completedItems') ? JSON.parse(localStorage.getItem('completedItems')) : [];

//to check if completedItemsArray has any items
if(completedItemsArray.length > 0){
  const completedItems = document.querySelector('.completed-items');
  console.log(completedItems);
  completedItems.classList.remove('hide');
}
//console.log(itemsArray);
//console.log(completedItemsArray);

window.onload = function(){
  displayItems();
  displayComletedItems();
}

document.querySelector('.add-btn').addEventListener('click', () => {
  
  const item = document.querySelector('.input-area');
  if(item.value == ""){
    alert(`Don't be lazy! type something before click on Add button.`);
  } else {
    createItem(item);  //create item
  }
  //createItem(item);
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
  //console.log(items);
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
      activeCompletedItemListeners(todoItem[index]);// calling f
      deleteItem(); 
      //when click check mark, calling this f to delete that item
      location.reload();
    });
  });
}

function activeCompletedItemListeners(item){
  const completedTodoText = item.querySelector(".todo-text");
  createCompletedItem(completedTodoText.value);
}
//create completeditemsArray in localstorage
function createCompletedItem(item){
  console.log(item);
  completedItemsArray.push(item);
  localStorage.setItem('completedItems', JSON.stringify(completedItemsArray));
  //displayComletedItems();
  //location.reload();
}
//display each todo items by looping 
function displayComletedItems(){
  let completeditems = "";
  for(let i=0; i<completedItemsArray.length; i++){
    completeditems += `<div class="todo-list">
                <div class="todo-item completed">
                  <textarea class="todo-text" disabled>${completedItemsArray[i]}</textarea>
                  <div class="completed-todo-icon">
                    <i class="fa-solid fa-trash completed-delete-btn"></i>
                  </div>
                </div>
              </div>`;
  }
  //console.log(completeditems);
  //console.log(document.querySelector('.completeditem-container'));

  document.querySelector('.completeditem-container').innerHTML = completeditems;
  activateDeleteListenersForCompletedItem();
}

function activateDeleteListenersForCompletedItem(){
  let deleteBtns = document.querySelectorAll('.completed-delete-btn');
  deleteBtns.forEach((db, index) => {
    db.addEventListener('click', () => deleteCompletedItem(index))
  });
}

function deleteCompletedItem(index){
  completedItemsArray.splice(index, 1);
  localStorage.setItem('completedItems', JSON.stringify(completedItemsArray));
  location.reload();
}