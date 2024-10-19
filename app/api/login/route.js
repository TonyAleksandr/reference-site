import jwt from 'jsonwebtoken';

import { getUsers } from "@/lib/db"

export async function POST(req) {
    const { email, password } = await req.json();
    const users = await getUsers()

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        const token = jwt.sign({ name: user.name, id: user.id }, 'secret_key', { expiresIn: '1h' });
        return Response.json({ token }, { status: 200 });
    }

    return Response.json({ message: 'Неверные учетные данные', status_code: 401 }, { status: 401 });
}
