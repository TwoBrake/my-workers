// Resources
import Job from "..";

// Variables
const endpoints = new Job("1");
let step = 1;
const test = endpoints.add("test", () => {
  console.log(`i am a worker! step: ${step}`);
  step++;
});

console.log(endpoints.list());
test.start();

setTimeout(() => {
  endpoints.remove("test");
  console.log(endpoints.list());
}, 5000);
