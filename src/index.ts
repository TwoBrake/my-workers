// Interfaces
interface Worker {
  id: string;
  loop: number;
}

interface WorkerOptions {
  interval?: number;
}

/**
 * Creates a worker group.
 * @param id The ID for the worker group.
 */
export default class WorkerGroup {
  // Internal variables.
  private id: string;
  private workers: Worker[] = [];

  constructor(id: string) {
    this.id = id;
  }

  /**
   * Adds a worker to the worker group.
   * @param id The ID you want to have for the worker.
   * @param options The options for the worker.
   */
  public add(id: string, fn: () => void, options?: WorkerOptions): void {
    const exists = this.workers.find((worker) => worker.id === id);

    if (exists)
      throw new Error("A worker with the provided ID already exists.");

    const loop = setInterval(fn, options ? options.interval : 1000);

    this.workers.push({
      id: id,
      loop: loop,
    });
  }

  /**
   * Removes a worker from the worker group.
   * @param id The ID to use to find the worker.
   */
  public remove(id: string): void {
    const found = this.workers.find((worker) => worker.id === id);

    if (!found) throw new Error("Could not find worker with given ID.");

    clearInterval(found.loop);
  }

  /**
   * Lists all workers from the worker group.
   */
  public list(): Worker[] {
    return this.workers;
  }

  /**
   * Find a specific worker from the worker group.
   * @param id The ID to use to find the worker.
   * @return {Worker} The worker that was found.
   */
  public find(id: string): Worker | undefined {
    return this.workers.find((worker) => worker.id === id);
  }
}
