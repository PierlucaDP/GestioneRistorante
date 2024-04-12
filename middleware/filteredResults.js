const advancedResults = (model, populate) => async (req, res, next) => {
  // Estrai i parametri di paginazione e limitazione dalla query
  let { select, sort, ...queryOptions } = req.query;

  page = parseInt(req.query.page, 10) || 1;

  limit = parseInt(req.query.limit, 10) || 1;

  const paramsToDelete = ['page', 'limit', 'sort', 'select'];

  paramsToDelete.forEach((element) => delete queryOptions[element]);

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
  if (endIndex < total) pagination.nextPage = page + 1;
  if (startIndex > 0) pagination.prevPage = page - 1;


  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };
  next();
};

module.exports = advancedResults;
