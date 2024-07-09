require('dotenv').config();
const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require("path");
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors');
app.use(express.json());
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//Cors
app.use(cors());


app.post('/api/markdown', (req, res) => {
    const markdownContent = req.body.markdown;
    const inputFilePath = path.join(__dirname, 'flex', 'input.md');
    const flexExecutable = path.join(__dirname, 'flex', 'convertMDtoHTML');

    // Escribir el contenido de Markdown en un archivo temporal
    fs.writeFileSync(inputFilePath, markdownContent);

    // Ejecutar el archivo Flex compilado y capturar la salida
    exec(`${flexExecutable} < ${inputFilePath}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error ejecutando el archivo Flex: ${stderr}`);
            res.status(500).send('Error al convertir Markdown a HTML');
        } else {
            res.status(200).json({ html: stdout });
        }
    });
});

