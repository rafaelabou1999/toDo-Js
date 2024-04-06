const inputToValidate = document.querySelectorAll('.input-toValidate');
const btnTask = document.querySelector(".btn-task");
const input = document.querySelector(".input");
const all = document.querySelector(".geral");
const ul = document.querySelector("ul");

function createPValid(){
       const p = document.createElement('p');
       return p;   
}

const p = createPValid();
function isEmpty(){    
  if(!input.value){
    inputToValidate.forEach((i) => {
        input.style.border = '1px solid red' 
         p.textContent = "Please, enter a task"
         p.style.fontSize = '.7rem';
         p.style.color = 'red';
         i.appendChild(p);
    });
  } else{
    p.remove();
    input.style.border = '1px solid #000'
  }
   
}

function createLi(){
    const li = document.createElement('li');
    return li;
}

function createList(inputTxt){
   const li = document.createElement('li');
   li.textContent = inputTxt;
   ul.appendChild(li);
   return li;
}

function createBtnDelete(li){
    const btn = document.createElement('button');
    btn.innerHTML = `<i class="fa-sharp fa-solid fa-trash"></i>`;
    li.appendChild(btn);
    li.style.position = 'relative'
    btn.style.position="absolute";
    btn.style.right = '5%';
    btn.style.color = 'white';
    btn.style.backgroundColor = '#0C0C0C';
    btn.style.border = 'none';
    btn.style.padding = '.3rem';
    
    
    return btn;
}

function deleteTask(li){
 li.remove();
}
btnTask.addEventListener("click", () => {
    isEmpty();
    

     const listItem = createList(input.value);
     const deleteButton = createBtnDelete(listItem); 

 
     deleteButton.addEventListener("click", () => {
         deleteTask(listItem); 
     });
})

input.addEventListener("keypress", (e) => {
  if(e.keyCode === 13){
    if(!input.value) {
        return isEmpty();
     } 
 
      const listItem = createList(input.value);
      const deleteButton = createBtnDelete(listItem); 
 
  
      deleteButton.addEventListener("click", () => {
          deleteTask(listItem); 
      });
  }
})