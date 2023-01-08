import fs from 'fs';
import { normalize, schema, denormalize } from 'normalizr';
import { faker } from '@faker-js/faker';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const messages = path.join(__dirname, '../data/messages.json');
const norma = path.join(__dirname, '../data/norma.json');
const denorma = path.join(__dirname, '../data/denorma.json');

faker.locale = 'es';

export const random = (req, res) => {

    const respuesta = [];

    for (let i = 0; i < 5; i++) {
        respuesta.push({
            nombre: faker.name.firstName(),
            precio: faker.commerce.price(),
            img: faker.image.abstract(1234, 2345),
        })
    }

    res.json({
        msg: respuesta
    })

};

export const readMessages = () => {

    const data = fs.readFileSync(messages, 'utf-8');
    return JSON.parse(data)

};

export const normalizar = (req, res) => {

    const data = readMessages();

    const user = new schema.Entity('authors', {}, { idAttribute: 'id' });
    const msg = new schema.Entity('messages', { author: user });

    const msgSchema = new schema.Array({
        author: user,
        text: [msg]
    })

    const dataNormalizada = normalize(data, msgSchema);

    fs.writeFileSync(norma, JSON.stringify(normaData, null, '\t'))

    res.json({
        msg: normaData
    })

};

export const denormalizar = (req, res) => {

    const author = new schema.Entity('authors', {});
    const text = new schema.Entity('text', { author });
    const finalSchema = new schema.Array(text)


    const data = JSON.parse(fs.readFileSync(norma));
    const denormaData = denormalize(data.result, finalSchema, data.entities);

    fs.writeFileSync(denorma, JSON.stringify(denormaData, null, '\t'));

    res.json({
        msg: denormaData
    });
};



