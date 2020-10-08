module.exports = (column, res) => {
  if (!column.title) {
    res.status(400).send('Column title is required.');
  }
  if (Number.isNaN(column.order)) {
    res.status(400).send('Column order is required.');
  }
};
