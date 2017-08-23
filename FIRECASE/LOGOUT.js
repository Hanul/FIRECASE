global.LOGOUT = METHOD({

	run : () => {
		
		LOGIN.removeSignedUserData();
		
		firebase.auth().signOut();
	}
});
