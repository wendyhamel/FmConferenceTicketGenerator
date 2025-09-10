window.getTicket = function() {
	return {
		avatar: '',
		fullName: '',
		email: '',
		GHUsername: '',
		requestEarlyAccess: {},
		validation: {
			avatar: {
				rule: {
					required: function (field) {
						const fileSelected = field.files[0];
						if (field) {
							return {invalid: false, message: ''}
						} else {
							return {invalid: true, message: 'Avatar is required'}
						}
					},
					// fileSize: function (field) {
					// 	const fileSelected = field.files[0];
					// 	const validFileSize = fileSelected.size <= 500000;
					// 	if (validFileSize.test(field)) {
					// 		return {invalid: false, message: ''}
					// 	} else {
					// 		return {invalid: true, message: 'File is too large. Please upload a photo under 500kb'}
					// 	}
					// },
					// fileType: function (field) {
					// 	const fileSelected = field.files[0];
					// 	const validExtensions = /(\.JPG|\.PNG|\.jpeg)$/g
					// 	if (validExtensions.test(field)) {
					// 		return {invalid: false, message: ''}
					// 	} else {
					// 		return {invalid: true, message: 'Wrong file type. Please upload a JPG or PNG file'}
					// 	}
					// },
				}
			},
			fullName: {
				rule: {
					required: function (field) {
						if (field) {
							return {invalid: false, message: ''}
						} else {
							return {invalid: true, message: 'Full name is required'}
						}
					}
				}
			},
			email: {
				rule: {
					required: function (field) {
						if (field) {
							return {invalid: false, message: ''}
						} else {
							return {invalid: true, message: 'Email address is required'}
						}
					},
					email: function (field) {
						const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g
						if (validEmailRegex.test(field)) {
							return {invalid: false, message: ''}
						} else {
							return {invalid: true, message: 'Please enter a valid email address'}
						}
					}
				}
			},
			GHUsername: {
				rule: {
					required: function (field) {
						if (field) {
							return {invalid: false, message: ''}
						} else {
							return {invalid: true, message: 'Github Username is required'}
						}
					},
					githubName: function (field) {
						const validGithubNameRegex = /^@[a-zA-Z0-9-]+$/g
						if (validGithubNameRegex.test(field)) {
							return {invalid: false, message: ''}
						} else {
							return {invalid: true, message: 'Please enter a valid github name'}
						}
					}

				}
			},
		},
		submitted: false,
		validate(field) {
			for (const key in this.validation[field].rule) {
				const validationResult = this.validation[field].rule[key](this[field])
				if (validationResult.invalid) {
					this.validation[field].invalid = true
					this.validation[field].message = validationResult.message
					break
				}
				this.validation[field].invalid = false
				this.validation[field].message = ''
			}
		},
		submit() {
			// this.validate('avatar')
			this.validate('fullName')
			this.validate('email')
			this.validate('GHUsername')
			if (
				// this.validation['avatar'].invalid === false &&
				this.validation['fullName'].invalid === false &&
				this.validation['email'].invalid === false &&
				this.validation['GHUsername'].invalid === false
			) {
				this.requestEarlyAccess = {
					avatar: this.avatar,
					fullName: this.fullName,
					email: this.email,
					GHUsername: this.GHUsername
				}
				this.submitted = true
			}
		}
	}
}