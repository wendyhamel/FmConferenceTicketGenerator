window.getTicket = function() {
	return {
		avatar: '',
		fullName: '',
		email: '',
		GHUsername: '',
		avatarPreview: null,
		requestEarlyAccess: {
			avatarPreview: null,
			fullName: '',
			email: '',
			GHUsername: '',
		},
		submitted: false,
		validation: {
			avatar: {
				rule: {
					required: function (field) {
						const fileSelected = field.files && field.files[0];
						if (fileSelected) {
							return {invalid: false, message: ''}
						} else {
							return {invalid: true, message: 'Avatar is required'}
						}
					},
					fileSize: function (field) {
						const fileSelected = field.files && field.files[0];
						if (!fileSelected) return {invalid: false, message: ''};
						const validFileSize = fileSelected.size <= 500000;
						if (validFileSize) {
							return {invalid: false, message: ''}
						} else {
							return {invalid: true, message: 'File is too large. Please upload a photo under 500kb'}
						}
					},
					fileType: function (field) {
						const fileSelected = field.files && field.files[0];
						if (!fileSelected) return {invalid: false, message: ''};
						const validExtensions = /(\.jpg|\.JPG|\.PNG|\.jpeg|\.png)$/i
						if (validExtensions.test(fileSelected.name)) {
							return {invalid: false, message: ''}
						} else {
							return {invalid: true, message: 'Wrong file type. Please upload a JPG or PNG file'}
						}
					},
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
		validate(field) {
			for (const key in this.validation[field].rule) {
				let fieldValue = this[field];
				if (field === 'avatar') {
					fieldValue = document.getElementById('upload_avatar');
					let reader = new FileReader();
					reader.onload = function(e) {
						this.avatar = e.target.result;
					}.bind(this);
					this.avatarPreview = reader.readAsDataURL(fieldValue.files[0]);
				}
				const validationResult = this.validation[field].rule[key](fieldValue)
				if (validationResult.invalid) {
					this.validation[field].invalid = true
					this.validation[field].message = validationResult.message
					break
				}
				this.validation[field].invalid = false
				this.validation[field].message = ''
			}
		},
		handleFileSelect(event) {
			const file = event.target.files[0];

			if (file) {
				this.validate('avatar');
				if (!this.validation.avatar.invalid) {
					const reader = new FileReader();
					reader.onload = (e) => {
						this.avatarPreview = e.target.result;
					};
					reader.onerror = (e) => {
						this.avatarPreview = null;
					};
					reader.readAsDataURL(file);
					this.avatar = file.name;
				} else {
					this.avatarPreview = null;
					this.avatar = '';
				}
			} else {
				this.avatarPreview = null;
				this.avatar = '';
			}
		},
		removeAvatar() {
			this.avatarPreview = null;
			this.avatar = '';
			document.getElementById('upload_avatar').value = '';
			this.validation.avatar.invalid = false;
			this.validation.avatar.message = '';
		},
		submit() {
			this.validate('avatar')
			this.validate('fullName')
			this.validate('email')
			this.validate('GHUsername')
			if (
				this.validation['avatar'].invalid === false &&
				this.validation['fullName'].invalid === false &&
				this.validation['email'].invalid === false &&
				this.validation['GHUsername'].invalid === false
			) {
				this.requestEarlyAccess = {
					avatar: this.avatar,
					avatarPreview: this.avatarPreview,
					fullName: this.fullName,
					email: this.email,
					GHUsername: this.GHUsername
				}
				this.submitted = true
			}
		}
	}
}