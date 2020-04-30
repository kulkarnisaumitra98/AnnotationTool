export const handleResponse = (response) => {
  switch (response.status) {
    case 200:
      return {
        data: response.data,
        err: null,
        status: response.status,
      };

    case 203:
      return {
        data: response.data,
        err: 'Incorrect password or username',
        status: response.status,
      };

    default: return { data: 'Null', err: null };
  }
};

export const handleError = (err) => {
  console.log(err);
  switch (err.status) {
    case 401:
      return { data: null, err: 'Incorrect password or username', status: 401 };
    case undefined:
      return { data: null, err: 'Network Error', status: 500 };
    default:
      return { data: null, err: 'Server Error', status: 500 };
  }
};
