import fetch from 'node-fetch';

let LAST_SEND_MESSAGE = Date.now();
const DELAY = 1000;

export class Discord {
  static send(message: string): void {
    const endpoint =
      'https://discord.com/api/webhooks/1030408301269241856/gOG7896X2yQdA7yJt0F-gEYKLRwvmcIfiYCEkyi1xaXQlXvwPktom6RVXKk2X4m112z5';

    if (Date.now() - LAST_SEND_MESSAGE < DELAY) return;
    LAST_SEND_MESSAGE = Date.now();

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: message,
        username: 'T-Sport Bot',
      }),
    });
  }
}
