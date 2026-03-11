export const getDateTime = (item) => {
  const [time, modifier] = item.time.split(' ');
  let [hours, minutes] = time.split(':');

  if (modifier === 'PM' && hours !== '12') {
    hours = parseInt(hours) + 12;
  }

  if (modifier === 'AM' && hours === '12') {
    hours = '00';
  }

  return new Date(`${item.date}T${hours}:${minutes}:00`);
};