import { replace } from 'lodash';
import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fShortenNumber(number: number | string) {
  return replace(numeral(number).format('0.00a'), '.00', '');
}

export function fData(number: number | string) {
  return numeral(number).format('0.0 b');
}
