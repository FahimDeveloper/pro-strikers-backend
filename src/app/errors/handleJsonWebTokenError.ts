import { TErrorSources } from '../interface/error';

type TJsonWebTokenError = {
  name: string;
  message: string;
};
export const handleJsonWebTokenError = (err: TJsonWebTokenError) => {
  const errorSources: TErrorSources = [
    {
      path: `${err?.name}`,
      message: `${err?.message}`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid Token',
    errorSources,
  };
};
