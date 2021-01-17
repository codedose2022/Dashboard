export const validateRequired = (field) => {
  return (field === '' ? 'This field is required' : '' );
}