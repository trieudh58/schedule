import { CronJob } from 'cron';
export declare class SchedulerRegistry {
  private readonly cronJobs;
  private readonly cronJobNamespaces;
  private readonly timeouts;
  private readonly intervals;
  runAllCronJobs(namespace?: string): void;
  stopAllCronJobs(namespace?: string): void;
  getCronJobNames(namespace?: string): string[];
  getCronJob(name: string): CronJob;
  getInterval(name: string): any;
  getTimeout(name: string): any;
  addCronJob(name: string, job: CronJob, namespace?: string): void;
  addInterval<T = any>(name: string, intervalId: T): void;
  addTimeout<T = any>(name: string, timeoutId: T): void;
  getCronJobs(): Map<string, CronJob>;
  deleteCronJob(name: string): void;
  getIntervals(): string[];
  deleteInterval(name: string): void;
  getTimeouts(): string[];
  deleteTimeout(name: string): void;
}
