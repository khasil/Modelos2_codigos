document.addEventListener('DOMContentLoaded', function() {
    fetchTodos();
    
    document.getElementById('todoForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var taskInput = document.getElementById('tarea');
        var task = taskInput.value.trim();
        if (task !== '') {
            addTodo(task);
            taskInput.value = '';
        }
    });
});

function fetchTodos() {
    fetch('/api/todos')
        .then(response => response.json())
        .then(data => {
            var todosDiv = document.getElementById('todos');
            todosDiv.innerHTML = '';
            data.forEach(todo => {
                var todoItem = document.createElement('div');
                todoItem.textContent = todo.tarea;
                if (todo.completado) {
                    todoItem.classList.add('completado');
                }
                todosDiv.appendChild(todoItem);
            });
        });
}

function addTodo(task) {
    fetch('/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tarea: task, completado: false })
    })
    .then(response => {
        console.log('Respuesta POST:', response);
        if (response.ok) {
            alert("tarea agregado con éxito");
            fetchTodos();
        }
    });
}
