const discord = require("discord.js")
const botConfig = require("./botconfig.json");

const fs = require("fs");

const bot = new discord.Client();
bot.commands = new discord.Collection(); 

fs.readdir("./commands" , (err, files) => {

    if(err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.lenght <=0) {
        console.log("Ik kon geen files vinden.");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen!`);

        bot.commands.set(fileGet.help.name, fileGet);

    })



}); 


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

       var arguments = messageArray.slice(1);
       
       
       var commands = bot.commands.get(command.slice(prefix.length));
       if(commands) commands.run(bot,message, arguments);

       

       
       
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