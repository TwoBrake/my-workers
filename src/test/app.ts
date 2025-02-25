// Resources
import WorkerGroup from "..";

// Variables
const endpoints = new WorkerGroup("1");
endpoints.add("test", () => {
  console.log("i am a worker!");
});

setTimeout(() => {
  endpoints.remove("test");
}, 5000);
