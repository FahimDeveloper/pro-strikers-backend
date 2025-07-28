import axios from 'axios';
import config from '../config';

export const sendSms = async ({
  phone,
  message,
}: {
  phone: string;
  message: string;
}): Promise<void> => {
  const url = config.sms_api_url;
  const apiKey = config.sms_api_key;
  const locationKey = config.sms_location_key;
  try {
    const response = await axios.put(
      url!,
      {
        recipients: [
          {
            phone: phone,
            firstName: 'Dev',
            lastName: 'Fahim',
          },
        ],
        locationId: locationKey,
        msg: message,
      },
      {
        headers: {
          Authorization: apiKey,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('✅ SMS Sent:', response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      '❌ Failed to send SMS:',
      error.response?.data || error.message,
    );
    throw error;
  }
};
