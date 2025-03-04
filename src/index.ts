// Interfaces
interface WorkerOptions {
  interval?: number;
  delayStart?: boolean;
}

/**
 * Creates a job.
 * @param id The ID or name for the job (used to describe the job).
 */
export default class Job {
  // Internal variables.
  public id: string;
  private workers: Worker[] = [];

  constructor(id: string) {
    this.id = id;
  }

  /**
   * Adds a worker to the job.
   * @param id The ID you want to have for the worker.
   * @param options The options for the worker.
   */
  public add(id: string, fn: () => void, options?: WorkerOptions): Worker {
    const exists = this.workers.find((worker) => worker.id === id);

    if (exists)
      throw new Error("A worker with the provided ID already exists.");

    const worker = new Worker(
      id,
      options && options.interval ? options.interval : 1000,
      fn,
      options && options.delayStart ? true : false
    );

    this.workers.push(worker);

    return worker;
  }

  /**
   * Removes a worker from the job.
   * @param id The ID to use to find the worker.
   */
  public remove(id: string): void {
    const index = this.workers.findIndex((worker) => worker.id === id);

    if (index < 0) throw new Error("Could not find worker with given ID.");

    this.workers[index].pause();
    this.workers.splice(index, 1);
  }

  /**
   * Lists all workers on the job.
   */
  public list(): Worker[] {
    return this.workers;
  }

  /**
   * Find a specific worker from the job.
   * @param id The ID to use to find the worker.
   * @return {Worker} The worker that was found.
   */
  public find(id: string): Worker | undefined {
    return this.workers.find((worker) => worker.id === id);
  }
}

/**
 * A worker that is assigned to a job.
 * @param id The ID or name for the worker (used to describe the action).
 * @param interval The amount of time in between working points.
 * @param fn The action to run.
 */
class Worker {
  // Internal variables
  public id: string;
  private interval: number;
  private fn: () => void;
  private delayStart: boolean;

  private loop: number;

  constructor(
    id: string,
    interval: number,
    fn: () => void,
    delayStart?: boolean
  ) {
    this.id = id;
    this.interval = interval;
    this.fn = fn;
    this.delayStart = delayStart || false;
  }

  /**
   * Starts the worker.
   */
  public start() {
    if (!this.delayStart) this.fn();
    this.loop = setInterval(this.fn, this.interval);
  }

  /**
   * Pauses the worker.
   */
  public pause() {
    clearInterval(this.loop);
  }
}
