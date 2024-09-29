//check to see if anything exist in localstorage, else create empty array
const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [] ;

console.log(itemsArray);

window.onload = function(){
  displayItems();
}

document.querySelector('.add-btn').addEventListener('click', () => {
  const item = document.querySelector('.input-area');
  createItem(item);  //create item
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
    items += `<div class="todo-list"><textarea class="todo-text" disabled>${itemsArray[i]}</textarea>
    <div class="todo-icons">
      <i class="fa-solid fa-check check-mark-btn"></i>
      <i class="fa-solid fa-pen-to-square edit-btn"></i>
      <i class="fa-solid fa-trash delete-btn"></i>
    </div></div>`;
  }
  document.querySelector('.todo-div').innerHTML = items;
  activateDeleteListeners();
  activateEditListeners();
  activateCheckMarkListeners();
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

function activateEditListeners(){
  const editBtns = document.querySelectorAll('.edit-btn');
  const textArea = document.querySelectorAll('.todo-text');
  editBtns.forEach((eb, index) => {
    eb.addEventListener('click', () => {
      textArea[index].disabled = false;
      textArea[index].focus();
    });
  });
}

function activateCheckMarkListeners(){
  const markBtns = document.querySelectorAll('.check-mark-btn');
  const todoDiv = document.querySelectorAll('.todo-list');
  markBtns.forEach((mb, index) => {
    mb.addEventListener('click', () =>{
      todoDiv[index].classList.toggle('completed');
    });
  });
}


