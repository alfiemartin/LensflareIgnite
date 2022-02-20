export const testAppleLoginQuery = `
  query Test {
    test {
      message
      sessionId
      success
    }
  }`

export const appleLoginMutation = `
mutation AppleSignInn($credential: AppleAuthenticationCredential!, $sessionId: String) {
    appleSignIn(credential: $credential, sessionId: $sessionId) {
      message
      data
      sessionId
      success
      name
    }
  }`
