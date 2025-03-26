import { Transaction, SystemProgram, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";
import wallet from "./dev-wallet.json"

// Import dev-wallet keypair.
const from = Keypair.fromSecretKey(new Uint8Array(wallet));

// Define my Turbin3 public key.
const to = new PublicKey("HrK9NkuGnVnu6TsEvRfdDhsnTBEH89VtGnANyTCUAyXm");

// Create the Solana devnet connection.
const connection = new Connection("https://api.devnet.solana.com");

// Create the transaction.
(async () => {
    try {
        // Get balance of dev wallet
        const balance = await connection.getBalance(from.publicKey)

        // Create test transaction to calculate fees
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: balance,
            })
        );
        transaction.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
        transaction.feePayer = from.publicKey;

        // Calculate exact fee rate to transfer entire SOL amount out of account minus fees.
        const fee = (await connection.getFeeForMessage(transaction.compileMessage(),'confirmed')).value || 0;

        // Remove our transfer instruction to replace it.
        transaction.instructions.pop();

        // Now add the instruction back with the correct amount of lamports
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey:to,
                lamports: balance - fee
            })
        );

        // Sign transaction, broadcast, and confirm
        const signature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [from]
        );
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
}) ();