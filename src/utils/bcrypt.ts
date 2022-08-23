import * as bcrypt from 'bcrypt';

export async function encodePassword(rawPassword: string) {
    const Salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword, Salt);
}
    