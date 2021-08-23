import EncryptionKeys from "./EncryptionKeys";
import * as crypto from 'crypto-js'

class Crypto {
    encryptUsingAES256(plainText) {
        let key = EncryptionKeys.keyBase()
        let iv = EncryptionKeys.ivBase()

        var cipherText = crypto.AES.encrypt(plainText, key, {
            keySize: 128 / 8,
            iv: iv,
            mode: crypto.mode.CBC,
            padding: crypto.pad.Pkcs7
        }).toString();

        return cipherText;
    }

    decryptUsingAES256(decString) {
        let key = EncryptionKeys.keyBase()
        let iv = EncryptionKeys.ivBase()

        var plainText = crypto.AES.decrypt(decString, key, {
            keySize: 128 / 8,
            iv: iv,
            mode: crypto.mode.CBC,
            padding: crypto.pad.Pkcs7
        }).toString(crypto.enc.Utf8);

        return plainText
    }
}

export default new Crypto()