global.LOGIN = METHOD((m) => {
	
	let loginCallback;
	let signedUserData;
	
	let setLoginCallback = m.setLoginCallback = (_loginCallback) => {
		//REQUIRED: loginCallback
		
		loginCallback = _loginCallback;
		
		if (signedUserData !== undefined) {
			loginCallback(signedUserData);
		}
	};
	
	let getSignedUserData = m.getSignedUserData = () => {
		return signedUserData;
	};
	
	let removeSignedUserData = m.removeSignedUserData = () => {
		signedUserData = undefined;
	};
	
	// 로그인이 될 때를 감지
	firebase.auth().onAuthStateChanged((user) => {
		
		if (user !== TO_DELETE) {
			
			signedUserData = {
				id : user.uid,
				email : user.email,
				displayName : user.displayName,
				photoURL : user.photoURL
			};
			
			user.providerData.forEach((profile) => {
				signedUserData.provider = profile.providerId
				
				if (signedUserData.provider === 'password') {
					signedUserData.isEmailVerified = user.emailVerified;
				}
			});
			
			EACH(signedUserData, (value, name) => {
				if (value === TO_DELETE) {
					delete signedUserData[name];
				}
			});
			
			if (loginCallback !== undefined) {
				loginCallback(signedUserData);
			}
		}
	});
	
	return {
		
		run : (params, errorHandler) => {
			//REQUIRED: params
			//REQUIRED: params.email
			//REQUIRED: params.password
			
			let email = params.email;
			let password = params.password;
			
			firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
				errorHandler(error);
			});
		}
	};
});
