//
// Command: help
//
module.exports = function (controller) {

    controller.hears('help', 'direct_message,direct_mention', function (bot, message) {
        var text = "Here are my skills:";
        text += "\n- " + bot.appendMention(message, "headlines") + ": Lists top BBC headlines";
        text += "\n- " + bot.appendMention(message, "opt in") + ": Subscribe to top BBC headlines every morning";
        text += "\n- " + bot.appendMention(message, "opt out") + ": Unsubscribe from top BBC headlines every morning";
        text += "\n- " + bot.appendMention(message, "help") + ": spreads the word about my skills";
        bot.reply(message, text);
    });
}
