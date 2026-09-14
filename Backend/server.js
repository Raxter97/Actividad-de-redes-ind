const express = require('express');
const cors = require('cors');
const {exec} = require('child_process');

const app = express();
app.use(cors());

app.get('/api/scan', (req,res)=>{
    const {ip,timeout = 1000} = req.query;
    const startTime = Date.now();
    exec(`ping -n 1 -w ${timeout} ${ip}`, async (error, stdout)=>{
        const timeElapsed = Date.now() - startTime;
        const activo = stdout.includes('TTL=');
        let nombre = 'No resuelto';
        if(!activo){
            return res.json({
                ip,
                activo: false,
                nombre: 'No resuelto',
                tiempo: '-'
            });
        };
        exec(`nslookup ${ip}`, (nsError, nsStdout) => {
            let nombre = 'No resuelto';
            if (!nsError && nsStdout) {
                const lineas = nsStdout.split('\n');
                for (let linea of lineas) {
                    if (linea.includes('Name:') || linea.includes('Nombre:')) {
                        nombre = linea.split(':')[1].trim();
                        break;
                    }
                }
            }

            res.json({
                ip,
                activo: true,
                nombre,
                tiempo: `${timeElapsed}ms`
            });
        });
    });
});

app.listen(3000, () => console.log('Backend puerto 3000'));