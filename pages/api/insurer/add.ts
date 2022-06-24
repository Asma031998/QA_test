// import connectMongo from '../../../middleware/connectMongo';
import connectToDatabase  from '../../../middleware/database';
import Insurer from '../../../models/insurer'

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addInsurer(req, res) {
    try {
        await connectToDatabase();
        const insurerModel = new Insurer({
            name: 'reinsurer 2',
            email: 'reinsurer2@gmail.com',
        })

        const insurer = Insurer.create(insurerModel);

        res.json({ insurer });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}
