import { Router } from 'express';
import { random, normalizar, denormalizar } from '../controllers/norma.js'
import { sign, log, home, logOut } from '../controllers/log.js'
import passport from 'passport';
import { loggedIn } from '../middlewares/user.js';
import { fork } from 'child_process';
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const scriptPath = path.resolve(__dirname, '../controller/randoms.js');

const optionsPassport = { badRequestMessage: 'Error' };

const router = Router();

router.get('/productos-random', random);

router.get('/normalizado', normalizar);

router.get('/denormalizado', denormalizar);

router.post('/sign', sign);

router.post('/log', passport.authenticate('log', optionsPassport), log);

router.get('/home', loggedIn, home);

router.get('/logout', logOut);

router.get('/info', (req, res) => {
    res.json({
        SistemaOperativo: process.platform,
        VersionNode: process.version,
        MemoriaTotalReservada: JSON.stringify(process.memoryUsage()),
        ProcessId: process.pid,
        CarpetaProyecto: process.cwd()
    })
});

router.get('/random/:cant', (req, res) => {

    const cant = req.params.cant;

    const randomNumb = fork(scriptPath);

    randomNumb.send(cant);
    randomNumb.on('message', (numb) => {
        res.json({
            numb
        });
    });
})

export default router;