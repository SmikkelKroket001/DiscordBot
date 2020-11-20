const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    return message.channel.send("Dag hoor!")

}

module.exports.help = {
    name: "doei"
}