const {
  deterministicPartitionKey,
  sha3,
  MAX_PARTITION_KEY_LENGTH,
} = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it(`should return a the partitionKey passed if it doesn't exceed ${MAX_PARTITION_KEY_LENGTH} chars and is a string`, () => {
    const event = { partitionKey: "123" };
    const result = deterministicPartitionKey(event);
    expect(result).toBe(event.partitionKey);
  });

  it("Should return a hash of the event object if it doesn't contain a partitionKey", () => {
    const event = { data: "arbitrary data" };
    const expected = sha3(JSON.stringify(event));
    const result = deterministicPartitionKey(event);
    expect(result).toBe(expected);
  });

  it(`should return a sha3-256 hash of the partitionKey if it exceeds ${MAX_PARTITION_KEY_LENGTH} characters`, () => {
    const event = { partitionKey: "12356789".repeat(40) };
    const result = deterministicPartitionKey(event);
    const keyHash = sha3(event.partitionKey);

    expect(result).toBe(keyHash);

    expect(result).not.toBe(event.partitionKey);
  });

  it("should return a stringified of the partition key if it is not a string", () => {
    const event = { partitionKey: { data: [1, 3, 5] } };
    const result = deterministicPartitionKey(event);
    const keyHash = JSON.stringify(event.partitionKey);

    expect(result).toBe(keyHash);
  });
});
