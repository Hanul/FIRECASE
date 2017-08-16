FOR_BOX((box) => {

	/*
	 * MODEL 클래스
	 */
	box.MODEL = CLASS({

		init : (inner, self, params) => {
			//REQUIRED: params
			//REQUIRED: params.name
			//OPTIONAL: params.initData
			//OPTIONAL: params.methodConfig
			//OPTIONAL: params.methodConfig.create
			//OPTIONAL: params.methodConfig.create.valid
			//OPTIONAL: params.methodConfig.create.role
			//OPTIONAL: params.methodConfig.create.authKey
			//OPTIONAL: params.methodConfig.create.adminRole
			//OPTIONAL: params.methodConfig.get
			//OPTIONAL: params.methodConfig.get.role
			//OPTIONAL: params.methodConfig.update
			//OPTIONAL: params.methodConfig.update.valid
			//OPTIONAL: params.methodConfig.update.role
			//OPTIONAL: params.methodConfig.update.authKey
			//OPTIONAL: params.methodConfig.update.adminRole
			//OPTIONAL: params.methodConfig.remove
			//OPTIONAL: params.methodConfig.remove.role
			//OPTIONAL: params.methodConfig.remove.authKey
			//OPTIONAL: params.methodConfig.remove.adminRole
			//OPTIONAL: params.methodConfig.find
			//OPTIONAL: params.methodConfig.find.role
			//OPTIONAL: params.methodConfig.count
			//OPTIONAL: params.methodConfig.count.role
			//OPTIONAL: params.methodConfig.checkIsExists
			//OPTIONAL: params.methodConfig.checkIsExists.role
			
			let name = params.name;
			let initData = params.initData;
			let methodConfig = params.methodConfig;
			
			let createConfig;
			let getConfig;
			let updateConfig;
			let removeConfig;
			let findConfig;
			let countConfig;
			let checkIsExistsConfig;
			
			let createValid;
			let updateValid;
			
			let create;
			let get;
			let getWatching;
			let update;
			let remove;
			let find;
			let findWatching;
			let count;
			let checkIsExists;
			let onNewAndFind;
			let onNewAndFindWatching;
			
			let ref = firebase.database().ref().child(box.boxName + '/' + name);
			
			// init method config.
			if (methodConfig !== undefined) {
				
				createConfig = methodConfig.create;
				getConfig = methodConfig.get;
				updateConfig = methodConfig.update;
				removeConfig = methodConfig.remove;
				findConfig = methodConfig.find;
				countConfig = methodConfig.count;
				checkIsExistsConfig = methodConfig.checkIsExists;
				
				if (createConfig !== undefined) {
					createValid = createConfig.valid;
				}
				
				if (updateConfig !== undefined) {
					updateValid = updateConfig.valid;
				}
			}
			
			let getBoxName = self.getBoxName = () => {
				return box.boxName;
			};
			
			let getName = self.getName = () => {
				return name;
			};

			let getInitData = self.getInitData = () => {
				return initData;
			};

			let getCreateValid = self.getCreateValid = () => {
				return createValid;
			};

			let getUpdateValid = self.getUpdateValid = () => {
				return updateValid;
			};
			
			// create.
			if (createConfig !== false) {

				create = self.create = (data, callbackOrHandlers) => {
					//REQUIRED: data
					//OPTIONAL: callbackOrHandlers
					//OPTIONAL: callbackOrHandlers.error
					//OPTIONAL: callbackOrHandlers.notValid
					//OPTIONAL: callbackOrHandlers.notAuthed
					//OPTIONAL: callbackOrHandlers.success
					
					let errorHandler;
					let notValidHandler;
					let notAuthedHandler;
					let callback;
					
					let validResult;

					if (callbackOrHandlers !== undefined) {
						if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
							callback = callbackOrHandlers;
						} else {
							errorHandler = callbackOrHandlers.error;
							notValidHandler = callbackOrHandlers.notValid;
							notAuthedHandler = callbackOrHandlers.notAuthed;
							callback = callbackOrHandlers.success;
						}
					}

					// init data.
					if (initData !== undefined) {
						EACH(initData, (value, name) => {
							data[name] = value;
						});
					}

					if (createValid !== undefined) {
						validResult = createValid.checkAndWash(data);
					}

					if (validResult !== undefined && validResult.checkHasError() === true) {

						if (notValidHandler !== undefined) {
							notValidHandler(validResult.getErrors());
						} else {
							SHOW_WARNING(box.boxName + '.' + name + 'Model.create', MSG({
								ko : '데이터가 유효하지 않습니다.'
							}), {
								data : data,
								validErrors : validResult.getErrors()
							});
						}

					} else {
						
						let id = ref.push().key;
						data.id = id;
						
						let updates = {};
						updates[id] = data;
						
						ref.update(updates, (error) => {
							console.log(error, data);
						});

						/*room.send({
							methodName : 'create',
							data : data
						}, (result) => {

							let errorMsg;
							let validErrors;
							let isNotAuthed;
							let savedData;

							if (result !== undefined) {

								errorMsg = result.errorMsg;
								validErrors = result.validErrors;
								isNotAuthed = result.isNotAuthed;
								savedData = result.savedData;

								if (errorMsg !== undefined) {
									if (errorHandler !== undefined) {
										errorHandler(errorMsg);
									} else {
										SHOW_ERROR(box.boxName + '.' + name + 'Model.create', errorMsg);
									}
								} else if (validErrors !== undefined) {
									if (notValidHandler !== undefined) {
										notValidHandler(validErrors);
									} else {
										SHOW_WARNING(box.boxName + '.' + name + 'Model.create', MSG({
											ko : '데이터가 유효하지 않습니다.'
										}), {
											data : data,
											validErrors : validErrors
										});
									}
								} else if (isNotAuthed === true) {
									if (notAuthedHandler !== undefined) {
										notAuthedHandler();
									} else {
										SHOW_WARNING(box.boxName + '.' + name + 'Model.create', MSG({
											ko : '인증되지 않았습니다.'
										}));
									}
								} else if (callback !== undefined) {
									callback(savedData);
								}

							} else if (callback !== undefined) {
								callback();
							}
						});*/
					}
				};
			}
		}
	});
});
