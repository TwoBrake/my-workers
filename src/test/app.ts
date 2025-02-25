// Resources
import WorkerGroup from "..";

// Variables
const endpoints = new WorkerGroup("1");
endpoints.add("test");
console.log(endpoints.list());
