//check to see if anything exist in localstorage, else create empty array
const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [] ;

console.log(itemsArray);

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

  //let todoWrapper = document.querySelector('.todo-wrapper').
  //todoWrapper.appendChild();
  document.querySelector('.todo-div').innerHTML = items
  activateDeleteListeners();
  activateEditListeners();
  activateMarkListeners();
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
    });
  });
}

function activateMarkListeners(){

}


window.onload = function(){
  displayItems();
}







//earlier code
/*function addItem(){
  const inputText = document.querySelector(".input-area");
  //console.log(inputText);
  //console.log(inputText.value);
  
  
  //storeInLocal();
  todoDiv.innerHTML = 
    `<textarea name="textarea" class="todo-text" disabled>${inputText.value}</textarea>
    <div class="todo-icons">
      <i class="fa-solid fa-check check-mark"></i>
      <i class="fa-solid fa-pen-to-square edit"></i>
      <i class="fa-solid fa-trash delete"></i>
    </div>`;  
  bottomContainer.appendChild(todoDiv);  
  inputText.value = "";  

  //container holding the todo items is bottomContainer 
  // Add a single event listener to the bottomContainer (event delegation)
  bottomContainer.addEventListener('click', function(event) {
    // Get the clicked element
    const clickedIcon = event.target;

  // tocheck whick icon is clicked and action accordingly
  if (clickedIcon.classList.contains('check-mark')) {
    // Handle check mark click
    console.log("Check icon clicked");
    const todoDiv = clickedIcon.closest('.todo-div');
    todoDiv.classList.toggle('completed'); // Toggle completed state
    const todoText = clickedIcon.closest('.todo-div').querySelector('.todo-text');
    todoText.disabled = true;

  } else if (clickedIcon.classList.contains('edit')) {
    // Handle edit icon click
    console.log("Edit icon clicked");
    const todoText = clickedIcon.closest('.todo-div').querySelector(".todo-text");
    todoText.disabled = false; 
    // Toggle between editable and non-editable
    todoText.focus();

  } else if (clickedIcon.classList.contains('delete')) {
    // Handle delete icon click
    console.log("Delete icon clicked");
    const todoDiv = clickedIcon.closest('.todo-div');
    todoDiv.remove(); // Remove the todo item
  }
  });

}
*/