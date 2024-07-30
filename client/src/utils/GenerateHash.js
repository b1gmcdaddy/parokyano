import CryptoJS from 'crypto-js'

// function for generating a unique transaction number
// just make sure to page refresh to avoid duplicating hash since formData.transaction_no will not update until window is refreshed
export default function generateHash() {
    const input = Date.now()    // Date.now() returns a unique number, this returns a milisecond
    return CryptoJS.SHA256(input.toString()).toString(CryptoJS.enc.Hex)
}