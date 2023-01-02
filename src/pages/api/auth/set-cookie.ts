import { pb } from 'lib/pb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cookie } = req.body;
  if (cookie) {
    res.setHeader('Set-Cookie', cookie);
    return res.status(200).json({ success: true });
  } else {
    return res.status(400).json({ success: false });
  }
}
