// import connectMongo from '../../../middleware/connectMongo';
import connectToDatabase  from '../../../middleware/database';
import Insurer from '../../../models/insurer';
import Term from '../../../models/term'
import {NextApiRequest, NextApiResponse} from 'next'

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addTerm(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToDatabase();

        const reinsurer = await Insurer.find({type: 'REINSURER'}, {}).then(list => list);

        const term = await  reinsurer?.map(async (user) => {
            // termList.push(term)
            return await Term.create({
                reinsurer: user?._id, // req.body.reinsurer,
                share: 30, // req.body.share
            })
        })

        res.json({ term } );
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}
