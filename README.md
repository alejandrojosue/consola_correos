# Consola Correos

Es una aplicación de consola destinada al envío de correos, ya sea con o sin archivos adjuntos, llevar registro de ello y poder visualizar todos los ficheros disponibles en `/resource`.

## Estructura del Proyecto
```text
/
├── helpers
│   ├── emailValidate.js
│   ├── inquirer.js
│   └── saveFile.js
├── models
│   ├── record.js
│   └── records.js
├── util
│   ├── email.js
│   └── reader.js
├── app.js
└── package.json
```

## Instalación
Para ejecutar este proyecto, sigue estos pasos:
1. **Clona el repositorio:**
```bash
git clone <URL del repositorio>
cd consola_correos
```
2. **Instala las dependencias:**
```bash
npm install
```
3. **Instala las dependencias:** Configura tus credenciales de SMTP: Asegúrate de que las credenciales de tu servidor SMTP estén configuradas en el archivo ``email.js``. En el ejemplo se utilizan las credenciales de Gmail.

## Uso

Para ejecutar la aplicación, utiliza el siguiente comando:
```bash
npm run start
```
ó
```bash
node app
```

## Funcionalidades
- **Enviar correo electrónico sin adjuntos:** Permite enviar correos electrónicos a una o más direcciones sin archivos adjuntos.
- **Enviar correo electrónico con adjuntos:** Permite enviar correos electrónicos con uno o más archivos adjuntos.
- **Listar archivos:** Muestra todos los archivos disponibles en la carpeta `/resource`.
- **Registrar envíos:** Guarda un registro de todos los correos enviados en un archivo JSON.