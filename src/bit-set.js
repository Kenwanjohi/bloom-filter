/**
 * Bit Array: Implementation adapted from https://blog.jakuba.net/2018-01-09-bit-vector-in-javascript/
 */
export class BitSet {
  constructor(size) {
    this.bitArray = new Uint32Array(Math.ceil(size / 32));
  }

  set(index) {
    const arrayIndex = Math.floor(index / 32);
    const bitIndex = index % 32;
    this.bitArray[arrayIndex] = this.bitArray[arrayIndex] | (1 << bitIndex);
  }

  get(index) {
    const arrayIndex = Math.floor(index / 32);
    const bitIndex = index % 32;
    const value = this.bitArray[arrayIndex] & (1 << bitIndex);
    return value != 0;
  }
}
