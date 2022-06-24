import { Schema, model, models } from 'mongoose';

import Term from './term'

const finalTermsSchema = new Schema({
    price: Number,
    terms: [{ type: Schema.Types.ObjectId, ref: Term }]
});

const FinalTerms = models.FinalTerms || model('FinalTerms', finalTermsSchema);

export default FinalTerms;