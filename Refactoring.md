# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

- First the `TRIVIAL_PARTITION_KEY` seemed to be the default value if the event was undefined
- Then the constants like `TRIVIAL_PARTITION_KEY` and `MAX_PARTITION_KEY_LENGTH` felt like they could be in the module since they add context to the module and might be exported later to verify against
- The sha3-256 hash functionality was used twice so i separated it into a function since that would mean instead of the old call it would just say `sha3` which is much more eye pleasing.
- the nested conditions made the code longer and an example would be the conditional for `partitionKey` my one liner says either candidate is `partitionKey` or we could just hash the whole event
- last the exports being in their own section is much cleaner saying here's what this module is exposing
