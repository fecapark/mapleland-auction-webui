export const classes = (...classNames: string[]): string => {
  return classNames.map((token) => token.trim()).join(' ')
}
