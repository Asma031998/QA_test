// import connectMongo from '../../../middleware/connectMongo';
import connectToDatabase from '../../../middleware/database'
import Insurer from '../../../models/insurer'
import Final_terms from '../../../models/final_terms'
import {NextApiRequest, NextApiResponse} from 'next'

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function listFinalterm(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToDatabase()
        //  const final_term = await Final_term.find({})
        //      .populate('reinsurer', {'name': 1, 'email': 1}, 'Insurer')
        const final_term = await Final_terms.find({  }, '_id price terms ')
            .populate({
                    path: 'terms',
                    model: 'Term',
                    populate: {
                        path: 'reinsurer',
                        model: 'Insurer',
                        match: {
                            $type: 'REINSURER'
                        },
                        select: 'name email'
                    },
                }
            )
        res.json({status: 200, data: final_term[0]})
    } catch (error) {
        console.log(error)
        res.json({error})
    }
}
