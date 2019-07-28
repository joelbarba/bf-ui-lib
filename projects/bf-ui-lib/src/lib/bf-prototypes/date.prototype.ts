declare global {
  interface Date {
    toUTC(): Date;
    truncMin(): Date;
    truncHour(): Date;
    truncDay(): Date;
    addSeconds(seconds: number): Date;
    addMinutes(minutes: number): Date;
    addHours(hours: number): Date;
    addDays(days: number): Date;
    addMonths(months: number): Date;
    addYears(years: number): Date;
  }
}

const BfDate: any = {}; // Wrap all functions here



/**
 * @function toUTC
 * @memberOf Date
 * @description Convert the time, whatever its timezone is, to UTC
 * @example dateVar.toUTC()
 */
BfDate.toUTC = function() {
  let utcTime = new Date(this);
  BfDate.addMinutes.call(utcTime, utcTime.getTimezoneOffset());   // getTimezoneOffset returns the difference in seconds
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
  return utcTime;
};

/**
 * @function convertTZ
 * @description Convert the time from one timezone to another
 * @example dateVar.convertTZ(BfTime.sysTimezone(), 'America/New_York')
 */
// TODO: Implement it (without moment)
// BfDate.convertTZ = function(oriTZ, desTZ?) {
//   return BfTime.convertDateTZ(this, oriTZ, desTZ);
// };
// BfTime.convertDateTZ = (oriDate, oriTZ, desTZ?) => {
//   var strOriDate = BfTime.JStoAPITime(oriDate);       // Convert to string "YYYY-MM-DD HH:mm:ss"
//   var oriMomentDate = moment.tz(strOriDate, oriTZ);   // Convert to a moment date on original timezone
//
//   if (!!desTZ) {
//     return new Date(oriMomentDate.tz(desTZ).format('YYYY-MM-DD HH:mm:ss'));
//   } else {
//     return new Date(oriMomentDate.tz('UTC').format('YYYY-MM-DD HH:mm:ss'));
//   }
// };


/**
 * @function truncMin
 * @memberOf Date
 * @description Truncate the current date to minutes
 * @example strDate.truncMin()
 */
BfDate.truncMin = function() {
  this.setMilliseconds(0);
  this.setSeconds(0);
  return this;
};

/**
 * @function truncHour
 * @memberOf Date
 * @description Truncate the current date to day-month-year hour
 * @example strDate.truncHour()
 */
BfDate.truncHour = function() {
  this.setMilliseconds(0);
  this.setSeconds(0);
  this.setMinutes(0);
  return this;
};

/**
 * @function truncDay
 * @memberOf Date
 * @description Truncate the current date to day-month-year
 * @example strDate.truncDay()
 */
BfDate.truncDay = function() {
  this.setMilliseconds(0);
  this.setSeconds(0);
  this.setMinutes(0);
  this.setHours(0);
  return this;
};


/**
 * @function addSeconds
 * @memberOf Date
 * @description Add seconds to the current date
 * @example myDate.addSeconds(20)
 */
BfDate.addSeconds = function(seconds: number) {
  this.setSeconds(this.getSeconds() + seconds);
  return this;
};

/**
 * @function addMinutes
 * @memberOf Date
 * @description Add minutes to the current date
 * @example myDate.addMinutes(20)
 */
BfDate.addMinutes = function(minutes: number) {
  this.setMinutes(this.getMinutes() + minutes);
  return this;
};

/**
 * @function addHours
 * @memberOf Date
 * @description Add hours to the current date
 * @example myDate.addHours(20)
 */
BfDate.addHours = function(hours:number) {
  this.setHours(this.getHours() + hours);
  return this;
};

/**
 * @function addDays
 * @memberOf Date
 * @description Add days to the current date
 * @example addDays.addDays(20)
 */
BfDate.addDays = function(days:number) {
  this.setDate(this.getDate() + days);
  return this;
};

/**
 * @function addMonths
 * @memberOf Date
 * @description Add hours to the current date
 * @example myDate.addMonths(20)
 */
BfDate.addMonths = function(months:number) {
  this.setMonth(this.getMonth() + months);
  return this;
};

/**
 * @function addYears
 * @memberOf Date
 * @description Add years to the current date
 * @example myDate.addYears(20)
 */
BfDate.addYears = function(years: number) {
  this.setFullYear(this.getFullYear() + years);
  return this;
};


export default BfDate;
