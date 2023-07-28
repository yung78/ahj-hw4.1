export default class PayForm {
  constructor() {
    this.form = document.querySelector('.pay_form');
    this.input = document.querySelector('.input');
    this.systems = document.querySelectorAll('.system');
    this.failure = document.querySelector('.not_valid');
  }

  _removeActive() {
    [...this.systems].forEach((el) => el.classList.remove('system_active'));
  }

  _clearAnswer() {
    [...document.querySelectorAll('.answer')].forEach((el) => el.classList.remove('valid_active'));
  }

  _notValid() {
    this._clearAnswer();
    this.failure.classList.add('valid_active');
  }

  _valid() {
    this._clearAnswer();
    document.querySelector('.valid').classList.add('valid_active');
  }

  _showPaySystem(val) {
    if (val > 1 && val < 6 && this.input.value.toUpperCase() === this.input.value.toLowerCase()) {
      this._removeActive();
      this.systems[val - 2].classList.add('system_active');
    } else {
      this._notValid();
    }
  }

  _paySystem() {
    this.input.addEventListener('input', (e) => {
      e.preventDefault();
      if (this.input.value) {
        const firstNum = Number(this.input.value[0]);
        this._showPaySystem(firstNum);
      } else {
        this._removeActive();
        this._clearAnswer();
      }
    });
  }

  _luhnValidation(number) {
    const numberArr = [...number.replace(/\s/g, '')];
    let sum = 0;
    for (let i = 0; i < numberArr.length; i += 1) {
      let num = Number(numberArr[i]);
      if (i % 2 === 0) {
        num *= 2;
        if (num > 9) {
          num -= 9;
        }
      }
      sum += num;
    }
    return (sum % 10 === 0);
  }

  validation() {
    this._paySystem();
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.input.value && this._luhnValidation(this.input.value)) {
        this._valid();
      } else {
        this._notValid();
      }
    });
  }
}
