function getNowDate(delimiter) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const now = new Date().toLocaleString('en-GB', options);
  const re = /(\d{2})\/(\d{2})\/(\d{4})/g;
  return now.replace(re, (all, d, m, y) => {
    const year = delimiter ? y : y.substr(2, 2);
    return delimiter ? `${year}-${m}-${d}` : `${year}${m}${d}`;
  });
}

function formatDate(str) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' };
  return new Date(str).toLocaleString('en-GB', options);
}

function stripDate(date) {
  const [year, month, day] = date.split('-');
  return `${year.substr(2, 2)}${month}${day}`;
}
module.exports = {
  getNowDate,
  formatDate,
  stripDate
};
