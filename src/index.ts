// Interfaces
interface Worker {
  id: string;
}

interface WorkerOptions {
  interval: number;
}

/**
 * Creates a worker group.
 * @param id The ID for the worker group.
 */
export default class WorkerGroup {
  // Internal variables.
  private id: string;
  private workers: Worker[];

  constructor(id: string) {
    this.id = id;
  }

  /**
   * Adds a worker to the worker group.
   * @param id The ID you want to have for the worker.
   * @param options The options for the worker.
   */
  add(id: string, options?: WorkerOptions): void {
    const exists = this.workers.find((worker) => worker.id === id);

    if (exists)
      throw new Error("A worker with the provided ID already exists.");

    this.workers.push({
      id: id,
    });
  }

  /**
   * Removes a worker from the worker group.
   * @param id The ID to use to find the worker.
   */
  remove(id: string): void {
    const found = this.workers.find((worker) => worker.id === id);

    if (!found) throw new Error("Could not find worker with given ID.");
  }

  /**
   * Lists all workers from the worker group.
   */
  list(): Worker[] {
    return this.workers;
  }
}
