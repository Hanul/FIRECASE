global.TWITTER_LOGIN = METHOD({

	run : (params) => {
		//OPTIONAL: params
		//OPTIONAL: params.customParameters
		
		let scopes;
		let customParameters;
		
		if (params !== undefined) {
			scopes = params.scopes;
			customParameters = params.customParameters;
		}
		
		let provider = new firebase.auth.TwitterAuthProvider();
		
		if (customParameters !== undefined) {
			provider.setCustomParameters(customParameters);
		}
		
		firebase.auth().signInWithRedirect(provider);
	}
});
