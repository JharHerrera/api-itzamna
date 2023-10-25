import bcrypt from 'bcryptjs'

export const encrypt = async (textPlain) =>{
    const hash = await bcrypt.hash(textPlain, 10)
    return hash
}

export const compare = async (passwordPlain, passwordHash) =>{
    return await bcrypt.compare(passwordPlain, passwordHash)
}