class AuthorizationError extends Error {
  code: string; // Declare the custom property

  constructor(message: string, code: string) {
    super(message); // Pass the message to the parent Error class
    this.name = "AuthorizationError"; // Set the custom name
    this.code = code; // Assign the custom property
    Object.setPrototypeOf(this, AuthorizationError.prototype); // Fix prototype chain
  }
}
