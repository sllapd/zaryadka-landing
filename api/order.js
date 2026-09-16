// Vercel serverless function. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID
// in the hosting dashboard. Never put the bot token in frontend files or Git.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { name, phone, address, quantity = '1' } = req.body || {};
  if (!name || !phone || !address) return res.status(400).json({ error: 'Заполните все обязательные поля.' });
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) return res.status(500).json({ error: 'Сервис заказов пока не настроен.' });
  const total = Number(quantity) * 3000;
  const text = `🛒 НОВЫЙ ЗАКАЗ\n\nТовар: LDNIO WL02 5in1\nКоличество: ${quantity} шт.\nСумма: ${total.toLocaleString('uk-UA')} грн\n\nИмя: ${name}\nТелефон: ${phone}\nДоставка: ${address}`;
  const telegram = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text }) });
  if (!telegram.ok) return res.status(502).json({ error: 'Не удалось доставить заявку в Telegram.' });
  return res.status(200).json({ ok: true });
}
