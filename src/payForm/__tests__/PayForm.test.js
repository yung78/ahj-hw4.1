import PayForm from '../js/PayForm.js';
import '@testing-library/jest-dom';

document.body.innerHTML = `
  <form class="pay_form">
    <div class="pay_systems">
      <div class="system_box">
        <div class="system mir"></div>
      </div>
      <div class="system_box">
        <div class="system american_express"></div>
      </div>
      <div class="system_box">
        <div class="system visa"></div>
      </div>
      <div class="system_box">
        <div class="system master_card"></div>
      </div>
    </div>
    <input class="input" type="text" placeholder="Введите номер карты">
    <button class="button">Check to Validate</button>
  </form>
  <div class="validity">
    <div class="answer valid">Success!</div>
    <div class="answer not_valid">Failure!</div>
  </div>
`;

test('luhnValidation() if valid number reterned true', () => {
  const payForm = new PayForm();
  const result = payForm._luhnValidation('2345 6789 1234 5678');

  expect(result).toBe(true);
});

test('luhnValidation() if not valid number reterned false', () => {
  const payForm = new PayForm();
  const result = payForm._luhnValidation('2345 6789 1234 5679');

  expect(result).toBe(false);
});

test('_paySystem() called _showPaySystem with valid first number(1<num<6)', () => {
  const payForm = new PayForm();
  payForm.input.value = '434';
  payForm._paySystem();
  payForm.input.dispatchEvent(new Event('input'));

  const result1 = document.querySelector('.system_active') ? true : false;
  expect(result1).toBe(true);

  const result2 = document.querySelector('.visa').classList.contains('system_active');
  expect(result2).toBe(true);
});

test('_paySystem() if input.value == "" ', () => {
  const payForm = new PayForm();
  payForm.input.value = '';
  payForm._paySystem();
  payForm.input.dispatchEvent(new Event('input'));

  const result1 = document.querySelector('.system_active') ? true : false;
  expect(result1).toBe(false);

  const result2 = document.querySelector('.valid_active') ? true : false;
  expect(result2).toBe(false);
});

test('_paySystem() called _showPaySystem with not valid (num >= 6 or contains letters)', () => {
  const payForm = new PayForm();
  payForm.input.value = '9234';
  payForm._paySystem();
  payForm.input.dispatchEvent(new Event('input'));

  const result1 = payForm.failure.classList.contains('valid_active');
  expect(result1).toBe(true);
  payForm._clearAnswer();

  payForm.input.value = '9e67';
  payForm._paySystem();
  payForm.input.dispatchEvent(new Event('input'));

  const result2 = payForm.failure.classList.contains('valid_active');
  expect(result2).toBe(true);
});

test('_valid(), .valid element add .valid_active', () => {
  const payForm = new PayForm();
  payForm._valid();

  const result = document.querySelector('.valid').classList.contains('valid_active');
  expect(result).toBe(true);

  payForm._clearAnswer();
});

test('validation() with valid number', () => {
  const payForm = new PayForm();
  payForm.input.value = '2345 6789 1234 5678';
  payForm.validation();
  payForm.form.dispatchEvent(new Event('submit'));

  const result = document.querySelector('.valid').classList.contains('valid_active');
  expect(result).toBe(true);

  payForm._clearAnswer();
});

test('validation() with valid number', () => {
  const payForm = new PayForm();
  payForm.input.value = '2345 6789 1234 5677';
  payForm.validation();
  payForm.form.dispatchEvent(new Event('submit'));

  const result = payForm.failure.classList.contains('valid_active');
  expect(result).toBe(true);
});
