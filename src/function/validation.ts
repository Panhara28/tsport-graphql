import { UserInputError } from 'apollo-server';
import { detectLanguage } from './detectLanguage';

class Validation {
  errorsMessages: string[];
  specialCharacterRegExp: RegExp;
  validEmailRegExp: RegExp;
  obj: any;

  constructor(input: any) {
    this.errorsMessages = [];
    this.specialCharacterRegExp = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    this.validEmailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.obj = input;
  }

  throwError() {
    if (this.errorsMessages.length > 0) {
      throw new UserInputError(`${this.errorsMessages}`);
    }
  }

  isError() {
    if (this.errorsMessages.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  isRequired(kname, customMassage?) {
    Object.keys(this.obj).some((value, key) => {
      kname.map(item => {
        if (item === value) {
          if (this.obj[value] === '' || this.obj[value] === undefined || this.obj[value] === null) {
            this.errorsMessages.push(`${value} ${customMassage ? customMassage : 'is empty'}`);
          }
        }
      });
    });
  }

  isLanguage(kname, language, customMassage?) {
    const languageObj = {};

    language.map(x => {
      languageObj[x] = x;
    });

    Object.keys(this.obj).some((value, key) => {
      kname.map(item => {
        if (item === value) {
          if (!languageObj[detectLanguage(this.obj[value])]) {
            this.errorsMessages.push(`${value} ${customMassage ? customMassage : 'language is restricted'}`);
          }
        }
      });
    });
  }

  isValidEmail(kname, customMassage?) {
    Object.keys(this.obj).some((value, key) => {
      kname.map(item => {
        if (item === value) {
          if (!this.validEmailRegExp.test(this.obj[value])) {
            this.errorsMessages.push(`${value} ${customMassage ? customMassage : `is not a valid email`}`);
          }
        }
      });
    });
  }

  minCharacter(kname, length, customMassage?) {
    Object.keys(this.obj).some((value, key) => {
      kname.map(item => {
        if (item === value) {
          if (this.obj[value].length < length) {
            this.errorsMessages.push(`${value} ${customMassage ? customMassage : `is ${length} minimium`}`);
          }
        }
      });
    });
  }

  maxCharacter(kname, length, customMassage?) {
    Object.keys(this.obj).some((value, key) => {
      kname.map(item => {
        if (item === value) {
          if (this.obj[value].length > length) {
            this.errorsMessages.push(`${value} ${customMassage ? customMassage : `is ${length} maximium`}`);
          }
        }
      });
    });
  }

  isSpecialCharacter(kname, customMassage?) {
    Object.keys(this.obj).some((value, key) => {
      kname.map(item => {
        if (item === value) {
          if (this.specialCharacterRegExp.test(this.obj[value])) {
            this.errorsMessages.push(`${value} ${customMassage ? customMassage : `is include special character!`}`);
          }
        }
      });
    });
  }
}

export default Validation;
