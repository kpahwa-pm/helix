const express = require("express");
const cors = require("cors");
const yahooFinance = require("yahoo-finance2").default;

const app = express();

app.use(cors());
app.use(express.json());

// TEST endpoint
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

// Portfolio endpoint (we will improve later)
app.get("/portfolio", async (req, res) => {

    try {

        // Temporary sample portfolio
        const portfolio = [
            { symbol: "RELIANCE.NS", qty: 10 },
            { symbol: "TCS.NS", qty: 5 }
        ];

        let result = [];

        for (let stock of portfolio) {

            const quote = await yahooFinance.quote(stock.symbol);

            const price = quote.regularMarketPrice;

            result.push({
                symbol: stock.symbol,
                qty: stock.qty,
                price: price,
                market_value: price * stock.qty
            });
        }

        res.json({
            portfolio: result
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
