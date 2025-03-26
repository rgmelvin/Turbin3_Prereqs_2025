const promptSync = require('prompt-sync');
const prompt = promptSync();

import bs58 from 'bs58'

function base58ToBytes() {
    const base58Input = prompt('Enter your bas58 encoded private key:');

    try {
        const wallet = bs58.decode(base58Input);
        console.log('Decode wallet (byte array):', wallet);
    } catch (error) {
        console.error('Error deccoding base58:', error);
    }
}

base58ToBytes();