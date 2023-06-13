# bloom-filter
A Javascript Implementation of Bloom filter- a probabilistic data structure for membership lookups

```js
// Try out
let filter = new BloomFilter();
filter.add("foo");
console.log(filter.mayContain("foo")); // true
console.log(filter.mayContain("bar")); //false
filter.add("bar");
console.log(filter.mayContain("bar")); //true
```
