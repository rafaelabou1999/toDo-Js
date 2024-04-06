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
  if(!input.value.trim()){
    inputToValidate.forEach((i) => {
        input.style.border = '1px solid #AA4A44' 
         p.innerHTML = `<div><i class="fa-solid fa-circle-exclamation"></i> Please, enter a task.</div>`
         p.style.fontSize = '.7rem';
         p.style.color = '#AA4A44';
         i.appendChild(p)
         const emptyTask = createLi();
         emptyTask.remove();
         
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
    btn.style.top = '7%';
    btn.style.color = 'rgb(18, 149, 201)';
    btn.style.backgroundColor = 'transparent';
    btn.style.border = 'none';
    btn.style.padding = '.3rem';
    
    
    return btn;
}

function deleteTask(li){
 li.remove();
}
btnTask.addEventListener("click", () => {
    isEmpty();
    
    if(input.value !== ''){
        const listItem = createList(input.value);
        const deleteButton = createBtnDelete(listItem); 
   
    
        deleteButton.addEventListener("click", () => {
            deleteTask(listItem); 
        });
    }
    
})

input.addEventListener("keypress", (e) => {
  if(e.keyCode === 13){
      isEmpty();
    
      if(input.value !== ''){
        const listItem = createList(input.value);
        const deleteButton = createBtnDelete(listItem); 
   
    
        deleteButton.addEventListener("click", () => {
            deleteTask(listItem); 
        });
    }
  }
})