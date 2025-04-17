require('dotenv').config();
const fetch = require('node-fetch');

let knownCoins = [];

async function fetchNewZoraNFTs() {
    // Simulated data
    return [
        {
            tokenId: '123',
            name: 'Simulated NFT',
            tokenContract: { address: '0xabc123' },
            mintedAt: new Date().toISOString()
        }
    ];
}

async function sendFarcasterCast(message, zoraLink) {
    console.log(`Sending cast to Farcaster: ${message}`);
    console.log(`Trading links: ${zoraLink}`);
}

async function checkNewCoins() {
    console.log("Checking out new coins in Zora...");
    const coins = await fetchNewZoraNFTs();
    for (const coin of coins) {
        const coinId = coin.tokenId;
        if (!knownCoins.includes(coinId)) {
            const message = `New coin: ${coin.name || 'Unnamed'} (ID: ${coinId}, Address: ${coin.tokenContract.address})`;
            const zoraLink = `https://zora.co/collect/zora:${coin.tokenContract.address}/${coinId}`;
            console.log(message);
            await sendFarcasterCast(message, zoraLink);
            knownCoins.push(coinId);
        }
    }
}

setInterval(checkNewCoins, 5 * 1000);
checkNewCoins();