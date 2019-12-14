function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}

const os = require('os')
    , fs = require('fs')
    , { PerformanceObserver, performance } = require('perf_hooks')
    , master = '166610390581641217'
    , mega = '321705723216134154'
    ;

exports.help = {
	tier: 1,
	args: 1
}

exports.run = (client, msg, args) => {
  // let temp = 'В процессе.';
  // msg.channel.send(temp).then(msge => {
  //   try {
  //     const code = args.join(" ");
  //     let t = performance.now();
  //     let evaled = eval(code);
  //     t = performance.now() - t;
  //     if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
  //     evaled = clean(evaled);
  //     if (evaled.startsWith('Promise')) temp = `**Исход: успех!**\n Код выполнился за \`\`${t.toFixed(5)}\`\`мс.`;
  //     else temp = `**Исход: успех!**\n `+(evaled.length > 2000 ? 'Исход итерации занял более 2К символов!' : `\`\`\`Js\n${evaled}\`\`\``)+` \n Код выполнился за \`\`${t.toFixed(5)}\`\`мс.`;
  //     msge.edit(temp).then(() => msge.delete(3000));
  //   } catch (err) {
  //     temp = `**Исход: ошибка!**\n Наименование: \`\`${err.name}\`\` \n \n \`\`${err.message}\`\``;
  //     msge.edit(temp).then(() => msge.delete(5000));
  //   }
  // });
}