import { Schema, model, models } from 'mongoose';

const insurerSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
    type: {
        type: String,
        enum : ['INSURER' , 'REINSURER'],
        default: 'REINSURER'
    } ,
});

const Insurer = models.Insurer || model('Insurer', insurerSchema);

export default Insurer;