import { ToastMessage } from './useToast';

export const decodePbError = (error) => {
  /* 
    Error looks like this:
    {"code":400,"message":"Something went wrong while processing your request.","data":{"username":{"code":"validation_invalid_username","message":"The username is invalid or already in use."}}}
    username could be any field, so based on the length of the data object, we can determine how many errors there are.
    Then we can map over the keys and return an array of error messages.
  */
  const { data: rootData, message } = error;
  const data = rootData?.data || rootData;
  const code = error?.code || rootData?.code;
  let errors = [];
  if (data) {
    const keys = Object.keys(data);
    errors = keys.map((key) => (
      <dd key={`error-${key}`}>
        <span className='capitalize'>{key}</span>: {data[key].message}
      </dd>
    ));
  }
  return (
    <ToastMessage as='dl'>
      <dt className='font-semibold'>
        {code}: {message}
      </dt>
      {errors}
    </ToastMessage>
  );
};
