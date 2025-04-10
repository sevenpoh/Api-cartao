const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/testar (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const dados = match[1].trim();

  const partes = dados.split('|');
  if (partes.length !== 3) {
    bot.sendMessage(chatId, 'Formato inválido! Envie no formato:\n`numero|MMYY|CVV`', { parse_mode: 'Markdown' });
    return;
  }

  const [numero, validade, cvv] = partes;
  if (!/^\d{16}$/.test(numero) || !/^\d{4}$/.test(validade) || !/^\d{3,4}$/.test(cvv)) {
    bot.sendMessage(chatId, 'Erro no formato dos dados! Certifique-se de que:\n• Cartão tem 16 dígitos\n• Validade tem 4 dígitos (MMYY)\n• CVV tem 3 ou 4 dígitos');
    return;
  }

  const mes = validade.slice(0, 2);
  const ano = '20' + validade.slice(2);

  bot.sendMessage(chatId, `Testando cartão:\n💳 ${numero}\n📅 ${mes}/${ano}\n🔒 ${cvv}\n\n(A integração com o site virá aqui...)`);
});
