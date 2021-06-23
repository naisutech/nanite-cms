export interface TStyleObj {
  [key: string]: string | number;
}

export const makeStyles = (styleObj: TStyleObj = {}): string => {
  return Object.entries(styleObj).map(entry => {
    if (!entry[1]) return ''
    return `${entry[0]}: ${entry[1]};`
  }).join(' ')
}