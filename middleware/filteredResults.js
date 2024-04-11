const advancedResults = (model, populate) => async (req, res, next) => {
  // Estrai i parametri di paginazione e limitazione dalla query
  let { select, sort, page = 1, limit = 25, ...queryOptions } = req.query;

  // Converti page in un numero intero
  page = parseInt(page, 10);

  // Creazione della query
  let query = model.find(queryOptions);

  // Selezione dei campi
  if (select) query = query.select(select.split(','));

  // Ordinamento dei risultati
  if (sort) query = query.sort(sort.split(','));

  // Paginazione dei risultati
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Popolamento dei risultati se richiesto
  if (populate) query = query.populate(populate);

  // Esecuzione della query
  const results = await query;

  // Costruzione dell'oggetto di paginazione
  const pagination = {};
  if (endIndex < total) pagination.nextPage = page + 1;
  if (startIndex > 0) pagination.prevPage = page - 1;

  // Aggiunta dei risultati alla risposta
  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };
  next();
};

module.exports = advancedResults;
