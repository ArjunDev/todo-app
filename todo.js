
const addBtn = document.querySelector(".add-btn");
const bottomContainer = document.querySelector(".bottom-container");

addBtn.addEventListener('click', addItem);

function addItem(){
  const inputText = document.querySelector(".input-area");
  //console.log(inputText);
  //console.log(inputText.value);
  let todoDiv = document.createElement('div');
  todoDiv.classList.add('todo-div');
  
  //storeInLocal();
  todoDiv.innerHTML = 
    `<textarea name="textarea" class="todo-text" disabled>
    ${inputText.value}</textarea>
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
      const todoText = clickedIcon.closest('.todo-div').querySelector(".todo-text");
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

