const multer = require('multer');
const path = require('path');

// Define la configuración del almacenamiento de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Define la carpeta de destino para los archivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Genera un nombre único para los archivos
  }
});

// Crea el middleware de carga de archivos usando multer
const upload = multer({ storage });

// Exporta la función upload
module.exports = upload; 