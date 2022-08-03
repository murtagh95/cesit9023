conn = new Mongo();
db = conn.getDB('cesit-prog-3');
db.createCollection('tareas');
