import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // remove 'pb_auth' cookie
  res.setHeader(
    'Set-Cookie',
    'pb_auth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  );
  return res.status(200).json({ success: true });
}
