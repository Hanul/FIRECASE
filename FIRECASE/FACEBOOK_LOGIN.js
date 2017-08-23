global.FACEBOOK_LOGIN = METHOD({

	run : (params) => {
		//OPTIONAL: params
		//OPTIONAL: params.scopes
		//OPTIONAL: params.customParameters
		
		let scopes;
		let customParameters;
		
		if (params !== undefined) {
			scopes = params.scopes;
			customParameters = params.customParameters;
		}
		
		let provider = new firebase.auth.FacebookAuthProvider();
		
		if (scopes !== undefined) {
			EACH(scopes, (scope) => {
				provider.addScope(scope);
			});
		}
		
		if (customParameters !== undefined) {
			provider.setCustomParameters(customParameters);
		}
		
		firebase.auth().signInWithRedirect(provider);
	}
});
