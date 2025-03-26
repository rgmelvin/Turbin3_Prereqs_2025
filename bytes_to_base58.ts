const promptSync = require('prompt-sync');
const prompt = promptSync();

import bs58 from 'bs58';

function bytesToBase58() {
    const byteString = prompt('Enter your byte array (comma-separated numbers): ');
    const byteValues = byteString.split(',').map(Number);

    if (byteValues.some(isNaN)) {
        console.error('Invalid byte array input.');
        return;
    }

    const byteArray = Uint8Array.from(byteValues);

    try {
        const base58Output = bs58.encode(byteArray);
        console.log('Base58 encoded string:', base58Output);
    } catch (error) {
        console.error('Error encoding to base58:', error);
    }
}

bytesToBase58();