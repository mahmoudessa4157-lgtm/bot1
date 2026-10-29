// رابط قاعدة بيانات Firebase الخاصة بك
const FIREBASE_DB_URL = "https://bot1-bd984-default-rtdb.firebaseio.com";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).send('OK');
  }

  const { token } = req.query;

  if (!token) {
    return res.status(200).send('No token provided');
  }

  try {
    const update = req.body;

    if (update && update.message && update.message.text) {
      const chatId = update.message.chat.id;
      const text = update.message.text;

      const encodedToken = encodeURIComponent(token);
      const fireUrl = `${FIREBASE_DB_URL}/bots/${encodedToken}.json?t=${Date.now()}`;

      const fbRes = await fetch(fireUrl, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        },
        cache: 'no-store'
      });

      const botData = await fbRes.json();

      if (botData && botData.code) {
        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        const userRoutine = new AsyncFunction('chatId', 'text', 'token', 'fetch', botData.code);

        await userRoutine(chatId, text, token, fetch);
      }
    }
  } catch (error) {
    console.error('Execution Error:', error.message);
  }

  return res.status(200).json({ ok: true });
}
