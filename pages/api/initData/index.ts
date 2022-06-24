// import connectMongo from '../../../middleware/connectMongo';
import connectToDatabase from '../../../middleware/database'
import Insurer from '../../../models/insurer'
import Term from '../../../models/term'
import {NextApiRequest, NextApiResponse} from 'next'
import Final_terms from '../../../models/final_terms'

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function InitData(req : NextApiRequest, res: NextApiResponse) {
    try {
        await connectToDatabase();
        // let termList: any = []

        const reinsurer = await Insurer.find({type: 'REINSURER'}, {});

        await reinsurer?.map(async (user) => {
            // termList.push(term)
            return await Term.create({
                reinsurer: user?._id, // req.body.reinsurer,
                share: 30, // req.body.share
            })
       })
        const termList =  await Term.find({})
            .populate('reinsurer', {'name': 1, 'email': 1}, 'Insurer')


        const finalTerms = await Final_terms.create({
            price: 10,
            terms: await Term.find({}).then((term) => term.map((t) => t._id))
        });

        
        res.json({ status: 200, data: {
            termList,
            finalTerms} });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}
