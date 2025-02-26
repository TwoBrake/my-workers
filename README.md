# My Workers

A simple module for handling workers by organizing them into jobs that you can give a unique description for.

## Installation

1. Install the package using NPM:

```bash
npm install my-workers
```

2. Import the package in your project using **ES6**:

```typescript
import Job from "my-workers";
```

or using **CommonJS**:

```javascript
const Job = require("my-workers");
```

## Usage

```typescript
import Job from "my-workers";

const job = new Job("JobName"); // Define the job with a descriptive ID.
const worker = job.add(
  "Tom", // The name of the worker.
  () => {
    console.log("Hello, Tom!");
  }, // The function/action to run.
  {
    interval: 5000, // Optional: By default the interval is 1000ms, but you can change it here.
  }
);

worker.start(); // Start or resume the worker.
worker.pause(); // Pause the worker.
job.remove("Tom"); // Completely remove the worker.
```

## Questions

If you have any other questions or need help, feel free to open an issue on the GitHub repository.
