import axios from 'axios';
import config from '../config';
import { User } from '../modules/User/user.model';

export const sendSms = async ({
  email,
  message,
}: {
  email: string;
  message: string;
}): Promise<void> => {
  const user = await User.findOne({
    email,
  }).lean();
  const phone = normalizeUSPhoneNumber(user?.phone!);
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
            firstName: user?.first_name,
            lastName: user?.last_name,
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
    return response.data;
  } catch (error: any) {
    console.error(
      '❌ Failed to send SMS:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

function normalizeUSPhoneNumber(input: string): string | null {
  const digitsOnly = input.replace(/\D/g, '');

  if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
    return `+${digitsOnly}`;
  }

  if (digitsOnly.length === 10) {
    return `+1${digitsOnly}`;
  }

  return null;
}
