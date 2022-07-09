function encrypted(data: string) {

    const superCode = 'ff89s8s8da456s84s2';
    const dataBase64 = Buffer.from(data+superCode).toString('base64').split('').reverse().join('');
    return dataBase64;
}

function decrypted(data: string) {

    const superCode = 'ff89s8s8da456s84s2';
    const dataBase64 = Buffer.from(data+superCode, 'base64').toString().split('').reverse().join('');
    return dataBase64;
}

const encryptionSystem = { encrypted, decrypted };
export default encryptionSystem;