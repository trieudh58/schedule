export interface CronOptions {
  name?: string;
  timeZone?: string;
  utcOffset?: string | number;
  unrefTimeout?: boolean;
  autoStart?: boolean;
  namespace?: string;
}
export declare function Cron(
  cronTime: string | Date,
  options?: CronOptions,
): MethodDecorator;
