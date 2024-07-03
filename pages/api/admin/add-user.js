// pages/api/admin/add-user.js

import clientPromise from '@/lib/mongodb'
import { hashPassword } from '@/lib/auth'

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    const { email, password } = req.body

    const client = await clientPromise
    const db = client.db()

    const existingUser = await db.collection('users').findOne({ email })
    if (existingUser) {
        return res.status(422).json({ message: 'User exists already!' })
    }

    const hashedPassword = await hashPassword(password)

    const result = await db.collection('users').insertOne({
        email,
        password: hashedPassword
    })

    res.status(201).json({ message: 'User created!', userId: result.insertedId })
}
