// pages/api/admin/delete-user.js

import clientPromise from '@/lib/mongodb'

export default async (req, res) => {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    const { userId } = req.body

    const client = await clientPromise
    const db = client.db()

    await db.collection('users').deleteOne({ _id: new require('mongodb').ObjectId(userId) })

    res.status(200).json({ message: 'User deleted!' })
}
