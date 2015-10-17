"use strict";

class Type {
  constructor(decl, env, name) {
    this.decl = decl;
    this.env = env;
    this.name = name; // may be undefined
  }
  getName() {
    if (this.name === undefined) {
      return undefined;
    } else {
      return this.name.value;
    }
  }

}

module.exports = Type;