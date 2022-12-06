import type { NextApiRequest, NextApiResponse } from 'next';
import Joi from 'joi';

import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from '../../../helpers/db-util';
import Comment from '../../../models/Comment';

type Data = {
  message?: string;
  data?: Comment | Comment[];
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    const schema = Joi.string().email();
    const { error } = schema.validate(email);

    if (error) {
      res.status(422).json({ message: 'Invalid input.' });
      client.close();
      return;
    }

    const newComment: Comment = {
      email,
      name,
      text,
      eventId,
    };

    let result;

    try {
      result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: 'Added comment.', data: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Inserting comment failed!' });
    }
  }

  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(client, 'comments', { _id: -1 });
      res.status(200).json({ data: documents });
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed.' });
    }
  }

  client.close();
}

export default handler;
