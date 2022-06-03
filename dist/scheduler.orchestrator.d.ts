import { OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { CronJob } from 'cron';
import { CronOptions } from './decorators/cron.decorator';
import { SchedulerRegistry } from './scheduler.registry';
declare type TargetHost = {
  target: Function;
};
declare type TimeoutHost = {
  timeout: number;
};
declare type RefHost<T> = {
  ref?: T;
};
declare type CronOptionsHost = {
  options: CronOptions & Record<'cronTime', string | Date | any>;
};
declare type IntervalOptions = TargetHost & TimeoutHost & RefHost<number>;
declare type TimeoutOptions = TargetHost & TimeoutHost & RefHost<number>;
declare type CronJobOptions = TargetHost & CronOptionsHost & RefHost<CronJob>;
export declare class SchedulerOrchestrator
  implements OnApplicationBootstrap, OnApplicationShutdown {
  protected readonly schedulerRegistry: SchedulerRegistry;
  protected readonly cronJobs: Record<string, CronJobOptions>;
  protected readonly timeouts: Record<string, TimeoutOptions>;
  protected readonly intervals: Record<string, IntervalOptions>;
  constructor(schedulerRegistry: SchedulerRegistry);
  onApplicationBootstrap(): void;
  onApplicationShutdown(): void;
  mountIntervals(): void;
  mountTimeouts(): void;
  mountCron(): void;
  clearTimeouts(): void;
  clearIntervals(): void;
  closeCronJobs(): void;
  addTimeout(methodRef: Function, timeout: number, name?: string): void;
  addInterval(methodRef: Function, timeout: number, name?: string): void;
  addCron(
    methodRef: Function,
    options: CronOptions & Record<'cronTime', string | Date | any>,
  ): void;
}
export {};
