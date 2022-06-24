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

        let reinsurerList = [
            {
                name: 'Insurer',
                email: 'insurer@gmail.com',
                password: '123',
                type: 'INSURER'
            },
            {
                name: 'Reinsurer 1',
                email: 'reinsurer1@gmail.com',
                password: '123',
                type: 'REINSURER'
            },
            {
                name: 'Reinsurer 2',
                email: 'reinsurer2@gmail.com',
                password: '123',
                type: 'REINSURER'
            },
            {
                name: 'Reinsurer 3',
                email: 'reinsurer3@gmail.com',
                password: '123',
                type: 'REINSURER'
            },
            {
                name: 'Reinsurer 4',
                email: 'reinsurer4@gmail.com',
                password: '123',
                type: 'REINSURER'
            },
        ]

        const insurer = await reinsurerList?.map(async (user) => {
            // termList.push(term)
            return await Insurer.create({
                ...user
            })
        })

        res.json({ insurer });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}
