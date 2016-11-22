var documents = {
  query: {
    documents: 'SELECT * FROM documents',
    documentById: 'SELECT * FROM documents WHERE uid=?',
  },
  update: {
    documentById: {

    }
  },
  insert: {
    // INSERT INTO commodity_info (XH, pics, location) VALUES (1, '123', 'fff')
    user: 'INSERT INTO documents SET ?'
  }
}

module.exports = documents;
