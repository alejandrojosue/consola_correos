import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'db', 'data.json');

// Función para guardar datos en `data.json`
const saveDB = (data) => {
    // Verificar si la carpeta `db` existe, si no, crearla
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    // Escribir los datos en el archivo `data.json`    
    fs.writeFileSync(filePath, JSON.stringify(data));
};

// Función para leer los datos de `data.json`
const readDB = () => {
    // Si el archivo no existe, crearlo y devolver un valor predeterminado
    if (!fs.existsSync(filePath)) {
        saveDB([]);  // Inicializar con un objeto vacío o lo que prefieras
    }

    // Leer y parsear los datos del archivo
    const info = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(info);
};

export {
    saveDB,
    readDB
};
