require('dotenv').config();
const fetch = require('node-fetch');

// List of known coins
let knownCoins = [];

// Function to fetch new NFT from Zora via GraphQL
async function fetchNewZoraNFTs() {
    const query = `
        query {
            tokens(networks: [{ network: ZORA, chain: MAINNET }], sort: { mintedAt: DESC }, pagination: { limit: 10 }) {
                nodes {
                    tokenId
                    name
                    tokenContract {
                        address
                    }
                    mintedAt
                }
            }
        }
    `;
    try {
        const response = await fetch('https://api.zora.co/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        const data = await response.json();
        return data.data.tokens.nodes || [];
    } catch (error) {
        console.error('Error fetching Zora NFTs:', error);
        return [];
    }
}

async function sendFarcasterCast(message) {
    console.log(`Sending cast to Farcaster: ${message}`);
    // Later replace with Farcaster API
    /* 
    const response = await fetch('https://api.farcaster.xyz/v2/casts', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.FARCASTER_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: message })
    });
    const result = await response.json();
    console.log('Cast dikirim:', result);
    */
}

// Function to check new coins
async function checkNewCoins() {
    console.log("Checking new coins in Zora...");
    const coins = await fetchNewZoraNFTs();
    for (const coin of coins) {
        const coinId = coin.tokenId;
        if (!knownCoins.includes(coinId)) {
            console.log(`New coin: ${coin.name || 'Unnamed'}, Address: ${coin.tokenContract.address}`);
            knownCoins.push(coinId);
        }
    }
}

// Function to check the number of mints (placeholder, since GraphQL doesn't provide direct mints data)
async function checkMintMilestone(coinAddress) {
    // Note: Mints data requires API or blockchain event
    console.log(`Checking mints for ${coinAddress} (not yet implemented)`);
    // Later replace with Zora API or ethers.js to check mints
}

// Run every 5 seconds
setInterval(checkNewCoins, 5 * 1000);
checkNewCoins();