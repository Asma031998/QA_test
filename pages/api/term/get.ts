// import connectMongo from '../../../middleware/connectMongo';
import connectToDatabase from '../../../middleware/database'
import {ObjectID} from 'bson'
import Term from '../../../models/term'
import {NextApiRequest, NextApiResponse} from 'next'

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function findTerm(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToDatabase()

        // find by id and update with req.bod
        const term = await Term.findOne({reinsurer:  req.body.id} , 'share reinsurer')
            .populate('reinsurer', {'name': 1, 'email': 1}, 'Insurer')


        res.json({status: 200, data: term})
    } catch (error) {
        console.log(error)
        res.json({error})
    }
}
