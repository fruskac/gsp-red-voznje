module.exports = {
  routes: [
    {
      route: '/',
      ALL:   'API Documentation'
    },
    {
      route: '/lines',
      auth:  'Basic Auth -> [POST]',
      GET:   'Get list of all lines inside database',
      POST:  'Create new line'
    },
    {
      route:  '/lines/:id',
      param:  ':id -> unique index for specific record from database',
      auth:   'Basic Auth -> [PATCH, DELETE]',
      GET:    'Get line data',
      PATCH:  'Update line data',
      DELETE: 'Delete line'
    },
    {
      route: '/setup/:id',
      param: ':id -> unique number of bus line e.g. 84 -> Lug',
      auth:  'Basic Auth -> [GET, PUT]',
      GET:   'Get data from live website http://www.gspns.co.rs/red-voznje/gradski',
      PUT:   'Get data from live website http://www.gspns.co.rs/red-voznje/gradski & and save inside database'
    }
  ],
  availableLines: [
    {
      param: '78',
      info:  'Beočin Selo'
    },
    {
      param: '79',
      info:  'Čerević'
    },
    {
      param: '80',
      info:  'B.A.S.'
    },
    {
      param: '81',
      info:  'Banoštor'
    },
    {
      param: '84',
      info:  'Lug',
    }
  ]
};