// Implementing myCall
Function.prototype.myCall = function(thisContext, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("myCall must be called on a function");
  }

  const key = Symbol();            
  thisContext[key] = this;         

  const result = thisContext[key](...args); 

  delete thisContext[key];         
  return result;
};

// Implementing myApply
Function.prototype.myApply = function(thisContext, args) {
  if (typeof this !== "function") {
    throw new TypeError("myApply must be called on a function");
  }

  const key = Symbol();
  thisContext[key] = this;

  let result;
  if (Array.isArray(args)) {
    result = thisContext[key](...args);
  } else {
    result = thisContext[key](); 
  }

  delete thisContext[key];
  return result;
};

// Implementing myBind
Function.prototype.myBind = function(thisContext, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("myBind must be called on a function");
  }

  const originalFn = this;

  return function(...laterArgs) {
    const key = Symbol();
    thisContext[key] = originalFn;

    const result = thisContext[key](...args, ...laterArgs);

    delete thisContext[key];
    return result;
  };
};

module.exports = Function.prototype;
