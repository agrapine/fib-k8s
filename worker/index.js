const keys = require("./keys");

const redis = require("redis");

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

function fib(index) {
  return (index || 0) < 2 ? 1 : fib(index - 1) + fib(index - 2);
}

sub.on("message", (c, m) => {
  redisClient.hset("values", m, fib(parseInt(m)));
});

sub.subscribe("insert");