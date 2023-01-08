export const numberRa = (cant) => {

    let numerosRandom;

    for (let i = 0; i < cant; i++) {
        numerosRandom = Math.floor(Math.random() * cant + 1);
        console.log(numerosRandom);
    }

    return numerosRandom;

};

process.on('message', (cant) => {

    if (cant !== 0) {
        console.log(`PID: ${process.pid}`);
        const numb = numberRa(cant || 100000000);
        console.log(numb);
        process.send(numb);
    }
});
