//Autologout

exports.save=function(req,res){
	//console.log('------------------------save');
	if(req.session.user){req.session.user.start_time=Date.now();}//actualizamos hora de ultima actividad
	console.log('Usuario en activo at time: '+req.session.user.start_time);
	};


exports.check=function(req,res){
	var alive=true;
	var usertime=Date.now()-req.session.user.start_time;//calculamos la diferencia de tiempo
	if( usertime > 120000 ){alive=false};
	//console.log('--check--alive: '+alive+'-start_time---> '+req.session.user.start_time+'usertime--> '+usertime);
	return alive;
	};

exports.kill=function(req,res){
	delete req.session.user;
	console.log('Se ha cerrado la session del usuario por sobrepasar 2 minutos sin actividad');
};

