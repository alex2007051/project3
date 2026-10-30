const dialog = document.querySelector('.application');
document.querySelector('[data-open-application]').addEventListener('click', () => dialog.showModal());
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
document.querySelector('#application-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const values = new FormData(event.currentTarget);
  const content = `ТИХИЙ СВЕТ — ЗАЯВКА НА СПУСК\nПартия «Глубина-9» / март 2027\n\nИмя: ${values.get('name').trim()}\nПочта: ${values.get('email').trim()}\nНаправление: ${values.get('role')}\n\nУчебный проект. Заявка не отправлена.\n`;
  const url = URL.createObjectURL(new Blob(['\uFEFF', content], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'quiet-light-application.txt';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector('.form-status').textContent = 'Заявка подготовлена. Файл сохранён на ваше устройство.';
});
