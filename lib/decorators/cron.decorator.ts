import { applyDecorators, SetMetadata } from '@nestjs/common';
import { SchedulerType } from '../enums/scheduler-type.enum';
import {
  SCHEDULER_NAME,
  SCHEDULER_TYPE,
  SCHEDULE_CRON_OPTIONS,
} from '../schedule.constants';

/**
 * @ref https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/cron/index.d.ts
 */
export interface CronOptions {
  /**
   * Specify the name of your cron job. This will allow to inject your cron job reference through `@InjectCronRef`.
   */
  name?: string;

  /**
   * Specify the timezone for the execution. This will modify the actual time relative to your timezone. If the timezone is invalid, an error is thrown. You can check all timezones available at [Moment Timezone Website](http://momentjs.com/timezone/). Probably don't use both ```timeZone``` and ```utcOffset``` together or weird things may happen.
   */
  timeZone?: string;

  /**
   * This allows you to specify the offset of your timezone rather than using the ```timeZone``` param. Probably don't use both ```timeZone``` and ```utcOffset``` together or weird things may happen.
   */
  utcOffset?: string | number;

  /**
   * If you have code that keeps the event loop running and want to stop the node process when that finishes regardless of the state of your cronjob, you can do so making use of this parameter. This is off by default and cron will run as if it needs to control the event loop. For more information take a look at [timers#timers_timeout_unref](https://nodejs.org/api/timers.html#timers_timeout_unref) from the NodeJS docs.
   */
  unrefTimeout?: boolean;

  /**
   * If sets to true, the cron job will be automatically started at appication bootstrap.
   * Otherwise, call job.start() to start it manually.
   */
  autoStart?: boolean;

  /**
   * Namespace of the cron job. Useful for grouping and distinguishing job types or scopes.
   * Default to 'global'
   */
  namespace?: string;
}

/**
 * Creates a scheduled job.
 * @param cronTime The time to fire off your job. This can be in the form of cron syntax or a JS ```Date``` object.
 * @param options Job execution options.
 */
export function Cron(
  cronTime: string | Date,
  options: CronOptions = {},
): MethodDecorator {
  const name = options && options.name;
  options.namespace = options.namespace || 'global';
  return applyDecorators(
    SetMetadata(SCHEDULE_CRON_OPTIONS, {
      ...options,
      cronTime,
    }),
    SetMetadata(SCHEDULER_NAME, name),
    SetMetadata(SCHEDULER_TYPE, SchedulerType.CRON),
  );
}
