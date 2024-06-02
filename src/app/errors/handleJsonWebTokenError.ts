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

  const statusCode = 401;
  return {
    statusCode,
    message: 'unauthorized',
    errorSources,
  };
};
