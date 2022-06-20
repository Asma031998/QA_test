// import connectMongo from '../../../middleware/connectMongo';
import connectToDatabase  from '../../../middleware/database';
import Insurer from '../../../models/insurer';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addInsurer(req, res) {
    try {
        await connectToDatabase();

        const reinsurer = await Insurer.find({type: 'REINSURER'}, {});

        res.json({ reinsurer });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}
