const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
const matthe = require('discord-buttons')
matthe(client)

var prefix = ayarlar.prefix;

client.on("ready", () => {
  console.log(`[ MATTHE ] bot başarıyla aktif edildi: ${client.user.tag}!`);
});

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

require("./util/eventLoader")(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`[ MATTHE ] ${files.length} adet komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`[ MATTHE ] yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.login(process.env.token);

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});


const dbuttons = require("discord-buttons");
const { MessageMenu, MessageMenuOption } = require("discord-buttons")
client.on("message", async message => {
    if(message.content.startsWith(".renk")) {
        if(message.author.bot) return;
        let secenek1 = new MessageMenuOption()
        .setLabel("Kırmızı")
        .setValue("kırmızı")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🍒") 
        let secenek2 = new MessageMenuOption()
        .setLabel("Mor")
        .setValue("mor")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🍇")
        let secenek3 = new MessageMenuOption()
        .setLabel("Sarı")
        .setValue("sarı")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🍋")
        let secenek4 = new MessageMenuOption()
        .setLabel("Açık Pembe")
        .setValue("açık Pembe")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🌸")
        let secenek5 = new MessageMenuOption()
        .setLabel("Koyu Pembe")
        .setValue("koyu pembe")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🌷")
        let secenek6 = new MessageMenuOption()
        .setLabel("Mavi")
        .setValue("mavi")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🧊")
        let secenek7 = new MessageMenuOption()
        .setLabel("Açık Mavi")
        .setValue("açık mavi")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🎐")
        let secenek8 = new MessageMenuOption()
        .setLabel("Yeşili")
        .setValue("yeşili")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🍏")
        let secenek9 = new MessageMenuOption()
        .setLabel("Su yeşili")
        .setValue("Su yeşili")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🍈")
        let secenek10 = new MessageMenuOption()
        .setLabel("Siyah")
        .setValue("siyah")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🖤")
        let secenek11 = new MessageMenuOption()
        .setLabel("temizle")
        .setValue("temizle")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("885886965495504896")
        let menu = new MessageMenu()
        .setID("MENU")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Renk Rollerini Seçebilirsiniz")
        .addOption(secenek1)
        .addOption(secenek2)
        .addOption(secenek3)
        .addOption(secenek4)
        .addOption(secenek5)
        .addOption(secenek6)
        .addOption(secenek7)
        .addOption(secenek8)
        .addOption(secenek9)
        .addOption(secenek10)
        .addOption(secenek11)
        let menumesaj = await message.channel.send("Aşağıdaki menüye tıklayarak Renk Rollerini seçebilirsin!", menu)
        function menuselection(menu) {
          switch(menu.values[0]) {
                case "kırmızı":
                    menu.reply.send("<@&884123850944688169> Rolü verildi", true)
                    menu.clicker.member.roles.add("884123850944688169")    //kırmızı
                    menu.clicker.member.roles.remove("884123851930345493") //mor
                    menu.clicker.member.roles.remove("884123854253989888") // Koyu Pembe
                    menu.clicker.member.roles.remove("884123852819533925") //Açık Pembe
                    menu.clicker.member.roles.remove ("884123853515800606")  // sarı
                    menu.clicker.member.roles.remove ("884123855164166245") //koyu amvi
                    menu.clicker.member.roles.remove ("884123855919136778") //açık mavi
                    menu.clicker.member.roles.remove ("884123857366188093") //yeşil
                    menu.clicker.member.roles.remove("884123856690905158") //su yrşili
                   menu.clicker.member.roles.remove("885265772430110760") //siyah
                     break;
                case "mor":
                    menu.reply.send("<@&884123851930345493> Rolü verildi", true)
                    menu.clicker.member.roles.add("884123851930345493")    //kırmızı
                    menu.clicker.member.roles.remove("884123854253989888") // Koyu Pembe
                    menu.clicker.member.roles.remove("884123852819533925") //Açık Pembe
                    menu.clicker.member.roles.remove ("884123853515800606")  // sarı
                    menu.clicker.member.roles.remove ("884123855164166245") //koyu amvi
                    menu.clicker.member.roles.remove ("884123855919136778") //açık mavi
                    menu.clicker.member.roles.remove ("884123857366188093") //yeşil
                    menu.clicker.member.roles.remove("884123856690905158") //su yrşili
                   menu.clicker.member.roles.remove("885265772430110760") //siyah
                  menu.clicker.member.roles.remove("884123850944688169") //kırmızı
                break;
                case "sarı":
                    menu.reply.send("<@&884123853515800606> Rolü verildi", true)
                    menu.clicker.member.roles.add("884123853515800606")
                        menu.clicker.member.roles.remove("884123851930345493") //mor
                    menu.clicker.member.roles.remove("884123854253989888") // Koyu Pembe
                    menu.clicker.member.roles.remove("884123852819533925") //Açık Pembe
                    menu.clicker.member.roles.remove ("884123855164166245") //koyu amvi
                    menu.clicker.member.roles.remove ("884123855919136778") //açık mavi
                    menu.clicker.member.roles.remove ("884123857366188093") //yeşil
                    menu.clicker.member.roles.remove("884123856690905158") //su yrşili
                   menu.clicker.member.roles.remove("885265772430110760") //siyah
                  menu.clicker.member.roles.remove("884123850944688169") //kırmızı
                break;
                case "açık Pembe":
                  menu.reply.send("<@&884123852819533925> Rolü verildi", true)
                  menu.clicker.member.roles.add("884123852819533925")
                    menu.clicker.member.roles.remove("884123851930345493") //mor
                    menu.clicker.member.roles.remove("884123854253989888") // Koyu Pembe
                    menu.clicker.member.roles.remove ("884123853515800606")  // sarı
                    menu.clicker.member.roles.remove ("884123855164166245") //koyu amvi
                    menu.clicker.member.roles.remove ("884123855919136778") //açık mavi
                    menu.clicker.member.roles.remove ("884123857366188093") //yeşil
                    menu.clicker.member.roles.remove("884123856690905158") //su yrşili
                   menu.clicker.member.roles.remove("885265772430110760") //siyah
                  menu.clicker.member.roles.remove("884123850944688169") //kırmızı
                break;
                case "Koyu Pembe":
                    menu.reply.send("<@&884123854253989888> Rolü verildi", true)
                    menu.clicker.member.roles.add("884123854253989888")
                    menu.clicker.member.roles.remove("884123851930345493") //mor
                    menu.clicker.member.roles.remove("884123852819533925") //Açık Pembe
                    menu.clicker.member.roles.remove ("884123853515800606")  // sarı
                    menu.clicker.member.roles.remove ("884123855164166245") //koyu amvi
                    menu.clicker.member.roles.remove ("884123855919136778") //açık mavi
                    menu.clicker.member.roles.remove ("884123857366188093") //yeşil
                    menu.clicker.member.roles.remove("884123856690905158") //su yrşili
                   menu.clicker.member.roles.remove("885265772430110760") //siyah
                  menu.clicker.member.roles.remove("884123850944688169") //kırmızı
                break;
                case "Mavi":
                    menu.reply.send("<@&884123855164166245> Rolü verildi", true)
                    menu.clicker.member.roles.add("884123855164166245")
                    menu.clicker.member.roles.remove("884123851930345493") //mor
                    menu.clicker.member.roles.remove("884123854253989888") // Koyu Pembe
                    menu.clicker.member.roles.remove("884123852819533925") //Açık Pembe
                    menu.clicker.member.roles.remove ("884123853515800606")  // sarı
                    menu.clicker.member.roles.remove ("884123855919136778") //açık mavi
                    menu.clicker.member.roles.remove ("884123857366188093") //yeşil
                    menu.clicker.member.roles.remove("884123856690905158") //su yrşili
                   menu.clicker.member.roles.remove("885265772430110760") //siyah
                  menu.clicker.member.roles.remove("884123850944688169") //kırmızı
                break;
               case "açık mavi":
                  menu.reply.send("<@&884123855919136778> Rolü verildi", true)
                  menu.clicker.member.roles.add("884123855919136778")
                    menu.clicker.member.roles.remove("884123851930345493") //mor
                    menu.clicker.member.roles.remove("884123854253989888") // Koyu Pembe
                    menu.clicker.member.roles.remove("884123852819533925") //Açık Pembe
                    menu.clicker.member.roles.remove ("884123853515800606")  // sarı
                    menu.clicker.member.roles.remove ("884123855164166245") //koyu amvi
                    menu.clicker.member.roles.remove ("884123857366188093") //yeşil
                    menu.clicker.member.roles.remove("884123856690905158") //su yrşili
                   menu.clicker.member.roles.remove("885265772430110760") //siyah
                  menu.clicker.member.roles.remove("884123850944688169") //kırmızı
           break;
           case "yeşili":
                  menu.reply.send("<@&884123857366188093> Rolü verildi", true)
                    menu.clicker.member.roles.add("884123857366188093")
                    menu.clicker.member.roles.remove("884123851930345493") //mor
                    menu.clicker.member.roles.remove("884123854253989888") // Koyu Pembe
                    menu.clicker.member.roles.remove("884123852819533925") //Açık Pembe
                    menu.clicker.member.roles.remove ("884123853515800606")  // sarı
                    menu.clicker.member.roles.remove ("884123855164166245") //koyu amvi
                    menu.clicker.member.roles.remove ("884123855919136778") //açık mavi
                    menu.clicker.member.roles.remove("884123856690905158") //su yrşili
                   menu.clicker.member.roles.remove("885265772430110760") //siyah
                  menu.clicker.member.roles.remove("884123850944688169") //kırmızı
           case "Su yeşili":
                  menu.reply.send("<@&884123856690905158> Rolü verildi", true)
                  menu.clicker.member.roles.add("884123856690905158")
                    menu.clicker.member.roles.remove("884123851930345493") //mor
                    menu.clicker.member.roles.remove("884123854253989888") // Koyu Pembe
                    menu.clicker.member.roles.remove("884123852819533925") //Açık Pembe
                    menu.clicker.member.roles.remove ("884123853515800606")  // sarı
                    menu.clicker.member.roles.remove ("884123855164166245") //koyu amvi
                    menu.clicker.member.roles.remove ("884123855919136778") //açık mavi
                    menu.clicker.member.roles.remove ("884123857366188093") //yeşil
                   menu.clicker.member.roles.remove("885265772430110760") //siyah
                  menu.clicker.member.roles.remove("884123850944688169") //kırmızı
              break;
                case "siyah":
                  menu.reply.send("<@&885265772430110760> Rolü verildi", true)
                  menu.clicker.member.roles.add("885265772430110760")
                      menu.clicker.member.roles.remove("884123851930345493") //mor
                    menu.clicker.member.roles.remove("884123854253989888") // Koyu Pembe
                    menu.clicker.member.roles.remove("884123852819533925") //Açık Pembe
                    menu.clicker.member.roles.remove ("884123853515800606")  // sarı
                    menu.clicker.member.roles.remove ("884123855164166245") //koyu amvi
                    menu.clicker.member.roles.remove ("884123855919136778") //açık mavi
                    menu.clicker.member.roles.remove ("884123857366188093") //yeşil
                    menu.clicker.member.roles.remove("884123856690905158") //su yrşili
                  menu.clicker.member.roles.remove("884123850944688169") //kırmızı

              break;
                case "temizle":
                  menu.reply.send("Renk Rolü alındı", true)
                    menu.clicker.member.roles.remove("884123851930345493") //mor
                    menu.clicker.member.roles.remove("884123854253989888") // Koyu Pembe
                    menu.clicker.member.roles.remove("884123852819533925") //Açık Pembe
                    menu.clicker.member.roles.remove ("884123853515800606")  // sarı
                    menu.clicker.member.roles.remove ("884123855164166245") //koyu amvi
                    menu.clicker.member.roles.remove ("884123855919136778") //açık mavi
                    menu.clicker.member.roles.remove ("884123857366188093") //yeşil
                    menu.clicker.member.roles.remove("884123856690905158") //su yrşili
                   menu.clicker.member.roles.remove("885265772430110760") //siyah
                  menu.clicker.member.roles.remove("884123850944688169") //kırmızı
            }
        }
        client.on("clickMenu", menu => {
            if(menu.message.id == menumesaj.id) {
                    menuselection(menu)
            }
        })
    }
});

client.on("message", async message => {
    if(message.content.startsWith(".sddburc")) {
        if(message.author.bot) return;
        let secenek1 = new MessageMenuOption()
        .setLabel("Koç")
        .setValue("koç")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("♈") 
        let secenek2 = new MessageMenuOption()
        .setLabel("Boğa")
        .setValue("boğa")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("♉")
        let secenek3 = new MessageMenuOption()
        .setLabel("İkizler")
        .setValue("ikizler")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("♊")
        let secenek4 = new MessageMenuOption()
        .setLabel("Yengeç")
        .setValue("yengeç")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("♋")
        let secenek5 = new MessageMenuOption()
        .setLabel("Aslan")
        .setValue("aslan")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("♌")
         let secenek6 = new MessageMenuOption()
        .setLabel("Başak")
        .setValue("başak")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("♍")
        let secenek7 = new MessageMenuOption()
        .setLabel("Terazi")
        .setValue("terazi")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("♎")
        let secenek8 = new MessageMenuOption()
        .setLabel("Akrep")
        .setValue("akrep")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("♏")
         let secenek9 = new MessageMenuOption()
        .setLabel("Yay")
        .setValue("yay")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("♐")
         let secenek10 = new MessageMenuOption()
        .setLabel("Oğlak")
        .setValue("oğlak")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("♑")
         let secenek11 = new MessageMenuOption()
        .setLabel("Kova")
        .setValue("kova")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("♒")
        let secenek12 = new MessageMenuOption()
        .setLabel("Balık")
        .setValue("balık")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("♓")
        let secenek13 = new MessageMenuOption()
        .setLabel("temizle")
        .setValue("temizle")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🗑️")
        let menu = new MessageMenu()
        .setID("MENU")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Renk Rollerini Seçebilirsiniz")
        .addOption(secenek1)
        .addOption(secenek2)
        .addOption(secenek3)
        .addOption(secenek4)
        .addOption(secenek5)
        .addOption(secenek6)
        .addOption(secenek7)
        .addOption(secenek8)
        .addOption(secenek9)
        .addOption(secenek10)
        .addOption(secenek11)
        .addOption(secenek12)
        .addOption(secenek13)
        let menumesaj = await message.channel.send("Aşağıdaki menüye tıklayarak Burç Rollerini seçebilirsin!", menu)
        function menuselection(menu) {
            switch(menu.values[0]) {
                case "koç":
                    menu.reply.send("<@&884123886730502145> Rolü verildi", true)
                    menu.clicker.member.roles.add("884123886730502145")
menu.clicker.member.roles.remove("884123887795834940")
menu.clicker.member.roles.remove("884123888529858621")
menu.clicker.member.roles.remove("884123889356128286")
menu.clicker.member.roles.remove("884123890081751060")
menu.clicker.member.roles.remove("884123890857705472")
menu.clicker.member.roles.remove("884123891570733096")
menu.clicker.member.roles.remove("884123892266987541")
menu.clicker.member.roles.remove("884123893084860436")
menu.clicker.member.roles.remove("884123893563027497")
menu.clicker.member.roles.remove("884123894871654470")
menu.clicker.member.roles.remove("884123896016695297")
                break;
                case "boğa":
                    menu.reply.send("<@&884123887795834940> Rolü verildi", true)
                    menu.clicker.member.roles.add("884123887795834940") 
                    menu.clicker.member.roles.remove("884123886730502145")
menu.clicker.member.roles.remove("884123888529858621")
menu.clicker.member.roles.remove("884123889356128286")
menu.clicker.member.roles.remove("884123890081751060")
menu.clicker.member.roles.remove("884123890857705472")
menu.clicker.member.roles.remove("884123891570733096")
menu.clicker.member.roles.remove("884123892266987541")
menu.clicker.member.roles.remove("884123893084860436")
menu.clicker.member.roles.remove("884123893563027497")
menu.clicker.member.roles.remove("884123894871654470")
menu.clicker.member.roles.remove("884123896016695297")
                break;
                case "ikizler":
                    menu.reply.send("<@&884123888529858621> Rolü verildi", true)
                    menu.clicker.member.roles.add("884123888529858621")
                    menu.clicker.member.roles.remove("884123886730502145")
menu.clicker.member.roles.remove("884123887795834940")
menu.clicker.member.roles.remove("884123889356128286")
menu.clicker.member.roles.remove("884123890081751060")
menu.clicker.member.roles.remove("884123890857705472")
menu.clicker.member.roles.remove("884123891570733096")
menu.clicker.member.roles.remove("884123892266987541")
menu.clicker.member.roles.remove("884123893084860436")
menu.clicker.member.roles.remove("884123893563027497")
menu.clicker.member.roles.remove("884123894871654470")
menu.clicker.member.roles.remove("884123896016695297")
                break;
                case "yengeç":
                    menu.reply.send("<@&884123889356128286> Rolü verildi", true)
                    menu.clicker.member.roles.add("884123889356128286")
                   menu.clicker.member.roles.remove("884123886730502145")
menu.clicker.member.roles.remove("884123887795834940")
menu.clicker.member.roles.remove("884123888529858621")
menu.clicker.member.roles.remove("884123890081751060")
menu.clicker.member.roles.remove("884123890857705472")
menu.clicker.member.roles.remove("884123891570733096")
menu.clicker.member.roles.remove("884123892266987541")
menu.clicker.member.roles.remove("884123893084860436")
menu.clicker.member.roles.remove("884123893563027497")
menu.clicker.member.roles.remove("884123894871654470")
menu.clicker.member.roles.remove("884123896016695297")
                break;
                case "aslan":
                    menu.reply.send("<@&884123890081751060> Rolü verildi", true)
                    menu.clicker.member.roles.add("884123890081751060")
menu.clicker.member.roles.remove("884123886730502145")
menu.clicker.member.roles.remove("884123887795834940")
menu.clicker.member.roles.remove("884123888529858621")
menu.clicker.member.roles.remove("884123889356128286")
menu.clicker.member.roles.remove("884123890857705472")
menu.clicker.member.roles.remove("884123891570733096")
menu.clicker.member.roles.remove("884123892266987541")
menu.clicker.member.roles.remove("884123893084860436")
menu.clicker.member.roles.remove("884123893563027497")
menu.clicker.member.roles.remove("884123894871654470")
menu.clicker.member.roles.remove("884123896016695297")
                break;
                case "başak":
                    menu.reply.send("<@&884123890857705472> Rolü verildi", true)
                    menu.clicker.member.roles.add("884123890857705472")
menu.clicker.member.roles.remove("884123886730502145")
menu.clicker.member.roles.remove("884123887795834940")
menu.clicker.member.roles.remove("884123888529858621")
menu.clicker.member.roles.remove("884123889356128286")
menu.clicker.member.roles.remove("884123890081751060")
menu.clicker.member.roles.remove("884123891570733096")
menu.clicker.member.roles.remove("884123892266987541")
menu.clicker.member.roles.remove("884123893084860436")
menu.clicker.member.roles.remove("884123893563027497")
menu.clicker.member.roles.remove("884123894871654470")
menu.clicker.member.roles.remove("884123896016695297")
                break;
              case "terazi":
                    menu.reply.send("<@&884123891570733096> Rolü verildi", true)
                    menu.clicker.member.roles.add("884123891570733096")
menu.clicker.member.roles.remove("884123886730502145")
menu.clicker.member.roles.remove("884123887795834940")
menu.clicker.member.roles.remove("884123888529858621")
menu.clicker.member.roles.remove("884123889356128286")
menu.clicker.member.roles.remove("884123890081751060")
menu.clicker.member.roles.remove("884123890857705472")
menu.clicker.member.roles.remove("884123892266987541")
menu.clicker.member.roles.remove("884123893084860436")
menu.clicker.member.roles.remove("884123893563027497")
menu.clicker.member.roles.remove("884123894871654470")
menu.clicker.member.roles.remove("884123896016695297")
                break;
                case "akrep":
                    menu.reply.send("<@&884123892266987541> Rolü verildi", true)
                    menu.clicker.member.roles.add("884123892266987541")
menu.clicker.member.roles.remove("884123886730502145")
menu.clicker.member.roles.remove("884123887795834940")
menu.clicker.member.roles.remove("884123888529858621")
menu.clicker.member.roles.remove("884123889356128286")
menu.clicker.member.roles.remove("884123890081751060")
menu.clicker.member.roles.remove("884123890857705472")
menu.clicker.member.roles.remove("884123891570733096")
menu.clicker.member.roles.remove("884123893084860436")
menu.clicker.member.roles.remove("884123893563027497")
menu.clicker.member.roles.remove("884123894871654470")
menu.clicker.member.roles.remove("884123896016695297")
                break;
                case "yay":
                    menu.reply.send("<@&884123893084860436> Rolü verildi", true)
                    menu.clicker.member.roles.add("884123893084860436")
menu.clicker.member.roles.remove("884123886730502145")
menu.clicker.member.roles.remove("884123887795834940")
menu.clicker.member.roles.remove("884123888529858621")
menu.clicker.member.roles.remove("884123889356128286")
menu.clicker.member.roles.remove("884123890081751060")
menu.clicker.member.roles.remove("884123890857705472")
menu.clicker.member.roles.remove("884123891570733096")
menu.clicker.member.roles.remove("884123892266987541")
menu.clicker.member.roles.remove("884123893563027497")
menu.clicker.member.roles.remove("884123894871654470")
menu.clicker.member.roles.remove("884123896016695297")
                break;
                case "oğlak":
                    menu.reply.send("<@&884123893563027497> Rolü verildi", true)
                    menu.clicker.member.roles.add("884123893563027497")
menu.clicker.member.roles.remove("884123886730502145")
menu.clicker.member.roles.remove("884123887795834940")
menu.clicker.member.roles.remove("884123888529858621")
menu.clicker.member.roles.remove("884123889356128286")
menu.clicker.member.roles.remove("884123890081751060")
menu.clicker.member.roles.remove("884123890857705472")
menu.clicker.member.roles.remove("884123891570733096")
menu.clicker.member.roles.remove("884123892266987541")
menu.clicker.member.roles.remove("884123893084860436")
menu.clicker.member.roles.remove("884123894871654470")
menu.clicker.member.roles.remove("884123896016695297")
                break;
                case "kova":
                    menu.reply.send("<@&884123894871654470> Rolü verildi", true)
                    menu.clicker.member.roles.add("884123894871654470")
menu.clicker.member.roles.remove("884123886730502145")
menu.clicker.member.roles.remove("884123887795834940")
menu.clicker.member.roles.remove("884123888529858621")
menu.clicker.member.roles.remove("884123889356128286")
menu.clicker.member.roles.remove("884123890081751060")
menu.clicker.member.roles.remove("884123890857705472")
menu.clicker.member.roles.remove("884123891570733096")
menu.clicker.member.roles.remove("884123892266987541")
menu.clicker.member.roles.remove("884123893084860436")
menu.clicker.member.roles.remove("884123893563027497")
menu.clicker.member.roles.remove("884123896016695297")
                break;
                case "balık":
                    menu.reply.send("<@&884123896016695297> Rolü verildi", true)
                    menu.clicker.member.roles.add("884123896016695297")
menu.clicker.member.roles.remove("884123886730502145")
menu.clicker.member.roles.remove("884123887795834940")
menu.clicker.member.roles.remove("884123888529858621")
menu.clicker.member.roles.remove("884123889356128286")
menu.clicker.member.roles.remove("884123890081751060")
menu.clicker.member.roles.remove("884123890857705472")
menu.clicker.member.roles.remove("884123891570733096")
menu.clicker.member.roles.remove("884123892266987541")
menu.clicker.member.roles.remove("884123893084860436")
menu.clicker.member.roles.remove("884123893563027497")
menu.clicker.member.roles.remove("884123894871654470")
                break;

                case "temizle":
                  menu.reply.send("Roller alındı", true)
menu.clicker.member.roles.remove("884123886730502145")
menu.clicker.member.roles.remove("884123887795834940")
menu.clicker.member.roles.remove("884123888529858621")
menu.clicker.member.roles.remove("884123889356128286")
menu.clicker.member.roles.remove("884123890081751060")
menu.clicker.member.roles.remove("884123890857705472")
menu.clicker.member.roles.remove("884123891570733096")
menu.clicker.member.roles.remove("884123892266987541")
menu.clicker.member.roles.remove("884123893084860436")
menu.clicker.member.roles.remove("884123893563027497")
menu.clicker.member.roles.remove("884123894871654470")
menu.clicker.member.roles.remove("884123896016695297")
              break;  
            }
        }
        client.on("clickMenu", menu => {
            if(menu.message.id == menumesaj.id) {
                    menuselection(menu)
            }
        })
    }
});
client.on("message", async message => {
    if(message.content.startsWith(".burç")) {
        if(message.author.bot) return;
        let secenek1 = new MessageMenuOption()
        .setLabel("Çekiliş Katılımcısı")
        .setValue("Çekiliş Katılımcısı")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("") 
        let secenek2 = new MessageMenuOption()
        .setLabel("Sarı")
        .setValue("sarı")
        .setDescription("Rolü almak için tıkla!")
        .setDefault()
        .setEmoji("🍋")