declare module 'snowflake-id' {
  export class SnowflakeIdWorker {
    constructor(workerId: number, datacenterId: number);
    nextId(): bigint;
  }
}
