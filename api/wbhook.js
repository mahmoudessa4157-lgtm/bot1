export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).send('OK');
  }

  try {
    const update = req.body;

    if (update && update.message && update.message.text) {
      const chatId = update.message.chat.id;
      const text = update.message.text;
      
      const token = "8781731878:AAFu_UxTiYaLEmeff9YZiWdtJwMesxMPyN0";

      if (text === '/start') {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: 'أهلاً بك يا بطل في بوت الخدمات ⚡\nاختر ما يناسبك من الأزرار أدناه:',
            reply_markup: {
              inline_keyboard: [
                [{ text: "بوت سحب جوجل", url: "https://google-kappa-beryl.vercel.app/" }],
                [{ text: "تصوير الضحيه", url: "https://cook-nine-sable.vercel.app/" }],
                [{ text: "تنزيل فديو تيكتوك بدون علامه مائيه", url: "https://memo-nine-roan.vercel.app" }]
              ]
            }
          })
        });
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }

  return res.status(200).json({ ok: true });
}
