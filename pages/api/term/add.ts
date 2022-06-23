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

        const finalTerm = new Term(
            {
                reinsurer:  '62b02282eada3fc45179527f', // req.body.reinsurer,
                share: 30, // req.body.share
            })

        const term = await Term.create(finalTerm);

        res.json({ term } );
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}
