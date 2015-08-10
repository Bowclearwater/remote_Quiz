
var models = require('../models/models.js');
var Sequelize = require('sequelize');
var data={count:0,comments:0,pregConComments:0,pregSinComments:0};

//Uso del Promise.all visto en el foro **https://www.miriadax.net/web/javascript-node-js/foro/-/message_boards/view_message/34735986?_19_advancedSearch=false&_19_keywords=&_19_delta=20&_19_cur=2&_19_andOperator=true#_19_message_35395233
exports.load = function(req, res,next) {
	var query={include:[			//no lo uso
			{
				model: models.Comment,
				required: false,
				where: { QuizId: null }
				
			}]};
	var query2={include:[		//no lo uso
			{
				model: models.Comment,
				required: false
			}]};

Sequelize.Promise.all([
	models.Quiz.count(),
	models.Comment.count(),
	models.Comment.countPregConComent(),
	models.Comment.countUnpublished(),
	models.Quiz.count(query)]).then( function (c) {
		data.count=c[0];
		data.comments=c[1];
		data.pregConComments=c[2];
		data.countUnpublished=c[3];
		data.pregSinComments=(data.count-data.pregConComments);
		//data.pregSinComments=c[4];
		data.mediaComPreg=data.comments/data.count;
	}).catch (function (err) {
		next(err);
		})
	.finally (function() {
		next();
	});
};





//____Old
exports.____load = function(req, res,next) {
	//var data;
models.Quiz.count().then(function(c) {data.count=c;	})
						.catch(function(error) {
							next(error);
						});
models.Comment.count().then(function(c){ data.comments=c});
						
models.Quiz.count({include:[
			{
				model: models.Comment,
				required: true
				
			}
			]}            ).then(function(c){data.pregConComments=c})			;

next();
	}

exports.index=function(req, res,next) {
	res.render('statistics/index.ejs', { data:data, errors:[]});
}
