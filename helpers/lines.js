// return formated record
function createResponseOneLine(record) {
  return {
    id:       record._id,
    created:  record.created,
    updated:  record.updated,
    number:   record.number,
    weekday:  record.weekday,
    saturday: record.saturday,
    sunday:   record.sunday
  }
}

// return formated records
function createResponseAllLine(records) {
  const results = [];

  for (let i = 0; i < records.length; i++) {
    let { number, created, updated } = records[i];

    results.push({ id: records[i]._id, number, created, updated });
  }

  return results;
}

module.exports = { createResponseOneLine, createResponseAllLine };