# Compression

## Abstract

At the time of writing

At the time of writing, the library size stands at approximately 1.5 MB, which is sub-optimal for network distribution.

To facilitate faster delivery, the underlying dataset must be compressed thus greatly reducing the library size.

**Compression requirements:**

1. The compressed data **must** be encoded as a regular JavaScript string.

   The binary formats **cannot** be used due to the **requirement** of supporting the widest possible range
   of JS environments.

1. The compression time is not important, it only **needs** to be feasible.

1. The decompression algorithm **must** be fast.

The main chunk of data is the proj4 strings which are unordered key-value pairs.

The unordered nature can be exploited to produce greater compression ratio and outperform the general-purpose
compression algorithms.

The algorithm presented is a variation of Re-Pair and Byte-pair encoding algorithms that fits the aforementioned
requirements.

On top of that, some other compression techniques are applied, such as removing the "+" prefix from the keys
(and adding "+" to the unprefixed keys) and using more compact alternative to JSON.

This document mainly discusses the compression algorithm. The supplementary techniques described by the respective
appendix.

## Concept

The main goal of any compression algorithm is to find the largest data subsequences and encode them with the shortest
combination thus producing the highest compression ratio.

In essence, a proj4 string is just an unordered collection of tokens.

> **Note:** Keys and values can be a part of a collection, but the further logic must account for the items ordering.

For example, `+proj=tmerc +lat_0=0 +lon_0=0` can be represented as a set `a b c` where:

```plain
a = "+proj=tmerc"
b = "+lat_0=0"
c = "+lon_0=0"
```

Then, a set of proj4 strings can look like this:

```plain
a b c d e
a b c
a c x y
a c d e z
```

In this example, a subset `a b c` is the **largest**, and encoding it with a character `A` will reduce the set to:

```plain
A d e
A
a c x y
a c d e z
```

Then, a set `a c` can be encoded with `B` to reduce the set to:

```plain
A d e
A
B x y
B d e z
```

Lastly, `d e` can be encoded as `C`:

```plain
A C
A
B x y
B C z
```

To summarize, this is the input, the output, and the dictionary:

```plain
Input:            Output:

a b c d e   --->   A C
a b c       --->   A
a c x y     --->   B x y
a c d e z   --->   B C z

Dictionary:

A -> a b c
B -> a c
C -> d e
```

## Finding the largest subsequences

To find the largest subsequences, we must do the opposite of what has been shown in the examples above:

1. Find a largest pair of items. The pair size is calculated by the formula:

   ```plain
   pair_size = (first_item_size_in_bytes + second_item_size_in_bytes) * pair_occurrences
   ```

1. Group the pair.

1. Assign this groups a size of `pair_size` calculated above.

1. Repeat the process until every pair is grouped.

For the set of strings:

```plain
a b c d e
a b c
a c x y
a c d e z
```

The following groups will be computed:

```plain
a   c       d   e
|___|       |___|
  |           |
  A     b     C
  |_____|
     |
     B
```

In practive, an item or a group may be a part of multiple groups, for example:

```plain
a   b   c   d
|___|___|   |
  |   |     |
  A   B     |
      |_____|
         |
         C
```

So in other words, the groups are Directed Acyclic Graph (DAG).

## Encoding

As mentioned before, the largest groups must be assigned the shortest sequences to produce the most savings.

If a group is encoded with a sequence, its parent's size will reduce as the group's contents has been replaced
with a short sequence.

Thus, we should find and decompress a group that now produces losses instead of gains.

When we decompress that group, its sequence is freed and can be reused to further improve compression rate.

To account all of that, a following procedure must be performed:

1. Compress the group whose compression produces the best savings.

1. If there's no profitable group, decompress the group that produces the most loss.

1. Reprioritize compression sequences already in use.

1. Repeat the process until no changes to the groups and sequences are made.

And the compression is done, everything can be written on the disk.

### Decoding

The decoding is a simple recursive unwrapping of the dictionary entries which doesn't take much time.

### Further improvements

#### Encode character pairs

This will add regular Re-Pair/BPE capabilities to the presented algorithm.

However, significant changes to the codebase will be required to implement that.

## Conclusion

The provided algorithm outperforms general compression algorithms by taking an advantage of unordered nature
of the data.

The algorithm satisfies the requirements:

1. The compressed data is a regular JavaScript string.

1. The compression algorithm is slow but feasible.

1. The decompression algorithm is fast.

## Appendix: Supplementary techniques

### Remove "+" from the parameters

The majority (probably even every) of proj4 parameters begins with the "+" sign. Removing this sign reduces
the compressed output by ≈1 KB.

The "+" sign must be appended to the parameters without this character, so the reverse process won't break them.

### Use compact JSON alternative

Simple data structures, such as string-string mappings, may be encoded with just two separators:

1. Between key-value pairs.
1. Between keys and values.

Of course, a decoder will present an overhead which is outweighed by the gains.

This saves tens of kilobytes.
