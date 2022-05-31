import { isNumber } from './type_guards';

interface DurationInput {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}

const msInSecond = 1000;
const msInMinute = msInSecond * 60;
const msInHour = msInMinute * 60;
const msInDay = msInHour * 24;

export class Duration {
  protected _milliseconds: number;

  constructor(input: DurationInput) {
    let milliseconds = 0;

    if (isNumber(input.days)) {
      milliseconds += input.days * msInDay;
    }
    if (isNumber(input.hours)) {
      milliseconds += input.hours * msInHour;
    }
    if (isNumber(input.minutes)) {
      milliseconds += input.minutes * msInMinute;
    }
    if (isNumber(input.seconds)) {
      milliseconds += input.seconds * msInSecond;
    }
    if (isNumber(input.milliseconds)) {
      milliseconds += input.milliseconds;
    }

    this._milliseconds = milliseconds;
  }

  get inMilliseconds() {
    return this._milliseconds;
  }
}