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
    
    
    var completeButtons = document.querySelectorAll('.complete-btn'); // Agregar event listener para botones de completar
    completeButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            var todoId = event.target.dataset.todoId;
            completarTarea(todoId);
        });
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
                var completeButton = document.createElement('button');      //Cambio del texto de boton de Completar a Completado
                completeButton.textContent = todo.completado ? 'Completado' : 'Completar';
                completeButton.classList.add('complete-btn');
                completeButton.dataset.todoId = todo.id;
                todoItem.appendChild(completeButton);
                todosDiv.appendChild(todoItem);
                
                
                completeButton.addEventListener('click', function(event) { //evento de click
                    var todoId = event.target.dataset.todoId;
                    completarTarea(todoId);
                });
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
        if (response.ok) {
            mostrarMensaje("Tarea agregada con éxito");   //Mensaje que muestra al usuario cuando usa el POST al agregar una tarea
            fetchTodos();
        }
    });
}


function completarTarea(todoId) { // Funcion para enviar solicitud PUT al servidor Flask para marcar una tarea como completada
    fetch('/api/todos/' + todoId + '/completar', {
        method: 'PUT'
    })
    .then(response => {
        if (response.ok) {
            mostrarMensaje("Tarea completada con exito");
            fetchTodos();
        }
    });
}

function mostrarMensaje(mensaje) {
    alert(mensaje);
}

