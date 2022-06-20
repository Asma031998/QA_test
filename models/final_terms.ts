import { Schema, model, models } from 'mongoose';

const finalTermsSchema = new Schema({
    price: Number,
    terms: [{ type: Schema.Types.ObjectId, ref: 'Term' }]
});

const FinalTerms = models.FinalTerms || model('FinalTerms', finalTermsSchema);

export default FinalTerms;