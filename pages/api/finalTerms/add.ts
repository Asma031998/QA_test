// import connectMongo from '../../../middleware/connectMongo';
import connectToDatabase  from '../../../middleware/database';
import Insurer from '../../../models/insurer';
import Final_term from '../../../models/term'
import Final_terms from '../../../models/final_terms'
import {NextApiRequest, NextApiResponse} from 'next'

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
                terms: ['62af44cb07df61058d2d7cb1', '62af44f507df61058d2d7cb3']
            })

        // const insurer = db.collection("final_term").insertOne(finalTerm);
        const insurer = await Final_terms.create(finalTerm);

        res.json({ insurer } );
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}
