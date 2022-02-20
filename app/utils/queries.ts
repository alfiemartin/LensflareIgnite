export const testAppleLoginQuery = `
  query Test {
    test {
      message
      sessionId
      success
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
mutation AppleSignIn($credential: AppleAuthenticationCredential!) {
    appleSignUp(credential: $credential) {
      message
      data
      sessionId
      success
      name
    }
  }`
