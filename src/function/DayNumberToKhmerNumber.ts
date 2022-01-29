export function toKhmerNumber(n, m, y) {
  const symbolNumber = {
    '1': '១',
    '2': '២',
    '3': '៣',
    '4': '៤',
    '5': '៥',
    '6': '៦',
    '7': '៧',
    '8': '៨',
    '9': '៩',
    '0': '០',
  };

  const symboMonth = {
    '1': 'មករា',
    '2': 'កុម្ភៈ',
    '3': 'មិនា',
    '4': 'មេសា',
    '5': 'ឧសភា',
    '6': 'មិថុនា',
    '7': 'កក្កដា',
    '8': 'សីហា',
    '9': 'កញ្ញា',
    '10': 'តុលា',
    '11': 'វិច្ឆិកា',
    '12': 'ធ្នូ',
  };

  const day = n.replace(/\d/g, function(match) {
    return symbolNumber[match];
  });

  const month = symboMonth[m];

  const year = y.replace(/\d/g, function(match) {
    return symbolNumber[match];
  });

  return `${day}/${month}/${year}`;
}
