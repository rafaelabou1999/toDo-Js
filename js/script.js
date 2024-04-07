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
   li.style.display = "flex";
   li.style.flexDirection = 'row';
   ul.appendChild(li);
   createCheck(li);
   return li;
}

function createBtnDelete(li){
    const btn = document.createElement('button');
    btn.innerHTML = `<i class="fa-sharp fa-solid fa-trash"></i>`;
    li.appendChild(btn);
    li.style.position = 'relative'
    btn.style.position="absolute";
    btn.style.right = '8%';
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
    
    if(input.value.trim() !== ''){
        const listItem = createList(input.value);
        const deleteButton = createBtnDelete(listItem); 
   
    
        deleteButton.addEventListener("click", () => {
            deleteTask(listItem); 
        });
        input.value = '';
    }
    
    createCheck(input.value);
})

let isChecked = false;
function createCheck(li){
    const box = document.createElement('div');
    box.innerHTML = `<i class="fa-regular fa-square"></i>`;
    box.style.marginRight = "3%";
    li.insertBefore(box, li.firstChild);
    box.style.color = 'rgb(18, 149, 201)';

    box.addEventListener("click", () => {
        box.innerHTML = `<i class="fa-solid fa-square-check"></i>`;
        box.style.color = 'rgb(18, 149, 201)';
        li.style.textDecoration = 'line-through';

        if (!isChecked) {
            box.innerHTML = `<i class="fa-solid fa-square-check"></i>`;
            li.style.textDecoration = 'line-through';
            li.style.color = "#808080";
        } else {
            box.innerHTML = `<i class="fa-regular fa-square"></i>`;
            li.style.textDecoration = 'none';
            li.style.color = "#000";
        }


        isChecked = !isChecked;
    })
    return box;
}

input.addEventListener("keypress", (e) => {
  if(e.keyCode === 13){
      isEmpty();
    
      if(input.value.trim() !== ''){
        const listItem = createList(input.value);
        const deleteButton = createBtnDelete(listItem); 
   
    
        deleteButton.addEventListener("click", () => {
            deleteTask(listItem); 
        });

        input.value = '';
    }

    createCheck(input.value);
  }
})

