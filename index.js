const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const client = new discord.Client();
client.login(process.env.token);

client.on("ready", async () => {

    console.log(`${client.user.username} is online.`);
    client.user.setActivity("de commands!", {type: "LISTENING"})

});

client.on("message", async message =>{

       if(message.author.bot) return;

       if(message.channel.type == "dm") return;

       var prefix = botConfig.prefix;
        
       var messageArray = message.content.split(" ");

       var command = messageArray[0];

       if(command === `${prefix}hallo`){
           return message.channel.send("Hallo!")
       }

       if(command === `${prefix}doei`){
           return message.channel.send("Dag hoor!");
       
           
           
       }

       if (command === `${prefix}info`) {

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
          if (command === `${prefix}serverinfo`) {

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
       
       if (command === `${prefix}kick`) {

        var args = message.content.slice(prefix.length).split(/ +/);

        if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Sorry jij kan dit niet!");

        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Geen permissies.");

        if (!args[1]) return message.reply("Er is geen gebruiker opgegeven.");

        if (!args[2]) return message.reply("Er is geen reden opgegeven.");

        var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

        var reden = args.slice(2).join(" ");

        if(!kickUser) return message.reply("Gebruiker niet gevonden");

        var embedPrompt = new discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Gelieve binnen 30 seconden te reageren.")
        .setDescription(`Weet je zeker dat je ${kickUser} wilt kicken? Zoja klik op ✅!`);

        var embed = new discord.MessageEmbed()
        .setColor("#ff0000")
        .setFooter(message.member.displayName)
        .setTimestamp()
        .setDescription(`**Gekicked:** ${kickUser} (${kickUser.id})
        **Gekicked door:** ${message.author}
        **Reden:** ${reden} `);

        message.channel.send(embedPrompt).then(async msg => {

            var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);
            
            if (emoji === "✅") {

                msg.delete();

                kickUser.kick(reden).catch(err =>{
                    if (err) return message.reply("Er is iets fout gegaan.");

                });

                message.channel.send(embed);

            } else if (emoji === "❌") {

                message.reply("Kick geanuleerd!").then(m.delete(5000));
            }
        
        })



       }
       

}); 


async function promptMessage(message, author, time, reactions){
    
    time *= 1000;

    for(const reaction of reactions){
        await message.react(reaction);
    }
    
    var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

    return message.awaitReactions(filter, {max:1, time: time}).then(collected => collected.first() && collected.first().emoji.name);
}

client.on("guildMemberAdd", member =>{

    var role = member.guild.roles.cache.get("776066987389747241");

    if(!role) return;

    member.roles.add(role);

    var channel = member.guild.channels.cache.get('776068103351697460');

    if(!channel) return;

channel.send(`Welkom in de lobby ${member}`);


})