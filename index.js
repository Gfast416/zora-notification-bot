// List of known coins
let knownCoins = [];

// Function to check new coins
function checkNewCoins() {
    console.log("Checking coins...");

    // Coin data simulation from Zora
    const newCoins = [
        { name: "MyCoin", address: "0x123" },
        { name: "ArtCoin", address: "0x456" }
    ];

    // Check every coin
    for (const coin of newCoins) {
        if (!knownCoins.includes(coin.address)) {
            console.log("New coin found: " + coin.name);
            knownCoins.push(coin.address);
        }
    }
}

// Run every 10 seconds
setInterval(checkNewCoins, 10 * 1000);

// Run once on startup
checkNewCoins();