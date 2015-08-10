//Deficnición del modelo de comment con validación
module.exports=function(sequelize,DataTypes){
	return sequelize.define('Comment',
		{texto:{
			type:DataTypes.STRING,
			validate: {notEmpty: {msg:"-> Falta comentario"}}
			},
		publicado: {
			type:DataTypes.BOOLEAN,
			defaultValue:false}
		},
	{
		classMethods: {
			countPregConComent: function () {
				return this.aggregate('QuizId', 'count', { distinct: true }).then('success',function(count) { //cuenta quizes asociados a comentarios
				return count;
				})},
			countUnpublished: function () {
				return this.aggregate('QuizId', 'count', {'where': { 'publicado': false }}).then('success',function(count) {
				//cuenta comentarios sin publicar asociados a quizes
				return count;
				})}
		}
	});
}