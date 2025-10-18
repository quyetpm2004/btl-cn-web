import db from '../models/index.js';
const { users } = db;

const handleGetAllUsers = async () => {
    const list = await users.findAll()
    if(list) return list
    else return []
}

const handleCreateUser = async (email, username, password, role) => {
    const newUser = await users.create({email, username, password, role})
    return newUser
}

export { handleGetAllUsers, handleCreateUser }