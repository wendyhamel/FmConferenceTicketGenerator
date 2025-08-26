window.getTicket = function() {
	return {
		submitted: false,
		fullname: '',
		email: '',
		GHUsername: '',
		requestEarlyAccess: {},
		validation: {
			fullName: {
				rule: {
					required: function (field) {
						if (field) {
							return {invalid: false, message: ''}
						} else {
							return {invalid: true, message: 'Full name is required'}
						}
					},
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
				}
			},
		},
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
			this.validate('fullName')
			this.validate('email')
			this.validate('GHUsername')
			if (
				this.validation['fullName'].invalid === false &&
				this.validation['email'].invalid === false &&
				this.validation['GHUsername'].invalid === false
			) {
				this.requestEarlyAccess = {
					fullName: this.fullName,
					email: this.email,
					GHUsername: this.GHUsername
				}
				this.fullName = ''
				this.email = ''
				this.GHUsername = ''
				this.submitted = true
			}
		}
	}
}