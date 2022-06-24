// import connectMongo from '../../../middleware/connectMongo';
import connectToDatabase  from '../../../middleware/database';
import Insurer from '../../../models/insurer';
import Final_term from '../../../models/term'
import Final_terms from '../../../models/final_terms'
import {NextApiRequest, NextApiResponse} from 'next'
import Term from '../../../models/term'

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addInsurer(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToDatabase();


        const finalTerms = await Final_terms.create({
            price: 10,
            terms: await Term.find({}).then((term) => term.map((t) => t._id))
        });


        res.json({finalTerms } );
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}
