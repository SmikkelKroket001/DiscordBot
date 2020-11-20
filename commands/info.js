const discord = require("disco;rd.js");

module.exports.run = async(bot, message, args) => {

    var botEmbed = new discord.MessageEmbed()
    .setTitle("Informatie")
    .setDescription("Hier kan je wat informatie vinden!")
    .setColor("#0099ff")
    .addField("Bot naam", client.user.username)
    .addFields(
        {name: "Datum dat de bot is gemaakt", value: "18-11-2020"},
        {name: "Maker van de bot", value: "SmikkelKroket001"}  
        )
        .setThumbnail("https://imgur.com/a/3iGTNyz")
        .setFooter("Made by SmikkelKroket001");
    

 return message.channel.send(botEmbed);

}

module.exports.help = {
    name: "info"
}