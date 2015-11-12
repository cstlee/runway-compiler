"use strict";

let errors = require('../errors.js');
let Type = require('./type.js');
let Value = require('./value.js');
let NumberValue = require('./number.js').Value;

class RangeValue extends Value {

  constructor(type) {
    super(type);
    this.value = this.type.low;
  }

  assign(newValue) {
    if (typeof newValue == 'number') {
      if (newValue < this.type.low || newValue > this.type.high) {
        throw new errors.Bounds(`Cannot assign value of ${newValue} to range ${this.type.getName()}: ${this.type.low}..${this.type.high};`);
      }
      this.value = newValue;
    } else if (newValue instanceof NumberValue) {
      return this.assign(newValue.value);
    } else if (newValue instanceof RangeValue) {
      return this.assign(newValue.value);
    } else {
      throw new errors.Internal(`Trying to assign ${newValue.type.toString()} to range ${this.type.getName()}: ${this.type.low}..${this.type.high};`);
    }
  }

  equals(other) {
    if (typeof other == 'number') {
      return this.value == other;
    } else if (other instanceof RangeValue) {
      return this.value == other.value;
    } else {
      throw new errors.Internal(`Trying to compare ${other.type} to range ${this.type.getName()}: ${this.type.low}..${this.type.high};`);
    }
  }

  innerToString() {
    return `${this.value}`;
  }

  toString() {
    return `${this.value}`;
  }
}

class RangeType extends Type {
  constructor(decl, env, name) {
    super(decl, env, name);
    this.low = this.decl.low.value;
    this.high = this.decl.high.value;
  }
  makeDefaultValue() {
    return new RangeValue(this);
  }
  toString() {
    let name = this.getName();
    if (name !== undefined) {
      return name;
    }
    return `${this.low}..${this.high}`;
  }
}

module.exports = {
  Type: RangeType,
  Value: RangeValue,
};
