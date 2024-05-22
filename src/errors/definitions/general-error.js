module.exports = class GeneralError extends Error {
  // AUTH
  static unauthorized () {
    return new GeneralError(401, {
      message: 'Unauthorized',
      code: 100
    })
  }

  static invalidLoginCredential () {
    return new GeneralError(400, {
      message: 'Invalid login credential',
      code: 101
    })
  }

  static emailAlreadyUsed () {
    return new GeneralError(400, {
      message: 'Email already used',
      code: 102
    })
  }

  static passwordRequired () {
    return new GeneralError(400, {
      message: 'Password required',
      code: 103
    })
  }

  static passwordNotRequired () {
    return new GeneralError(400, {
      message: 'Password not required for LDAP registration',
      code: 104
    })
  }

  static newPasswordNotMatching () {
    return new GeneralError(400, {
      message: 'New password not matching',
      code: 105
    })
  }

  static userNotFound () {
    return new GeneralError(404, {
      message: 'User not found',
      code: 106
    })
  }

  static canNotChangePassword () {
    return new GeneralError(404, {
      message: 'Can not change password',
      code: 107
    })
  }

  // UTILITIES (QUERY, etc)
  static invalidSortingOrder () {
    return new GeneralError(400, {
      message: 'Invalid sorting order',
      code: 201
    })
  }

  static invalidBooleanStringValue () {
    return new GeneralError(400, {
      message: 'Invalid boolean string value',
      code: 202
    })
  }

  // ADDRESS MANAGEMENT
  static addressNotFound () {
    return new GeneralError(404, {
      message: 'Address not found',
      code: 301
    })
  }

  static invalidFileMiletype (mimeType) {
    return new GeneralError(400, {
      message: `File MimeType ${ mimeType } not allowed`,
      code: 402
    })
  }

  constructor (httpStatusCode, ...errors) {
    super(errors[0].message)
    this.httpStatusCode = httpStatusCode
    this.name = this.constructor.name
    this.errors = errors
  }
}

require('util').inherits(module.exports, Error)
