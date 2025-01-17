import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Posao = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    klijent: {
        type: String,
    },
    agencija: {
        type: String,
    },
    idObjekat: {
        type: mongoose.Schema.Types.ObjectId,
    },
    status: {
        type: String,
    },
    prekid: {
        Boolean,
    },
    pocetak: {
        type: Date,
    },
    kraj: {
        type: Date,
    },
    ponuda: {
        type: Number,
    },
});

export default mongoose.model('PosaoModel', Posao, 'poslovi');
