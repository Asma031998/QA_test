// import connectMongo from '../../../middleware/connectMongo';
import connectToDatabase  from '../../../middleware/database';
import Insurer from '../../../models/insurer';
import Term from '../../../models/term'
import {NextApiRequest, NextApiResponse} from 'next'

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function listFinalterm(req : NextApiRequest, res: NextApiResponse) {
    try {
       await connectToDatabase();
        const final_term = await Term.find({})
            .populate('reinsurer', {'name': 1, 'email': 1}, 'Insurer')

        res.json({ status: 200, data: final_term });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}
