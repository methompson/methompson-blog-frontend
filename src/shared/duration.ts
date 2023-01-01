import { isNumber } from './type_guards';

interface DurationInput {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}

const secondInMs = 1000;
const MinuteInMs = secondInMs * 60;
const hourInMs = MinuteInMs * 60;
const dayInMs = hourInMs * 24;

export class Duration {
  protected _milliseconds: number;

  constructor(input: DurationInput) {
    let milliseconds = 0;

    if (isNumber(input.days)) {
      milliseconds += input.days * dayInMs;
    }
    if (isNumber(input.hours)) {
      milliseconds += input.hours * hourInMs;
    }
    if (isNumber(input.minutes)) {
      milliseconds += input.minutes * MinuteInMs;
    }
    if (isNumber(input.seconds)) {
      milliseconds += input.seconds * secondInMs;
    }
    if (isNumber(input.milliseconds)) {
      milliseconds += input.milliseconds;
    }

    this._milliseconds = milliseconds;
  }

  get inMilliseconds(): number {
    return this._milliseconds;
  }

  get inSeconds(): number {
    return Math.trunc(this._milliseconds / secondInMs);
  }
}