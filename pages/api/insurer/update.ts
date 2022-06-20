// import connectMongo from '../../../middleware/connectMongo';
import {connectToDatabase} from '../../../middleware/database'
import Insurer from '../../../models/insurer'
import {ObjectID} from 'bson'

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function updateInsurer(req, res) {
    try {
        const {db} = await connectToDatabase()

        // find by id and update with req.bod
        const insurer = db.collection("insurer")
            .updateOne(
                {_id: new  ObjectID('62ac788ead4c6f1f3c6adbb4')},
                {$set: {email: 'reinsurer5@gmail.com', name: 'reinsurer 5'}},
                {upsert: true}
            )


        res.json({status: 200, data: JSON.stringify(insurer) })
    } catch (error) {
        console.log(error)
        res.json({error})
    }
}
