// import connectMongo from '../../../middleware/connectMongo';
import {connectToDatabase}  from '../../../middleware/database';
import Insurer from '../../../models/insurer';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addInsurer(req, res) {
    try {
        const { db } = await connectToDatabase();

        const insurer = db.collection("insurer").insertOne({
            name: 'reinsurer 1',
            email: 'reinsurer1@gmail.com',
        });

        res.json({ insurer });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}
