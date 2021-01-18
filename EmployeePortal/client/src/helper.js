export const validateRequired = (field) => {
  return (field === '' ? 'This field is required' : '' );
}

export const isEventMember = (division) => {
  return  division === 'EE';
}