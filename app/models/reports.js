var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReportSchema = new mongoose.Schema({
  date      : Date,
  description: String,
  title     : String,
  category: String,
  distribution: String
});

ReportSchema.statics.getAll = function(done) {
  this.find().sort({date: -1}).exec(function (error, reports) {
      done(error, reports);
      console.log(reports);
    });
};

ReportSchema.statics.createReport = function ( req, res ){
    Report.create({
      title: req.body.title,
      description: req.body.description,
      date : new Date(),
      category: req.body.category,
      distribution: req.body.distribution
    },
      function(err, report){
      //Should show error page
      console.log(report);
      res.redirect('/');

    });
};

var Report      = mongoose.model('Report', ReportSchema);

module.exports = Report;
