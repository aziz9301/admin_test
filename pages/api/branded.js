import { mongooseConnect } from "@/lib/mongoose";
import { Brand } from "@/models/Brand";



export default async function handle(req, res) {
  const {method} = req;

  await mongooseConnect();

  if(method === 'POST') {
    const {name, parentBrand} = req.body;

    const brandDoc = await Brand.create({name, parent: parentBrand|| undefined});
    res.json(brandDoc)
  }

  if (method === 'GET') {
    res.json(await Brand.find().populate('parent'))
  }

  if(method === 'PUT') {
    const {name, parentBrand, _id} = req.body;

    const parentDoc = await Brand.updateOne({_id}, {name, parent: parentBrand || undefined});
    res.json(parentBrand)
  }

  if (method === 'DELETE') {
    const {_id} = req.query;
    await Brand.deleteOne({_id});
    res.json('ok');
  }
}