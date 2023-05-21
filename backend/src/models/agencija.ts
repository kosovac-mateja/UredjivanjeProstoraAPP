import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Agencija = new Schema({
    korisnickoIme: {
        type: String,
    },
    naziv: {
        type: String,
    },
    ulica: {
        type: String,
    },
    grad: {
        type: String,
    },
    drzava: {
        type: String,
    },
    mb: {
        type: String,
    },
    opis: {
        type: String,
    },
});

export default mongoose.model('AgencijaModel', Agencija, 'agencije');