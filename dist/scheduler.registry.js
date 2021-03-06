"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const schedule_messages_1 = require("./schedule.messages");
let SchedulerRegistry = class SchedulerRegistry {
    constructor() {
        this.cronJobs = new Map();
        this.cronJobNamespaces = new Map();
        this.timeouts = new Map();
        this.intervals = new Map();
    }
    runAllCronJobs(namespace = 'global') {
        const allJobs = this.getCronJobs();
        allJobs.forEach((job, jobName) => {
            if (this.cronJobNamespaces.get(jobName) === namespace) {
                job.start();
            }
        });
    }
    stopAllCronJobs(namespace = 'global') {
        const allJobs = this.getCronJobs();
        allJobs.forEach((job, jobName) => {
            if (this.cronJobNamespaces.get(jobName) === namespace) {
                job.stop();
            }
        });
    }
    getCronJobNames(namespace = 'global') {
        const names = [];
        this.cronJobNamespaces.forEach((v, k) => {
            if (v === namespace) {
                names.push(k);
            }
        });
        return names;
    }
    getCronJob(name) {
        const ref = this.cronJobs.get(name);
        if (!ref) {
            throw new Error(schedule_messages_1.NO_SCHEDULER_FOUND('Cron Job', name));
        }
        return ref;
    }
    getInterval(name) {
        const ref = this.intervals.get(name);
        if (typeof ref === 'undefined') {
            throw new Error(schedule_messages_1.NO_SCHEDULER_FOUND('Interval', name));
        }
        return ref;
    }
    getTimeout(name) {
        const ref = this.timeouts.get(name);
        if (typeof ref === 'undefined') {
            throw new Error(schedule_messages_1.NO_SCHEDULER_FOUND('Timeout', name));
        }
        return ref;
    }
    addCronJob(name, job, namespace = 'global') {
        const ref = this.cronJobs.get(name);
        if (ref) {
            throw new Error(schedule_messages_1.DUPLICATE_SCHEDULER('Cron Job', name));
        }
        this.cronJobs.set(name, job);
        this.cronJobNamespaces.set(name, namespace);
    }
    addInterval(name, intervalId) {
        const ref = this.intervals.get(name);
        if (ref) {
            throw new Error(schedule_messages_1.DUPLICATE_SCHEDULER('Interval', name));
        }
        this.intervals.set(name, intervalId);
    }
    addTimeout(name, timeoutId) {
        const ref = this.timeouts.get(name);
        if (ref) {
            throw new Error(schedule_messages_1.DUPLICATE_SCHEDULER('Timeout', name));
        }
        this.timeouts.set(name, timeoutId);
    }
    getCronJobs() {
        return this.cronJobs;
    }
    deleteCronJob(name) {
        const cronJob = this.getCronJob(name);
        cronJob.stop();
        this.cronJobs.delete(name);
        this.cronJobNamespaces.delete(name);
    }
    getIntervals() {
        return [...this.intervals.keys()];
    }
    deleteInterval(name) {
        const interval = this.getInterval(name);
        clearInterval(interval);
        this.intervals.delete(name);
    }
    getTimeouts() {
        return [...this.timeouts.keys()];
    }
    deleteTimeout(name) {
        const timeout = this.getTimeout(name);
        clearTimeout(timeout);
        this.timeouts.delete(name);
    }
};
SchedulerRegistry = __decorate([
    common_1.Injectable()
], SchedulerRegistry);
exports.SchedulerRegistry = SchedulerRegistry;
