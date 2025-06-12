import SQLite from 'react-native-sqlite-storage';

// Configuración de la base de datos
const databaseName = 'EduponderaDB.sqlite';
const databaseLocation = 'default';

// Abrir/Crear base de datos
const openDatabase = () => {
  return SQLite.openDatabase(
    {
      name: databaseName,
      location: databaseLocation,
      createFromLocation: 1 // Opcional: para usar una DB preexistente
    },
    () => console.log('Database connected'),
    error => console.error('Database error', error)
  );
};

// Inicialización de tablas
const initDatabase = () => {
  const db = openDatabase();

  db.transaction(tx => {
    // Tabla Materias
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS materias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        color TEXT,
        fondo TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`
    );

    // Tabla Cortes
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS cortes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        materia_id INTEGER NOT NULL,
        nombre TEXT NOT NULL,
        peso REAL NOT NULL,
        nota_final REAL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(materia_id) REFERENCES materias(id) ON DELETE CASCADE
      );`
    );

    // Tabla Evaluaciones
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS evaluaciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        corte_id INTEGER NOT NULL,
        nombre TEXT NOT NULL,
        porcentaje REAL NOT NULL,
        nota REAL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(corte_id) REFERENCES cortes(id) ON DELETE CASCADE
      );`
    );
  });
};

// Operaciones CRUD para Materias
const materiaRepository = {
  create: (materia) => {
    return new Promise((resolve, reject) => {
      const db = openDatabase();
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO materias (nombre, color, fondo) VALUES (?, ?, ?)',
          [materia.nombre, materia.color || null, materia.fondo || null],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error)
        );
      });
    });
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      const db = openDatabase();
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM materias ORDER BY created_at DESC',
          [],
          (_, result) => resolve(result.rows.raw()),
          (_, error) => reject(error)
        );
      });
    });
  },

  // ... otras operaciones CRUD
};

// Exportar las funciones
export default {
  initDatabase,
  openDatabase,
  materiaRepository,
  // ... otros repositorios
};