# Turbin3 Solana Prerequisites: Enrollment dApp

This repository contains a simple set of scripts to walk applicants through the essential Solana DevNet setup steps that are required for the Turbin3 cohort. By following these instructions, applicants will be able to:

1.  Generate a new Solana keypair (wallet).

2.  Airdrop Solana tokens to their wallet on DevNet.

3.  Transfer tokens between wallets on DevNet.

4.  Empty their DevNet wallet into their Turbin3 wallet.

5.  Enroll using the Turbin3 prerequisite dApp to confirm completion of the tasks.


Note: This project is not a test of advanced TypeScript or coding skills. Instead, it assesses aplicants' ability to follow processes, debug small issues, and successfully ship code. It is essential that applicants understand the steps and ask questions when they get stuck!

---
## Table of Contents

- [Prerequisites](#prerequisites)

- [Project Setup](#roject-etup)

- [Scripts Overview](#scripts-overview)

    - [Key Generation (`keygen.ts`)](#key-generation-keygents)
    
    - [Airdrop (`airdrop.ts`)](#airdrop-airdropts)

    - [Transfer (`transfer.ts`)](#transfer-transferts)

    - [Enrollment (`enroll.ts`)](#enrollment-enrollts)

- [Importing/Exporting Wallet Formats](#importingexporting-wallet-formats)

    - [Base58 to Byte Array](#base58-to-byte-array)

    - [Byte Array to Base58](#byte-array-to-base58)

- [License](#license)

- [Troubleshooting & Tips](#troubleshooting--tips)

- [Credits](#credits)

---

## Prerequisites

1. **Node.js** (v16+ recommended).

2. **Yarn** (v1 or v3+ are fine; recommended over npm).

3. **TypeScript, ts-node**, and other dependencies (installed via `yarn`).

4. A **fresh directory** to hold this project and all future tutorials.

5. (Recommended) **Git** for version control.

6. (Optional) If using Windows, consider using **WSL2** for Solana development.

---

## Project Setup

1. **Clone this repository** (or create a new folder and copy these files into it):
```bash
git clone https://github.com/<your_username>/<your_repo>.git
cd <your_repo>
```

2. **Initialize Yarn*** and install dependencies:
```bash
yarn install
```
This will install:
- `@solana/web3.js` for Solana interaction.
- `typescript`, `ts-node`, and TypeScript definitions for Node.
- `bs58` (for base58 encoding/decoding if you want to convert wallet formats).
- `@coral-xyz/anchor` (for interacting with Anchor-based Solana programs)
-  Other support libraries as listedn in your `package.json`

3. **Check** `package.json` **scripts**:
```jsonc
"scripts": {
    "keygen": "ts-node ./keygen.ts",
    "airdrop": "ts-node ./airdrop.ts",
    "transfer": "ts-node ./transfer.ts",
    "enroll": "ts-node ./enroll.ts"
}
```
You can run each of these with `yarn keygen`, `yarn airdrop`, etc.

4. **Review the**`tsconfig.json`:
- Ensures TypeScript complies with `common.js`, includes `ES2019` libraries, etc.

---

## Scripts Overview

### Key Generation(`keygen.ts`)
- **Purpose**: Generates a new Solana keypair (public/private keys).
- **Usage**:
```bash
yarn keygen
```
This prints out:
- The new public key (base58 address).
- A byte array (the private key) that you should copy into a JSON file, for example `dev-wallet.json`.

**Important**: Never commit private key files (`dev-wallet.json or similar) to public repos.

---

### Airdrop (`airdrop.ts`)

- **Purpose**: Requests SOL from the Solana DevNet faucet to your newly created dev wallet.

- **Usage**:
```bash
yarn airdrop
```
This script:
1. Imports your private key from `dev-wallet.json`.
2. Establishes a connection to DevNet (`https://api.devnet.solana.com`).
3. Requests 2 SOL worth of lamports for your wallet.

- **Output**:
A success message containing a transaction hash, which you can view on the [Solana Explorer (DevNet)](#explorer.solana.com/?cluster=devnet).

---

### Transfer (`transfer.ts`)
- **Purpose**: Transfers SOL from your dev wallet to your **Turbin3** wallet address.

- **Usage**:
```bash
yarn transfer
```
This script:
1. Imports your private key.
2. Sets up a **Transaction** and **SystemProgram.transfer** for 0.1 SOL.
3. Signs and sends the transaction (TX) to DevNet.
4. Logs the TX signature fo rviewing on the Solana Explorer.

- **Emptying your dev wallet**:
You can also modify `transfer.ts` (or use a separate script) to `send out all` lamports. The code:
1. Fetches your current balance.
2. Calculates transaction fees.
3. Subtracts fees from the transfer amount so you can send the entire balance in one go.

---

### Enrollment (`enroll.ts`)
- **Purpose**: **Confirms completion** of the Turbin3 prerequisites by calling the on-chain **enrollment** program.
- **Usage**:
```bash
yarn enroll
```
This script:
1. Uses **@coral-xyz/anchor** to create a program client from the provided IDL.
2. Creates a **PDA** (Program Derived Address) to store your enrollment data.
3. Calls the program's `submit` (or `complete`) instruction, passing the applicant's **GitHub username** as a UTF-8 buffer.

**Don't forget to replace** `<your github account>` with your actual gitHub username in the script.

---

## Importing/Exporting Wallet Formats

If you want to convert between the **Solana byte array** format (such as `[34,46,55,124,...]`) and the **base58** format commonly used by wallets like Phantom, you can use the bs58 package. Below are two TypeScript snippets demonstrating the process.

### Base58 to Byte Array
```ts
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
```
- Add to your `package.json` scripts: `"582b": "ts-node ./base58_to_bytes.ts"`.
- Run:
```bash
yarn 582b
```
Then paste a valid base58-encoded private key when prompted.

### Byte Array to Base58
```ts
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
```
- Add to your `package.json` scripts: `"b258": "ts-node ./bytes_to_base58.ts"`.
- Run:
```bash
yarn b258
```
Paste in a byte array and the corresponding **base58-encoded** string will be returned.

---

## License

The project is provided under the MIT License.

---

## Troubleshooting & Tips

1. **No funds after airdrop**
     - Check the explorer link to ensure your transaction was successful.
     - Wait a moment or two, then run `getBalance` again in a small script.
2. **Invalid keypair or base58 decode error
    - Ensure that you copied the entire private key array from `keygen.ts` output (including all brackets and commas).
    - For base58 conversions, confirm you have no extra whitespace or line breaks.
3. **Transaction fails or times out***
    - DevNet can be slow; retry or use another RPC endpoint (e.g., `https://api.devnet.solana.com` is the standard, but you can also try `https://solana-devnet.rpcpool.com` or others).
4. **Accidentally committed a private key
    - Immediately remove the key if it's valuable.
    - Remove it from your repo history (via `git filter-branch`, `git filter-repo`, or BFG), or rotate to a new keypair.

---

## Credits

- [Solana labs](#solana.com) for `@solana/web3.js`
- [coral-xyz](#github.com/coral-xyz/anchor) for the Anchor framework
- The Turbin3 team for the course materials

For questions or guidance, please reach ot in the **Solana Chat channel** of the **Turbin3 Discord**.

---


## Glossary of Jargon

**"Ship Code"**: Refers to taking software that has been developed and making it available to end users - often by deploying it into a production environment or otherwise delivering it in a form tha can be used. In practical terms this includes: **Finalizing and testing** and **Deploying**. Shipping is the final stage where the software is now in the hands of users.

**Repo**: (Repository) A place where code is stored, tracked, and managed using a version control system (for example, Git). A repo typically resides on a hosting service like GitHub or locally on a developer's machine. It contains the entire history of changes made to the project, enabling collaboration and version tracking.

**Interface Definition Language (IDL)**: Specifies a program's public interface. Most Solana programs have an IDL and it is the main way in which we interact with programs on Solana. The IDL defines a Solana program's account structures, instructions, and error codes. IDLs are .json files, so they may be used to generate client-side code, such as TypeScript type definitions, for ease of use.

**Program Derived Address (PDA)**: A program address that give the address authority to "sign" transactions with a Public Key derived from some kind of deterministic seed. The PDA, combined with an additional "bump" which is a single additional byte that is generated to "bump" the Public Key off of the elliptic curve, is able to securely authorize transactions without having a matching Private Key. 