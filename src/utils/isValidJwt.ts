export function isValidJwt(token: string): boolean {
  return token.split(".").length === 3;
}
