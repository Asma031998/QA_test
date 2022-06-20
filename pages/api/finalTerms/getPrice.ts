// import connectMongo from '../../../middleware/connectMongo';
import connectToDatabase from '../../../middleware/database'
import Insurer from '../../../models/insurer'
import Final_terms from '../../../models/final_terms'
import {NextApiRequest, NextApiResponse} from 'next'

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function getFinalterm(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToDatabase()
        const final_term = await Final_terms.find({}, '_id price  ')

        res.json({status: 200, data: final_term[0]})
    } catch (error) {
        console.log(error)
        res.json({error})
    }
}
