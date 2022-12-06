import type { NextApiRequest, NextApiResponse } from 'next';
import Joi from 'joi';

import { connectDatabase, insertDocument } from '../../helpers/db-util';

type Data = {
  message: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    const schema = Joi.string().email();
    const { error } = schema.validate(userEmail);

    if (!userEmail || error) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' });
      return;
    }

    try {
      await insertDocument(client, 'newsletter', { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' });
      return;
    }

    res.status(201).json({ message: 'Signed up!' });
  }
}

export default handler;
