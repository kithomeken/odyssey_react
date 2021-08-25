import * as crypto from 'crypto-js'
import EncryptionKeys from "./EncryptionKeys"

class Crypto {
    encryptDataUsingAES256(plainText: any) {
        let iv: any
        let key = EncryptionKeys.keyBase()
        iv = EncryptionKeys.ivBase()

        var cipherText = crypto.AES.encrypt(plainText, key, {
            keySize: 128 / 8,
            iv: iv,
            mode: crypto.mode.CBC,
            padding: crypto.pad.Pkcs7
        }).toString();

        return cipherText;
    }

    decryptDataUsingAES256(cipherText: any) {
        let iv: any
        let key = EncryptionKeys.keyBase()
        iv = EncryptionKeys.ivBase()

        var plainText = crypto.AES.decrypt(cipherText, key, {
            keySize: 128 / 8,
            iv: iv,
            mode: crypto.mode.CBC,
            padding: crypto.pad.Pkcs7
        }).toString(crypto.enc.Utf8);

        return plainText
    }
}

export default new Crypto()