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

        const finalTerm = new Final_terms(
            {
                price: 10,
                terms: ['62b4841ff82000de7898cddf', '62b48482f82000de7898cde5', '62b484adf82000de7898cde7', '62b4852ef82000de7898cde9']
            })

        const final_term = await Term.find({})

        // const insurer = db.collection("final_term").insertOne(finalTerm);
        const finalTerms = await Final_terms.create({
            price: 10,
            terms: finalTerm.map((term) => term._id)
        });

        res.json({ insurer: finalTerms } );
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}
