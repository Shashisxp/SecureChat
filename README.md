#Web Chat

## Quick start

The first things you need to do are cloning this repository and installing its
dependencies:

```sh
git clone https://github.com/Ayush-kathayat/SecureChat.git
cd SecureChat
npm install
```

Once installed, let's run Hardhat's testing network:

```sh
npx hardhat node
```

Then, on a new terminal, go to the repository's root folder and run this to
deploy your contract:

```sh
npx hardhat run scripts/deploy.js --network localhost
```

Finally, we can run the frontend with:

```sh
npm run dev --prefix frontend
```

## Or if you want to Integrate Hardhat with Vite 

# Install the hardhat-vite Plugin

```sh
npm install hardhat-vite
```

## Configure Hardhat to Use hardhat-vite

After installing the plugin, you need to require or import it in your hardhat.config.js or hardhat.config.ts file, depending on whether you're using JavaScript or TypeScript.

### For JavaScript:


```js
require("hardhat-vite");
```

### For TypeScript:

```ts
import "hardhat-vite";
```
This step ensures that Hardhat recognizes and integrates with the hardhat-vite plugin.

### Basic Configuration (Optional)
The hardhat-vite plugin does not require any specific configuration within hardhat.config.js, but you can specify Vite options inside it if needed. Additionally, you can use a vite.config.js file for more detailed Vite configurations. Refer to Vite's [config documentation](https://vitejs.dev/config/) for all available options.

### Using Vite Commands: 

The hardhat-vite plugin adds a vite task to Hardhat, allowing you to run Vite commands like serve, build, and preview. For example, to start the Vite development server, you can run:

```sh
npx hardhat vite serve
```

This command starts the Vite development server, enabling you to develop your frontend alongside your Hardhat project.

Open [http://localhost:5173/](http://localhost:5173/) to see your Dapp. You will
need to have [Coinbase Wallet](https://www.coinbase.com/wallet) or [Metamask](https://metamask.io) installed and listening to
`localhost 8545`.

## User Guide

You can find detailed instructions on using this repository and many tips in [its documentation](https://hardhat.org/tutorial).

- [Writing and compiling contracts](https://hardhat.org/tutorial/writing-and-compiling-contracts/)
- [Setting up the environment](https://hardhat.org/tutorial/setting-up-the-environment/)
- [Testing Contracts](https://hardhat.org/tutorial/testing-contracts/)
- [Setting up your wallet](https://hardhat.org/tutorial/boilerplate-project#how-to-use-it)
- [Hardhat's full documentation](https://hardhat.org/docs/)

For a complete introduction to Hardhat, refer to [this guide](https://hardhat.org/getting-started/#overview).


**Happy _building_!**
