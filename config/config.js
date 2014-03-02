module.exports = {
	development: {
		// db:  'mongodb://creditedmeuser:creditedmeuserpass@ds027729.mongolab.com:27729/creditedme',
		db: 'mongodb://test:test@ds033429.mongolab.com:33429/code',
		app: {
			name: 'CODE'
		}
	},
  	production: {
    	db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
		app: {
			name: 'CODE'
		}
 	}
}
