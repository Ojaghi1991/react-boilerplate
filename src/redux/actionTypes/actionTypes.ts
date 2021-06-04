import { single, promise } from './typeGenerator';

export default [
  // Single Actions
  single('sample'),

  /**
   * Promise Actions -> Second arguments guide
   * c: CREATE
   * l: LOAD
   * a: LOAD_ALL
   * u: UPDATE
   * d: DELETE
   */
  promise('user'),
];
