const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');

// generate new todo element
const generateTemplate = todo =>{
    
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;

    list.innerHTML += html;
}

// form submit event
addForm.addEventListener('submit', e => {
    
    e.preventDefault();
    const todo = addForm.add.value.trim();
    //console.log(todo);

    if(todo.length){
        generateTemplate(todo);
        addForm.reset();
    }
});

// delete todos
list.addEventListener('click', e => {
    
    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove();
    }

});

// filter todos
const filterTodos = (term) => {
    Array.from(list.children)
        .filter((todo) => !todo.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.add('filtered'));

    Array.from(list.children)
        .filter((todo) => todo.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.remove('filtered'));
};

// keyup event
search.addEventListener('keyup', e => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});

const getTodos = async () => {

    const response = await fetch('data/luigi.json');

    if(response.status != 200){
        throw new Error('cannot fetch the data');
    }

    const data = await response.json();
    
    return data;
};

getTodos()
    .then(data => console.log('resolved', data))
    .catch(err => console.log('rejected', err.message));
