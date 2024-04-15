const filteredResults = (model, populate) => async (req, res, next) => {
  let { select, sort, page = 1, limit = 10, ...queryOptions } = req.query;

  page = parseInt(page, 10);

  let query = model.find(queryOptions);

  if (select) query = query.select(select.split(','));

  if (sort) query = query.sort(sort.split(','));

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  if (populate) query = query.populate(populate);

  const results = await query;

  const pagination = {};
  if (endIndex < total && page < total / limit) pagination.nextPage = page + 1;
  if (startIndex > 0 && page <= total / limit) pagination.prevPage = page - 1;
  else if (page > total / limit) pagination.prevPage = total / limit;

  res.filteredResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };
  next();
};

module.exports = filteredResults;
