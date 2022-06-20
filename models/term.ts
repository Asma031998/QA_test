import {Schema, model, models} from 'mongoose'

const finalTermSchema = new Schema({
    id: String,
    reinsurer: {type: Schema.Types.ObjectId, ref: 'Insurer'},
    share: Number
})

const Term = models.Term || model('Term', finalTermSchema)

export default Term