import { pb } from 'lib/pb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { identity, password } = req.body;
  if (!identity || !password) {
    return res.status(400).json({ success: false });
  }
  try {
    const result = await pb
      .collection('users')
      .authWithPassword(identity, password);
    if (result.token) {
      res.setHeader('Set-Cookie', pb.authStore.exportToCookie());
      return res.status(200).json({ success: true, data: result });
    } else {
      return res.status(401).json({ success: false, data: result });
    }
  } catch (e) {
    return res.status(401).json({ success: false, data: e.data });
  }
}
