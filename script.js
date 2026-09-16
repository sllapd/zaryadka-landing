const form = document.querySelector('#order-form');
const status = form ? form.querySelector('.form-status') : null;

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = form.querySelector('button');
    button.disabled = true;
    button.textContent = 'Отправляем…';

    if (status) {
      status.className = 'form-status';
      status.textContent = '';
    }

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Не удалось отправить заявку');

      form.reset();
      form.innerHTML = `
        <div class="success-card" role="status" aria-live="polite">
          <div class="success-icon">✓</div>
          <h3>Заявка відправлена!</h3>
          <p>Дякуємо! Ми скоро зв’яжемося з вами для підтвердження замовлення.</p>
        </div>
      `;
    } catch (error) {
      if (status) {
        status.className = 'form-status error';
        status.textContent = error.message + ' Позвоните нам, если это срочно.';
      }
      button.disabled = false;
      button.innerHTML = 'Замовити зараз <span>→</span>';
    }
  });
}
