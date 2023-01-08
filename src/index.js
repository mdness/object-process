import Server from './services/server.js';
import { initDb } from './db/index.js';
import minimist from 'minimist';

const optionalArgsObject = {
  default: {
    port: '8080'
  }
};

const args = minimist(process.argv.slice(2), optionalArgsObject);


Server.listen(args.port, async () => {

    await initDb();
    console.log('Connected!');
    console.log('Server up in', args.port);
}); 