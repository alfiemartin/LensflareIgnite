export const testAppleLoginQuery = `
  query Test {
    test {
      message
      sessionId
      success
      name
    }
  }`

export const appleLoginQuery = `
query AppleSignIn($credential: AppleAuthenticationCredential!, $sessionId: String) {
    appleSignIn(credential: $credential, sessionId: $sessionId) {
      message
      data
      sessionId
      success
      name
    }
  }`

export const appleSignupMutation = `
mutation AppleSignUp($credential: AppleAuthenticationCredential!) {
    appleSignUp(credential: $credential) {
      message
      data
      sessionId
      success
      name
    }
  }`
