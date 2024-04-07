Este proyecto consta de una pequeña Api-rest que funciona como una pequeña agenda temporal de tareas
Use el boton Agregar tareas para crear una lista temporal de tareas a realizar
posterior a agregarlas se iran visualizando en la parte superior y contaran con un boton con una leyenda que dice "Completar"
dicho boton al dar click usara el metodo PUT, para marcar la tarea como "Completado"  y asi seguir agregando tareas.

  La Api usa get y post para consultar en un arreglo de datos 2 tareas definidas en un inicio.
**Importante ejecutar esta linea de codigos si no posee Flask instalado en su equipo personal luego de clonar el repositorio**


pip install -r requirements.txt

*Una vez instalados las dependencias abra en una terminal de python como puede ser Visual Studio code, el archivo llamado* **app.py**
Y ejecutelo, esto abrira una instancia de Flask y automaticamente abrira una ventana en su navegador web por defecto 
usando la direccion 127.0.0.1:5000 , verifique que no tiene conflictos para usar dicho puerto.
