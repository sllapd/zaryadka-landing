const form = document.querySelector('#order-form');
const status = document.querySelector('.form-status');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = form.querySelector('button');
  button.disabled = true;
  button.textContent = 'Отправляем…';
  status.className = 'form-status';
  status.textContent = '';
  try {
    const response = await fetch('/api/order', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Не удалось отправить заявку');
    status.className = 'form-status success';
    status.textContent = 'Спасибо! Заявка отправлена — мы скоро свяжемся с вами.';
    form.reset();
  } catch (error) {
    status.className = 'form-status error';
    status.textContent = error.message + ' Позвоните нам, если это срочно.';
  } finally { button.disabled = false; button.innerHTML = 'Замовити зараз <span>→</span>'; }
});
