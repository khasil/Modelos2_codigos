from flask import Flask, jsonify, request, render_template
import webbrowser  # Modulo que permite abrir el explorador

app = Flask(__name__)

# Datos de ejemplo para no usar una base de datos
todos = [
    {"id": 1, "tarea": "Hacer la compra", "completado": False},
    {"id": 2, "tarea": "Lavar el coche", "completado": True}
]

# Ruta para obtener todos los todos
@app.route('/api/todos', methods=['GET'])
def get_todos():
    return jsonify(todos)

# Ruta para agregar un nuevo todo
@app.route('/api/todos', methods=['POST'])  # Usando metodo POST
def add_todo():
    new_todo = request.json
    new_todo['id'] = len(todos) + 1
    new_todo['completado'] = False  # Definimos que por defecto la tarea agregada estara incompleta
    todos.append(new_todo)
    return jsonify({"mensaje": "Tarea agregada con éxito"})


@app.route('/api/todos/<int:todo_id>/completar', methods=['PUT']) # Ruta para marcar una tarea como completada
def completar_todo(todo_id):
    global todos
    for todo in todos:
        if todo['id'] == todo_id:
            todo['completado'] = True
            return jsonify({"mensaje": f"Tarea {todo_id} marcada como completada"})
    return jsonify({"error": "Tarea no encontrada"}), 404

# Ruta para servir la pagina HTML
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    if __package__ is None or __package__ == '':
         webbrowser.open('http://localhost:5000')  
    app.run(debug=True)
