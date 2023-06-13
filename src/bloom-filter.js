import murmurhash from "murmurhash";
import { BitSet } from "./bit-set.js";
class BloomFilter {
  constructor(size = 1024, numHashes = 4) {
    this.size = size;
    this.hashes = this._hashes(numHashes);
    this.filter = new BitSet(size);
  }

  /**
   * Test the membership for item in set; May or may not - (false positive)
   * @param {string} element
   * @returns
   */
  mayContain(element) {
    const indices = this._getIndices(element);
    for (let i = 0; i < indices.length; i++) {
      if (!this.filter.get(indices[0])) {
        return false;
      }
    }
    return true;
  }

  /**
   * Add item to the filter
   * @param {string} element
   */
  add(element) {
    const indices = this._getIndices(element);
    for (let i = 0; i < indices.length; i++) {
      this.filter.set(indices[i]);
    }
  }

  /**
   * Compute elment hash through k hash functions and find 'buckets'(indexes) to set the bits in the Bit Array
   * @param {string} element
   * @returns
   */
  _getIndices(element) {
    const hashes = this.hashes.map((fn) => fn(element));
    return hashes.map((hash) => hash % this.size);
  }

  /**
   * Generate k hash functions
   * @param {number} numHashes
   * @returns
   */
  _hashes(numHashes) {
    const hashes = [];
    for (let i = 0; i < numHashes; i++) {
      const seed = this._generateSeed();
      hashes.push((element) => this._hash(element, seed));
    }
    return hashes;
  }

  /**
   * Basically a wrap for murmurhash
   * @param {string} element
   * @param {number} seed
   * @returns
   */
  _hash(element, seed) {
    return murmurhash.v3(element, seed);
  }

  _generateSeed() {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  }
}

// Try out
let filter = new BloomFilter();
filter.add("foo");
console.log(filter.mayContain("foo")); // true
console.log(filter.mayContain("bar")); //false
filter.add("bar");
console.log(filter.mayContain("bar")); //true
