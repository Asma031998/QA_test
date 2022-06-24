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

        const res = await fetch('/api/insurer/init')
        const res1 = await fetch('/api/term/add')
        const res2 = await fetch('/api/finalTerms/add')

        reinsurerList?.map(async (user) => {
            // termList.push(term)
            return await Insurer.create({
                ...user
            })
        })

        const reinsurer = await Insurer.find({type: 'REINSURER'}, {}).then(list => list);

       reinsurer?.map(async (user) => {
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
            reinsurer,
            termList,
            finalTerms
        } });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}
