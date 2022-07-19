import { language_unicode } from './language_unicode';

export function detectLanguage(text) {
  function detect(text) {
    const scores = {};

    // const regexes = {
    //   en: /[\u0000-\u007F]/gi,
    //   kh: /[\u1780-\u17F9]/gi,
    // }

    const regexes = {};

    language_unicode?.forEach(item => {
      regexes[item.name] = new RegExp(`[\\u${item.start_code}-\\u${item.end_code}]`, 'gi');
    });

    for (const [lang, regex] of Object.entries(regexes)) {
      // detect occurances of lang in a word
      const matches = text.match(regex) || [];
      const score = matches.length / text.length;

      if (score) {
        // high percentage, return result
        if (score > 0.85) {
          return lang;
        }
        scores[lang] = score;
      }
    }

    // not detected
    if (Object.keys(scores).length == 0) return 'Not found!';

    // pick lang with highest percentage
    return Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b));
  }
  // split into words
  const langs = text
    .trim()
    .split(/\s+/)
    .map(word => {
      return detect(word);
    });

  // pick the lang with the most occurances
  return (langs || []).reduce(
    (acc, el) => {
      acc.k[el] = acc.k[el] ? acc.k[el] + 1 : 1;
      acc.max = acc.max ? (acc.max < acc.k[el] ? el : acc.max) : el;
      return acc;
    },
    { k: {} },
  ).max;
}
