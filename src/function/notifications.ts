import request from 'request-promise';

export async function sendPushNotification(expoPushToken: any, notification_message?: string) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'ព័ត៌មានថ្មី',
    body: notification_message ? notification_message : 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await request('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}
