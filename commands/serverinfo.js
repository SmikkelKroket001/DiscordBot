const discord = require("disco;rd.js");

module.exports.run = async(bot, message, args) => {

    var botEmbed = new discord.MessageEmbed()
                 .setTitle("Server Informatie")
                 .setDescription("Hier kan je wat server informatie vinden!")
                 .setColor("#0099ff")
                 .addFields(
                     {name:"Je bent gejoined op:", value: message.member.joinedAt},
                     {name:"Totaal members", value:message.guild.memberCount}
                     )
                     .setFooter("Made by SmikkelKroket001")
                    
                     return message.channel.send(botEmbed); 

}

module.exports.help = {
    name: "serverinfo"
}