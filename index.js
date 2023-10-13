const express = require('express')
const app = express()
const axios = require("axios");
const path = require("path")
const port = process.env.PORT || 3000;
app.use(express.static('static'))
app.use(express.json());
require('dotenv').config();

const { Telegraf } = require('telegraf');
const { error } = require('console');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome to the Simple Telegram Bot.\nI respond to /btc or /eth. Please try it.'));

bot.command('btc', ctx => {
    var rate;
    console.log(ctx.from)
    axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`)
        .then(response => {
            console.log(response.data)
            rate = response.data.ethereum
            const message = `Hello, today the bitcoin price is ${rate.usd}USD`
            bot.telegram.sendMessage(ctx.chat.id, message, {
            })
        })
});
bot.command('eth', ctx => {
    var rate;
    console.log(ctx.from)
    axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`)
        .then(response => {
            console.log(response.data)
            rate = response.data.ethereum
            const message = `Hello, today the ethereum price is ${rate.usd}USD`
            bot.telegram.sendMessage(ctx.chat.id, message, {
            })
        })
});
bot.command('quit', async (ctx) => {
    // Explicit usage
    await ctx.telegram.leaveChat(ctx.message.chat.id)

    // Using context shortcut
    await ctx.leaveChat()
});

try {
    bot.launch();
    console.log('Bot started!');
} catch(e) {
    console.error(e);
}