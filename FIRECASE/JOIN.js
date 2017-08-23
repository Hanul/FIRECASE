global.JOIN = METHOD({

	run : (params, errorHandler) => {
		//REQUIRED: params
		//REQUIRED: params.email
		//REQUIRED: params.password
		//REQUIRED: errorHandler
		
		let email = params.email;
		let password = params.password;
		
		firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
			errorHandler(error);
		});
	}
});
