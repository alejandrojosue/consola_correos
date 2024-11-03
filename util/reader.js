import fs from 'fs/promises';
import path from 'path';

// Ruta de la carpeta
const folderPath = path.join('./resource');

// Función para leer todos los archivos de la carpeta
export const read = async () => {
  try {
    // Verificar si la carpeta existe
    await fs.access(folderPath).catch(async () => {
      console.log('La carpeta /resource no existe.\nCreándola ahora...');
      await fs.mkdir(folderPath, { recursive: true });
      console.log('Carpeta /resource creada con éxito.');
      return []; // Retorna un array vacío si se crea la carpeta, ya que estará vacía.
    });

    // Leer los archivos dentro de la carpeta
    const files = await fs.readdir(folderPath);
    return files
    // Leer el contenido de cada archivo y retornarlos en un array
    // const fileContents = await Promise.all(
    //   files.map(async (file) => {
    //     const filePath = path.join(folderPath, file);
    //     const data = await fs.readFile(filePath, 'utf8');
    //     return file;
    //   })
    // );

    // return fileContents; // Retorna un array de objetos con el nombre y contenido de cada archivo
  } catch (err) {
    console.error('Error:', err);
    return []; // Retorna un array vacío si hay algún error
  }
};

export const list = async () => {
  const files = await read()
  if (!files.length) console.log('No hay registros'.red)
  files.forEach((file, index) => { console.log(`${index + 1}.`.green + ` ${file.gray}`) })
}
