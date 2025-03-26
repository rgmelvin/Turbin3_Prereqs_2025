import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import wallet from "./dev-wallet.json"

// Import keypair from the wallet file.
const keypair =  Keypair.fromSecretKey(new Uint8Array(wallet));

// Establish connection to the Solana devnet.
const connection = new Connection("https://api.devnet.solana.com");

(async () => {
    try {
        // Clain 2 SOL tokens
        const txhash = await connection.requestAirdrop(keypair.publicKey, 2 * LAMPORTS_PER_SOL);
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
}) ();