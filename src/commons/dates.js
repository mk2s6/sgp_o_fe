import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';

const formatDate = (date) => moment(date).format(dateFormat);

export { formatDate };
