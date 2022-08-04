const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function generatedID(length: number) {
  var rtn = '';
  for (var i = 0; i < length; i++) {
    rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return rtn;
}

export function generatedPrefix(id: number, title: string) {
  let n = id;
  let prefix = title[0].toUpperCase();

  while (n) {
    const alpha = n % 26;
    prefix += ALPHABET.charAt(alpha);
    n = (n / 26) | 0;
  }

  return prefix;
}
