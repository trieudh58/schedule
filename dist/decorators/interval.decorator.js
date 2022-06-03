"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const util_1 = require("util");
const scheduler_type_enum_1 = require("../enums/scheduler-type.enum");
const schedule_constants_1 = require("../schedule.constants");
function Interval(nameOrTimeout, timeout) {
    const [name, intervalTimeout] = util_1.isString(nameOrTimeout)
        ? [nameOrTimeout, timeout]
        : [undefined, nameOrTimeout];
    return common_1.applyDecorators(common_1.SetMetadata(schedule_constants_1.SCHEDULE_INTERVAL_OPTIONS, { timeout: intervalTimeout }), common_1.SetMetadata(schedule_constants_1.SCHEDULER_NAME, name), common_1.SetMetadata(schedule_constants_1.SCHEDULER_TYPE, scheduler_type_enum_1.SchedulerType.INTERVAL));
}
exports.Interval = Interval;
