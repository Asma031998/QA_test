// import connectMongo from '../../../middleware/connectMongo';
import connectToDatabase from '../../../middleware/database'
import Insurer from '../../../models/insurer'
import {ObjectID} from 'bson'
import Final_terms from '../../../models/final_terms'
import {NextApiRequest, NextApiResponse} from 'next'

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function updateFinalTerms(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToDatabase()


        const finalTerm = new Final_terms(
            {
                price: 20,
                terms: ['62ac8963999a8a69ef6a4312', '62ac89c3999a8a69ef6a4314']
            })

        // find by id and update with req.bod
        const finalTerms = await Final_terms.updateOne(
                {_id: new ObjectID(req.body.id) },
                {
                    $set: {
                        price: req.body.price,
                    }
                },
                {upsert: true}
            )


        res.json({status: 200, data: finalTerms})
    } catch (error) {
        console.log(error)
        res.json({error})
    }
}
