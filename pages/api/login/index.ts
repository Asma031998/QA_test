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
        // console.log(req);

        const insurer = await Insurer.findOne({
            email: req.body.email,
            password: req.body.password
        });


        res.json({
            status: 200,
            success:insurer.id.length > 0 ,
            user: insurer
        });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}
