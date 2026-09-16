const form = document.querySelector('#order-form');
const status = form.querySelector('.form-status');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = form.querySelector('button');
  button.disabled = true;
  button.textContent = 'Отправляем…';
  status.className = 'form-status';
  status.textContent = '';

  try {
    const response = await fetch('/api/order', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Не удалось отправить заявку');

    // После успешной отправки убираем поля и очищаем введённые данные,
    // чтобы они не оставались видимыми на экране.
    form.reset();
    form.innerHTML = `
      <div class="success-card" role="status" aria-live="polite">
        <div class="success-icon">✓</div>
        <h3>Заявка отправлена!</h3>
        <p>Спасибо! Мы скоро свяжемся с вами для подтверждения заказа.</p>
      </div>
    `;
  } catch (error) {
    status.className = 'form-status error';
    status.textContent = error.message + ' Позвоните нам, если это срочно.';
    button.disabled = false;
    button.innerHTML = 'Замовити зараз <span>→</span>';
  }
});
