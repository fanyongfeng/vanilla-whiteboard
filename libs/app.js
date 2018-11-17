var app = (function (exports) {
  'use strict';

  var _iterStep = function (done, value) {
    return { value: value, done: !!done };
  };

  var _iterators = {};

  var toString = {}.toString;

  var _cof = function (it) {
    return toString.call(it).slice(8, -1);
  };

  // fallback for non-array-like ES3 and non-enumerable old V8 strings

  // eslint-disable-next-line no-prototype-builtins
  var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
    return _cof(it) == 'String' ? it.split('') : Object(it);
  };

  // 7.2.1 RequireObjectCoercible(argument)
  var _defined = function (it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };

  // to indexed object, toObject with fallback for non-array-like ES3 strings


  var _toIobject = function (it) {
    return _iobject(_defined(it));
  };

  var _library = true;

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _global = createCommonjsModule(function (module) {
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math
    ? window : typeof self != 'undefined' && self.Math == Math ? self
    // eslint-disable-next-line no-new-func
    : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
  });

  var _core = createCommonjsModule(function (module) {
  var core = module.exports = { version: '2.5.7' };
  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
  });
  var _core_1 = _core.version;

  var _aFunction = function (it) {
    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
    return it;
  };

  // optional / simple context binding

  var _ctx = function (fn, that, length) {
    _aFunction(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var _isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var _anObject = function (it) {
    if (!_isObject(it)) throw TypeError(it + ' is not an object!');
    return it;
  };

  var _fails = function (exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var _descriptors = !_fails(function () {
    return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
  });

  var document$1 = _global.document;
  // typeof document.createElement is 'object' in old IE
  var is = _isObject(document$1) && _isObject(document$1.createElement);
  var _domCreate = function (it) {
    return is ? document$1.createElement(it) : {};
  };

  var _ie8DomDefine = !_descriptors && !_fails(function () {
    return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
  });

  // 7.1.1 ToPrimitive(input [, PreferredType])

  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var _toPrimitive = function (it, S) {
    if (!_isObject(it)) return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var dP = Object.defineProperty;

  var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
    _anObject(O);
    P = _toPrimitive(P, true);
    _anObject(Attributes);
    if (_ie8DomDefine) try {
      return dP(O, P, Attributes);
    } catch (e) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var _objectDp = {
  	f: f
  };

  var _propertyDesc = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var _hide = _descriptors ? function (object, key, value) {
    return _objectDp.f(object, key, _propertyDesc(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var hasOwnProperty = {}.hasOwnProperty;
  var _has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var PROTOTYPE = 'prototype';

  var $export = function (type, name, source) {
    var IS_FORCED = type & $export.F;
    var IS_GLOBAL = type & $export.G;
    var IS_STATIC = type & $export.S;
    var IS_PROTO = type & $export.P;
    var IS_BIND = type & $export.B;
    var IS_WRAP = type & $export.W;
    var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
    var expProto = exports[PROTOTYPE];
    var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
    var key, own, out;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      // contains in native
      own = !IS_FORCED && target && target[key] !== undefined;
      if (own && _has(exports, key)) continue;
      // export native or passed
      out = own ? target[key] : source[key];
      // prevent global pollution for namespaces
      exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
      // bind timers to global for call from export context
      : IS_BIND && own ? _ctx(out, _global)
      // wrap global constructors for prevent change them in library
      : IS_WRAP && target[key] == out ? (function (C) {
        var F = function (a, b, c) {
          if (this instanceof C) {
            switch (arguments.length) {
              case 0: return new C();
              case 1: return new C(a);
              case 2: return new C(a, b);
            } return new C(a, b, c);
          } return C.apply(this, arguments);
        };
        F[PROTOTYPE] = C[PROTOTYPE];
        return F;
      // make static versions for prototype methods
      })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
      // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
      if (IS_PROTO) {
        (exports.virtual || (exports.virtual = {}))[key] = out;
        // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
        if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
      }
    }
  };
  // type bitmap
  $export.F = 1;   // forced
  $export.G = 2;   // global
  $export.S = 4;   // static
  $export.P = 8;   // proto
  $export.B = 16;  // bind
  $export.W = 32;  // wrap
  $export.U = 64;  // safe
  $export.R = 128; // real proto method for `library`
  var _export = $export;

  var _redefine = _hide;

  // 7.1.4 ToInteger
  var ceil = Math.ceil;
  var floor = Math.floor;
  var _toInteger = function (it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  };

  // 7.1.15 ToLength

  var min = Math.min;
  var _toLength = function (it) {
    return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  };

  var max = Math.max;
  var min$1 = Math.min;
  var _toAbsoluteIndex = function (index, length) {
    index = _toInteger(index);
    return index < 0 ? max(index + length, 0) : min$1(index, length);
  };

  // false -> Array#indexOf
  // true  -> Array#includes



  var _arrayIncludes = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = _toIobject($this);
      var length = _toLength(O.length);
      var index = _toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var _shared = createCommonjsModule(function (module) {
  var SHARED = '__core-js_shared__';
  var store = _global[SHARED] || (_global[SHARED] = {});

  (module.exports = function (key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: _core.version,
    mode: 'pure',
    copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
  });
  });

  var id = 0;
  var px = Math.random();
  var _uid = function (key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };

  var shared = _shared('keys');

  var _sharedKey = function (key) {
    return shared[key] || (shared[key] = _uid(key));
  };

  var arrayIndexOf = _arrayIncludes(false);
  var IE_PROTO = _sharedKey('IE_PROTO');

  var _objectKeysInternal = function (object, names) {
    var O = _toIobject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (_has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
    return result;
  };

  // IE 8- don't enum bug keys
  var _enumBugKeys = (
    'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
  ).split(',');

  // 19.1.2.14 / 15.2.3.14 Object.keys(O)



  var _objectKeys = Object.keys || function keys(O) {
    return _objectKeysInternal(O, _enumBugKeys);
  };

  var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    _anObject(O);
    var keys = _objectKeys(Properties);
    var length = keys.length;
    var i = 0;
    var P;
    while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
    return O;
  };

  var document$2 = _global.document;
  var _html = document$2 && document$2.documentElement;

  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



  var IE_PROTO$1 = _sharedKey('IE_PROTO');
  var Empty = function () { /* empty */ };
  var PROTOTYPE$1 = 'prototype';

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var createDict = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = _domCreate('iframe');
    var i = _enumBugKeys.length;
    var lt = '<';
    var gt = '>';
    var iframeDocument;
    iframe.style.display = 'none';
    _html.appendChild(iframe);
    iframe.src = 'javascript:'; // eslint-disable-line no-script-url
    // createDict = iframe.contentWindow.Object;
    // html.removeChild(iframe);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
    return createDict();
  };

  var _objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      Empty[PROTOTYPE$1] = _anObject(O);
      result = new Empty();
      Empty[PROTOTYPE$1] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = createDict();
    return Properties === undefined ? result : _objectDps(result, Properties);
  };

  var _wks = createCommonjsModule(function (module) {
  var store = _shared('wks');

  var Symbol = _global.Symbol;
  var USE_SYMBOL = typeof Symbol == 'function';

  var $exports = module.exports = function (name) {
    return store[name] || (store[name] =
      USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
  };

  $exports.store = store;
  });

  var def = _objectDp.f;

  var TAG = _wks('toStringTag');

  var _setToStringTag = function (it, tag, stat) {
    if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
  };

  var IteratorPrototype = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  _hide(IteratorPrototype, _wks('iterator'), function () { return this; });

  var _iterCreate = function (Constructor, NAME, next) {
    Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
    _setToStringTag(Constructor, NAME + ' Iterator');
  };

  // 7.1.13 ToObject(argument)

  var _toObject = function (it) {
    return Object(_defined(it));
  };

  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


  var IE_PROTO$2 = _sharedKey('IE_PROTO');
  var ObjectProto = Object.prototype;

  var _objectGpo = Object.getPrototypeOf || function (O) {
    O = _toObject(O);
    if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectProto : null;
  };

  var ITERATOR = _wks('iterator');
  var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
  var FF_ITERATOR = '@@iterator';
  var KEYS = 'keys';
  var VALUES = 'values';

  var returnThis = function () { return this; };

  var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    _iterCreate(Constructor, NAME, next);
    var getMethod = function (kind) {
      if (!BUGGY && kind in proto) return proto[kind];
      switch (kind) {
        case KEYS: return function keys() { return new Constructor(this, kind); };
        case VALUES: return function values() { return new Constructor(this, kind); };
      } return function entries() { return new Constructor(this, kind); };
    };
    var TAG = NAME + ' Iterator';
    var DEF_VALUES = DEFAULT == VALUES;
    var VALUES_BUG = false;
    var proto = Base.prototype;
    var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
    var $default = $native || getMethod(DEFAULT);
    var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
    var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
    var methods, key, IteratorPrototype;
    // Fix native
    if ($anyNative) {
      IteratorPrototype = _objectGpo($anyNative.call(new Base()));
      if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
        // Set @@toStringTag to native iterators
        _setToStringTag(IteratorPrototype, TAG, true);
        // fix for some old engines
        if (!_library && typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
      }
    }
    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEF_VALUES && $native && $native.name !== VALUES) {
      VALUES_BUG = true;
      $default = function values() { return $native.call(this); };
    }
    // Define iterator
    if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
      _hide(proto, ITERATOR, $default);
    }
    // Plug for library
    _iterators[NAME] = $default;
    _iterators[TAG] = returnThis;
    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES),
        keys: IS_SET ? $default : getMethod(KEYS),
        entries: $entries
      };
      if (FORCED) for (key in methods) {
        if (!(key in proto)) _redefine(proto, key, methods[key]);
      } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
    }
    return methods;
  };

  // 22.1.3.4 Array.prototype.entries()
  // 22.1.3.13 Array.prototype.keys()
  // 22.1.3.29 Array.prototype.values()
  // 22.1.3.30 Array.prototype[@@iterator]()
  var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
    this._t = _toIobject(iterated); // target
    this._i = 0;                   // next index
    this._k = kind;                // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
  }, function () {
    var O = this._t;
    var kind = this._k;
    var index = this._i++;
    if (!O || index >= O.length) {
      this._t = undefined;
      return _iterStep(1);
    }
    if (kind == 'keys') return _iterStep(0, index);
    if (kind == 'values') return _iterStep(0, O[index]);
    return _iterStep(0, [index, O[index]]);
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
  _iterators.Arguments = _iterators.Array;

  var TO_STRING_TAG = _wks('toStringTag');

  var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
    'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
    'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
    'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
    'TextTrackList,TouchList').split(',');

  for (var i = 0; i < DOMIterables.length; i++) {
    var NAME = DOMIterables[i];
    var Collection = _global[NAME];
    var proto = Collection && Collection.prototype;
    if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
    _iterators[NAME] = _iterators.Array;
  }

  // true  -> String#at
  // false -> String#codePointAt
  var _stringAt = function (TO_STRING) {
    return function (that, pos) {
      var s = String(_defined(that));
      var i = _toInteger(pos);
      var l = s.length;
      var a, b;
      if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
        ? TO_STRING ? s.charAt(i) : a
        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };

  var $at = _stringAt(true);

  // 21.1.3.27 String.prototype[@@iterator]()
  _iterDefine(String, 'String', function (iterated) {
    this._t = String(iterated); // target
    this._i = 0;                // next index
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
  }, function () {
    var O = this._t;
    var index = this._i;
    var point;
    if (index >= O.length) return { value: undefined, done: true };
    point = $at(O, index);
    this._i += point.length;
    return { value: point, done: false };
  });

  // getting tag from 19.1.3.6 Object.prototype.toString()

  var TAG$1 = _wks('toStringTag');
  // ES3 wrong here
  var ARG = _cof(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (e) { /* empty */ }
  };

  var _classof = function (it) {
    var O, T, B;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
      // builtinTag case
      : ARG ? _cof(O)
      // ES3 arguments fallback
      : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
  };

  var ITERATOR$1 = _wks('iterator');

  var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
    if (it != undefined) return it[ITERATOR$1]
      || it['@@iterator']
      || _iterators[_classof(it)];
  };

  var core_getIterator = _core.getIterator = function (it) {
    var iterFn = core_getIteratorMethod(it);
    if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
    return _anObject(iterFn.call(it));
  };

  // 20.1.2.1 Number.EPSILON


  _export(_export.S, 'Number', { EPSILON: Math.pow(2, -52) });

  var epsilon2 = 1e-12;

  var pi = Math.PI;
  var pow = Math.pow;
  var max$1 = Math.max;
  var min$2 = Math.min;
  function acos(x) {
    return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
  }
  function isZero(val) {
    return val >= -epsilon2 && val <= epsilon2;
  }

  /**
   * The base type of graphic ,(location & vector)
   */
  var Point = /** @class */ (function () {
      /**
       * Create Point with x, y
       *
       * @param x
       * @param y
       */
      function Point(x, y) {
          if (x === void 0) { x = 0; }
          if (y === void 0) { y = 0; }
          this.x = 0;
          this.y = 0;
          this.x = x;
          this.y = y;
      }
      /**
       * static method to create instance from params
       */
      Point.instantiate = function (x, y) {
          if (typeof x === 'undefined')
              throw TypeError('Invalid arguments!');
          if (typeof x === 'number') {
              return typeof y === 'number' ? new Point(x, y) : new Point(x, x);
          }
          // if x is Point
          return x.clone();
      };
      /**
       * 返回是否小于极小值
       */
      Point.prototype.isZero = function () {
          return isZero(this.x) && isZero(this.y);
      };
      Point.prototype.add = function (x, y) {
          var point = Point.instantiate(x, y);
          return new Point(this.x + point.x, this.y + point.y);
      };
      /**
       * Returns the multiplication of the supplied point to the point as a new
       * point.
       * The object itself is not modified!
       */
      Point.prototype.multiply = function (x, y) {
          var point = Point.instantiate(x, y);
          return new Point(this.x * point.x, this.y * point.y);
      };
      /**
       * Returns the subtraction of the supplied value to both coordinates of
       * the point as a new point.
       * The object itself is not modified!
       */
      Point.prototype.subtract = function (x, y) {
          var point = Point.instantiate(x, y);
          return new Point(this.x - point.x, this.y - point.y);
      };
      /**
       * Returns the division of the supplied value to both coordinates of
       * the point as a new point.
       * The object itself is not modified!
       */
      Point.prototype.divide = function (x, y) {
          var point = Point.instantiate(x, y);
          return new Point(this.x / point.x, this.y / point.y);
      };
      /**
       * Transforms the point by the matrix as a new point. The object itself is
       * not modified!
       *
       * @param matrix
       */
      Point.prototype.transform = function (matrix) {
          matrix.applyToPoint(this);
          return this;
      };
      /**
       * Add and return this
       * @param other
       */
      Point.prototype.addEquals = function (other) {
          this.x += other.x;
          this.y += other.y;
          return this;
      };
      /**
       * Assign x, y from other point.
       * @param {*} point
       */
      Point.prototype.assign = function (point) {
          this.x = point.x;
          this.y = point.y;
          return this;
      };
      /**
       * If the point coord is equal to the other point.
       * @param other
       */
      Point.prototype.equals = function (other) {
          return this === other || (this.x === other.x && this.y === other.y);
      };
      /**
       * Returns new point which is the result of linear interpolation with this one and another one
       * @param  other
       * @param time , position of interpolation, between 0 and 1 default 0.5
       */
      Point.prototype.lerp = function (other, time) {
          if (time === void 0) { time = 0.5; }
          if (time > 1 || time < 0)
              throw new TypeError("Param 'Time' must between 0 and 1;");
          time = Math.max(Math.min(1, time), 0);
          return new Point(this.x + (other.x - this.x) * time, this.y + (other.y - this.y) * time);
      };
      /**
       * Returns the point between this point and another one
       * @param other
       */
      Point.prototype.midPointFrom = function (other) {
          return this.lerp(other);
      };
      /**
       * Returns distance from other point.
       * @param other
       */
      Point.prototype.getDistance = function (other) {
          var dx = this.x - other.x, dy = this.y - other.y;
          return Math.sqrt(dx * dx + dy * dy);
      };
      /**
       *
       * @param point
       * @param threshold
       */
      Point.prototype.nearby = function (point, threshold) {
          if (threshold === void 0) { threshold = 4; }
          return this.getDistance(point) < threshold;
      };
      /**
       * negate point & return a new point.
       */
      Point.prototype.negate = function () {
          return new Point(-this.x, -this.y);
      };
      Object.defineProperty(Point.prototype, "length", {
          /**
           * get the length of point from (0,0);
           */
          get: function () {
              return Math.sqrt(this.x * this.x + this.y * this.y);
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Point.prototype, "angle", {
          /**
           * Get Angle In Radians, Vector
           */
          get: function () {
              if (!this.length)
                  return 0;
              return Math.atan2(this.y, this.x);
          },
          enumerable: true,
          configurable: true
      });
      /**
       * Rotates the point by the given angle around an optional center point.
       * The object itself is not modified.
       *
       * Read more about angle units and orientation in the description of the
       * {@link #angle} property.
       *
       * @param angle the rotation angle
       * @param center the center point of the rotation
       */
      Point.prototype.rotate = function (angle, center) {
          if (angle === 0)
              return this.clone();
          angle = (angle * Math.PI) / 180;
          var point = center ? this.subtract(center.x, center.y) : this, sin$$1 = Math.sin(angle), cos$$1 = Math.cos(angle);
          point = new Point(point.x * cos$$1 - point.y * sin$$1, point.x * sin$$1 + point.y * cos$$1);
          return center ? point.add(center) : point;
      };
      /**
       * Normalize modifies the {@link #length} of the vector to `1` without
       * changing its angle and returns it as a new point. The optional `length`
       * parameter defines the length to normalize to. The object itself is not
       * modified!
       *
       * @param [length=1] The length of the normalized vector
       * @return the normalized vector of the vector that is represented
       *     by this point's coordinates
       */
      Point.prototype.normalize = function (length) {
          if (length === void 0) { length = 1; }
          var current = this.length, scale = current !== 0 ? length / current : 0;
          return new Point(this.x * scale, this.y * scale);
      };
      /**
       * {@group-title Vector Math Functions}
       * Returns the dot product of the point and another point.
       *
       * @param point
       * @return the dot product of the two points
       */
      Point.prototype.dot = function (point) {
          return this.x * point.x + this.y * point.y;
      };
      /**
       * return a cloned instance of the point
       */
      Point.prototype.clone = function () {
          return new Point(this.x, this.y);
      };
      /**
       * return point data as JSON-format: [x, y]
       */
      Point.prototype.toJSON = function (precision) {
          if (precision === void 0) { precision = -1; }
          if (precision === -1)
              return [this.x, this.y];
          var multiplier = Math.pow(10, precision);
          return [Math.round(this.x * multiplier) / multiplier, Math.round(this.y * multiplier) / multiplier];
      };
      /**
       * return point data as String-format
       */
      Point.prototype.toString = function () {
          return '{ x: ' + this.x + ', y: ' + this.y + ' }';
      };
      return Point;
  }());
  //# sourceMappingURL=Point.js.map

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */
  /* global Reflect, Promise */

  var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return extendStatics(d, b);
  };

  function __extends(d, b) {
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  var __assign = function() {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };

  function __rest(s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
              t[p[i]] = s[p[i]];
      return t;
  }

  function __decorate(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
  }

  function __generator(thisArg, body) {
      var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
      function verb(n) { return function (v) { return step([n, v]); }; }
      function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_) try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
              if (y = 0, t) op = [op[0] & 2, t.value];
              switch (op[0]) {
                  case 0: case 1: t = op; break;
                  case 4: _.label++; return { value: op[1], done: false };
                  case 5: _.label++; y = op[1]; op = [0]; continue;
                  case 7: op = _.ops.pop(); _.trys.pop(); continue;
                  default:
                      if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                      if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                      if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                      if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                      if (t[2]) _.ops.pop();
                      _.trys.pop(); continue;
              }
              op = body.call(thisArg, _);
          } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
          if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
      }
  }

  function __values(o) {
      var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
      if (m) return m.call(o);
      return {
          next: function () {
              if (o && i >= o.length) o = void 0;
              return { value: o && o[i++], done: !o };
          }
      };
  }

  function __read(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      }
      catch (error) { e = { error: error }; }
      finally {
          try {
              if (r && !r.done && (m = i["return"])) m.call(i);
          }
          finally { if (e) throw e.error; }
      }
      return ar;
  }

  function __spread() {
      for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read(arguments[i]));
      return ar;
  }

  /**
   * 处理矩形各个控制点逻辑
   * 1）返回矩形各个控制点的getter, setter
   * 2) 返回各控制点的逻辑
   * 3）返回各控制点名字和反向点名字，并排序
   */

  var horizontal = ['right', 'centerX', 'left']; // order sensitive
  // y方向，对应坐标 -1, 0, 1

  var vertical = ['bottom', 'centerY', 'top']; // order sensitive

  /**
   * 首字幕大写
   * @param { } str
   */

  var capitalize = function capitalize(str) {
    return str.replace(/\b[a-z]/g, function (match) {
      return match.toUpperCase();
    });
  };
  /**
   * 获取属性名
   * @param {*} indexY
   * @param {*} indexX
   */


  var getDirection = function getDirection(indexY, indexX) {
    // 将centerX, centerY, 简写为center。
    if (indexY === 0) {
      if (indexX === 0) return 'center';
      return horizontal[indexX + 1] + 'Center';
    }

    if (indexX === 0) {
      return vertical[indexY + 1] + 'Center';
    }

    return vertical[indexY + 1] + capitalize(horizontal[indexX + 1]);
  };
  /**
   * Cross product
   * @param {Array} a1
   * @param {Array} a2
   * @param {Function} itor
   */


  var cross = function cross(a1, a2, itor) {
    a1.forEach(function (i1, i1Idx) {
      a2.forEach(function (i2, i2Idx) {
        itor.apply(null, [i1, i2, i1Idx - 1, i2Idx - 1]);
      });
    });
  }; //export constants


  var boundsPoi = [];
  var antiDir = {};
  var props = {}; //set to rect prototype

  (function () {
    var _tempBounds = []; //控制点临时数组

    cross(horizontal, vertical, function (x, y, coordX, coordY) {
      var dir = getDirection(coordY, coordX);
      var anti = getDirection(-coordY, -coordX);
      var vector = new Point(coordX, coordY);

      _tempBounds.push({
        x: x,
        y: y,
        dir: dir,
        anti: anti,
        vector: vector
      });
    }); //控制点按矢量进行排序，确保顺时针

    _tempBounds.sort(function (l, r) {
      return l.vector.angle > r.vector.angle ? -1 : 1;
    });

    _tempBounds.forEach(function (_ref) {
      var x = _ref.x,
          y = _ref.y,
          dir = _ref.dir,
          anti = _ref.anti,
          vector = _ref.vector;
      props[dir] = {
        get: function get() {
          return new Point(this[x], this[y]);
        },
        set: function set(point) {
          this[x] = point.x;
          this[y] = point.y;
          return this;
        },
        enumerable: true,
        configurable: true
      };
      if (vector.isZero()) return; // ignore center.

      boundsPoi.push(dir);
      antiDir[dir] = anti;
    });
  })();

  var cursorMap = {
    topLeft: 'nw-resize',
    topCenter: 'n-resize',
    topRight: 'ne-resize',
    rightCenter: 'e-resize',
    bottomRight: 'se-resize',
    bottomCenter: 's-resize',
    bottomLeft: 'sw-resize',
    leftCenter: 'w-resize'
  };

  function assign(target, frm) {
      return Object.assign(target, frm);
  }
  /**
   * Mixins an object into the classes prototype.
   *
   * @export
   * @param {...Object[]} srcs
   * @returns {ClassDecorator}
   * @example
   *
   * const myMixin = {
   *   blorg: () => 'blorg!'
   * }
   *
   * @Mixin(myMixin)
   * class MyClass {}
   *
   * const myClass = new MyClass();
   *
   * myClass.blorg(); // => 'blorg!'
   *
   */
  function mixin(srcs) {
      return function (target) {
          assign(target.prototype, srcs);
          return target;
      };
  }
  /**
   * 组合两个function
   * @param {Object} proto, prototype of class.
   * @param {String} name 名字
   * @param {Function} fn 带绑定的function
   */
  var combineFnToProto = function combineFnToProto(proto, name, fn) {
      var origin = proto[name];
      if (typeof origin === 'undefined') {
          proto[name] = fn;
          return fn;
      }
      if (typeof origin !== 'function')
          throw new TypeError(name + " already exist!");
      proto[name] = function () {
          //call origin function first,
          if (origin.apply(this, arguments) !== false) {
              // cancel second fn call, if origin function return 'false'.
              return fn.apply(this, arguments);
          }
          return false;
      };
      return proto[name];
  };
  /**
   * Deep mixins an object into the classes prototype.
   */
  function deepMixin(srcs) {
      return function (target) {
          for (var key in srcs) {
              var descriptor = Object.getOwnPropertyDescriptor(srcs, key);
              if (!descriptor)
                  continue;
              if (typeof descriptor.value === 'function') {
                  // if is function, combine with old function.
                  combineFnToProto(target.prototype, key, descriptor.value);
              }
              else if (typeof descriptor.get === 'function' || typeof descriptor.set === 'function') {
                  //@ts-ignore
                  {
                      target.prototype[key] && console.warn(target.name + "." + key + " already exist!");
                  }
                  // if is getter & setter, set descriptor to prototype.
                  Object.defineProperty(target.prototype, key, descriptor);
              }
              else {
                  //@ts-ignore
                  {
                      target.prototype[key] && console.warn(target.name + "." + key + " already exist!");
                  }
                  // if is other types, just overwrite
                  target.prototype[key] = descriptor.value;
              }
          }
          return target;
      };
  }
  /**
   *
   * Mixins property into the classes prototype.
   * @param {Map} props
   */
  function mixinProps(props) {
      //Object.defineProperty
      return function (target) {
          for (var key in props) {
              Object.defineProperty(target.prototype, key, props[key]);
          }
          return target;
      };
  }
  //# sourceMappingURL=mixin.js.map

  /**
   *  Type Rect
   */
  var Rect = /** @class */ (function () {
      function Rect(x, y, width, height, owner) {
          this.x = 0;
          this.y = 0;
          this.width = 0;
          this.height = 0;
          this.x = x;
          this.y = y;
          this.width = width;
          this.height = height;
          this.owner = owner || null;
          this.center = Point.instantiate(this.centerX, this.centerY);
      }
      Rect_1 = Rect;
      /**
       * static method to create instance from params
       */
      Rect.instantiate = function (x, y, width, height) {
          if (typeof x === 'undefined')
              throw TypeError('Invalid arguments!');
          return new Rect_1(x, y, width, height);
          // if x is Rect
          // return x.clone();
      };
      /**
       * Assign x, y, width, height from other rect.
       * @param rect
       */
      Rect.prototype.assign = function (x, y, width, height) {
          var rect = Rect_1.instantiate(x, y, width, height);
          this.x = rect.x;
          this.y = rect.y;
          this.width = rect.width;
          this.height = rect.height;
      };
      Object.defineProperty(Rect.prototype, "top", {
          /** The coordinate of the top, left, right, bottom. */
          /**
           * The coordinate of the top.
           *
           * @type Number
           *
           */
          get: function () {
              return this.y;
          },
          set: function (top) {
              this.y = top;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Rect.prototype, "left", {
          /**
           * The coordinate of the left.
           *
           * @type Number
           *
           */
          get: function () {
              return this.x;
          },
          set: function (left) {
              this.x = left;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Rect.prototype, "bottom", {
          /**
           * The coordinate of bottom, getter && setter
           *
           * @type Number
           *
           */
          get: function () {
              return this.y + this.height;
          },
          set: function (bottom) {
              this.y = bottom - this.height;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Rect.prototype, "right", {
          /**
           * The coordinate of right, getter && setter
           *
           * @type Number
           */
          get: function () {
              return this.x + this.width;
          },
          set: function (right) {
              this.x = right - this.width;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Rect.prototype, "centerX", {
          /**
           * The center-x coordinate of the rectangle.
           *
           * @type Number
           */
          get: function () {
              return this.x + this.width / 2;
          },
          set: function (val) {
              this.x = val - this.width / 2;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Rect.prototype, "centerY", {
          /**
           * The center-y coordinate of the rectangle.
           *
           * @type Number
           */
          get: function () {
              return this.y + this.height / 2;
          },
          set: function (val) {
              this.y = val - this.height / 2;
          },
          enumerable: true,
          configurable: true
      });
      //alias for setter ‘center’
      Rect.prototype.setCenter = function (x, y) {
          this.center = Point.instantiate(x, y);
          return this;
      };
      Object.defineProperty(Rect.prototype, "area", {
          /**
           * The area of the rectangle.
           *
           * @bean
           * @type Number
           */
          get: function () {
              return this.width * this.height;
          },
          enumerable: true,
          configurable: true
      });
      /**
       * Returns a new rectangle representing the union of this rectangle with the
       * specified rectangle.
       *
       * @param rect the rectangle to be combined with this rectangle
       * @return the smallest rectangle containing both the specified
       * rectangle and this rectangle
       */
      Rect.prototype.unite = function (rect) {
          var x1 = Math.min(this.x, rect.x), y1 = Math.min(this.y, rect.y), x2 = Math.max(this.x + this.width, rect.x + rect.width), y2 = Math.max(this.y + this.height, rect.y + rect.height);
          return new Rect_1(x1, y1, x2 - x1, y2 - y1);
      };
      /**
       * Returns a new rectangle representing the intersection of this rectangle with the
       * specified rectangle.
       *
       * @param rect the rectangle to be combined with this rectangle
       * @return the smallest rectangle containing both the specified, if
       * rectangle and this rectangle
       */
      Rect.prototype.intersect = function (rect) {
          var x1 = Math.max(this.x, rect.x);
          var width1 = Math.min(this.x + this.width, rect.x + rect.width);
          var y1 = Math.max(this.y, rect.y);
          var height1 = Math.min(this.y + this.height, rect.y + rect.height);
          if (width1 >= x1 && height1 >= y1) {
              return new Rect_1(x1, y1, width1, height1);
          }
          return null;
      };
      /**
       *  Tests if the specified point is inside the boundary of the rectangle.
       *
       * @function
       * @param point the specified point
       * @type Boolean
       * @ignore
       */
      Rect.prototype.containsPoint = function (point) {
          var x = point.x, y = point.y;
          return x >= this.x && y >= this.y && x <= this.x + this.width && y <= this.y + this.height;
      };
      /**
       * Tests if the interior of the rectangle entirely contains the specified
       *
       * @function
       * @param point the specified rectangle
       * @type Boolean
       * @ignore
       */
      Rect.prototype.containsRect = function (rect) {
          var x = rect.x, y = rect.y;
          return (x >= this.x && y >= this.y && x + rect.width <= this.x + this.width && y + rect.height <= this.y + this.height);
      };
      /**
       * Returns a copy of the rectangle.
       *
       * @function
       * @type Point
       */
      Rect.prototype.clone = function () {
          return new Rect_1(this.x, this.y, this.width, this.height);
      };
      /**
       * If the rect is equal to the other rect.
       * @param other
       */
      Rect.prototype.equals = function (other) {
          return (this === other ||
              (this.x === other.x && this.y === other.y && this.width === other.width && this.height === other.height));
      };
      /**
       * Expend width, height. as same keep center
       * @param width
       * @param height
       */
      Rect.prototype.expand = function (width, height) {
          if (typeof height === 'undefined')
              height = width;
          return new Rect_1(this.x - width / 2, this.y - height / 2, this.width + width, this.height + height);
      };
      /**
       * transform by matrix
       * @param matrix
       */
      Rect.prototype.transform = function (matrix) {
          matrix.applyToRect(this);
      };
      /**
       * return point data as JSON-format: [x, y, width, height]
       */
      Rect.prototype.toJSON = function () {
          return [this.x, this.y, this.width, this.height];
      };
      /**
       * return string format.
       */
      Rect.prototype.toString = function () {
          return '{ x: ' + this.x + ', y: ' + this.y + ', width: ' + this.width + ', height: ' + this.height + ' }';
      };
      var Rect_1;
      Rect = Rect_1 = __decorate([
          mixinProps(props)
      ], Rect);
      return Rect;
  }());
  //# sourceMappingURL=Rect.js.map

  var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
    '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var space = '[' + _stringWs + ']';
  var non = '\u200b\u0085';
  var ltrim = RegExp('^' + space + space + '*');
  var rtrim = RegExp(space + space + '*$');

  var exporter = function (KEY, exec, ALIAS) {
    var exp = {};
    var FORCE = _fails(function () {
      return !!_stringWs[KEY]() || non[KEY]() != non;
    });
    var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
    if (ALIAS) exp[ALIAS] = fn;
    _export(_export.P + _export.F * FORCE, 'String', exp);
  };

  // 1 -> String#trimLeft
  // 2 -> String#trimRight
  // 3 -> String#trim
  var trim = exporter.trim = function (string, TYPE) {
    string = String(_defined(string));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };

  var _stringTrim = exporter;

  var $parseInt = _global.parseInt;
  var $trim = _stringTrim.trim;

  var hex = /^[-+]?0[xX]/;

  var _parseInt = $parseInt(_stringWs + '08') !== 8 || $parseInt(_stringWs + '0x16') !== 22 ? function parseInt(str, radix) {
    var string = $trim(String(str), 3);
    return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
  } : $parseInt;

  // 18.2.5 parseInt(string, radix)
  _export(_export.G + _export.F * (parseInt != _parseInt), { parseInt: _parseInt });

  var _parseInt$1 = _core.parseInt;

  var _parseInt$2 = _parseInt$1;

  /**
   * Adapt from <a href="https://rawgithub.com/mjijackson/mjijackson.github.com/master/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript.html">https://github.com/mjijackson</a>
   * @param {Number} r Red color value
   * @param {Number} g Green color value
   * @param {Number} b Blue color value
   * @return {Array} hsl color
   */

  function RGB2HSL(r, g, b) {
    var maxc = max$1(r, g, b),
        minc = min$2(r, g, b),
        delta = maxc - minc,
        achromatic = delta === 0,
        h = achromatic ? 0 : (maxc == r ? (g - b) / delta + (g < b ? 6 : 0) : maxc == g ? (b - r) / delta + 2 : (r - g) / delta + 4) * 60,
        // maxc == b
    l = (maxc + minc) / 2,
        s = achromatic ? 0 : l < 0.5 ? delta / (maxc + minc) : delta / (2 - maxc - minc);
    return [h, s, l];
  }
  /**
   * Convert RGB color tp HSL(LSV)
   *
   * @param {Number} h hue
   * @param {Number} s saturation
   * @param {Number} l lightness
   */


  function HSL2RGB(h, s, l) {
    // Scale h to 0..1 with modulo for negative values too
    h = (h / 360 % 1 + 1) % 1;
    if (s === 0) return [l, l, l];
    var t3s = [h + 1 / 3, h, h - 1 / 3],
        t2 = l < 0.5 ? l * (1 + s) : l + s - l * s,
        t1 = 2 * l - t2,
        c = [];

    for (var i = 0; i < 3; i++) {
      var t3 = t3s[i];
      if (t3 < 0) t3 += 1;
      if (t3 > 1) t3 -= 1;
      c[i] = 6 * t3 < 1 ? t1 + (t2 - t1) * 6 * t3 : 2 * t3 < 1 ? t2 : 3 * t3 < 2 ? t1 + (t2 - t1) * (2 / 3 - t3) * 6 : t1;
    }

    return c;
  }
  /**
   * Using the standard NTSC conversion formula that is used for
   * calculating the effective lumincance of an RGB color:
   * http://www.mathworks.com/support/solutions/en/data/1-1ASCU/index.html?solution=1-1ASCU
   *
   * @param {Number} r Red color value
   * @param {Number} g Green color value
   * @param {Number} b Blue color value
   * */


  function RGB2Gray(r, g, b) {
    return [r * 0.2989 + g * 0.587 + b * 0.114];
  }
  /**
   * Convert hex color string to rgb.
   * @param {String} hex e.g. #ffffff, #c19
   */


  function HEX2RGB(hex) {
    //TODO: check format.
    if (hex.length === 4) {
      //#fff
      hex = "".concat(hex[1]).concat(hex[1]).concat(hex[2]).concat(hex[2]).concat(hex[2]).concat(hex[2]);
    } else if (hex.length === 7) {
      hex = hex.replace(/^#/, '');
    } else {
      throw new TypeError('invalid hex format!');
    }

    var num = _parseInt$2(hex, 16);

    var red = num >> 16;
    var green = num >> 8 & 255;
    var blue = num & 255;
    return [red, green, blue];
  }
  /**
   * Convert gray color to rgb.
   * @param {Number} g gray
   */


  function Gray2RGB(g) {
    return [g, g, g];
  }
  /**
   * Convert gray color to HSB.
   * @param {Number} g gray
   */


  function Gray2HSB(g) {
    return [0, 0, g];
  }

  var hexRE = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;
  var rgbaRE = /^rgba?\((.*)\)$/i;
  /**
   * 所用颜色统一处理为 rgba
   */
  var Color$1 = /** @class */ (function () {
      /**
       *
       *  e.g.
       *  String: '#fff','#ac78bf', 'rgb(30, 30, 30)', 'rgba(30, 30, 30, 0.5)'
       *  Array: [128, 128, 128, 0.5],  [250, 250, 250]
       */
      function Color(colorStr) {
          //4 channels.
          this.red = 0;
          this.green = 0;
          this.blue = 0;
          this.alpha = 1;
          if (typeof colorStr === 'string')
              this.normalizeColor(colorStr);
          else if (Array.isArray(colorStr)) {
              this.red = colorStr[0];
              this.green = colorStr[1];
              this.blue = colorStr[2];
              this.alpha = colorStr[3] || 1;
          }
      }
      /**
       *
       * normalize color to rgba.
       * hex => rgba;
       * rgb => rgba;
       *
       * @param colorStr
       */
      Color.prototype.normalizeColor = function (colorStr) {
          var color = [];
          if (hexRE.test(colorStr)) {
              color = HEX2RGB(colorStr);
          }
          else {
              var match = colorStr.match(rgbaRE);
              if (match) {
                  var parts = match[1].split(',');
                  color = parts.map(function (part) { return +part; });
              }
          }
          this.red = color[0];
          this.green = color[1];
          this.blue = color[2];
          if (typeof color[3] !== 'undefined')
              this.alpha = color[3];
      };
      /**
       * If equals other color.
       * @param other
       */
      Color.prototype.equals = function (color) {
          return (this === color ||
              (this.red === color.red && this.green === color.green && this.blue === color.blue && this.alpha === color.alpha));
      };
      /**
       * Return a new duplicate of this instance.
       */
      Color.prototype.clone = function () {
          var ret = new Color();
          Object.assign(ret, this); // ...this, remain red, blue, green, alpha.
          return ret;
      };
      /**
       * Convert to HSL format.
       */
      Color.prototype.toHSL = function () {
          return RGB2HSL(this.red, this.green, this.blue);
      };
      /**
       * Convert to HEX number.
       */
      Color.prototype.toHex = function () {
          return (this.red << 16) + (this.green << 8) + this.blue;
      };
      /**
       * Convert to HEX string.
       */
      Color.prototype.toHexString = function () {
          var colorStr = this.toHex().toString(16);
          return '#000000'.substr(0, 7 - colorStr.length) + colorStr;
      };
      /**
       * Convert to JSON format
       */
      Color.prototype.toJSON = function () {
          return [this.red, this.green, this.blue, this.alpha];
      };
      /**
       * Convert to RGBA string (css format).
       */
      Color.prototype.toString = function () {
          return "rgba(" + this.toJSON().join(',') + ")";
      };
      return Color;
  }());
  //# sourceMappingURL=Color.js.map

  var fillRule = {
      nonzero: 'nonzero',
      evenodd: 'evenodd',
  };
  /**
   * default style settings of path
   */
  var defaultStyles = {
      //reset default value to adapt whiteboard.
      // Paths
      fillRule: fillRule.nonzero,
      lineWidth: 3,
      lineCap: 'round',
      lineJoin: 'round',
      miterLimit: 10,
      lineDashOffset: 0,
      dashArray: [],
      // Shadows
      shadowColor: null,
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
  };
  /**
   * default font=style settings of fillText
   */
  var fontStyles = {
      // Characters
      strokeColor: 'rgba(232, 20, 20, 1)',
      fontSize: 36,
      fontFamily: 'sans-serif',
      textAlign: 'left',
      justification: 'left',
  };
  var Style = /** @class */ (function () {
      function Style(options) {
          if (options === void 0) { options = {}; }
          /** new copy of color instance! */
          this._strokeStyle = new Color$1('#c69');
          this._fillStyle = new Color$1('#c69');
          // this.lineWidth = 3;
          Object.assign(this, defaultStyles, fontStyles, options);
      }
      Object.defineProperty(Style.prototype, "strokeStyle", {
          get: function () {
              return this._strokeStyle;
          },
          /**
           * ensure Color type
           */
          set: function (val) {
              if (typeof val === 'string') {
                  this._strokeStyle = new Color$1(val);
              }
              else {
                  this._strokeStyle = val;
              }
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Style.prototype, "fillStyle", {
          get: function () {
              return this._fillStyle;
          },
          /**
           * ensure Color type
           */
          set: function (val) {
              if (typeof val === 'string') {
                  this._fillStyle = new Color$1(val);
              }
              else {
                  this._fillStyle = val;
              }
          },
          enumerable: true,
          configurable: true
      });
      /**
       * Apply styles on canvas context.
       * @param ctx, canvas context.
       */
      Style.prototype.apply = function (ctx) {
          ctx.lineWidth = this.lineWidth;
          ctx.lineJoin = this.lineJoin;
          ctx.lineCap = this.lineCap;
          if (this.hasStroke) {
              ctx.strokeStyle = this.strokeStyle.toString();
          }
          if (this.hasFill) {
              ctx.fillStyle = this.fillStyle.toString();
          }
          if (this.dashArray && this.dashArray.length) {
              ctx.setLineDash(this.dashArray);
              ctx.lineDashOffset = this.lineDashOffset;
          }
          if (this.hasShadow) {
              ctx.shadowColor = this.shadowColor.toString();
              ctx.shadowBlur = this.shadowBlur;
          }
          //TODO: implement rest props.
      };
      /**
       * Return a new duplicate of this instance.
       */
      Style.prototype.clone = function () {
          var ret = new Style();
          var _a = Object.create(this), strokeStyle = _a.strokeStyle, fillStyle = _a.fillStyle, rest = __rest(_a, ["strokeStyle", "fillStyle"]);
          Object.assign(ret, rest);
          ret.fillStyle = fillStyle.clone();
          ret.strokeStyle = strokeStyle.clone();
          return ret;
      };
      /**
       * If equals other style.
       * @param style
       */
      Style.prototype.equals = function (other) {
          function compare(style1, style2) {
              var values1 = Object.keys(style1), values2 = Object.keys(style2);
              for (var key in values1) {
                  var value1 = values1[key], value2 = values2[key];
                  if (value1 !== value2)
                      return false;
              }
              return true;
          }
          return other === this || compare(this, other) || false;
      };
      Object.defineProperty(Style.prototype, "font", {
          /**
           * Read-only prop
           */
          get: function () {
              return this.fontSize + "px " + this.fontFamily;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Style.prototype, "leading", {
          /**
           * Get line-height of fonts
           */
          get: function () {
              //hard-code as 1.4 times of fontSize.
              return this.fontSize * 1.4;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Style.prototype, "hasStroke", {
          /**
           * If has stroke.
           */
          get: function () {
              var color = this.strokeStyle;
              return !!color && color.alpha > 0 && this.lineWidth > 0;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Style.prototype, "hasFill", {
          /**
           * If has fill.
           */
          get: function () {
              var color = this.fillStyle;
              return !!color && color.alpha > 0;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Style.prototype, "hasShadow", {
          /**
           * If has shadow.
           */
          get: function () {
              var color = this.shadowColor;
              // In order to draw a shadow, we need either a shadow blur or an
              // offset, or both.
              return (!!color && color.alpha > 0 && (this.shadowBlur > 0 || !(this.shadowOffsetX === 0 && this.shadowOffsetY === 0)));
          },
          enumerable: true,
          configurable: true
      });
      /**
       * Convert to Shortly JSON format. used for MilkyWay concerns.
       */
      Style.prototype.toShortJSON = function () {
          return {
              sc: this.strokeStyle.toHexString(),
              fc: this.fillStyle.toHexString(),
              w: this.lineWidth,
              f: this.fontSize,
          };
      };
      /**
       * Convert to JSON format.
       */
      Style.prototype.toJSON = function () {
          // return { ...this };
          return Object.assign({}, this);
      };
      /**
       * Convert to string.
       * e.g. 'stokeStyle=rgba(0,0,0,1) lineWidth=10'
       */
      Style.prototype.toString = function () {
          var _this = this;
          // return Object.keys({ ...this })
          return Object.keys(this)
              .filter(function (key) { return _this[key] && _this[key].length !== 0; })
              .map(function (key) { return key + " = " + _this[key].toString(); })
              .join(';');
      };
      return Style;
  }());
  //# sourceMappingURL=Style.js.map

  //https://github.com/chrisaljoudi/transformatrix.js
  /**
   *
   * * Such a coordinate transformation can be represented by a 3 row by 3
   * column matrix with an implied last row of `[ 0 0 1 ]`. This matrix
   * transforms source coordinates `(x, y)` into destination coordinates `(x',y')`
   * by considering them to be a column vector and multiplying the coordinate
   * vector by the matrix according to the following process:
   *
   *     [ x ]   [ a  c  tx ] [ x ]   [ a * x + c * y + tx ]
   *     [ y ] = [ b  d  ty ] [ y ] = [ b * x + d * y + ty ]
   *     [ 1 ]   [ 0  0  1  ] [ 1 ]   [         1          ]
   * 变换矩阵，用于transform
   */
  var Matrix = /** @class */ (function () {
      /**
       * Build Matrix via matrix array.
       * @param {Array} m matrix array, default value: [1, 0, 0, 1, 0, 0].
       */
      function Matrix(m) {
          m = m || [1, 0, 0, 1, 0, 0];
          this.m = [m[0], m[1], m[2], m[3], m[4], m[5]];
      }
      /**
       *reset to initial value
       */
      Matrix.prototype.reset = function () {
          this.m = [1, 0, 0, 1, 0, 0];
          return this;
      };
      /**
       * Return a duplicate matrix.
       */
      Matrix.prototype.clone = function () {
          return new Matrix(this.m.map(function (i) { return i; }));
      };
      /**
       *
       * 一个矩阵作用该矩阵，支持链式书写
       * 等价于 `(this matrix) * (specified matrix)`.
       * @param m
       */
      Matrix.prototype.append = function (m) {
          var m1 = this.m;
          var m2;
          if (m instanceof Matrix) {
              m2 = m.m;
          }
          else {
              m2 = m;
          }
          var m11 = m1[0] * m2[0] + m1[2] * m2[1], m12 = m1[1] * m2[0] + m1[3] * m2[1], m21 = m1[0] * m2[2] + m1[2] * m2[3], m22 = m1[1] * m2[2] + m1[3] * m2[3];
          var dx = m1[0] * m2[4] + m1[2] * m2[5] + m1[4], dy = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];
          m1[0] = m11;
          m1[1] = m12;
          m1[2] = m21;
          m1[3] = m22;
          m1[4] = dx;
          m1[5] = dy;
          return this;
      };
      /**
       * 一个矩阵作用于该矩阵，支持链式书写
       * 等价于： `(specified matrix) * (this matrix)`.
       * @param m specified matrix
       */
      Matrix.prototype.prepend = function (m) {
          var m1 = this.m;
          var m2;
          if (m instanceof Matrix) {
              m2 = m.m;
          }
          else {
              m2 = m;
          }
          var m11 = m1[0] * m2[0] + m2[2] * m1[1], m12 = m1[0] * m2[1] + m2[3] * m1[1], m21 = m1[2] * m2[0] + m1[3] * m2[2], m22 = m1[2] * m2[1] + m1[3] * m2[3];
          var dx = m2[0] * m1[4] + m2[2] * m1[5] + m2[4], dy = m2[1] * m1[4] + m2[3] * m1[5] + m2[5];
          m1[0] = m11;
          m1[1] = m12;
          m1[2] = m21;
          m1[3] = m22;
          m1[4] = dx;
          m1[5] = dy;
          return this;
      };
      /**
       * 返回反操作矩阵
       */
      Matrix.prototype.inverse = function () {
          var inv = new Matrix(this.m), invm = inv.m;
          var d = 1 / (invm[0] * invm[3] - invm[1] * invm[2]), m0 = invm[3] * d, m1 = -invm[1] * d, m2 = -invm[2] * d, m3 = invm[0] * d, m4 = d * (invm[2] * invm[5] - invm[3] * invm[4]), m5 = d * (invm[1] * invm[4] - invm[0] * invm[5]);
          invm[0] = m0;
          invm[1] = m1;
          invm[2] = m2;
          invm[3] = m3;
          invm[4] = m4;
          invm[5] = m5;
          return inv;
      };
      /**
       * 语法糖移动
        (1, 0, sx)
        (0, 1, sy)
       * */
      Matrix.prototype.translate = function (point) {
          return this.append([1, 0, 0, 1, point.x, point.y]);
      };
      /**
       *  语法糖旋转
       *  可以根据基准点旋转，默认是 基于0，0
          (cos, -sin, 0)
          (sin, cos, 0)
       */
      Matrix.prototype.rotate = function (deg, point) {
          var rad = (deg * Math.PI) / 180, c = Math.cos(rad), s = Math.sin(rad), x = 0, y = 0, tx = 0, ty = 0;
          if (point) {
              x = point.x;
              y = point.y;
              tx = x - x * c + y * s;
              ty = y - x * s - y * c;
          }
          return this.append([c, s, -s, c, tx, ty]);
      };
      /**
       *
       *  语法糖倾斜，
       *  可以根据基准点倾斜，默认是 基于 [0，0]
       *  (1, tx, 0)
       *  (ty, 1, 0)
       */
      Matrix.prototype.skew = function (degX, degY, point) {
          if (degX === void 0) { degX = 0; }
          if (degY === void 0) { degY = 0; }
          if (point)
              this.translate(point);
          degY |= 0;
          var radX = (degX * Math.PI) / 180, radY = (degY * Math.PI) / 180;
          var tx = Math.tan(radX), ty = Math.tan(radY);
          this.append([1, ty, tx, 1, 0, 0]);
          if (point)
              this.translate(point.negate());
          return this;
      };
      /**
       * 缩放
       * 可以根据基准点缩放，默认是 基于 [0，0]
       * (sx, 0, 0)
       * (0, sy, 0)
       */
      Matrix.prototype.scale = function (sx, sy, point) {
          if (sx === void 0) { sx = 0; }
          if (sy === void 0) { sy = 0; }
          if (point)
              this.translate(point);
          this.append([sx, 0, 0, sy, 0, 0]);
          if (point)
              this.translate(point.negate());
          return this;
      };
      /**
       * transform Coordinate.
       * @param x
       * @param y
       */
      Matrix.prototype.transformCoordinate = function (x, y) {
          return [x * this.m[0] + y * this.m[2] + this.m[4], x * this.m[1] + y * this.m[3] + this.m[5]];
      };
      /**
       * 变形边界矩阵
       * @param {*} bounds
       */
      Matrix.prototype.applyToRect = function (bounds) {
          var x = bounds.x, y = bounds.y, width = bounds.width, height = bounds.height;
          var pointTL = new Point(x, y);
          var pointTR = new Point(x, y + height);
          var pointBL = new Point(x + width, y);
          var pointBR = new Point(x + width, y + height);
          this.applyToPoint(pointTL)
              .applyToPoint(pointTR)
              .applyToPoint(pointBL)
              .applyToPoint(pointBR);
          bounds.assign(pointTL.x, pointTL.y, pointBR.x - pointTL.x, pointBR.y - pointTL.y);
          //FIXME: 优化算法
          return this;
      };
      /**
       * 变形一个点
       * @param {*} point
       */
      Matrix.prototype.applyToPoint = function (point) {
          var x = point.x, y = point.y;
          point.x = x * this.m[0] + y * this.m[2] + this.m[4];
          point.y = x * this.m[1] + y * this.m[3] + this.m[5];
          return this;
      };
      /**
       * 变形向量
       * 去除位移相关变换
       * @param {*} point
       */
      Matrix.prototype.applyToVector = function (point) {
          var x = point.x, y = point.y;
          point.x = x * this.m[0] + y * this.m[2];
          point.y = x * this.m[1] + y * this.m[3];
          return this;
      };
      /**
       * Applies this matrix to the specified Canvas Context.
       *
       */
      Matrix.prototype.applyToContext = function (ctx) {
          ctx.transform.apply(ctx, this.m);
      };
      /**
       * Convert to JSON
       */
      Matrix.prototype.toJSON = function () {
          return __spread(this.m);
      };
      /**
       * Convert to CSS style string.
       * e.g 'matrix(1,0,0,1,0,0)'
       */
      Matrix.prototype.toString = function () {
          return "matrix(" + this.toJSON().join(',') + ");";
      };
      return Matrix;
  }());
  //# sourceMappingURL=Matrix.js.map

  /**
   * 向量距离平方
   * @param {Vector2} v1
   * @param {Vector2} v2
   * @return {Number}
   */

  function distanceSquare(v1, v2) {
    return (v1[0] - v2[0]) * (v1[0] - v2[0]) + (v1[1] - v2[1]) * (v1[1] - v2[1]);
  }

  function cubicAt(p0, p1, p2, p3, t) {
    var onet = 1 - t;
    return onet * onet * (onet * p3 + 3 * t * p2) + t * t * (t * p0 + 3 * onet * p1);
  }
  /**
   * 投射点到三次贝塞尔曲线上，返回投射距离。
   * 投射点有可能会有一个或者多个，这里只返回其中距离最短的一个。
   * @param {Number} x0
   * @param {Number} y0
   * @param {Number} x1
   * @param {Number} y1
   * @param {Number} x2
   * @param {Number} y2
   * @param {Number} x3
   * @param {Number} y3
   * @param {Number} x
   * @param {Number} y
   * @param {Array.<Number>} [out] 投射点
   * @return {Number}
   */


  function cubicProjectPoint(x1, y1, x2, y2, x3, y3, x4, y4, x, y, out) {
    var t;
    var interval = 0.005;
    var d = Infinity;

    var _t;

    var v1;
    var d1;
    var d2;
    var v2;
    var prev;
    var next;
    var EPSILON = 0.0001;
    var v0 = [x, y];

    for (_t = 0; _t < 1; _t += 0.05) {
      v1 = [cubicAt(x1, x2, x3, x4, _t), cubicAt(y1, y2, y3, y4, _t)];
      d1 = distanceSquare(v0, v1);

      if (d1 < d) {
        t = _t;
        d = d1;
      }
    }

    d = Infinity;

    for (var i = 0; i < 32; i++) {
      if (interval < EPSILON) {
        break;
      }

      prev = t - interval;
      next = t + interval;
      v1 = [cubicAt(x1, x2, x3, x4, prev), cubicAt(y1, y2, y3, y4, prev)];
      d1 = distanceSquare(v0, v1);

      if (prev >= 0 && d1 < d) {
        t = prev;
        d = d1;
      } else {
        v2 = [cubicAt(x1, x2, x3, x4, next), cubicAt(y1, y2, y3, y4, next)];
        d2 = distanceSquare(v0, v2);

        if (next <= 1 && d2 < d) {
          t = next;
          d = d2;
        } else {
          interval *= 0.5;
        }
      }
    }

    if (out) {
      out.x = cubicAt(x1, x2, x3, x4, t);
      out.y = cubicAt(y1, y2, y3, y4, t);
    }

    return Math.sqrt(d);
  }
  /**
   * 三次贝塞尔曲线描边包含判断
   * @param  {Number}  x0
   * @param  {Number}  y0
   * @param  {Number}  x1
   * @param  {Number}  y1
   * @param  {Number}  x2
   * @param  {Number}  y2
   * @param  {Number}  x3
   * @param  {Number}  y3
   * @param  {Number}  lineWidth
   * @param  {Number}  x
   * @param  {Number}  y
   * @return {Boolean}
   */


  function containStroke(x0, y0, x1, y1, x2, y2, x3, y3, lineWidth, x, y) {
    if (lineWidth === 0) {
      return false;
    }

    var _l = lineWidth; // Quick reject

    if (y > y0 + _l && y > y1 + _l && y > y2 + _l && y > y3 + _l || y < y0 - _l && y < y1 - _l && y < y2 - _l && y < y3 - _l || x > x0 + _l && x > x1 + _l && x > x2 + _l && x > x3 + _l || x < x0 - _l && x < x1 - _l && x < x2 - _l && x < x3 - _l) {
      return false;
    }

    var d = cubicProjectPoint(x0, y0, x1, y1, x2, y2, x3, y3, x, y, null);
    return d <= _l / 2;
  }

  var PI2 = Math.PI * 2;

  function normalizeRadian(angle) {
    angle %= PI2;

    if (angle < 0) {
      angle += PI2;
    }

    return angle;
  }
  /**
   * 圆弧描边包含判断
   * @param  {Number}  cx
   * @param  {Number}  cy
   * @param  {Number}  r
   * @param  {Number}  startAngle
   * @param  {Number}  endAngle
   * @param  {Boolean}  anticlockwise
   * @param  {Number} lineWidth
   * @param  {Number}  x
   * @param  {Number}  y
   * @return {Boolean}
   */


  function containStrokeArc(cx, cy, r, startAngle, endAngle, anticlockwise, lineWidth, x, y) {
    if (lineWidth === 0) return false;
    var _l = lineWidth;
    x -= cx;
    y -= cy;
    var d = Math.sqrt(x * x + y * y);
    if (d - _l > r || d + _l < r) return false;

    if (Math.abs(startAngle - endAngle) % PI2 < 1e-4) {
      // Is a circle
      return true;
    }

    if (anticlockwise) {
      var tmp = startAngle;
      startAngle = normalizeRadian(endAngle);
      endAngle = normalizeRadian(tmp);
    } else {
      startAngle = normalizeRadian(startAngle);
      endAngle = normalizeRadian(endAngle);
    }

    if (startAngle > endAngle) {
      endAngle += PI2;
    }

    var angle = Math.atan2(y, x);

    if (angle < 0) {
      angle += PI2;
    }

    return angle >= startAngle && angle <= endAngle || angle + PI2 >= startAngle && angle + PI2 <= endAngle;
  } // Converted from code found here:
  // http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
  //


  function calcBoundsOfBezier(x0, y0, x1, y1, x2, y2, x3, y3) {
    var tvalues = [],
        bounds = [[], []];
    var a, b, c, t;

    for (var i = 0; i < 2; ++i) {
      if (i === 0) {
        b = 6 * x0 - 12 * x1 + 6 * x2;
        a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
        c = 3 * x1 - 3 * x0;
      } else {
        b = 6 * y0 - 12 * y1 + 6 * y2;
        a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
        c = 3 * y1 - 3 * y0;
      }

      if (Math.abs(a) < 1e-12) {
        if (Math.abs(b) < 1e-12) {
          continue;
        }

        t = -c / b;

        if (t > 0 && t < 1) {
          tvalues.push(t);
        }

        continue;
      }

      var b2ac = b * b - 4 * c * a;
      var sqrtb2ac = Math.sqrt(b2ac);
      if (b2ac < 0) continue;
      var t1 = (-b + sqrtb2ac) / (2 * a);

      if (t1 > 0 && t1 < 1) {
        tvalues.push(t1);
      }

      var t2 = (-b - sqrtb2ac) / (2 * a);

      if (t2 > 0 && t2 < 1) {
        tvalues.push(t2);
      }
    }

    var j = tvalues.length;
    var jlen = j;
    var mt;

    while (j--) {
      t = tvalues[j];
      mt = 1 - t;
      bounds[0][j] = mt * mt * mt * x0 + 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t * x3;
      bounds[1][j] = mt * mt * mt * y0 + 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t * y3;
    }

    bounds[0][jlen] = x0;
    bounds[1][jlen] = y0;
    bounds[0][jlen + 1] = x3;
    bounds[1][jlen + 1] = y3;
    bounds[0].length = bounds[1].length = jlen + 2;
    var x = Math.min.apply(0, bounds[0]);
    var y = Math.min.apply(0, bounds[1]);
    var w = Math.max.apply(0, bounds[0]) - x;
    var h = Math.max.apply(0, bounds[1]) - y;
    return new Rect(x, y, w, h);
  }
  /**
   * 线段包含判断
   * @param  {Number}  x0
   * @param  {Number}  y0
   * @param  {Number}  x1
   * @param  {Number}  y1
   * @param  {Number}  lineWidth
   * @param  {Number}  x
   * @param  {Number}  y
   * @return {Boolean}
   */


  function containStrokeLine(x0, y0, x1, y1, lineWidth, x, y) {
    if (lineWidth === 0) {
      return false;
    }

    var _l = lineWidth;
    var _a = 0;
    var _b = x0; // Quick reject

    if (y > y0 + _l && y > y1 + _l || y < y0 - _l && y < y1 - _l || x > x0 + _l && x > x1 + _l || x < x0 - _l && x < x1 - _l) {
      return false;
    }

    if (x0 !== x1) {
      _a = (y0 - y1) / (x0 - x1);
      _b = (x0 * y1 - x1 * y0) / (x0 - x1);
    } else {
      return Math.abs(x - x0) <= _l / 2;
    }

    var tmp = _a * x - y + _b;

    var _s = tmp * tmp / (_a * _a + 1);

    return _s <= _l / 2 * _l / 2;
  }

  var POINT_WIDTH = 4;
  var OFFSET = POINT_WIDTH / 2;
  var Segment$1 = /** @class */ (function () {
      function Segment() {
          this.owner = null;
      }
      Segment.prototype.nearby = function () {
          return false;
      };
      Object.defineProperty(Segment.prototype, "points", {
          get: function () {
              return [this.point];
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Segment.prototype, "bounds", {
          // get strokeBounds() {
          // return this.bounds.expand(this.style.lineWidth) / 2;
          // return this.bounds.expand(this.style.lineWidth);
          // }
          get: function () {
              return new Rect(this.point.x, this.point.y, 0, 0);
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Segment.prototype, "length", {
          get: function () {
              return 0;
          },
          enumerable: true,
          configurable: true
      });
      Segment.prototype.transformCoordinates = function (matrix) {
          var point = this.point, control1 = this.control1 || null, control2 = this.control2 || null;
          matrix.applyToPoint(point);
          if (control1) {
              matrix.applyToPoint(control1);
          }
          if (control2) {
              matrix.applyToPoint(control2);
          }
      };
      Segment.prototype.drawPoint = function (ctx, point) {
          if (!point)
              return;
          ctx.strokeRect(point.x - OFFSET, point.y - OFFSET, POINT_WIDTH, POINT_WIDTH);
      };
      Segment.prototype.drawControlPoint = function (ctx, point, controlPoint) {
          if (!controlPoint)
              return;
          ctx.fillRect(controlPoint.x - OFFSET, controlPoint.y - OFFSET, POINT_WIDTH, POINT_WIDTH);
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(controlPoint.x, controlPoint.y);
      };
      /**
       * tmp method for debugger bezier
       * @param ctx
       */
      Segment.prototype.draw = function (ctx) {
          ctx.fillStyle = '#4f80ff';
          ctx.lineWidth = 1;
          ctx.strokeStyle = '#5887ff';
          ctx.beginPath();
          this.drawPoint(ctx, this.point);
          this.drawPoint(ctx, this.contextPoint);
          this.drawControlPoint(ctx, this.point, this.control);
          this.drawControlPoint(ctx, this.contextPoint, this.control1);
          this.drawControlPoint(ctx, this.point, this.control2);
          ctx.stroke();
      };
      Object.defineProperty(Segment.prototype, "args", {
          /**
           * Arguments fot Canvas context api.
           */
          get: function () {
              return this.points.slice(1).reduce(function (acc, item) {
                  [].push.apply(acc, item.toJSON());
                  return acc;
              }, []);
          },
          enumerable: true,
          configurable: true
      });
      /**
       * return point data as JSON-format:
       */
      Segment.prototype.toJSON = function () {
          return this.points.map(function (p) { return p.toJSON(); });
      };
      Segment.prototype.toString = function () {
          return this.command + " " + this.args.join(' ');
      };
      return Segment;
  }());
  /**
   * DO NOT draw segment ,just move.
   */
  var MoveSegment = /** @class */ (function (_super) {
      __extends(MoveSegment, _super);
      function MoveSegment(point) {
          var _this = _super.call(this) || this;
          _this.command = 'M';
          _this.point = point;
          return _this;
      }
      MoveSegment.prototype.containsPoint = function (_point, _lineWidth) {
          return false;
      };
      return MoveSegment;
  }(Segment$1));
  var LineSegment = /** @class */ (function (_super) {
      __extends(LineSegment, _super);
      function LineSegment(point) {
          var _this = _super.call(this) || this;
          _this.command = 'L';
          _this.point = point;
          return _this;
      }
      LineSegment.prototype.containsPoint = function (point, lineWidth) {
          return containStrokeLine(this.contextPoint.x, this.contextPoint.y, this.point.x, this.point.y, lineWidth, point.x, point.y);
      };
      Object.defineProperty(LineSegment.prototype, "bounds", {
          get: function () {
              var frm = this.contextPoint, x = frm.x, y = frm.y, width, height;
              var to = this.point;
              width = to.x - x;
              height = to.y - y;
              // Check if horizontal or vertical order needs to be reversed.
              if (width < 0) {
                  x = to.x;
                  width = -width;
              }
              if (height < 0) {
                  y = to.y;
                  height = -height;
              }
              return new Rect(x, y, width, height);
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(LineSegment.prototype, "length", {
          get: function () {
              return this.contextPoint.subtract(this.point).length;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(LineSegment.prototype, "points", {
          get: function () {
              return [this.contextPoint, this.point];
          },
          enumerable: true,
          configurable: true
      });
      return LineSegment;
  }(Segment$1));
  /**
   * 3 阶贝塞尔
   */
  var BezierSegment = /** @class */ (function (_super) {
      __extends(BezierSegment, _super);
      function BezierSegment(cp1, cp2, point) {
          var _this = _super.call(this) || this;
          _this.command = 'C';
          _this.control1 = cp1;
          _this.control2 = cp2;
          _this.point = point;
          return _this;
      }
      BezierSegment.prototype.containsPoint = function (point, lineWidth) {
          return containStroke(this.contextPoint.x, this.contextPoint.y, this.control1.x, this.control1.y, this.control2.x, this.control2.y, this.point.x, this.point.y, lineWidth, point.x, point.y);
      };
      Object.defineProperty(BezierSegment.prototype, "fullArgs", {
          get: function () {
              return [
                  this.contextPoint.x,
                  this.contextPoint.y,
                  this.control1.x,
                  this.control1.y,
                  this.control2.x,
                  this.control2.y,
                  this.point.x,
                  this.point.y,
              ];
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(BezierSegment.prototype, "bounds", {
          get: function () {
              return calcBoundsOfBezier.apply(null, this.fullArgs);
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(BezierSegment.prototype, "points", {
          get: function () {
              return [this.contextPoint, this.control1, this.control2, this.point];
          },
          enumerable: true,
          configurable: true
      });
      BezierSegment.prototype._calcPoint = function (t, start, c1, c2, end) {
          return (start * (1.0 - t) * (1.0 - t) * (1.0 - t) +
              3.0 * c1 * (1.0 - t) * (1.0 - t) * t +
              3.0 * c2 * (1.0 - t) * t * t +
              end * t * t * t);
      };
      Object.defineProperty(BezierSegment.prototype, "length", {
          /**
           * 算出近似值
           */
          get: function () {
              var steps = 10;
              var length = 0;
              var px = 0;
              var py = 0;
              for (var i = 0; i <= steps; i += 1) {
                  var t = i / steps;
                  var cx = this._calcPoint(t, this.contextPoint.x, this.control1.x, this.control2.x, this.point.x);
                  var cy = this._calcPoint(t, this.contextPoint.y, this.control1.y, this.control2.y, this.point.y);
                  if (i > 0) {
                      var xdiff = cx - px;
                      var ydiff = cy - py;
                      length += Math.sqrt(xdiff * xdiff + ydiff * ydiff);
                  }
                  px = cx;
                  py = cy;
              }
              return length;
          },
          enumerable: true,
          configurable: true
      });
      return BezierSegment;
  }(Segment$1));
  /**
   * 2 阶贝塞尔
   */
  var QuadraticSegment = /** @class */ (function (_super) {
      __extends(QuadraticSegment, _super);
      function QuadraticSegment(cp, point) {
          var _this = _super.call(this) || this;
          _this.command = 'Q';
          _this.control = cp;
          _this.point = point;
          return _this;
      }
      QuadraticSegment.prototype.containsPoint = function (_point, _lineWidth) { return false; };
      Object.defineProperty(QuadraticSegment.prototype, "length", {
          // get bounds() {
          //   //转成三阶算
          //   return calcBoundsOfBezier(this.fullArgs);
          // }
          get: function () {
              //转成三阶算
              return this.contextPoint.subtract(this.point).length;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(QuadraticSegment.prototype, "points", {
          get: function () {
              return [this.contextPoint, this.control, this.point];
          },
          enumerable: true,
          configurable: true
      });
      return QuadraticSegment;
  }(Segment$1));
  var ArcSegment = /** @class */ (function (_super) {
      __extends(ArcSegment, _super);
      function ArcSegment(cp1, cp2, radius) {
          var _this = _super.call(this) || this;
          _this.command = 'A';
          _this.radius = 0;
          cp1 && (_this.control1 = cp1);
          cp2 && (_this.control2 = cp2);
          cp1 && (_this.point = cp1);
          radius && (_this.radius = radius);
          return _this;
      }
      ArcSegment.prototype.containsPoint = function (point, lineWidth) {
          return containStrokeArc(this.contextPoint.x, this.contextPoint.y, this.control1.x, this.control1.y, this.control2.x, !!this.control2.y, 
          // this.point.x,
          // this.point.y,
          lineWidth, point.x, point.y);
      };
      Object.defineProperty(ArcSegment.prototype, "args", {
          get: function () {
              return [this.control1.x, this.control1.y, this.control2.x, this.control2.y, this.radius];
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(ArcSegment.prototype, "points", {
          get: function () {
              return [this.contextPoint, this.control1, this.point];
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(ArcSegment.prototype, "length", {
          get: function () {
              return 0;
          },
          enumerable: true,
          configurable: true
      });
      return ArcSegment;
  }(Segment$1));
  //# sourceMappingURL=Segment.js.map

  /**
   *  Adapt from https://github.com/paperjs/paper.js
   *
   *  https://github.com/soswow/fit-curves
   *
   *   Refactor paper.js PathFitter.js to pure-function
   *
   * 输入: 多个点的数组
   * 输出: 优化好的曲线列表
   *
   */

  var EPSILON = 1e-12;
  /**
   * 优化曲线的点
   * @param {Array} points
   * @param {Number} maxError
   */

  function fitCurve(points, maxError) {
    if (points.length <= 1) return [];
    var _points = [],
        curves,
        length;

    for (var i = 0, prev, l = points.length; i < l; i++) {
      var point = points[i];

      if (!prev || !prev.equals(point)) {
        _points.push(prev = point.clone());
      }
    }

    length = _points.length;

    if (length > 1) {
      curves = fitCubic(_points, maxError, 0, length - 1, // Left Tangent
      points[1].subtract(points[0]), // Right Tangent
      points[length - 2].subtract(points[length - 1]));
    }

    return curves;
  }

  function fitCubic(points, error, first, last, tan1, tan2) {
    if (last - first === 1) {
      var pt1 = points[first],
          pt2 = points[last],
          dist = pt1.getDistance(pt2) / 3;
      var seg = new BezierSegment(pt1.add(tan1.normalize(dist)), pt2.add(tan2.normalize(dist)), pt2);
      seg.contextPoint = pt1;
      return [seg];
    }

    var uPrime = chordLengthParameterize(points, first, last),
        maxError = Math.max(error, error * error),
        split,
        parametersInOrder = true;

    for (var i = 0; i <= 4; i++) {
      var curve = generateBezier(points, first, last, uPrime, tan1, tan2); //  Find max deviation of points to fitted curve

      var max = findMaxError(points, first, last, curve, uPrime);

      if (max.error < error && parametersInOrder) {
        var _seg = new BezierSegment(curve[1], curve[2], curve[3]);

        _seg.contextPoint = curve[0];
        return [_seg];
      }

      split = max.index; // If error not too large, try reparameterization and iteration

      if (max.error >= maxError) break;
      parametersInOrder = reparameterize(points, first, last, uPrime, curve);
      maxError = max.error;
    }

    var tanCenter = points[split - 1].subtract(points[split + 1]),
        curves = [];
    curves = curves.concat(fitCubic(points, error, first, split, tan1, tanCenter));
    curves = curves.concat(fitCubic(points, error, split, last, tanCenter.negate(), tan2));
    return curves;
  } // Use least-squares method to find Bezier control points for region.


  function generateBezier(points, first, last, uPrime, tan1, tan2) {
    var epsilon = EPSILON,
        abs = Math.abs,
        pt1 = points[first],
        pt2 = points[last],
        // Create the C and X matrices
    C = [[0, 0], [0, 0]],
        X = [0, 0];

    for (var i = 0, l = last - first + 1; i < l; i++) {
      var u = uPrime[i],
          t = 1 - u,
          b = 3 * u * t,
          b0 = t * t * t,
          b1 = b * t,
          b2 = b * u,
          b3 = u * u * u,
          a1 = tan1.normalize(b1),
          a2 = tan2.normalize(b2),
          tmp = points[first + i].subtract(pt1.multiply(b0 + b1)).subtract(pt2.multiply(b2 + b3));
      C[0][0] += a1.dot(a1);
      C[0][1] += a1.dot(a2); // C[1][0] += a1.dot(a2);

      C[1][0] = C[0][1];
      C[1][1] += a2.dot(a2);
      X[0] += a1.dot(tmp);
      X[1] += a2.dot(tmp);
    } // Compute the determinants of C and X


    var detC0C1 = C[0][0] * C[1][1] - C[1][0] * C[0][1],
        alpha1,
        alpha2;

    if (abs(detC0C1) > epsilon) {
      // Kramer's rule
      var detC0X = C[0][0] * X[1] - C[1][0] * X[0],
          detXC1 = X[0] * C[1][1] - X[1] * C[0][1]; // Derive alpha values

      alpha1 = detXC1 / detC0C1;
      alpha2 = detC0X / detC0C1;
    } else {
      // Matrix is under-determined, try assuming alpha1 == alpha2
      var c0 = C[0][0] + C[0][1],
          c1 = C[1][0] + C[1][1];
      alpha1 = alpha2 = abs(c0) > epsilon ? X[0] / c0 : abs(c1) > epsilon ? X[1] / c1 : 0;
    } // If alpha negative, use the Wu/Barsky heuristic (see text)
    // (if alpha is 0, you get coincident control points that lead to
    // divide by zero in any subsequent NewtonRaphsonRootFind() call.


    var segLength = pt2.getDistance(pt1),
        eps = epsilon * segLength,
        handle1,
        handle2;

    if (alpha1 < eps || alpha2 < eps) {
      // fall back on standard (probably inaccurate) formula,
      // and subdivide further if needed.
      alpha1 = alpha2 = segLength / 3;
    } else {
      // Check if the found control points are in the right order when
      // projected onto the line through pt1 and pt2.
      var line = pt2.subtract(pt1); // Control points 1 and 2 are positioned an alpha distance out
      // on the tangent vectors, left and right, respectively

      handle1 = tan1.normalize(alpha1);
      handle2 = tan2.normalize(alpha2);

      if (handle1.dot(line) - handle2.dot(line) > segLength * segLength) {
        // Fall back to the Wu/Barsky heuristic above.
        alpha1 = alpha2 = segLength / 3;
        handle1 = handle2 = null; // Force recalculation
      }
    } // First and last control points of the Bezier curve are
    // positioned exactly at the first and last data points


    return [pt1, pt1.add(handle1 || tan1.normalize(alpha1)), pt2.add(handle2 || tan2.normalize(alpha2)), pt2];
  } // Given set of points and their parameterization, try to find
  // a better parameterization.


  function reparameterize(points, first, last, u, curve) {
    for (var i = first; i <= last; i++) {
      u[i - first] = findRoot(curve, points[i], u[i - first]);
    } // Detect if the new parameterization has reordered the points.
    // In that case, we would fit the points of the path in the wrong order.


    for (var _i = 1, l = u.length; _i < l; _i++) {
      if (u[_i] <= u[_i - 1]) return false;
    }

    return true;
  }

  function isZero$1(val) {
    return val >= -EPSILON && val <= EPSILON;
  } // Use Newton-Raphson iteration to find better root.


  function findRoot(curve, point, u) {
    var curve1 = [],
        curve2 = []; // Generate control vertices for Q'

    for (var i = 0; i <= 2; i++) {
      curve1[i] = curve[i + 1].subtract(curve[i]).multiply(3);
    } // Generate control vertices for Q''


    for (var _i2 = 0; _i2 <= 1; _i2++) {
      curve2[_i2] = curve1[_i2 + 1].subtract(curve1[_i2]).multiply(2);
    } // Compute Q(u), Q'(u) and Q''(u)


    var pt = evaluate(3, curve, u),
        pt1 = evaluate(2, curve1, u),
        pt2 = evaluate(1, curve2, u),
        diff = pt.subtract(point),
        df = pt1.dot(pt1) + diff.dot(pt2); // u = u - f(u) / f'(u)

    return isZero$1(df) ? u : u - diff.dot(pt1) / df;
  } // Evaluate a bezier curve at a particular parameter value


  function evaluate(degree, curve, t) {
    // Copy array
    var tmp = curve.slice(); // Triangle computation

    for (var i = 1; i <= degree; i++) {
      for (var j = 0; j <= degree - i; j++) {
        tmp[j] = tmp[j].multiply(1 - t).add(tmp[j + 1].multiply(t));
      }
    }

    return tmp[0];
  }
  /**
   * Assign parameter values to digitized points using relative distances between points.
   *
   * @param {Array<Point>} points - Array of digitized points
   * @returns {Array<Number>} Parameter values
   */


  function chordLengthParameterize(points, first, last) {
    var u = [0];

    for (var i = first + 1; i <= last; i++) {
      u[i - first] = u[i - first - 1] + points[i].getDistance(points[i - 1]);
    }

    for (var _i3 = 1, m = last - first; _i3 <= m; _i3++) {
      u[_i3] /= u[m];
    }

    return u;
  } // Find the maximum squared distance of digitized points to fitted curve.


  function findMaxError(points, first, last, curve, u) {
    var index = Math.floor((last - first + 1) / 2),
        maxDist = 0;

    for (var i = first + 1; i < last; i++) {
      var P = evaluate(3, curve, u[i - first]);
      var v = P.subtract(points[i]);
      var dist = v.x * v.x + v.y * v.y; // squared

      if (dist >= maxDist) {
        maxDist = dist;
        index = i;
      }
    }

    return {
      error: maxDist,
      index: index
    };
  }

  /**
   * Adapt from https://github.com/paperjs/paper.js
   *
   * 输入: 多个点的数组
   * 输出: 曲线列表
   *
   * @param {Array} points
   * @param {Boolean} closed
   */

  function smoothCurve(points, closed) {
    var opts = options || {},
        asymmetric = opts.asymmetric,
        // asymmetric or continuous;
    length = points.length,
        segments = []; // Helper method to pick the right from / to indices.
    // Supports numbers and segment objects.
    // For numbers, the `to` index is exclusive, while for segments and
    // curves, it is inclusive, handled by the `offset` parameter.

    function getIndex(value, _default) {
      // Support both Segment and Curve through #index getter.
      var index = value && value.index;

      if (index != null) {
        // Make sure the segment / curve is not from a wrong path.
        var path = value.path;
        if (path && path !== self) throw new Error(value._class + ' ' + index + ' of ' + path + ' is not part of ' + self); // Add offset of 1 to curves to reach their end segment.

        if (_default && value instanceof Segment) index++;
      } else {
        index = typeof value === 'number' ? value : _default;
      } // Handle negative values based on whether a path is open or not:
      // Ranges on closed paths are allowed to wrapped around the
      // beginning/end (e.g. start near the end, end near the beginning),
      // while ranges on open paths stay within the path's open range.


      return Math.min(index < 0 && closed ? index % length : index < 0 ? index + length : index, length - 1);
    }

    var loop = closed && opts.from === undefined && opts.to === undefined,
        from = getIndex(opts.from, 0),
        to = getIndex(opts.to, length - 1);

    if (from > to) {
      if (closed) {
        from -= length;
      } else {
        var tmp = from;
        from = to;
        to = tmp;
      }
    } // https://www.particleincell.com/2012/bezier-splines/


    var min = Math.min,
        amount = to - from + 1,
        n = amount - 1,
        // Overlap by up to 4 points on closed paths since a current
    // segment is affected by its 4 neighbors on both sides (?).
    padding = loop ? min(amount, 4) : 1,
        paddingLeft = padding,
        paddingRight = padding,
        knots = [];

    if (!closed) {
      // If the path is open and a range is defined, try using a
      // padding of 1 on either side.
      paddingLeft = min(1, from);
      paddingRight = min(1, length - to - 1);
    } // Set up the knots array now, taking the paddings into account.


    n += paddingLeft + paddingRight;
    if (n <= 1) return segments; // change by fan  for Path.ts smooth method

    for (var i = 0, j = from - paddingLeft; i <= n; i++, j++) {
      knots[i] = segments[(j < 0 ? j + length : j) % length]._point;
    } // In the algorithm we treat these 3 cases:
    // - left most segment (L)
    // - internal segments (I)
    // - right most segment (R)
    //
    // In both the continuous and asymmetric method, c takes these
    // values and can hence be removed from the loop starting in n - 2:
    // c = 1 (L), 1 (I), 0 (R)
    //
    // continuous:
    // a = 0 (L), 1 (I), 2 (R)
    // b = 2 (L), 4 (I), 7 (R)
    // u = 1 (L), 4 (I), 8 (R)
    // v = 2 (L), 2 (I), 1 (R)
    //
    // asymmetric:
    // a = 0 (L), 1 (I), 1 (R)
    // b = 2 (L), 4 (I), 2 (R)
    // u = 1 (L), 4 (I), 3 (R)
    // v = 2 (L), 2 (I), 0 (R)
    // (L): u = 1, v = 2


    var x = knots[0]._x + 2 * knots[1]._x,
        y = knots[0]._y + 2 * knots[1]._y,
        f = 2,
        n_1 = n - 1,
        rx = [x],
        ry = [y],
        rf = [f],
        px = [],
        py = []; // Solve with the Thomas algorithm

    for (var _i = 1; _i < n; _i++) {
      var internal = _i < n_1,
          //  internal--(I)  asymmetric--(R) (R)--continuous
      a = internal ? 1 : asymmetric ? 1 : 2,
          b = internal ? 4 : asymmetric ? 2 : 7,
          u = internal ? 4 : asymmetric ? 3 : 8,
          v = internal ? 2 : asymmetric ? 0 : 1,
          m = a / f;
      f = rf[_i] = b - m;
      x = rx[_i] = u * knots[_i]._x + v * knots[_i + 1]._x - m * x;
      y = ry[_i] = u * knots[_i]._y + v * knots[_i + 1]._y - m * y;
    }

    px[n_1] = rx[n_1] / rf[n_1];
    py[n_1] = ry[n_1] / rf[n_1];

    for (var _i2 = n - 2; _i2 >= 0; _i2--) {
      px[_i2] = (rx[_i2] - px[_i2 + 1]) / rf[_i2];
      py[_i2] = (ry[_i2] - py[_i2 + 1]) / rf[_i2];
    }

    px[n] = (3 * knots[n]._x - px[n_1]) / 2;
    py[n] = (3 * knots[n]._y - py[n_1]) / 2; // Now update the segments

    for (var _i3 = paddingLeft, max = n - paddingRight, _j = from; _i3 <= max; _i3++, _j++) {
      var segment = new BezierSegment(),
          point = point[_j < 0 ? _j + length : _j],
          hx = px[_i3] - pt._x,
          hy = py[_i3] - pt._y;
      segment.point = point;
      if (loop || _i3 < max) segment.control2 = new Point(hx, hy);
      if (loop || _i3 > paddingLeft) segment.control1 = new Point(-hx, -hy);
    }

    return segments;
  }

  var cachedPropsKey = '__cachedProps';
  /**
   * mark getter as memoized prop, the value is cached till the instance mark as dirty,
   * @param {String} cacheKey, Specify the cacheKey of prop (default value: PropName)
   */
  function memoized(cacheKey) {
      return function (_, name, descriptor) {
          if (typeof descriptor.get !== 'function')
              throw new Error("Can't decorate " + String(name) + ", Only used for getter~");
          var propKey = cacheKey || "" + String(name);
          var get = descriptor.get;
          descriptor.get = function () {
              var cacheProps = this[cachedPropsKey];
              if (typeof cacheProps[propKey] !== 'undefined')
                  return cacheProps[propKey];
              cacheProps[propKey] = get.apply(this);
              return cacheProps[propKey];
          };
          return descriptor;
      };
  }
  /**
   * Mark class as memoizable, It will inject prop:'cachedProps' and method:'changed' in prototype:
   *
   * cachedProps: will cache the complex compute prop. And it will be cleared the changed invoked.
   * changed: Notify the layer to refresh.
   *
   */
  function memoizable() {
      return function (target) {
          if (typeof target.prototype.changed === 'function')
              throw new Error("can't decorate memoizable twice!");
          // _cachedProps list.
          target.prototype[cachedPropsKey] = {};
          /**
           * mark the item instance as 'dirty', it will trigger canvas refresh and re-calc the memozied props.
           */
          target.prototype.changed = function () {
              if (this.layer && this.layer.markAsDirty) {
                  this.layer.markAsDirty();
              }
              this[cachedPropsKey] = {};
          };
          return target;
      };
  }
  var validateFunc = function validateFunc(type, key) {
      switch (type) {
          case Boolean:
              return function (val) {
                  if (typeof val !== 'boolean')
                      throw new TypeError("setter '" + key + "' accept boolean value!");
              };
          case String:
              return function (val) {
                  if (typeof val !== 'string')
                      throw new TypeError("setter '" + key + "' accept string value!");
              };
          case Number:
              return function (val) {
                  if (typeof val !== 'number')
                      throw new TypeError("setter '" + key + "' accept number value!");
              };
          default:
              return function (val) {
                  if (!(val instanceof type))
                      throw new TypeError("setter '" + key + "' accept " + type.name + " value!");
              };
      }
  };
  /**
   * Inject observe props for class.
   *
   * @param {Object} desc
   *
   * Code Example:
   *  {
   *    selected: { // Name of prop, (In example 'selected')
   *      type: Boolean, // Type of prop
   *      default: true, // Default value of prop
   *      fn: function(newVal) { //callback when prop changed.
   *        console.log(this)
   *      }
   *    }
   *  }
   */
  function observeProps(desc) {
      if (!Object.keys(desc).length)
          throw new TypeError('must pass props!');
      return function (target) {
          var _loop_1 = function (key) {
              if (typeof target.prototype[key] !== 'undefined') {
                  throw new Error("Prop " + key + " already exist!");
              }
              var propDesc = desc[key];
              var privateKey = "__" + key;
              target.prototype[privateKey] = propDesc.default;
              var checkParam = validateFunc(propDesc.type, key);
              var fn = propDesc.fn;
              Object.defineProperty(target.prototype, key, {
                  get: function () {
                      return this[privateKey];
                  },
                  set: function (val) {
                      checkParam(val);
                      // if not changed, do nothing.
                      if (val === this[privateKey])
                          return;
                      this[privateKey] = val;
                      fn && fn.call(this, val);
                      this.changed();
                  },
                  enumerable: true,
                  configurable: true,
              });
          };
          for (var key in desc) {
              _loop_1(key);
          }
      };
  }
  //# sourceMappingURL=memoized.js.map

  var letters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  var lettersLen = letters.length;
  var dateTS = 1000 * 3600 * 3; // 3 hours
  /**
   * Generate ID as format [0-9a-zA-Z]+
   * @param num
   */
  function genMixId(num) {
      if (num < lettersLen)
          return letters[num];
      var rem = num % lettersLen;
      return genMixId(parseInt((num / lettersLen).toString())) + letters[rem];
  }
  /**
   * Generate unique id via timestamp per 3 hours, and format as [0-9a-zA-Z]+
   */
  var tsid = function () { return genMixId((+new Date() % dateTS) * 1000 + parseInt(((Math.random() * 100) % 100).toString(), 10)); };
  //# sourceMappingURL=id.js.map

  /**
   *
   * Make Class support event-emitter:  'on', 'off', 'once' ,'emit'.
   *
   * Code example:
   *
   * declare:
   * @emittable()
   * Class DecoratedClass { change(){ this.emit('changed') } }
   *
   * use:
   * let ins = new DecoratedClass();
   * ins.on('changed', (event)=>{ //dosomething });
   *
   */
  function emittable() {
      return function (target) {
          target.prototype.__callbacks = {};
          /**
           * attach handler for specified event.
           *
           * @param {String} name Name of Event.
           * @param {Function} fn Handler of Event.
           */
          target.prototype.on = function (name, fn) {
              if (typeof name !== 'string' || typeof fn !== 'function')
                  throw new Error('Arguments illegal!');
              this.__callbacks[name] = this.__callbacks[name] || [];
              var handlers = this.__callbacks[name];
              if (handlers.indexOf(fn) === -1) {
                  handlers.push(fn);
              }
              return this;
          };
          /**
           * detach handler from specified event. If handler not specified, detach all of handlers.
           *
           * @param {String} name Name of Event.
           * @param {Function} fn Handler of Event.
           */
          target.prototype.off = function (name, fn) {
              if (!this.__callbacks[name])
                  return this;
              if (typeof fn === 'undefined') {
                  delete this.__callbacks[name];
              }
              if (typeof fn !== 'function')
                  throw new Error('second param must be function!');
              var handlers = this.__callbacks[name];
              var index = handlers.indexOf(fn);
              if (index !== -1) {
                  handlers.splice(index, 1);
              }
              return this;
          };
          /**
           * Trigger handler once.
           *
           * @param {String} name Name of Event.
           * @param {Function} fn Handler of Event.
           */
          target.prototype.once = function (name, fn) {
              var _this = this;
              return this.on(name, function () {
                  var arg = [];
                  for (var _i = 0; _i < arguments.length; _i++) {
                      arg[_i] = arguments[_i];
                  }
                  fn.apply(_this, arg);
                  _this.off(name, fn);
              });
          };
          /**
           * Trigger handlers of specified event.
           *
           * @param {String} name Name of Event.
           */
          target.prototype.emit = function (name) {
              var args = [];
              for (var _i = 1; _i < arguments.length; _i++) {
                  args[_i - 1] = arguments[_i];
              }
              var handlers = this.__callbacks[name];
              if (!handlers)
                  return;
              for (var i = 0, len = handlers.length; i < len; i++) {
                  var fn = handlers[i];
                  if (fn.apply(this, args) === false) {
                      if (event && event.stopPropagation)
                          event.stopPropagation();
                      break;
                  }
              }
          };
          return target;
      };
  }
  /**
   * Use Event Emitter as instance.
   */
  var Emitter = /** @class */ (function () {
      function Emitter() {
      }
      Emitter = __decorate([
          emittable()
      ], Emitter);
      return Emitter;
  }());
  //# sourceMappingURL=emitter.js.map

  // 白板所有元素的父类
  var Item = /** @class */ (function () {
      function Item(options) {
          /**
           * Composite rule used for canvas globalCompositeOperation
           * possible value:
           * [ 'source-over','source-in','source-out','source-atop',
           *   'destination-over','destination-in','destination-out','destination-atop',
           *   'lighter', 'copy','xor', 'multiply', 'screen', 'overlay', 'darken',
           *   'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light',
           *   'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'
           * ]
           *
           * @type String
           * @default
           */
          this.globalCompositeOperation = 'source-over'; //'xor'
          this.filter = 'blur(5px)'; //experiment feature.
          this.scaleMode = 'free'; //no-scale, free, proportion
          this.style = new Style();
          if (options) {
              var type = options.type, typeId = options.typeId, id = options.id, style = options.style, rest = __rest(options, ["type", "typeId", "id", "style"]);
              type && (this.type = type);
              this.typeId = typeId || -Infinity;
              this.id = id || tsid();
              this.style = new Style(style);
              if (this.showShadow) {
                  this.style.shadowColor = this.style.strokeStyle;
                  this.style.shadowBlur = 20;
              }
              this.handleRest(rest);
          }
          this.matrix = new Matrix();
      }
      Item.prototype.handleRest = function (preset) {
          var _this = this;
          if (!preset)
              return;
          Object.keys(preset).forEach(function (key) {
              var item = preset[key];
              _this[key] = item;
          });
      };
      /**
       * Unite bounds of children , and return a new Rect.
       * @param children
       */
      Item.prototype.uniteBoundsOfChildren = function (children) {
          var x1 = Infinity, x2 = -x1, y1 = x1, y2 = x2;
          for (var i = 0, l = children.length; i < l; i++) {
              //@ts-ignore
              var bound = children[i].bounds;
              var xn = bound.x, yn = bound.y, xx = bound.x + bound.width, yx = bound.y + bound.height;
              if (xn < x1)
                  x1 = xn;
              if (xx > x2)
                  x2 = xx;
              if (yn < y1)
                  y1 = yn;
              if (yx > y2)
                  y2 = yx;
          }
          return new Rect(x1, y1, x2 - x1, y2 - y1, this);
      };
      Object.defineProperty(Item.prototype, "strokeBounds", {
          /**
           * Get bounds with stroke of current item.
           */
          get: function () {
              return this.bounds;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Item.prototype, "position", {
          /**
           * Get position based-on center point of current item.
           */
          get: function () {
              return this.bounds.center;
          },
          /**
           * Set position of current item.
           */
          set: function (value) {
              this.setPosition(value.x, value.y);
          },
          enumerable: true,
          configurable: true
      });
      Item.prototype.setPosition = function (x, y) {
          return this.translate(Point.instantiate(x, y).subtract(this.position));
      };
      /**
       * Translate to point.
       * @param point Translate delta.
       */
      Item.prototype.translate = function (point) {
          var _this = this;
          if (this.children) {
              this.children.filter(function (item) { return item.type === 'text'; }).map(function (item) {
                  _this.dispatchTextMouseDrag(item, point);
                  return item;
              });
          }
          if (this.type === 'text') {
              this.dispatchTextMouseDrag(this, point);
          }
          var mx = new Matrix();
          return this.transform(mx.translate(point));
      };
      /**
       * text move is different from others, so ..
       * @param item  instanceof Text
       * @param point delta
       */
      Item.prototype.dispatchTextMouseDrag = function (item, point) {
          if (item.onMouseDrag && typeof item.onMouseDrag === 'function') {
              item.onMouseDrag(point);
          }
      };
      Item.prototype.scale = function (sx, sy, point) {
          if (typeof sx !== 'number')
              throw new TypeError("param 'sx' of scale must be number!");
          if (typeof sy !== 'number')
              sy = sx;
          if (this.scaleMode === 'proportion') {
              var scaleRadio = Math.min(sx, sy);
              sx = sy = scaleRadio;
          }
          var mx = new Matrix();
          point = point || this.bounds.center;
          return this.transform(mx.scale(sx, sy, point));
      };
      /**
       * Rotate current item.
       * @param deg degree of Rotation.
       * @param point Base point.
       */
      Item.prototype.rotate = function (deg, point) {
          if (typeof deg !== 'number')
              throw new TypeError("param 'deg' of rotate must be number!");
          var mx = new Matrix();
          point = point || this.bounds.center;
          return this.transform(mx.rotate(deg, point));
      };
      Item.prototype.transform = function (matrix) {
          if (matrix) {
              //注意矩阵multify 顺序
              this.matrix = this.matrix.prepend(matrix);
          }
          this.transformContent(matrix);
          this.changed();
          return this;
      };
      /**
       * Transform group & compoundPath & Segment of path;
       * @param {*} matrix
       */
      Item.prototype.transformContent = function (matrix) {
          if (this.children) {
              this.children.forEach(function (item) { return item.transform(matrix); });
              this.matrix.reset();
          }
      };
      /**
       * If point in the bounds of item.
       * @param point
       */
      Item.prototype.containsPoint = function (point) {
          return this.bounds.containsPoint(point);
      };
      /**
       * Draw item on specified canvas context.
       *
       * @param ctx context of current canvas.
       *
       */
      Item.prototype.draw = function (ctx) {
          ctx.save();
          this.style.apply(ctx);
          ctx.globalCompositeOperation = this.globalCompositeOperation;
          this.matrix.applyToContext(ctx);
          this._draw(ctx);
          ctx.restore();
          if (this.selected)
              this.drawBoundRect(ctx);
          return this;
      };
      /**
       *  Get JSON format data, in [typeId, id, JSONData, style]
       *  e.g. [6, 9909959950, [[345, 234], [603, 436]], {"c":"#da64e2","w":5,"f":20}];
       */
      Item.prototype.toJSON = function () {
          return [this.typeId, this.id, this._toJSON(), this.style.toShortJSON()];
      };
      /**
       * remove from collection of layers;
       */
      Item.prototype.remove = function () {
          this.layer && this.layer.items.remove(this);
      };
      /**
       * 绘制边界矩形
       * @param ctx
       */
      Item.prototype.drawBoundRect = function (ctx) {
          ctx.save();
          ctx.strokeStyle = '#009dec';
          ctx.lineWidth = 1;
          ctx.strokeRect.apply(ctx, this.strokeBounds.toJSON());
          ctx.restore();
      };
      Item.prototype.onDeleted = function () { };
      Object.defineProperty(Item.prototype, "editable", {
          // for text Item
          set: function (_value) { },
          enumerable: true,
          configurable: true
      });
      Item.prototype.drawTextImg = function () { };
      Item.prototype.onMouseDrag = function (_point) { };
      Item = __decorate([
          emittable(),
          memoizable(),
          observeProps({
              selected: { type: Boolean, default: false },
              style: { type: Style, default: null },
              showShadow: { type: Boolean, default: true } //
          })
      ], Item);
      return Item;
  }());
  //# sourceMappingURL=Item.js.map

  /**
   * A full path and base class of all single path shapes.
   * 所有绘制图形的父类
   */
  var Path = /** @class */ (function (_super) {
      __extends(Path, _super);
      function Path() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          //props
          _this.segments = [];
          _this.isClose = false;
          return _this;
      }
      /**
       * Add Segement in path.
       * @param segment
       */
      Path.prototype.add = function (segment) {
          segment.owner = this;
          segment.contextPoint = this.contextPoint;
          this.segments.push(segment);
          this.contextPoint = segment.point;
          this.changed();
      };
      /*
      * Implements iterator.
      **/
      Path.prototype[Symbol.iterator] = function () {
          var i, len;
          return __generator(this, function (_a) {
              switch (_a.label) {
                  case 0:
                      i = 0, len = this.segments.length;
                      _a.label = 1;
                  case 1:
                      if (!(i < len)) return [3 /*break*/, 4];
                      return [4 /*yield*/, this.segments[i]];
                  case 2:
                      _a.sent();
                      _a.label = 3;
                  case 3:
                      i++;
                      return [3 /*break*/, 1];
                  case 4: return [2 /*return*/];
              }
          });
      };
      Path.prototype.clear = function () {
          this.segments = [];
      };
      Path.prototype.arc = function (x, y, r, sa, ea) {
          var segment = new ArcSegment();
          segment.arc = [x, y, r, sa, ea];
          this.add(segment);
          return this;
      };
      /**
       * Append  Arc Segment
       * @param cp1
       * @param cp2
       * @param radius
       */
      Path.prototype.arcTo = function (cp1, cp2, radius) {
          if (radius === void 0) { radius = 0; }
          var segment = new ArcSegment(cp1, cp2, radius);
          this.add(segment);
          return this;
      };
      Path.prototype.moveTo = function (x, y) {
          var point = Point.instantiate(x, y);
          var segment = new MoveSegment(point);
          this.add(segment);
          return this;
      };
      Path.prototype.lineTo = function (x, y) {
          var point = Point.instantiate(x, y);
          var segment = new LineSegment(point);
          this.add(segment);
          return this;
      };
      /**
       * Support chaining-call
       * @param cp1
       * @param cp2
       * @param point
       */
      Path.prototype.bezierCurveTo = function (cp1, cp2, point) {
          var segment = new BezierSegment(cp1, cp2, point);
          this.add(segment);
          return this;
      };
      /**
       * Add quadratic Curve Segment.
       * @param cp
       * @param point
       */
      Path.prototype.quadraticCurveTo = function (cp, point) {
          //二阶转三阶
          var current = this.contextPoint;
          if (!current)
              return this;
          // This is exact:
          // If we have the three quad points: A E D,
          // and the cubic is A B C D,
          // B = E + 1/3 (A - E)
          // C = E + 1/3 (D - E)
          this.bezierCurveTo(cp.add(current.subtract(cp).multiply(1 / 3)), cp.add(point.subtract(cp).multiply(1 / 3)), point);
          return this;
      };
      Path.prototype.quadraticCurveTo2 = function (cp, point) {
          var segment = new QuadraticSegment(cp, point);
          this.add(segment);
          return this;
      };
      Path.prototype.closePath = function () {
          this.isClose = true;
      };
      Object.defineProperty(Path.prototype, "bounds", {
          /**
           * get bounds of path. It's a memoized getter for performance.
           */
          get: function () {
              return this.uniteBoundsOfChildren(this.segments);
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Path.prototype, "strokeBounds", {
          /**
           * Get bounds with stroke.
           */
          get: function () {
              return this.bounds.expand(this.style.lineWidth / 2);
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Path.prototype, "length", {
          /**
           * get length of path
           */
          get: function () {
              return this.segments.reduce(function (arr, item) { return (arr += item.length); }, 0);
          },
          enumerable: true,
          configurable: true
      });
      /**
       * Simplify current path, and rebuild segments
       */
      Path.prototype.simplify = function () {
          //不优化小于3个点的曲线
          if (this.segments.length < 3)
              return this;
          var segments = fitCurve(this.segments.map(function (item) { return item.point; }), 1);
          this.segments = [this.segments[0]].concat(segments);
          this.changed();
          return this;
      };
      /**
       * Smooth current path, and rebuild segments
       */
      Path.prototype.smooth = function () {
          var segments = smoothCurve(this.segments, this.isClose);
          this.segments = segments;
          this.changed();
          return this;
      };
      /**
       * If point in path.
       * @param point
       */
      Path.prototype.containsPoint = function (point) {
          var _this = this;
          // If point not in bounds of path, return false.
          if (!_super.prototype.containsPoint.call(this, point))
              return false;
          if (this.fill)
              return true;
          var seg = this.segments.find(function (item) { return item.containsPoint(point, _this.style.lineWidth); });
          return !!seg;
      };
      /**
       *
       * transform matrix
       * @param matrix
       */
      Path.prototype.transformContent = function (matrix) {
          this.segments.forEach(function (item) {
              item.transformCoordinates(matrix);
          });
          this.matrix.reset();
      };
      Path.prototype._draw = function (ctx) {
          ctx.beginPath();
          for (var i = 0, segment = void 0, len = this.segments.length; i < len; ++i) {
              segment = this.segments[i];
              switch (segment.command // first letter
              ) {
                  case 'm':
                  case 'M': // moveTo, absolute
                      ctx.moveTo(segment.point.x, segment.point.y);
                      break;
                  case 'a':
                  case 'A':
                      ctx.arcTo.apply(ctx, segment.args);
                      break;
                  case 'l':
                  case 'L': // lineto, absolute
                      ctx.lineTo.apply(ctx, segment.args);
                      break;
                  case 'q':
                  case 'Q':
                      ctx.quadraticCurveTo.apply(ctx, segment.args);
                      break;
                  case 'c':
                  case 'C':
                      ctx.bezierCurveTo.apply(ctx, segment.args);
                      break;
              }
          }
          if (this.isClose)
              ctx.closePath();
          //和svg不同，svg 的fillColor 会自动fill, canvas 则通过API控制
          if (this.fill && this.style.hasFill)
              // 如果fill 模式为true, 则 执行fill
              ctx.fill(this.style.fillRule);
          if (this.stroke && this.style.hasStroke)
              // 如果stroke 模式为true, 则 执行stroke
              ctx.stroke();
          if (this.showAuxiliary)
              this.segments.forEach(function (segment) { return segment.draw(ctx); });
          return this;
      };
      Path.prototype._toJSON = function () {
          return this.segments.map(function (item) { return item.toJSON(); });
      };
      Path.prototype.toString = function () {
          var segmentSVG = this.segments.map(function (item) { return item.toString(); }).join(' ');
          return "<path d=\"" + segmentSVG + " " + (this.isClose ? 'z' : '') + "\"></path>";
      };
      __decorate([
          memoized()
      ], Path.prototype, "bounds", null);
      __decorate([
          memoized()
      ], Path.prototype, "length", null);
      Path = __decorate([
          observeProps({
              fill: { type: Boolean, default: false },
              showAuxiliary: { type: Boolean, default: false },
              stroke: { type: Boolean, default: true },
          })
      ], Path);
      return Path;
  }(Item));
  //# sourceMappingURL=Path.js.map

  //Dom helpers
  /**
   *
   * @param {*} element
   * @param {*} styles
   */
  function setStyle(element, styles) {
      var elementStyle = element.style;
      if (!elementStyle) {
          return element;
      }
      for (var property in styles) {
          var normalizedProperty = property === 'float' || property === 'cssFloat'
              //@ts-ignore
              ? typeof elementStyle.styleFloat === 'undefined'
                  ? 'cssFloat'
                  : 'styleFloat'
              : property;
          elementStyle[normalizedProperty] = styles[property];
      }
      return element;
  }
  /**
   * Remove listeners to element.
   * @param {DomElement} element
   * @param {String} eventType, e.g. "mousemove", "mousemove mousedown"
   * @param {Function} handler
   */
  function addListener(element, eventType, handler) {
      if (!element)
          return;
      var events = eventType.split(' ');
      if (events.length > 1) {
          for (var i = 0; i < events.length; i++) {
              addListener(element, events[i], handler);
          }
          return;
      }
      if (element.addEventListener) {
          element.addEventListener(eventType, handler, false);
          //@ts-ignore
      }
      else if (element.attachEvent) {
          //@ts-ignore
          element.attachEvent('on' + eventType, handler);
      }
      else {
          element['on' + eventType] = handler;
      }
  }
  /**
   * Remove listeners from element.
   * @param {DomElement} element
   * @param {String} eventType, e.g. "mousemove", "mousemove mousedown"
   * @param {Function} handler
   */
  function removeListener(element, eventType, handler) {
      if (!element)
          return;
      var events = eventType.split(' ');
      if (events.length > 1) {
          for (var i = 0; i < events.length; i++) {
              removeListener(element, events[i], handler);
          }
          return;
      }
      if (element.removeEventListener) {
          element.removeEventListener(eventType, handler, false);
          //@ts-ignore
      }
      else if (element.detachEvent) {
          //@ts-ignore
          element.detachEvent('on' + eventType, handler);
      }
      else {
          element['on' + eventType] = null;
      }
  }
  //# sourceMappingURL=dom.js.map

  /**
   * ItemCollection Embedded-Array 版本
   */
  var arrMethods = {};
  var arr = Array.prototype;
  //Inject Array methods into ItemCollection.
  ['splice', 'push', 'unshift', 'sort', 'map', 'forEach', 'find', 'reduce', 'reduceRight', 'filter', 'includes'].forEach(function (method) {
      return (arrMethods[method] = function () {
          return arr[method].apply(this['items'], arguments);
      });
  });
  /**
   * path collection of canvas.
   * Behavior like an array.
   */
  var ItemCollection = /** @class */ (function () {
      /**
       *
       * @param {Array} items
       * @param {Layer} layer
       */
      function ItemCollection(layer, items) {
          this.items = [];
          this.buffered = [];
          if (items)
              this.items = items;
          this.layer = layer;
      }
      ItemCollection_1 = ItemCollection;
      // private includes: () => Array<Item>;
      /**
       * Compare 2 ItemCollection by id
       *
       * @param left
       * @param right
       */
      ItemCollection.diff = function (left, right) {
          if (left.length !== right.length)
              return true;
          for (var i = 0, len = left.length; i < len; i++) {
              if (left[i].id !== right[i].id)
                  return true;
          }
          return false;
      };
      Object.defineProperty(ItemCollection.prototype, "length", {
          /**
           * Get length of items.
           */
          get: function () {
              return this.items.length;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(ItemCollection.prototype, "array", {
          /**
           * Internal getter, visit item-array directly
           */
          get: function () {
              return this.items;
          },
          enumerable: true,
          configurable: true
      });
      /**
       * All items-collection change ,will trigger whiteboard re-draw.
       */
      ItemCollection.prototype.changed = function () {
          this.layer && this.layer.markAsDirty();
      };
      /**
       * filter duplicated items
       */
      ItemCollection.prototype.distinct = function () {
          this.items = __spread((new Set(this.items)));
      };
      /*
      * Implements iterator.
      **/
      ItemCollection.prototype[Symbol.iterator] = function () {
          var i, len;
          return __generator(this, function (_a) {
              switch (_a.label) {
                  case 0:
                      i = 0, len = this.items.length;
                      _a.label = 1;
                  case 1:
                      if (!(i < len)) return [3 /*break*/, 4];
                      return [4 /*yield*/, this.items[i]];
                  case 2:
                      _a.sent();
                      _a.label = 3;
                  case 3:
                      i++;
                      return [3 /*break*/, 1];
                  case 4: return [2 /*return*/];
              }
          });
      };
      /**
       * Compare with other ItemCollection.
       * @param other
       */
      ItemCollection.prototype.diff = function (other) {
          return ItemCollection_1.diff(this, other);
      };
      /**
       * Get item via index, equal to this[index]
       * @param index
       */
      ItemCollection.prototype.get = function (index) {
          return this.items[index];
      };
      /**
       * Set item at specified position,
       * @param index, specified position
       * @param item, whiteboard item to be add.
       */
      ItemCollection.prototype.set = function (item, index) {
          if (this.items[index] === item)
              return false;
          if (typeof index === 'undefined') {
              //add same item only once.
              if (this.includes(item))
                  return false;
              return this.add(item);
          }
          if (this.layer)
              item.layer = this.layer;
          this.items[index] = item;
          //@ts-ignore
          {
              this[index] = item;
          }
          this.changed();
          return true;
      };
      /**
       * Add whiteboard item.
       * @param item
       */
      ItemCollection.prototype.add = function (item) {
          // if (!(item instanceof Item)) throw new TypeError('Only Item can add to Collection!');
          if (this.layer)
              item.layer = this.layer;
          this.items.push(item);
          //@ts-ignore
          {
              var index = this.items.length - 1;
              this[index] = item;
          }
          this.changed();
          return this;
      };
      ItemCollection.prototype.buffer = function (item) {
          if (!(item instanceof Item))
              throw new TypeError('Only Item can add to Collection!');
          if (this.layer)
              item.layer = this.layer;
          this.buffered.push(item);
          this.changed();
          return this;
      };
      ItemCollection.prototype.flush = function () {
          var _a;
          (_a = this.items).push.apply(_a, __spread(this.buffered));
          this.buffered = [];
      };
      /**
       * Clear items.
       */
      ItemCollection.prototype.clear = function () {
          this.notifyDeleted(this.items);
          this.items = [];
          this.buffered = [];
          this.changed();
          return this;
      };
      /**
       * notify deleted Item
       * @param items deleted Items
       */
      ItemCollection.prototype.notifyDeleted = function (items) {
          items.map(function (item) { return item.onDeleted(); });
      };
      /**
       * Select All items, support keyboard event Ctrl+A.
       */
      ItemCollection.prototype.selectAll = function () {
          this.forEach(function (item) { return (item.selected = true); });
      };
      /**
       * anti-select current collection.
       */
      ItemCollection.prototype.antiSelect = function () {
          this.forEach(function (item) { return (item.selected = !item.selected); });
      };
      /**
       * unselect all items.
       */
      ItemCollection.prototype.unselect = function () {
          this.forEach(function (item) { return (item.selected = false); });
      };
      /**
       * Remove specified item from list.
       * @param item1
       */
      ItemCollection.prototype.remove = function (targetItem) {
          return this.delete(function (item) { return item === targetItem; });
      };
      /**
       * Remove item at specified index.
       * @param index
       */
      ItemCollection.prototype.removeAt = function (index) {
          var item = this.items[index];
          this.remove(item);
          return item;
      };
      /**
       * Delete items of current collection.
       * It will trigger layer-refresh;
       * @param fn, filter determine which item should be removed.
       */
      ItemCollection.prototype.delete = function (fn) {
          var deleted = new ItemCollection_1();
          this.items = this.items.filter(function (item) {
              if (!fn(item))
                  return true;
              deleted.add(item);
              return false;
          });
          this.changed();
          this.notifyDeleted(deleted.items);
          return deleted;
      };
      /**
       *
       * Delete selected items of current collection.
       */
      ItemCollection.prototype.deleteSelected = function () {
          var deleted = this.delete(function (item) { return item.selected; });
          if (this.layer && deleted.length > 0)
              this.layer.globalCtx.emit('items:delete', deleted.map(function (item) { return item.id; }));
          return deleted;
      };
      /**
       * Delete items by ids.
       * @param {Array} ids
       */
      ItemCollection.prototype.deleteById = function (ids) {
          if (ids === void 0) { ids = []; }
          return this.delete(function (item) { return ids.lastIndexOf(item.id) > -1; });
      };
      /**
       * Return the JSON-format information of current collection.
       */
      ItemCollection.prototype.toJSON = function () {
          return this.map(function (item) { return item.toJSON(); });
      };
      var ItemCollection_1;
      ItemCollection = ItemCollection_1 = __decorate([
          mixin(arrMethods)
      ], ItemCollection);
      return ItemCollection;
  }());
  //# sourceMappingURL=ItemCollection.js.map

  /**
   * Create canvas layer, and Manage all canvases in whiteboard.
   */
  var Layer = /** @class */ (function () {
      /**
       * Create whiteboard layer with specified width & height.
       *
       * @param width
       * @param height
       * @param role
       */
      function Layer(width, height, role, props) {
          if (role === void 0) { role = ''; }
          this.matrix = new Matrix();
          this.offscreen = false;
          this._isDirty = true;
          this._items = new ItemCollection(this);
          var el = document.createElement('canvas');
          el.setAttribute('data-role', role);
          el.setAttribute('canvas-id', role);
          el.setAttribute('width', width.toString());
          el.setAttribute('height', height.toString());
          this.role = role;
          this.el = el;
          if (!this.offscreen && props.wrapper) {
              this.wrapper = props.wrapper;
              this.wrapper.appendChild(this.el);
          }
          this.globalCtx = props.context;
          // if (typeof wx !== 'undefined' && wx.createCanvasContext) {
          //   // adapt to wechat-mini-app
          //   this.ctx = wx.createCanvasContext(role);
          // } else {
          //   this.ctx = el.getContext('2d') as CanvasRenderingContext2D;
          // }
          this.ctx = el.getContext('2d');
          this.width = width;
          this.height = height;
          this._bounds = new Rect(0, 0, this.width, this.height);
          setStyle(el, {
              position: 'absolute',
              width: this.width + "px",
              height: this.height + "px",
              left: 0,
              top: 0,
              'touch-action': 'none',
          });
          if (this.deviceRatio > 1) {
              this.applyRatio();
          }
      }
      /**
       * Move items from one to other
       * @param source layer
       * @param target layer
       * @param fn callback.
       */
      Layer.elevator = function (source, target, fn) {
          var sourceItems = source.items;
          for (var i = 0, len = sourceItems.length; i < len; i++) {
              var element = sourceItems.get(0);
              source.items.remove(element);
              target.items.add(element);
          }
          fn && fn();
      };
      Object.defineProperty(Layer.prototype, "bounds", {
          /**
           * Get bounds of layer.
           */
          get: function () {
              return this._bounds;
          },
          enumerable: true,
          configurable: true
      });
      /**
       * Alias of items.append .
       * @param item
       */
      Layer.prototype.append = function (item) {
          this.items.add(item);
      };
      /**
       * Alias of items.remove .
       * @param item
       */
      Layer.prototype.remove = function (item) {
          this.items.remove(item);
      };
      // appendTo(whiteboard: Whiteboard) {
      //   //appendTo wrapper.
      //   if (this.offscreen) return;
      //   this.wrapper = whiteboard.wrapper;
      //   this.wrapper.appendChild(this.el);
      //   //ref whiteboard context.
      //   this.globalCtx = whiteboard.context;
      // }
      Layer.prototype._draw = function () {
          var _this = this;
          this.globalCtx.refreshCount++;
          this._items.forEach(function (item) { return item && item.draw(_this.ctx); });
      };
      /**
       * refresh current layer.
       */
      Layer.prototype.refresh = function () {
          this._clearCanvas();
          this.globalCtx.emit('layer:refresh', { layer: this });
          this._draw();
          this._isDirty = false;
      };
      Object.defineProperty(Layer.prototype, "items", {
          get: function () {
              return this._items;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Layer.prototype, "deviceRatio", {
          get: function () {
              return window.devicePixelRatio || 1;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Layer.prototype, "pixelRadio", {
          get: function () {
              var ctx = this.ctx;
              var canvas = document.createElement('canvas');
              if (!/^off|false$/.test(canvas.getAttribute('hidpi') || '')) {
                  var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                      ctx.mozBackingStorePixelRatio ||
                      ctx.msBackingStorePixelRatio ||
                      ctx.oBackingStorePixelRatio ||
                      ctx.backingStorePixelRatio ||
                      1;
                  return this.deviceRatio / backingStoreRatio;
              }
              return this.deviceRatio;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Layer.prototype, "isDirty", {
          /**
           * prop 'isDirty' is readonly
           */
          get: function () {
              return this._isDirty;
          },
          enumerable: true,
          configurable: true
      });
      /**
       * Mark layer as 'dirty', it will be refreshed on next tick.
       */
      Layer.prototype.markAsDirty = function () {
          this._isDirty = true;
      };
      /**
       * Apply deviceRatio to Canvas, for retina.
       */
      Layer.prototype.applyRatio = function () {
          this.el.width = this.width * this.deviceRatio;
          this.el.height = this.height * this.deviceRatio;
          this.ctx.scale(this.deviceRatio, this.deviceRatio);
      };
      /**
       * reset transform for initial state.
       */
      Layer.prototype.resetTransform = function () {
          this.ctx.setTransform(this.deviceRatio, 0, 0, this.deviceRatio, 0, 0);
      };
      Layer.prototype._clearCanvas = function () {
          this.ctx.clearRect(0, 0, this.width, this.height);
      };
      /**
       * clear current layer.
       */
      Layer.prototype.clear = function () {
          this.items.clear();
      };
      /**
       * 等比缩放画布
       * @param radio
       */
      Layer.prototype.zoom = function (radio) {
          // this.ctx.scale(radio, radio);
          setStyle(this.el, {
              width: this.width * radio + "px",
              height: this.height * radio + "px",
          });
          this.el.width = this.el.width * radio;
          this.el.height = this.el.height * radio;
          this.ctx.restore();
          this.ctx.save();
          if (this.deviceRatio > 1)
              this.ctx.scale(this.deviceRatio, this.deviceRatio);
          this.ctx.scale(radio, radio);
          this.markAsDirty();
      };
      /**
       * Move own items to target
       * @param target
       */
      Layer.prototype.elevateTo = function (target) {
          Layer.elevator(this, target);
      };
      /**
       * 释放该Layer
       */
      Layer.prototype.dispose = function () {
          this.wrapper && this.wrapper.removeChild(this.el);
      };
      return Layer;
  }());
  //# sourceMappingURL=Layer.js.map

  var requestAnimationFrame$1 = typeof window !== 'undefined' && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function (fn) {
    return setTimeout(fn, 16);
  };

  var noop = function noop() {};

  var cancelAnimationFrame = window.cancelAnimationFrame || window.clearTimeout;
  /**
   * Changes value from one to another within certain period of time, invoking callbacks as value is being changed.
   * @memberOf nebula
   * @param {Object} [options] Animation options
   * @param {Function} [options.onChange] Callback; invoked on every value change
   * @param {Function} [options.onComplete] Callback; invoked when value change is completed
   * @param {Number} [options.startValue=0] Starting value
   * @param {Number} [options.endValue=100] Ending value
   * @param {Number} [options.byValue=100] Value to modify the property by
   * @param {Function} [options.easing] Easing function
   * @param {Number} [options.duration=500] Duration of change (in ms)
   */

  function animate$1(options) {
    requestAnimationFrame$1(function (timestamp) {
      options = options || {};

      var start = timestamp || +new Date(),
          duration = options.duration || 500,
          finish = start + duration,
          time,
          onChange = options.onChange || noop,
          abort = options.abort || noop,
          onComplete = options.onComplete || noop,
          easing = options.easing || function (k) {
        return k;
      },
          startValue = 'startValue' in options ? options.startValue : 0,
          endValue = 'endValue' in options ? options.endValue : 100,
          byValue = options.byValue || endValue - startValue;

      options.onStart && options.onStart();

      (function tick(ticktime) {
        if (abort()) {
          onComplete(endValue, 1, 1);
          return;
        }

        time = ticktime || +new Date();
        var currentTime = time > finish ? duration : time - start,
            timePerc = currentTime / duration,
            current = easing(currentTime / duration) * byValue + startValue,
            valuePerc = Math.abs((current - startValue) / byValue);
        onChange(current, valuePerc, timePerc);

        if (time > finish) {
          options.onComplete && options.onComplete();
          return;
        }

        requestAnimationFrame$1(tick);
      })(start);
    });
  }

  var f$1 = Object.getOwnPropertySymbols;

  var _objectGops = {
  	f: f$1
  };

  var f$2 = {}.propertyIsEnumerable;

  var _objectPie = {
  	f: f$2
  };

  // 19.1.2.1 Object.assign(target, source, ...)





  var $assign = Object.assign;

  // should work with symbols and should have deterministic property order (V8 bug)
  var _objectAssign = !$assign || _fails(function () {
    var A = {};
    var B = {};
    // eslint-disable-next-line no-undef
    var S = Symbol();
    var K = 'abcdefghijklmnopqrst';
    A[S] = 7;
    K.split('').forEach(function (k) { B[k] = k; });
    return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
  }) ? function assign(target, source) { // eslint-disable-line no-unused-vars
    var T = _toObject(target);
    var aLen = arguments.length;
    var index = 1;
    var getSymbols = _objectGops.f;
    var isEnum = _objectPie.f;
    while (aLen > index) {
      var S = _iobject(arguments[index++]);
      var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
      var length = keys.length;
      var j = 0;
      var key;
      while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
    } return T;
  } : $assign;

  // 19.1.3.1 Object.assign(target, source)


  _export(_export.S + _export.F, 'Object', { assign: _objectAssign });

  var assign$1 = _core.Object.assign;

  var assign$2 = assign$1;

  var $parseFloat = _global.parseFloat;
  var $trim$1 = _stringTrim.trim;

  var _parseFloat = 1 / $parseFloat(_stringWs + '-0') !== -Infinity ? function parseFloat(str) {
    var string = $trim$1(String(str), 3);
    var result = $parseFloat(string);
    return result === 0 && string.charAt(0) == '-' ? -0 : result;
  } : $parseFloat;

  // 18.2.4 parseFloat(string)
  _export(_export.G + _export.F * (parseFloat != _parseFloat), { parseFloat: _parseFloat });

  var _parseFloat$1 = _core.parseFloat;

  var _parseFloat$2 = _parseFloat$1;

  // Calculate an in-between color. Returns a "rgba()" string.
  // Credit: Edwin Martin <edwin@bitstorm.org>
  //         http://www.bitstorm.org/jquery/color-animation/jquery.animate-colors.js
  function calculateColor(begin, end, pos) {
    var color = 'rgba(' + _parseInt$2(begin[0] + pos * (end[0] - begin[0]), 10) + ',' + _parseInt$2(begin[1] + pos * (end[1] - begin[1]), 10) + ',' + _parseInt$2(begin[2] + pos * (end[2] - begin[2]), 10);

    color += ',' + (begin && end ? _parseFloat$2(begin[3] + pos * (end[3] - begin[3])) : 1);
    color += ')';
    return color;
  }
  /**
   * Changes the color from one to another within certain period of time, invoking callbacks as value is being changed.
   * @memberOf nebula
   * @param {String} fromColor The starting color in hex or rgb(a) format.
   * @param {String} toColor The starting color in hex or rgb(a) format.
   * @param {Number} [duration] Duration of change (in ms).
   * @param {Object} [options] Animation options
   * @param {Function} [options.onChange] Callback; invoked on every value change
   * @param {Function} [options.onComplete] Callback; invoked when value change is completed
   * @param {Function} [options.colorEasing] Easing function.
   * Note that this function only take two arguments (currentTime, duration).
   * Thus the regular animation easing functions cannot be used.
   */


  function animateColor(fromColor, toColor, duration, options) {
    var startColor = new Color(fromColor).toJSON(),
        endColor = new Color(toColor).toJSON();
    options = options || {};
    animate(assign$2(options, {
      duration: duration || 500,
      startValue: startColor,
      endValue: endColor,
      byValue: endColor,
      easing: function easing(currentTime, startValue, byValue, duration) {
        var posValue = options.colorEasing ? options.colorEasing(currentTime, duration) : 1 - Math.cos(currentTime / duration * (Math.PI / 2));
        return calculateColor(startValue, byValue, posValue);
      }
    }));
  }

  /**
   * Support Cursor & Event .. operate layer behavior
   * 最前面的一层, 相较于其他层有特定的行为。
   */
  var OperateLayer = /** @class */ (function (_super) {
      __extends(OperateLayer, _super);
      function OperateLayer(width, height, role, props) {
          var _this = _super.call(this, width, height, role, props) || this;
          _this.el.tabIndex = 1; //make OperateLayer focusable.
          return _this;
      }
      /**
       * set cursor of layer. Use for operateLayer.
       * @param value css cursor string
       */
      OperateLayer.prototype.setCursor = function (value) {
          if (typeof value === 'string') {
              this.el.style.cursor = value;
              this._cursorImage = undefined;
          }
          else {
              this._cursorImage = value;
              this._cursorImage.layer = this;
          }
          this.markAsDirty();
      };
      /**
       * clear current layer.
       */
      OperateLayer.prototype.clear = function () {
          _super.prototype.clear.call(this);
          this.setCursor('default');
      };
      /**
       * draw items and cursor, but draw cursor first!
       */
      OperateLayer.prototype._draw = function () {
          if (this._cursorImage)
              this._cursorImage.draw(this.ctx);
          _super.prototype._draw.call(this);
      };
      /**
       * 释放该Layer
       */
      OperateLayer.prototype.dispose = function () {
          this.wrapper && this.wrapper.removeChild(this.el);
      };
      return OperateLayer;
  }(Layer));
  //# sourceMappingURL=OperateLayer.js.map

  /**
   * Custom Mouse Event Class
   */
  /**
   * Mouse Event Class
   */
  var CustomizeMouseEvent = /** @class */ (function () {
      function CustomizeMouseEvent(originEvent, zoom) {
          this.originEvent = originEvent;
          this.type = originEvent.type;
          this.target = originEvent.target;
          this.zoom = zoom;
          if (originEvent instanceof MouseEvent)
              this.offsetX = originEvent.offsetX;
          if (originEvent instanceof MouseEvent)
              this.offsetY = originEvent.offsetY;
      }
      Object.defineProperty(CustomizeMouseEvent.prototype, "point", {
          get: function () {
              if (!this._point) {
                  this._point = new Point(this.offsetX * (1 / this.zoom), this.offsetY * (1 / this.zoom));
              }
              return this._point;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(CustomizeMouseEvent.prototype, "delta", {
          get: function () {
              if (this.originEvent instanceof MouseEvent) {
                  return new Point(this.originEvent.movementX, this.originEvent.movementY);
              }
              return new Point(0, 0);
          },
          enumerable: true,
          configurable: true
      });
      CustomizeMouseEvent.prototype.toString = function () {
          return ("{ type: '" +
              this.type +
              "', point: " +
              this.point +
              ', target: ' +
              this.target +
              (this.delta ? ', delta: ' + this.delta : '') +
              ' }');
      };
      return CustomizeMouseEvent;
  }());
  var keyCode = {
      INSERT: 45,
      DELETE: 46,
      BACKSPACE: 8,
      TAB: 9,
      ENTER: 13,
      ESC: 27,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      END: 35,
      HOME: 36,
      SPACEBAR: 32,
      PAGEUP: 33,
      PAGEDOWN: 34,
      F2: 113,
      F10: 121,
      F12: 123,
      NUMPAD_PLUS: 107,
      NUMPAD_MINUS: 109,
      NUMPAD_DOT: 110,
  };
  //# sourceMappingURL=EventType.js.map

  // 20.3.3.1 / 15.9.4.4 Date.now()


  _export(_export.S, 'Date', { now: function () { return new Date().getTime(); } });

  var now = _core.Date.now;

  var now$1 = now;

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  /**
   * debounce & throttle.
   * Adapt from Lodash.js
   */
  var isObject = function isObject(item) {
    return _typeof(item) === 'object' && typeof item === 'function';
  };

  function debounce(func, wait, options) {
    var lastArgs, lastThis, maxWait, result, timerId, lastCallTime;
    var lastInvokeTime = 0;
    var leading = false;
    var maxing = false;
    var trailing = true; // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.

    var useRAF = !wait && wait !== 0 && typeof root.requestAnimationFrame === 'function';

    if (typeof func != 'function') {
      throw new TypeError('Expected a function');
    }

    wait = +wait || 0;

    if (isObject(options)) {
      leading = !!options.leading;
      maxing = 'maxWait' in options;
      maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    function invokeFunc(time) {
      var args = lastArgs;
      var thisArg = lastThis;
      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }

    function startTimer(pendingFunc, wait) {
      if (useRAF) {
        return root.requestAnimationFrame(pendingFunc);
      }

      return setTimeout(pendingFunc, wait);
    }

    function cancelTimer(id) {
      if (useRAF) {
        return root.cancelAnimationFrame(id);
      }

      clearTimeout(id);
    }

    function leadingEdge(time) {
      // Reset any `maxWait` timer.
      lastInvokeTime = time; // Start the timer for the trailing edge.

      timerId = startTimer(timerExpired, wait); // Invoke the leading edge.

      return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime;
      var timeSinceLastInvoke = time - lastInvokeTime;
      var timeWaiting = wait - timeSinceLastCall;
      return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    }

    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime;
      var timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.

      return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }

    function timerExpired() {
      var time = now$1();

      if (shouldInvoke(time)) {
        return trailingEdge(time);
      } // Restart the timer.


      timerId = startTimer(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
      timerId = undefined; // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.

      if (trailing && lastArgs) {
        return invokeFunc(time);
      }

      lastArgs = lastThis = undefined;
      return result;
    }

    function cancel() {
      if (timerId !== undefined) {
        cancelTimer(timerId);
      }

      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    function flush() {
      return timerId === undefined ? result : trailingEdge(now$1());
    }

    function pending() {
      return timerId !== undefined;
    }

    function debounced() {
      var time = now$1();

      var isInvoking = shouldInvoke(time);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      lastArgs = args;
      lastThis = this;
      lastCallTime = time;

      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }

        if (maxing) {
          // Handle invocations in a tight loop.
          timerId = startTimer(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }

      if (timerId === undefined) {
        timerId = startTimer(timerExpired, wait);
      }

      return result;
    }

    debounced.cancel = cancel;
    debounced.flush = flush;
    debounced.pending = pending;
    return debounced;
  }

  function throttle(func, wait, options) {
    var leading = true;
    var trailing = true;

    if (typeof func != 'function') {
      throw new TypeError('Expected a function');
    }

    if (isObject(options)) {
      leading = 'leading' in options ? !!options.leading : leading;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    return debounce(func, wait, {
      leading: leading,
      maxWait: wait,
      trailing: trailing
    });
  }

  var mousedown = 'mousedown';
  var mousemove = 'mousemove';
  var mouseup = 'mouseup';
  /**
   * Determine if the distance between the two points is less than a value
   * @param prev
   * @param next
   * @param distance, default value is 5
   */
  function throttleDistance(prev, next, distance) {
      if (distance === void 0) { distance = 5; }
      if (!prev)
          return true;
      return !next.nearby(prev, distance);
  }
  var EventHandler = /** @class */ (function () {
      function EventHandler(items) {
          var _this = this;
          // private isDragging = false;
          this.isMouseDown = false;
          this.keyModifiers = {};
          this.onMouseMove = function (event) {
              event.preventDefault();
              var _event = _this.getMouseEvent(event), point = _event.point;
              var distance = _this.context.settings.distance;
              if (distance && !throttleDistance(point, _this.lastPoint, distance))
                  return;
              if (_event.target !== _this.canvas)
                  return;
              var contain = _this.layer.bounds.containsPoint(point);
              if (!contain)
                  return;
              //@ts-ignore
              if (typeof event.touches !== 'undefined' && event.touches.length > 1) {
                  return;
              }
              // mouseenter, mouseleave.
              if (_this.isMouseDown) {
                  // this.isDragging = true;
                  if (_this.draggingTriggered === 0 && _this.invokeToolSlotHandler('onBeforeMouseDrag', _event) === false)
                      return;
                  _this.draggingTriggered++;
                  _this.invokeToolSlotHandler('onMouseDrag', _event);
              }
              else {
                  _this.invokeToolSlotHandler('onMouseMove', _event);
              }
              _this.lastPoint = point;
          };
          this.items = items;
      }
      Object.defineProperty(EventHandler.prototype, "tool", {
          get: function () {
              return this._currentTool;
          },
          set: function (tool) {
              var isChanged = (!!this._currentTool && this._currentTool.type) !== tool.type;
              isChanged && this.invokeToolSlotHandler('toolChanged', { type: tool.type }); // notice pre tool
              this._currentTool = tool;
              if (this._currentTool) {
                  this._currentTool.layer = this.layer;
                  this._currentTool.globalCtx = this.context;
                  this.layer.clear();
              }
              this._currentTool.items = this.items;
              isChanged && this.invokeToolSlotHandler('toolChanged', { type: tool.type }); // notice next tool
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(EventHandler.prototype, "inverseMatrix", {
          get: function () {
              return this.layer.matrix.inverse();
          },
          enumerable: true,
          configurable: true
      });
      /**
       * Bind mouseEvent and keyboardEvent to layer
       * @param layer the instance of Layer
       */
      EventHandler.prototype.bind = function (layer) {
          this.layer = layer;
          this.canvas = layer.el;
          this.onMouseMove = throttle(this.onMouseMove, 0).bind(this); //
          this.onMouseUp = this.onMouseUp.bind(this);
          var canvas = this.canvas;
          //TODO: 改为箭头函数，private， readonly
          addListener(canvas, mousedown, this.onMouseDown.bind(this));
          addListener(canvas, mousemove, this.onMouseMove);
          addListener(canvas, 'mouseenter', this.onMouseEnter.bind(this));
          addListener(canvas, 'mouseleave', this.onMouseLeave.bind(this));
          addListener(canvas, 'keydown', this.onKeyDown.bind(this));
          addListener(canvas, 'keypress', this.onKeyPress.bind(this));
          addListener(canvas, 'keyup', this.onKeyUp.bind(this));
      };
      EventHandler.prototype.unbind = function () {
          removeListener(document, mouseup, this.onMouseUp);
          removeListener(document, mousemove, this.onMouseMove);
      };
      EventHandler.prototype.onKeyDown = function (event) {
          var keyModifiers = this.keyModifiers;
          keyModifiers[event.key] = true;
          var eventKey = ['z', 'y', 'a'];
          // windows keyboard or mac keyboard
          if (keyModifiers.control || keyModifiers.meta) {
              // if (!toolAvailable && eventKey.includes(event.key)) return;
              if (eventKey.includes(event.key))
                  return;
              var isRedo = keyModifiers.meta ? keyModifiers.shift && event.key === 'z' : event.key === 'y';
              if (isRedo) {
                  window.commands.redo();
              }
              else if (event.key === 'z') {
                  window.commands.undo();
              }
              else if (event.key === 'a') {
                  this.items.selectAll();
                  event.preventDefault();
              }
          }
          if (event.keyCode === keyCode.DELETE) {
              this.items.deleteSelected();
          }
      };
      EventHandler.prototype.onKeyPress = function (event) {
          console.log(event);
      };
      EventHandler.prototype.onKeyUp = function (event) {
          if ((event.keyCode === keyCode.DELETE || event.keyCode === keyCode.BACKSPACE)
          // this._currentTool.type === toolTypes.SELECTOR
          ) {
              // if (!toolAvailable) return;
              window.commands.delete();
          }
          this.keyModifiers[event.key] = false;
      };
      EventHandler.prototype.getMouseEvent = function (event) {
          var _event = new CustomizeMouseEvent(event, this.context.zoom);
          var point = _event.point;
          this.inverseMatrix.applyToPoint(point);
          return _event;
      };
      EventHandler.prototype.onMouseDown = function (event) {
          event.preventDefault();
          var _event = this.getMouseEvent(event);
          if (this.invokeToolSlotHandler('onBeforeMouseDown', _event) === false)
              return;
          this.isMouseDown = true;
          this.draggingTriggered = 0;
          this.invokeToolSlotHandler('onMouseDown', _event);
          addListener(document, mouseup, this.onMouseUp);
          addListener(document, mousemove, this.onMouseMove);
          removeListener(this.canvas, mousemove, this.onMouseMove);
      };
      EventHandler.prototype.onMouseUp = function (event) {
          event.preventDefault();
          this.isMouseDown = false;
          // this.isDragging = false;
          this.invokeToolSlotHandler('onMouseUp', this.getMouseEvent(event));
          removeListener(document, mouseup, this.onMouseUp);
          removeListener(document, mousemove, this.onMouseMove);
          addListener(this.canvas, mousemove, this.onMouseMove);
      };
      EventHandler.prototype.onMouseEnter = function (event) {
          this.invokeToolSlotHandler('onMouseEnter', event);
      };
      EventHandler.prototype.onMouseLeave = function (event) {
          this.invokeToolSlotHandler('onMouseLeave', event);
      };
      /**
       * Call handler of current tool.
       * @param {String} name Name of handler
       * @param  {...any} args arguments
       */
      EventHandler.prototype.invokeToolSlotHandler = function (name, data) {
          if (!this.tool || typeof this.tool[name] !== 'function')
              return null; //ensure return undefined when handler is null.
          // if(!false)
          //   console.log(this.tool.type, name, 'triggered!');
          return this.tool[name](data);
      };
      return EventHandler;
  }());
  //# sourceMappingURL=EventHandler.js.map

  /**
   * Base class of tools, for:
   * 1) create item.
   * 2) handle mouse & keyboard event.
   * 3) emit event for websocket.
   * 4) manage items of operateLayer.
   */
  var toolStatus = {
      move: 'move',
      select: 'select',
      drawing: 'drawing',
      scale: 'scale',
      translate: 'translate',
  };
  var Tool = /** @class */ (function () {
      function Tool(type) {
          this.mode = toolStatus.select;
          this.type = type;
          if (typeof this._init === 'function') {
              this._init();
          }
      }
      Tool.prototype.setLayerCursor = function (cursor) {
          if (!this._cursor)
              this.layer.setCursor(cursor);
      };
      Object.defineProperty(Tool.prototype, "layer", {
          get: function () {
              return this._layer;
          },
          /**
           * Items of activeLayer.
          //  */
          // get items() {
          //   return window.items;
          // }
          /**
           * Get layer of tool
           */
          set: function (value) {
              this._layer = value;
          },
          enumerable: true,
          configurable: true
      });
      return Tool;
  }());
  //# sourceMappingURL=Tool.js.map

  var ArcDrawing = /** @class */ (function (_super) {
      __extends(ArcDrawing, _super);
      function ArcDrawing(type) {
          var _this = _super.call(this, type) || this;
          _this.center = null;
          return _this;
      }
      ArcDrawing.prototype.onMouseDown = function (event) {
          if (this.center) {
              this.radius = event.point.subtract(this.center).length;
          }
          else
              this.center = event.point;
      };
      ArcDrawing.prototype.onMouseMove = function (_event) { };
      ArcDrawing.prototype.onMouseDrag = function (_event) { };
      ArcDrawing.prototype.onMouseUp = function (_event) { };
      return ArcDrawing;
  }(Tool));
  //# sourceMappingURL=ArcDrawing.js.map

  var viewWidth = 1000;
  var viewHeight = 800;
  /**
   * The Raster item represents an image.
   * Image transform 靠 ? , 而非指定的初始x, y;
   */
  var Img = /** @class */ (function (_super) {
      __extends(Img, _super);
      function Img(options, src) {
          var _this = _super.call(this, options) || this;
          _this.loaded = false;
          _this.strokeDashArray = [0, 1];
          _this.naturalWidth = 0;
          _this.naturalHeight = 0;
          _this._src = src;
          _this.loadImage();
          return _this;
      }
      Img_1 = Img;
      Img.instantiate = function (options, src) {
          return new Img_1(options, src);
      };
      Object.defineProperty(Img.prototype, "src", {
          get: function () {
              return this._src;
          },
          set: function (_src) {
              this.loaded = false;
              this._src = _src;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Img.prototype, "bounds", {
          get: function () {
              var bound = this.initBounds.clone();
              this.matrix.applyToRect(bound);
              bound.owner = this;
              return bound;
          },
          enumerable: true,
          configurable: true
      });
      /**
       * Load image & trigger callback;
       * @param fn callback
       */
      Img.prototype.loadImage = function (fn) {
          var _this = this;
          if (!this.src && this.image && this.loaded)
              return;
          var img = document.createElement('img');
          img.setAttribute('crossOrigin', 'anonymous');
          img.src = this.src;
          img.onload = function () {
              _this.loaded = !!(img && img.src && img.complete);
              _this.naturalWidth = img ? img.naturalWidth || img.width : 0;
              _this.naturalHeight = img ? img.naturalHeight || img.height : 0;
              //TODO:Emit load event
              _this.initBounds = _this.calcInitBounds();
              fn && fn.call(_this, img);
              img.onload = img.onerror = function () { };
          };
          img.onerror = function () {
              console.warn("can't load image '" + _this.src + "'");
              //TODO:Emit error event
              img.onload = img.onerror = function () { };
          };
          this.image = img;
      };
      /**
       * 通过图像原始大小，算出宽高及起始位置，并返回bounds.(保持图片原始宽高比)
       */
      Img.prototype.calcInitBounds = function () {
          var viewRadio = viewWidth / viewHeight;
          var imgRadio = this.naturalWidth / this.naturalHeight;
          var x, y, width, height;
          if (this.naturalHeight < viewHeight && this.naturalWidth < viewWidth) {
              width = this.naturalWidth;
              height = this.naturalHeight;
              x = this.align === 'center' ? (viewWidth - width) / 2 : 0;
              y = this.align === 'center' ? (viewHeight - height) / 2 : 0;
          }
          else if (imgRadio > viewRadio) {
              width = viewWidth;
              height = viewWidth / imgRadio;
              x = 0;
              y = this.align === 'center' ? (viewHeight - height) / 2 : 0;
          }
          else {
              height = viewHeight;
              width = height * imgRadio;
              y = 0;
              x = this.align === 'center' ? (viewWidth - width) / 2 : 0;
          }
          return new Rect(x, y, width, height, this);
      };
      Object.defineProperty(Img.prototype, "imageData", {
          /**
           * Get Image Data of specified area from canvas.
           * @return {TypedArray} data
           */
          get: function () {
              var _a = this.bounds, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
              if (this.ctx) {
                  return this.ctx.getImageData(x, y, width, height);
              }
              else {
                  return new ImageData(0, 0);
              }
          },
          /**
           * Set TypedArray Data to canvas.
           * @param {TypedArray} data
           */
          set: function (data) {
              var _a = this.bounds, x = _a.x, y = _a.y;
              this.ctx && this.ctx.putImageData(data, x, y);
          },
          enumerable: true,
          configurable: true
      });
      /**
       * 参考
       * https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
       *
       * void ctx.drawImage(image, dx, dy); // 画布起始位置
       * void ctx.drawImage(image, dx, dy, dWidth, dHeight);// 画布起始位置，和绘制大小（用于缩放）
       * void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight); // 原始图片其实位置及大小
       *
       * @param ctx
       */
      Img.prototype.drawImageAndStroke = function (ctx) {
          var _a = this.initBounds, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
          if (this.shadow) {
              ctx.shadowOffsetX = 8;
              ctx.shadowOffsetY = 8;
              ctx.shadowBlur = 10;
              ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
          }
          ctx.globalAlpha = this.alpha;
          ctx.drawImage(this.image, x, y, width, height);
      };
      Img.prototype._draw = function (ctx) {
          var _this = this;
          this.ctx = ctx;
          if (this.loaded) {
              this.drawImageAndStroke(ctx);
          }
          else {
              this.loadImage(function () { return _this.drawImageAndStroke(ctx); });
          }
          return this;
      };
      Img.prototype._toJSON = function () {
          return [this._src];
      };
      var Img_1;
      Img = Img_1 = __decorate([
          observeProps({
              /**
               * Set alpha of image, between 0 and 1.
               */
              alpha: { type: Number, default: 1 },
              /**
               * align of image in whiteboard
               * possible values:
               *  1)center
               *  2)start
               */
              align: { type: String, default: 'start' },
              /**
               * If has box-shadow, like css box-shadow.
               */
              shadow: { type: Boolean, default: true },
          })
      ], Img);
      return Img;
  }(Item));
  //# sourceMappingURL=Image.js.map

  /**
   * Custom tool cursor as specified image.
   * @param {String} url
   * @param {Object} offset, both offset.x & offset.y are numbers
   * code example:
   * @cursor('https://example/x.png', {x : 10, y: 10});
   */
  function cursor(url, offset) {
      var offsetX = offset ? offset.x : 0;
      var offsetY = offset ? offset.y : 0;
      return {
          /**
           * All _init method should be invoked in constructor of base;
           */
          _init: function () {
              if (typeof url === 'function') {
                  url = url(this.type);
              }
              this._cursor = new Img({}, url);
          },
          /**
           * Get cursor image of tool, readonly.
           */
          get cursor() {
              return this._cursor;
          },
          /**
           * Set layer cursor as tool's cursor
           */
          onMouseEnter: function () {
              this.layer.setCursor(this.cursor);
          },
          /**
           * Update position of image on mousemove & mouseDrag.
           * @param {Point} point
           */
          _move: function (point) {
              if (this.cursor.loaded) {
                  this.cursor.position = point.add(offsetX, offsetY);
              }
          },
          onMouseMove: function (event) {
              var point = event.point;
              this._move(point);
          },
          onMouseDrag: function (event) {
              var point = event.point;
              this._move(point);
          },
      };
  }
  //# sourceMappingURL=cursor.js.map

  /**
   * The base class of 'two points shapes' that build with start-point & end-point.
   * 通常情况下，图形都是由拖动行为绘制的
   */
  var Shape = /** @class */ (function (_super) {
      __extends(Shape, _super);
      function Shape(options, sp, ep) {
          var _this = _super.call(this, options) || this;
          if (sp)
              _this.startPoint = sp;
          if (ep)
              _this.endPoint = ep;
          return _this;
      }
      /**
       * 用与从JSON构造出Shape实例
       *
       * @param options 配置项
       * @param points, startPoint , endPoint
       */
      Shape.instantiate = function (options, _a) {
          var _b = __read(_a, 2), sp = _b[0], ep = _b[1];
          var startPoint = new Point(sp[0], sp[1]);
          var endPoint = new Point(ep[0], ep[1]);
          var Ctor = this;
          return new Ctor(options, startPoint, endPoint);
      };
      Shape.prototype._buildPath = function () {
          throw new Error('must overwrite!');
      };
      Shape.prototype.buildPath = function () {
          this.clear();
          this._buildPath();
      };
      Shape.prototype._draw = function (ctx) {
          this.buildPath();
          _super.prototype._draw.call(this, ctx);
          return this;
      };
      Object.defineProperty(Shape.prototype, "bounds", {
          // override bounds for dragging-shapes
          get: function () {
              var frm = this.startPoint, x = frm.x, y = frm.y, width, height;
              var to = this.endPoint;
              width = to.x - x;
              height = to.y - y;
              // Check if horizontal or vertical order needs to be reversed.
              if (width < 0) {
                  x = to.x;
                  width = -width;
              }
              if (height < 0) {
                  y = to.y;
                  height = -height;
              }
              return new Rect(x, y, width, height, this);
          },
          enumerable: true,
          configurable: true
      });
      /**
       * Transform segments and startPoint * endPoint.
       * @param matrix
       */
      Shape.prototype.transformContent = function (matrix) {
          // FIXME: rotate issue.
          // also apply to start & end point.
          matrix.applyToPoint(this.startPoint);
          matrix.applyToPoint(this.endPoint);
          _super.prototype.transformContent.call(this, matrix);
      };
      Shape.prototype._toJSON = function () {
          return [[this.startPoint.x, this.startPoint.y], [this.endPoint.x, this.endPoint.y]];
      };
      Shape = __decorate([
          observeProps({
              startPoint: { type: Point, default: new Point() },
              endPoint: { type: Point, default: new Point() },
          })
      ], Shape);
      return Shape;
  }(Path));
  //# sourceMappingURL=Shape.js.map

  var Rectangle = /** @class */ (function (_super) {
      __extends(Rectangle, _super);
      function Rectangle() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.radius = 0;
          return _this;
      }
      Rectangle.prototype._buildPath = function () {
          var _a = this.startPoint, sx = _a.x, sy = _a.y;
          var _b = this.endPoint, ex = _b.x, ey = _b.y;
          var width = Math.abs(sx - ex);
          var height = Math.abs(sy - ey);
          var radius = this.radius || 0;
          var shortLine = Math.min(width, height);
          if (radius > shortLine / 2)
              radius = shortLine / 2;
          var isRounded = radius !== 0;
          this.moveTo(new Point(sx + radius, sy)).lineTo(new Point(ex - radius, sy));
          isRounded && this.arcTo(new Point(ex, sy), new Point(ex, sy + radius), radius);
          this.lineTo(new Point(ex, ey - radius));
          isRounded && this.arcTo(new Point(ex, ey), new Point(ex - radius, ey), radius);
          this.lineTo(new Point(sx + radius, ey));
          isRounded && this.arcTo(new Point(sx, ey), new Point(sx, ey - radius), radius);
          this.lineTo(new Point(sx, sy + radius));
          isRounded && this.arcTo(new Point(sx, sy), new Point(sx + radius, sy), radius);
          this.closePath();
      };
      Rectangle = __decorate([
          observeProps({
              /**
               * 是否有圆角
               */
              radius: { type: Number, default: 0 },
          })
      ], Rectangle);
      return Rectangle;
  }(Shape));
  //# sourceMappingURL=Rectangle.js.map

  var Line = /** @class */ (function (_super) {
      __extends(Line, _super);
      function Line(options, sp, ep) {
          var _this = _super.call(this, options, sp, ep) || this;
          _this.style.dashArray = _this.dash || [];
          return _this;
      }
      Line.prototype._buildPath = function () {
          var _a = this.startPoint, x = _a.x, y = _a.y;
          var _b = this.endPoint, ex = _b.x, ey = _b.y;
          this.moveTo(x, y).lineTo(ex, ey);
          //NOTE: DO NOT 'closePath' on dash-line
          //  this.closePath()
      };
      return Line;
  }(Shape));
  //# sourceMappingURL=Line.js.map

  function calcArrow(sx, sy, ex, ey) {
      var l = Math.sqrt(Math.pow(ex - sx, 2) + Math.pow(ey - sy, 2)), e0 = ex - (((ex - sx) * Math.cos(0.5) - (ey - sy) * Math.sin(0.5)) * 10) / l, e1 = ey - (((ey - sy) * Math.cos(0.5) + (ex - sx) * Math.sin(0.5)) * 10) / l, e2 = ex - (((ex - sx) * Math.cos(0.5) + (ey - sy) * Math.sin(0.5)) * 10) / l, e3 = ey - (((ey - sy) * Math.cos(0.5) - (ex - sx) * Math.sin(0.5)) * 10) / l;
      return [new Point(e0, e1), new Point(ex, ey), new Point(e2, e3)];
  }
  var Arrow = /** @class */ (function (_super) {
      __extends(Arrow, _super);
      function Arrow() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      Arrow.prototype._buildPath = function () {
          var _a = this.startPoint, sx = _a.x, sy = _a.y;
          var _b = this.endPoint, ex = _b.x, ey = _b.y;
          var points = calcArrow(sx, sy, ex, ey);
          this.moveTo(sx, sy)
              .lineTo(ex, ey)
              .moveTo(points[0])
              .lineTo(points[1])
              .lineTo(points[2]);
      };
      return Arrow;
  }(Shape));
  //# sourceMappingURL=Arrow.js.map

  /**
   * 支持等腰，直角三角形
   */
  var Triangle = /** @class */ (function (_super) {
      __extends(Triangle, _super);
      function Triangle() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      Triangle.prototype._buildPath = function () {
          var t1x, t1y, t2x, t2y;
          var _a = this.startPoint, sx = _a.x, sy = _a.y;
          var _b = this.endPoint, ex = _b.x, ey = _b.y;
          if (this.right) {
              if (this.anti) {
                  t1x = ex;
                  t1y = sy;
                  t2x = sx;
                  t2y = ey;
              }
              else {
                  t1x = t2x = sx;
                  t1y = sy;
                  t2y = ey;
              }
          }
          else {
              t1x = sx;
              t1y = ey;
              t2x = (sx + ex) / 2;
              t2y = sy;
          }
          this.moveTo(t1x, t1y)
              .lineTo(t2x, t2y)
              .lineTo(ex, ey)
              .lineTo(t1x, t1y)
              .closePath();
      };
      Triangle = __decorate([
          observeProps({
              /**
               * 当直角三角形时，确定直角的方向
               */
              anti: { type: Boolean, default: true },
              /**
               * 是否是直角三角形
               */
              right: { type: Boolean, default: false },
          })
      ], Triangle);
      return Triangle;
  }(Shape));
  //# sourceMappingURL=Triangle.js.map

  var Ellipse = /** @class */ (function (_super) {
      __extends(Ellipse, _super);
      function Ellipse() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      Ellipse.prototype._buildPath = function () {
          /* "magic number" for bezier approximations of arcs (http://itc.ktu.lt/itc354/Riskus354.pdf) */
          var kappa = 0.5522848;
          var x = this.bounds.center.x;
          var y = this.bounds.center.y;
          var a = this.bounds.width / 2;
          var b = this.bounds.height / 2;
          var ox = a * kappa; // 水平控制点偏移量
          var oy = b * kappa; // 垂直控制点偏移量
          this.moveTo(new Point(x - a, y))
              .bezierCurveTo(new Point(x - a, y - oy), new Point(x - ox, y - b), new Point(x, y - b))
              .bezierCurveTo(new Point(x + ox, y - b), new Point(x + a, y - oy), new Point(x + a, y))
              .bezierCurveTo(new Point(x + a, y + oy), new Point(x + ox, y + b), new Point(x, y + b))
              .bezierCurveTo(new Point(x - ox, y + b), new Point(x - a, y + oy), new Point(x - a, y))
              .closePath();
      };
      return Ellipse;
  }(Shape));
  //# sourceMappingURL=Ellipse.js.map

  /** 五角星，用黄金分割 */
  var radio = 0.382;
  var Star = /** @class */ (function (_super) {
      __extends(Star, _super);
      function Star() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          // Set fill-mode as default.
          _this.__fill = true;
          _this.__stroke = false;
          _this.scaleMode = 'proportion';
          return _this;
      }
      Star.prototype._buildPath = function () {
          var center = this.startPoint.midPointFrom(this.endPoint), points = 10, radius1 = this.startPoint.getDistance(this.endPoint) / 2, radius2 = radius1 * radio, step = 360 / points, vector = new Point(0, -1), firstPoint;
          for (var i = 0; i < points; i++) {
              var point = center.add(vector.rotate(step * i).multiply(i % 2 ? radius2 : radius1));
              if (i === 0) {
                  this.moveTo(point);
                  firstPoint = point;
                  continue;
              }
              this.lineTo(point);
          }
          firstPoint && this.lineTo(firstPoint.clone()); // clone first point. avoid reference error.
          this.closePath();
      };
      return Star;
  }(Shape));
  //# sourceMappingURL=Star.js.map

  /**
   * Marker & highlighter.
   */
  var Writing = /** @class */ (function (_super) {
      __extends(Writing, _super);
      function Writing(options) {
          var _this = _super.call(this, options) || this;
          _this.style.strokeStyle.alpha = _this.alpha || 1;
          return _this;
      }
      // set alpha of path style.
      //alpha = 1;
      /**
       * 用与从JSON构造出Writing实例
       * @param {*} segments
       */
      Writing.instantiate = function (options, segments) {
          var instance = new Writing(options);
          segments.forEach(function (seg) {
              var segment;
              if (seg.length === 1) {
                  segment = new MoveSegment(new Point(seg[0][0], seg[0][1]));
              }
              else if (seg.length === 4) {
                  segment = new BezierSegment(new Point(seg[1][0], seg[1][1]), new Point(seg[2][0], seg[2][1]), new Point(seg[3][0], seg[3][1]));
              }
              segment && instance.add(segment);
          });
          return instance;
      };
      return Writing;
  }(Path));
  //# sourceMappingURL=Writing.js.map

  var replaceAll = function (target, search, replacement) { return target.replace(new RegExp(search, 'g'), replacement); };
  var getStylePropertyValue = function (target, property) {
      var style = window.getComputedStyle(target, null);
      return parseInt(style.getPropertyValue(property), 10);
  };
  var drawTextImg = function (element, ctx) {
      var preStyle = element.getAttribute('style');
      if (!preStyle)
          return;
      var width = getStylePropertyValue(element, 'width');
      var height = getStylePropertyValue(element, 'height');
      var left = getStylePropertyValue(element, 'left');
      var top = getStylePropertyValue(element, 'top');
      var style = preStyle.replace(/(.+)(position.+?;)(.+)/, function (_1, $2, _2, $4) { return $2 + $4; }); // svg 中加入position 会导致 转 img 失败
      var content = element.innerHTML;
      content = replaceAll(content, '&nbsp;', ' ');
      content = replaceAll(content, '<br>', '<br></br>');
      var data = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"" + (width + 5) + "\" height=\"" + height + "\"><foreignObject width=\"100%\" height=\"100%\"><div xmlns=\"http://www.w3.org/1999/xhtml\" style=\"" + style + "\">" + content + "</div></foreignObject></svg>";
      var DOM_URL = window.URL || window.webkitURL || window;
      var img = new Image();
      var svg = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
      var url = DOM_URL.createObjectURL(svg);
      img.onload = function () {
          ctx.drawImage(img, left, top);
          DOM_URL.revokeObjectURL(url);
      };
      // document.body.appendChild(img);
      img.src = url;
  };
  /**
   * Text Item;
   */
  var Text = /** @class */ (function (_super) {
      __extends(Text, _super);
      function Text() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.isDeleted = false;
          _this.zoom = 1;
          return _this;
      }
      Text_1 = Text;
      /**
       * static method to create instance from params
       */
      Text.instantiate = function (options) {
          var rest = [];
          for (var _i = 1; _i < arguments.length; _i++) {
              rest[_i - 1] = arguments[_i];
          }
          var text = new Text_1(options);
          text.startPoint = new Point(rest[0][0], rest[0][1]);
          return text;
      };
      /**
       * 每点击一次创建一个可编辑框
       */
      Text.prototype._draw = function (cxt) {
          this._cxt = cxt;
          var _a = this.startPoint, x = _a.x, y = _a.y;
          if (!this.input && !this.isDeleted) {
              this.input = document.createElement('div');
              this.input.setAttribute('style', '');
              this.input.setAttribute('autocapitalize', 'off');
              this.input.setAttribute('autocorrect', 'off');
              this.input.setAttribute('autocomplete', 'off');
              console.log('strokeColor', this.style.strokeColor);
              Object.assign(this.input.style, {
                  fontFamily: this.style.font || 'sans-serif',
                  'min-width': '100px',
                  'font-weight': 400,
                  color: this.style.strokeStyle,
                  // 'font-style': this.style.italic ? 'italic' : 'normal',
                  'font-size': this.style.fontSize * this.zoom + "px",
                  position: 'absolute',
                  left: x * this.zoom + "px",
                  top: (y - 10) * this.zoom + "px",
              });
              this.toggleInput();
              if (!this.textWrapper)
                  throw ("can not find div about draw-panel");
              this.textWrapper.appendChild(this.input);
              this.bindInputEvent();
          }
          this._editable && this.input.focus();
          // this.drawTextImg(this._editable);
          return this;
      };
      Object.defineProperty(Text.prototype, "editable", {
          set: function (val) {
              this._editable = val;
              this.toggleInput();
          },
          enumerable: true,
          configurable: true
      });
      /**
       * freeze input by editable
       */
      Text.prototype.toggleInput = function () {
          if (!this.input)
              return;
          setStyle(this.input, {
              'pointer-events': this._editable ? 'initial' : 'none',
              'user-select': this._editable ? 'initial' : 'none'
          });
          this.input.setAttribute('contenteditable', this._editable.toString());
      };
      /**
       * bind event for input
       * invoke typingCallback when truly input occurred
       */
      Text.prototype.bindInputEvent = function () {
          var _this = this;
          var invokeTyping = function (value) {
              _this.onTyping([_this.id, value]);
          };
          var locked = false;
          if (!this.input)
              return;
          this.input.addEventListener('compositionstart', function () {
              locked = true;
          });
          this.input.addEventListener('compositionend', function () {
              locked = false;
              invokeTyping(_this.input.innerHTML);
          });
          this.input.addEventListener('input', function (event) {
              if (!event.target || locked)
                  return;
              invokeTyping(event.target.innerHTML);
          });
      };
      /**
       * it is a hook, invoked when user drag Text instance
       * @param point
       */
      Text.prototype.onMouseDrag = function (point) {
          this.updatePosition(point);
      };
      /**
       * update input position
       * @param offset object {x, y}
       */
      Text.prototype.updatePosition = function (_a) {
          var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c;
          var _d = this.input.style, left = _d.left, top = _d.top;
          if (!left || !top)
              return;
          Object.assign(this.input.style, {
              left: parseInt(left) + x * this.zoom + "px",
              top: parseInt(top) + y * this.zoom + "px",
          });
      };
      /**
       * draw canvas Img by text element
       * @param showOriginInput
       */
      Text.prototype.drawTextImg = function (showOriginInput) {
          if (showOriginInput === void 0) { showOriginInput = false; }
          this.input.style.visibility = 'visible';
          drawTextImg(this.input, this._cxt);
          !showOriginInput && (this.input.style.visibility = 'hidden');
      };
      Text.prototype._toJSON = function () {
          return [this.startPoint.x, this.startPoint.y];
      };
      Object.defineProperty(Text.prototype, "bounds", {
          /**
           * get text element bound
           */
          get: function () {
              var _a = this.input.style, left = _a.left, top = _a.top;
              if (!this.input)
                  return new Rect(0, 0, 0, 0);
              return new Rect(parseInt(left || '0') * 1 / this.zoom, parseInt(top || '0') * 1 / this.zoom, getStylePropertyValue(this.input, 'width') * 1 / this.zoom, getStylePropertyValue(this.input, 'height') * 1 / this.zoom, this);
          },
          enumerable: true,
          configurable: true
      });
      /**
       * invoked when ItemCollection Delete this
       */
      Text.prototype.onDeleted = function () {
          this.isDeleted = true;
          this.input && this.input.remove();
      };
      var Text_1;
      Text = Text_1 = __decorate([
          observeProps({
              _editable: { type: Boolean, default: false },
          })
      ], Text);
      return Text;
  }(Item));
  //# sourceMappingURL=Text.js.map

  var ChatBox = /** @class */ (function (_super) {
      __extends(ChatBox, _super);
      function ChatBox() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      ChatBox.prototype._buildPath = function () {
          var _a = this.startPoint, sx = _a.x, sy = _a.y;
          var _b = this.endPoint, ex = _b.x, ey = _b.y;
          var s1x = (sx + ex) / 2;
          var s2y = sy + ((ey - sy) * 3) / 4;
          var s3x = sx + (ex - sx) / 4;
          var s3y = sy + ((ey - sy) * 3) / 8;
          var s4x = sx + ((ex - sx) * 3) / 8;
          this.moveTo(s1x, sy)
              .quadraticCurveTo(new Point(sx, sy), new Point(sx, s3y))
              .quadraticCurveTo(new Point(sx, s2y), new Point(s3x, s2y))
              .quadraticCurveTo(new Point(s3x, ey), new Point(sx, ey))
              .quadraticCurveTo(new Point(s4x, ey), new Point(s4x, s2y))
              .quadraticCurveTo(new Point(ex, s2y), new Point(ex, s3y))
              .quadraticCurveTo(new Point(ex, sy), new Point(s1x, sy))
              .closePath();
      };
      return ChatBox;
  }(Shape));
  //# sourceMappingURL=ChatBox.js.map

  /**
   * @class A compound path is a complex path that is made up of one or more
   * simple sub-paths. It can have the `nonzero` fill rule, or the `evenodd` rule
   * applied. Both rules use mathematical equations to determine if any region is
   * outside or inside the final shape. The `evenodd` rule is more predictable:
   * Every other region within a such a compound path is a hole, regardless of
   * path direction.
   */
  var CompoundPath = /** @class */ (function (_super) {
      __extends(CompoundPath, _super);
      function CompoundPath(options, paths) {
          if (paths === void 0) { paths = []; }
          var _this = _super.call(this, options) || this;
          _this._children = [];
          _this._children = paths;
          return _this;
      }
      CompoundPath.instantiate = function (options, paths) {
          var instance = new CompoundPath(options);
          paths.forEach(function (path) { return instance.add(createItemViaJSON(path)); });
          return instance;
      };
      CompoundPath.prototype.add = function (path) {
          this._children.push(path);
      };
      Object.defineProperty(CompoundPath.prototype, "children", {
          /**
           * Get children.
           */
          get: function () {
              return this._children;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(CompoundPath.prototype, "segments", {
          /**
           * Get segments
           */
          get: function () {
              var children = this._children, segments = [];
              for (var i = 0, l = children.length; i < l; i++) {
                  segments.push.apply(segments, children[i].segments);
              }
              return segments;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(CompoundPath.prototype, "bounds", {
          /**
           * get bounds of path. It's a memoized getter for performance.
           */
          get: function () {
              return this.uniteBoundsOfChildren(this.children);
          },
          enumerable: true,
          configurable: true
      });
      CompoundPath.prototype._draw = function (ctx) {
          this._children.forEach(function (path) { return path.draw(ctx); });
          return this;
      };
      CompoundPath.prototype._toJSON = function () {
          return this._children.map(function (item) { return item.toJSON(); });
      };
      __decorate([
          memoized()
      ], CompoundPath.prototype, "bounds", null);
      return CompoundPath;
  }(Item));
  //# sourceMappingURL=CompoundPath.js.map

  /**
   * magic numbers map to shapes, copy from milkyway.
    pointer: 0,
    marker: 1,
    highlighter: 2,
    ellipse: 3,
    line: 4,
    triangle: 5,
    rectangle: 6,
    arrow: 7,
    text: 8,
    image: 9,
    selector: 10,
    eraser: 11,
    dashed: 12,
    rightTriangle: 13,
    circle: 14,
   */
  var shapeTypes = {
      pointer: { id: 0, ctor: Img },
      marker: { id: 1, ctor: Writing },
      highlighter: { id: 2, ctor: Writing, preset: { alpha: 0.5 } },
      ellipse: { id: 3, ctor: Ellipse },
      line: { id: 4, ctor: Line },
      triangle: { id: 5, ctor: Triangle },
      rectangle: { id: 6, ctor: Rectangle },
      arrow: { id: 7, ctor: Arrow },
      text: { id: 8, ctor: Text },
      image: { id: 9, ctor: Img },
      selector: { id: 10, ctor: Img },
      eraser: { id: 11, ctor: Img },
      dashed: {
          id: 12,
          ctor: Line,
          preset: { dash: [10, 12] },
      },
      rightTriangle: { id: 13, ctor: Triangle, preset: { right: true } },
      circle: { id: 14 },
      star: { id: 15, ctor: Star },
      chatBox: { id: 16, ctor: ChatBox },
      compoundPath: { id: 100, ctor: CompoundPath },
      material: { id: 9.1, ctor: Img },
  };
  var idMap = {};
  for (var key in shapeTypes) {
      idMap[shapeTypes[key].id] = key;
  }
  function normalizeStyle(style) {
      var ret = {};
      if (!style)
          return ret;
      var strokeColor = style.sc || style.strokeColor;
      var fillColor = style.fc || style.fillColor;
      var color = style.c || style.color;
      var lineWidth = typeof style.w === 'number' ? style.w : style.width;
      var fontSize = typeof style.f === 'number' ? style.f : style.fontSize;
      if (strokeColor || color) {
          ret.strokeStyle = new Color$1(strokeColor || color); //
      }
      if (fillColor || color) {
          ret.fillStyle = new Color$1(fillColor || color);
      }
      if (typeof lineWidth === 'number') {
          ret.lineWidth = lineWidth;
      }
      if (typeof fontSize === 'number') {
          ret.fontSize = fontSize;
      }
      return ret;
  }
  /**
   * format [type, id, dataArr, style]
   * e.g. [3,112481770,[[413,200],[588,378]],{"c":"#8ecf54","w":2,"f":20}]
   *
   * @param json
   */
  function createItemViaJSON(json) {
      var _a = __read(json, 4), typeId = _a[0], id = _a[1], data = _a[2], style = _a[3], type = idMap[typeId], shape = shapeTypes[type], preset = shape.preset || {}, ctor = shape && shape.ctor;
      if (!ctor)
          throw new TypeError("Invalid json!");
      style = normalizeStyle(style);
      var options = __assign({ typeId: typeId,
          type: type,
          id: id,
          style: style }, preset);
      var ins = ctor.instantiate(options, data);
      //workaround: if fillStyle is true, set fill-mode in shape;
      // if (style.fillStyle) {
      //   ins.fill = true;
      // }
      return ins;
  }
  /**
   *
   * @param type
   * @param style, Style of item.
   */
  function createItem(type, style) {
      if (style === void 0) { style = {}; }
      // attach to nebula!
      var shape = shapeTypes[type], ctor = shape.ctor, typeId = shape.id, preset = shape.preset || {};
      if (!ctor)
          throw new Error("Can't find specified graphic '" + type + "'!");
      style = normalizeStyle(style);
      var options = __assign({ typeId: typeId,
          type: type,
          style: style }, preset);
      return new ctor(options);
  }
  //# sourceMappingURL=ItemFactory.js.map

  /**
   * Enable tool add item on mouse event triggered!
   * @param {Object} style
   */
  function itemCreator(style) {
      if (style === void 0) { style = {}; }
      return {
          _style: style,
          /**
           * Set style of tool. It will apply to the created item.
           */
          set style(value) {
              this._style = value;
          },
          /**
           * Set style of tool
           */
          get style() {
              return this._style;
          },
          /**
           * Create item and add to item-collection before mouse down.
           */
          onBeforeMouseDown: function () {
              this.currentShape = createItem(this.type, this.style);
              this.items.add(this.currentShape);
          },
      };
  }
  //# sourceMappingURL=itemCreator.js.map

  var markerCursor = 'https://www-stage.tutormeetplus.com/v2/static/media/pen.3ec0e0e7.png';
  var highlighterCursor = 'https://www-stage.tutormeetplus.com/v2/static/media/mark_pen.901db183.png';
  /**
   * Base class og marker tool & highlighter tool.
   */
  var FreeDrawing = /** @class */ (function (_super) {
      __extends(FreeDrawing, _super);
      function FreeDrawing() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      /**
       * Invoked on mouse down
       * @param event
       */
      FreeDrawing.prototype.onMouseDown = function (event) {
          if (!this.currentShape)
              return;
          this.currentShape.moveTo(event.point);
          this.lastPoint = event.point;
      };
      /**
       * Invoked on mouse move
       * @param event
       */
      FreeDrawing.prototype.onMouseDrag = function (event) {
          if (!this.currentShape)
              return;
          var point = event.point;
          var midPoint = point.midPointFrom(this.lastPoint);
          this.currentShape.quadraticCurveTo(this.lastPoint, midPoint);
          this.lastPoint = point;
      };
      /**
       * Invoked on mouse up
       */
      FreeDrawing.prototype.onMouseUp = function (_event) {
          if (!this.currentShape)
              return;
          this.currentShape.simplify();
          this.globalCtx.emit('item:add', this.currentShape.toJSON());
          this.currentShape = null;
      };
      return FreeDrawing;
  }(Tool));
  /**
   * 白板笔工具
   *
   * Inject following behaviors for tool 'Marker'
   * 1) 当mousedown时新建Item
   * 2) 在鼠标移动时生成一个“白板笔”光标
   */
  var Marker = /** @class */ (function (_super) {
      __extends(Marker, _super);
      function Marker() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      Marker = __decorate([
          deepMixin(itemCreator()),
          deepMixin(cursor(markerCursor, { x: 13, y: -15 }))
      ], Marker);
      return Marker;
  }(FreeDrawing));
  /**
   * 荧光笔工具
   *
   * Inject following behaviors for tool 'Marker'
   * 1) 当mousedown时新建Item
   * 2) 在鼠标移动时生成一个“荧光笔”光标
   */
  var Highlighter = /** @class */ (function (_super) {
      __extends(Highlighter, _super);
      function Highlighter() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      Highlighter = __decorate([
          deepMixin(itemCreator()),
          deepMixin(cursor(highlighterCursor, { x: 12, y: -12 }))
      ], Highlighter);
      return Highlighter;
  }(FreeDrawing));
  //# sourceMappingURL=FreeDrawing.js.map

  var defaultStyle = {
      strokeStyle: '#aaa',
      lineWidth: 1,
      dashArray: [5, 2],
  };
  /**
   *
   * enable tool has drag behavior.
   * 使工具在拖拽时，生成一个虚线辅助框, 该辅助框在开始拖拽时生成，
   *
   * @param {Object} style
   * @param {Boolean} removeOnNextDrag, If true drag-rect will be removed on next mouse-down, else on mouse-up
   */
  function dragBounds(style, removeOnNextDrag) {
      if (style === void 0) { style = {}; }
      if (removeOnNextDrag === void 0) { removeOnNextDrag = false; }
      style = Object.assign({}, defaultStyle, style);
      return {
          _dragRect: new Rectangle({ style: style }),
          get dragRect() {
              return this._dragRect;
          },
          /**
           * Add drag rectangle when mousemove.
           * @param {*} param0
           */
          onMouseDown: function (event) {
              var point = event.point;
              if (this.mode !== 'select')
                  return;
              if (removeOnNextDrag)
                  this.dragRect.remove();
              this.dragRect.startPoint = this.dragRect.endPoint = point;
              this.layer.items.add(this.dragRect);
          },
          /**
           * Set size of drag rectangle.
           * @param {*} param0
           */
          onMouseDrag: function (event) {
              var point = event.point;
              if (this.mode !== 'select')
                  return;
              this.dragRect.endPoint = point;
          },
          /**
           * Remove drag rect when mouse-up.
           * @param {*} param0
           */
          onMouseUp: function () {
              //reset mode to 'select' on mouse up.
              this.mode = 'select';
              if (!removeOnNextDrag)
                  this.dragRect.remove();
          },
      };
  }
  //# sourceMappingURL=dragBounds.js.map

  /**
   * 绘制两点图形工具
   */
  var ShapeDrawing = /** @class */ (function (_super) {
      __extends(ShapeDrawing, _super);
      function ShapeDrawing() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      ShapeDrawing.prototype.onMouseDown = function (event) {
          if (!this.currentShape)
              return;
          this.currentShape.startPoint = this.currentShape.endPoint = event.point;
      };
      ShapeDrawing.prototype.onMouseDrag = function (event) {
          if (!this.currentShape)
              return;
          this.currentShape.endPoint = event.point;
      };
      ShapeDrawing.prototype.onMouseUp = function (_event) {
          if (!this.currentShape)
              return;
          this.globalCtx.emit('item:add', this.currentShape.toJSON());
          this.currentShape = null; // think about that; beforeMouseDown will refresh this.currentShape
      };
      ShapeDrawing = __decorate([
          deepMixin(dragBounds({
              strokeStyle: 'rgb(255,163,0)',
              lineWidth: 1,
          })),
          deepMixin(itemCreator())
      ], ShapeDrawing);
      return ShapeDrawing;
  }(Tool));
  //# sourceMappingURL=ShapeDrawing.js.map

  /**
   * enable tool has select behavior.
   */
  function selectable(_multiSelect) {
      if (_multiSelect === void 0) { _multiSelect = true; }
      return {
          _downPoint: null,
          _lastSelected: [],
          _selected: [],
          onMouseDown: function (event) {
              this._downPoint = event.point;
              if (this._pointOnElement(this._downPoint)) {
                  this.mode = 'move';
                  if (this.target.selected)
                      return false;
                  this.items.unselect();
                  this.target.selected = true;
                  this._selected = [this.target];
                  return true;
              }
              this.mode = 'select';
              return true;
          },
          onMouseDrag: function (event) {
              var _this = this;
              if (this.mode !== 'select')
                  return;
              var point = event.point;
              this.dragRect.endPoint = point;
              this._selected = this.items.filter(function (item) { return (item.selected = _this.dragRect.bounds.containsRect(item.bounds)); });
          },
          onMouseMove: function (event) {
              var point = event.point;
              var isPointOnElement = this._pointOnElement(point);
              if (isPointOnElement) {
                  var target = this.target;
                  target.emit('hover', { target: target });
              }
              return !isPointOnElement;
          },
          _pointOnElement: function (point) {
              for (var len = this.items.length, i = len, item = void 0; i > 0; i--) {
                  // find from right
                  item = this.items.get(i - 1);
                  if (item.containsPoint(point)) {
                      this.target = item;
                      this.setLayerCursor('all-scroll');
                      return true;
                  }
              }
              return false;
          },
      };
  }
  //# sourceMappingURL=selectable.js.map

  var POINT_WIDTH$1 = 4;
  var OFFSET$1 = POINT_WIDTH$1 / 2;
  var fillStyle = '#009dec';
  var strokeStyle = '#96cef6';
  /**
   * 拖动缩放的辅助框
   * simple axes
   */
  var ControlRect = /** @class */ (function (_super) {
      __extends(ControlRect, _super);
      function ControlRect() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      ControlRect.prototype._draw = function (ctx) {
          var bounds = this.bounds;
          ctx.save();
          ctx.fillStyle = fillStyle;
          ctx.lineWidth = 1;
          ctx.strokeStyle = strokeStyle;
          ctx.beginPath();
          // 设置上一个点为最后一个点
          //@ts-ignore
          var lastPoint = bounds[boundsPoi[boundsPoi.length - 1]];
          var point;
          ctx.moveTo(lastPoint.x, lastPoint.y);
          //@ts-ignore
          boundsPoi.forEach(function (key) {
              point = bounds[key];
              ctx.lineTo(point.x, point.y);
              ctx.fillRect(point.x - OFFSET$1, point.y - OFFSET$1, POINT_WIDTH$1, POINT_WIDTH$1);
              lastPoint = point;
          });
          if (this.showRotate) {
              //TODO: bounds no topCenter
              //@ts-ignore
              var tc = bounds.topCenter;
              ctx.moveTo(tc.x, tc.y);
              point = tc.add(new Point(0, -50));
              this.rotateControlPoint = point;
              ctx.lineTo(point.x, point.y);
              ctx.fillRect(point.x - OFFSET$1, point.y - OFFSET$1, POINT_WIDTH$1, POINT_WIDTH$1);
          }
          ctx.stroke();
          ctx.restore();
          return this;
      };
      /**
       * just for ts lint, no sense
       */
      ControlRect.prototype._toJSON = function () {
          return [];
      };
      Object.defineProperty(ControlRect.prototype, "bounds", {
          /**
           * just for ts lint, no sense
           */
          get: function () { return new Rect(0, 0, 0, 0); },
          enumerable: true,
          configurable: true
      });
      ControlRect = __decorate([
          observeProps({
              /**
               * 是否有Sub grid
               */
              showRotate: { type: Boolean, default: true },
          })
      ], ControlRect);
      return ControlRect;
  }(Item));
  //# sourceMappingURL=ControlRect.js.map

  /**
   * 图形成组，包括Path, Image, Text, CompoundPath
   * 用于成组的transform, delete
   */
  var Group = /** @class */ (function (_super) {
      __extends(Group, _super);
      function Group(options, items) {
          if (items === void 0) { items = []; }
          var _this = _super.call(this, options) || this;
          _this.children = items;
          _this.control = new ControlRect({ linked: _this });
          return _this;
      }
      Group.prototype.append = function (item) {
          this.children.push(item);
      };
      Group.prototype.prepend = function (item) {
          this.children.unshift(item);
      };
      Object.defineProperty(Group.prototype, "bounds", {
          /**
           * get bounds of path. It's a memoized getter for performance.
           * unite all children bounds.
           */
          get: function () {
              return this.uniteBoundsOfChildren(this.children);
          },
          enumerable: true,
          configurable: true
      });
      Group.prototype._draw = function (ctx) {
          this.control.draw(ctx);
          return this;
      };
      /**
       * Data for serialization.
       */
      Group.prototype._toJSON = function () {
          return this.children.map(function (item) { return item.toJSON(); });
      };
      Group = __decorate([
          observeProps({
              children: { type: Array, default: [] },
          })
      ], Group);
      return Group;
  }(Item));
  //# sourceMappingURL=Group.js.map

  /**
   * 通过中心点、起始点和结束点获取角度（绝对值）
   *
   * @param {Point} cp, center point
   * @param {Point} sp, start point
   * @param {Point} ep, end point
   */


  function getAngle(cp, sp, ep) {
    var disCS = cp.getDistance(sp);
    var disCE = cp.getDistance(ep);
    var disSE = sp.getDistance(ep);
    var resultRadian = acos((pow(disCS, 2) + pow(disCE, 2) - pow(disSE, 2)) / (2 * disCS * disCE));
    return resultRadian * 180 / pi;
  }

  /**
   * enable tool has transform behavior.
   * 依赖于selectable, 必须选中才可以tranform
   * 使工具可以变形（移动、旋转、缩放）白板Item
   */
  function transformable(enableRotate) {
      if (enableRotate === void 0) { enableRotate = false; }
      return {
          realTimeSize: null,
          enableRotate: enableRotate,
          actionData: null,
          _init: function () {
              this.transformGroup = new Group({}, []);
          },
          onMouseDown: function (event) {
              this._downPoint = event.point;
              this.layer.items.set(this.transformGroup);
              this.transformGroup.children = this._selected;
              var action = this._pointOnResize(this._downPoint);
              if (action !== '') {
                  this.mode = action;
              }
              else if (this.mode === 'select') {
                  this.items.unselect();
                  this.transformGroup.children = [];
                  return true;
              }
              return false;
          },
          onMouseDrag: function (event) {
              var delta = event.delta, point = event.point;
              if (this.mode === 'select') {
                  this.transformGroup.children = this._selected;
              }
              else if (this.mode === 'resize') {
                  this.corner = this.corner.add(delta);
                  var size = this.corner.subtract(this.basePoint);
                  if (!this.actionData) {
                      this.originSize = size; // record origin size
                  }
                  var sx = 1.0, sy = 1.0, originSx = 1.0, originSy = 1.0;
                  if (Math.abs(this.realTimeSize.x) > 0.0000001 &&
                      this.resizeDir !== 'topCenter' &&
                      this.resizeDir !== 'bottomCenter') {
                      sx = size.x / this.realTimeSize.x;
                      originSx = size.x / this.originSize.x;
                  }
                  if (Math.abs(this.realTimeSize.y) > 0.0000001 &&
                      this.resizeDir !== 'leftCenter' &&
                      this.resizeDir !== 'rightCenter') {
                      sy = size.y / this.realTimeSize.y;
                      originSy = size.y / this.originSize.y;
                  }
                  this.target.scale(sx, sy, this.basePoint);
                  this.realTimeSize = size;
                  this.actionData = [originSx, originSy, this.basePoint.x, this.basePoint.y];
              }
              else if (this.mode === 'move') {
                  this.transformGroup.translate(delta);
                  this.actionData = this.actionData ? this.actionData.add(delta) : delta;
              }
              else if (this.mode === 'rotate') {
                  var lastPoint = point.subtract(delta);
                  var angle = getAngle(this.transformGroup.bounds.center, lastPoint, point);
                  this.transformGroup.rotate(angle);
                  this.actionData += angle;
              }
          },
          onMouseUp: function () {
              if (!this.actionData)
                  return false;
              var ids = this.transformGroup.children.map(function (item) { return item.id; });
              if (this.mode === 'move') {
                  this.globalCtx.emit('items:move', [ids, [this.actionData.x, this.actionData.y]]);
              }
              else if (this.mode === 'resize') {
                  this.globalCtx.emit('items:resize', [ids, this.actionData]);
              }
              else if (this.mode === 'rotate') {
                  this.globalCtx.emit('items:rotate', [ids, this.actionData]);
              }
              this.actionData = null;
          },
          onMouseMove: function (event) {
              var point = event.point;
              return !this._pointOnResize(point);
          },
          _pointOnResize: function (point) {
              var corner, bounds;
              var rotatePoint = this.transformGroup.control.rotateControlPoint;
              if (this.enableRotate && rotatePoint && point.nearby(rotatePoint)) {
                  this.setLayerCursor('pointer');
                  return 'rotate';
              }
              bounds = this.transformGroup.bounds;
              //@ts-ignore
              corner = boundsPoi.find(function (key) { return point.nearby(bounds[key]); });
              if (!corner) {
                  this.setLayerCursor('default');
                  return '';
              }
              this.setLayerCursor(cursorMap[corner]);
              this.basePoint = bounds[antiDir[corner]];
              this.target = bounds.owner;
              this.corner = bounds[corner];
              this.resizeDir = corner;
              this.realTimeSize = this.corner.subtract(this.basePoint);
              return 'resize';
          },
      };
  }
  //# sourceMappingURL=transformable.js.map

  /**
   * Select Tool of whiteboard.
   *
   * Inject following behaviors for tool 'Selection'
   * 1) 当拖拽时生成“拖拽框”
   * 2) 当拖拽时选中白板Items
   * 3）当拖拽控制点时可以变形Items
   */
  var Selection = /** @class */ (function (_super) {
      __extends(Selection, _super);
      function Selection() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      Selection = __decorate([
          deepMixin(dragBounds()),
          deepMixin(transformable()),
          deepMixin(selectable())
      ], Selection);
      return Selection;
  }(Tool)); // TODO : try to fix via doc of ts
  //# sourceMappingURL=Selection.js.map

  /**
   * Pointer of whiteboard.
   *
   * Inject following behaviors for tool 'Pointer'
   * 1) 当拖拽时生成“拖拽框”，默认时红色
   * 2) 在鼠标移动时生成一个“指挥棒”，并实时发送“指挥棒”位置数据
   * 3）需要能够在接收端看到“拖拽框”
   */
  var Pointer = /** @class */ (function (_super) {
      __extends(Pointer, _super);
      function Pointer() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      Pointer.prototype.onMouseDrag = function (event) {
          var point = event.point;
          this.globalCtx.emit('pointer:move', ['m', [point.x, point.y]]); // TODO: delete
      };
      Pointer.prototype.onMouseMove = function (event) {
          var point = event.point;
          this.globalCtx.emit('pointer:move', ['m', [point.x, point.y]]);
      };
      Pointer.prototype.onMouseUp = function () {
          this.globalCtx.emit('pointer:draw', ['d', this.dragRect.toJSON()]);
      };
      /**
      * draw rect by json
      */
      Pointer.prototype.moveByJSON = function (json) {
          if (json[0] === 'm') {
              this.onMouseEnter();
              this._move(new Point(json[1][0], json[1][1]));
          }
          else if (json[0] === 'd') {
              var _a = __read(json[1][2], 2), sp = _a[0], ep = _a[1];
              this.dragRect.remove();
              this.dragRect.startPoint = new Point(sp[0], sp[1]);
              this.dragRect.endPoint = new Point(ep[0], ep[1]);
              this.layer.items.add(this.dragRect);
          }
      };
      Pointer = __decorate([
          deepMixin(dragBounds({
              strokeStyle: '#f00',
              lineWidth: 2,
          }, true)),
          deepMixin(cursor('https://www-stage.tutormeetplus.com/v2/static/media/mouse_pointer.64a36561.png', {
              x: 11,
              y: -12,
          }))
      ], Pointer);
      return Pointer;
  }(Tool));
  //# sourceMappingURL=Pointer.js.map

  /**
   * Eraser， 橡皮擦工具
   *
   * Inject following behaviors for tool 'Eraser'
   *
   * 1) 当鼠标点击时，删除选中元素
   * 2) 当拖拽时生成“拖拽框”，并在鼠标释放时删除所有选中元素
   * 3）当在移动时显示光标为“橡皮擦”
   */
  var Eraser = /** @class */ (function (_super) {
      __extends(Eraser, _super);
      function Eraser() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      Eraser.prototype.onMouseUp = function () {
          this.items.deleteSelected();
      };
      Eraser = __decorate([
          deepMixin(selectable()) //decorator 作用与class越近越早生效
          ,
          deepMixin(dragBounds()),
          deepMixin(cursor('https://www-stage.tutormeetplus.com/v2/static/media/eraser.352bd893.png', {
              x: 8,
              y: -8,
          }))
      ], Eraser);
      return Eraser;
  }(Tool));
  //# sourceMappingURL=Eraser.js.map

  /**
   * Tool to input text on whiteboard
   */
  var Text$1 = /** @class */ (function (_super) {
      __extends(Text, _super);
      function Text(type) {
          var _this = _super.call(this, type) || this;
          window.drawText = _this.drawText.bind(_this); // for test
          return _this;
      }
      Text.prototype.onMouseDown = function (event) {
          var _this = this;
          this.currentShape.editable = true;
          this.currentShape.startPoint = this.currentShape.endPoint = event.point;
          this.currentShape.textWrapper = this.globalCtx.textWrapper;
          this.currentShape.zoom = this.globalCtx.zoom;
          this.items.add(this.currentShape);
          this.globalCtx.emit('item:add', this.currentShape.toJSON());
          this.currentShape.onTyping = function (value) { return _this.globalCtx.emit('item:typing', value); };
      };
      Text.prototype.drawText = function () {
          var _this = this;
          this.items.filter(function (item) { return item.type === _this.type; }).map(function (item) { return item.drawTextImg(); });
      };
      /**
       * set all Text disabled
       * toolChanged
       */
      Text.prototype.toolChanged = function (_a) {
          var _this = this;
          var type = _a.type;
          this.items.filter(function (item) { return item.type === _this.type; }).map(function (item) {
              item.editable = type === _this.type;
          });
      };
      Text = __decorate([
          deepMixin(itemCreator())
      ], Text);
      return Text;
  }(Tool));
  //# sourceMappingURL=TextInput.js.map

  /**
   * enable tool has mutate behavior.
   */
  function mutable() {
      return {
          onMouseDown: function (event) {
              var point = event.point;
              if (this._pointOnPoint(point)) {
                  return;
              }
          },
          onMouseDrag: function (event) {
              var point = event.point;
              if (this.mode === 'mutate') {
                  this.targetPoint.assign(point);
                  this.target.changed();
              }
          },
          onMouseMove: function (event) {
              var point = event.point;
              return !this._pointOnPoint(point);
          },
          _pointOnPoint: function (point) {
              var e_1, _a;
              var nearbyPoint, seg, segments;
              try {
                  for (var _b = __values(this.items), _c = _b.next(); !_c.done; _c = _b.next()) {
                      var item = _c.value;
                      segments = item.segments;
                      if (!segments)
                          continue;
                      for (var j = 0; j < segments.length; j++) {
                          seg = segments[j];
                          if (seg.command !== 'C')
                              continue;
                          nearbyPoint = seg.points.find(function (p) { return point.nearby(p); });
                          if (nearbyPoint)
                              break;
                      }
                      if (nearbyPoint)
                          break;
                  }
              }
              catch (e_1_1) { e_1 = { error: e_1_1 }; }
              finally {
                  try {
                      if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                  }
                  finally { if (e_1) throw e_1.error; }
              }
              if (nearbyPoint) {
                  this.mode = 'mutate';
                  this.setLayerCursor('pointer');
                  seg && (this.target = seg.owner);
                  this.targetPoint = nearbyPoint;
                  return true;
              }
              this.setLayerCursor('default');
              return false;
          },
      };
  }
  //# sourceMappingURL=mutable.js.map

  /**
   * Mutate Path of shape.
   *
   * 通过拖拽Segment控制点，变形Path
   */
  var PathMutator = /** @class */ (function (_super) {
      __extends(PathMutator, _super);
      function PathMutator() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      PathMutator = __decorate([
          deepMixin(mutable())
      ], PathMutator);
      return PathMutator;
  }(Tool));
  //# sourceMappingURL=PathMutator.js.map

  /**
   * Register tools
   */
  //tools map.
  var tools = {};
  var shapeDrawingTools = [
      'rectangle',
      'triangle',
      'rightTriangle',
      'ellipse',
      'arrow',
      'line',
      'dashed',
      'star',
      'chatBox',
  ];
  function create() {
      registerTool('marker', Marker);
      registerTool('highlighter', Highlighter);
      shapeDrawingTools.forEach(function (toolName) { return registerTool(toolName, ShapeDrawing); });
      registerTool('arc', ArcDrawing);
      registerTool('selection', Selection);
      registerTool('pointer', Pointer);
      registerTool('text', Text$1);
      registerTool('eraser', Eraser);
      registerTool('pathMutator', PathMutator);
  }
  function registerTool(name, ctor) {
      if (tools[name])
          throw new Error("Tool " + name + " already exist!");
      tools[name] = new ctor(name);
      return tools[name];
  }
  function getTool(name) {
      if (typeof name !== 'string')
          throw new TypeError('setter value must be string!');
      if (!tools[name])
          throw new Error("can't specify tool " + name + "!");
      return tools[name];
  }
  create();
  //# sourceMappingURL=index.js.map

  /**
   * 简单网格
   * Component Grid.
   */
  var Grid = /** @class */ (function (_super) {
      __extends(Grid, _super);
      function Grid() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      Grid.prototype._draw = function (ctx) {
          var _a = this.layer, width = _a.width, height = _a.height;
          ctx.save();
          //preset context2d styles
          ctx.lineWidth = 1;
          // ctx.fontSize = 10;
          ctx.font = '9px serif';
          //draw vertical lines
          if (this.minor)
              this.drawMinorGrid(ctx, width, height);
          this.drawMajorGrid(ctx, width, height);
          ctx.restore();
          return this;
      };
      Grid.prototype.drawMajorGrid = function (ctx, width, height) {
          ctx.strokeStyle = '#c0c0c0';
          var x = 0;
          while (x < width) {
              x += 50;
              this.drawLine(ctx, x, 0, x, height);
              this.drawPixelText(ctx, x.toString(), x, 9);
          }
          //draw horizontal lines
          var y = 0;
          while (y < height) {
              y += 50;
              this.drawLine(ctx, 0, y, width, y);
              this.drawPixelText(ctx, y.toString(), 0, y);
          }
      };
      Grid.prototype.drawMinorGrid = function (ctx, width, height) {
          ctx.strokeStyle = '#f0f0f0';
          var x = 0;
          while (x < width) {
              x += 10;
              this.drawLine(ctx, x, 0, x, height);
          }
          //draw horizontal lines
          var y = 0;
          while (y < height) {
              y += 10;
              this.drawLine(ctx, 0, y, width, y);
          }
      };
      Grid.prototype.drawLine = function (ctx, x1, y1, x2, y2) {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
      };
      Grid.prototype.drawPixelText = function (ctx, text, x, y) {
          ctx.fillText(text, x, y);
      };
      /**
       * just for ts lint, no sense
       */
      Grid.prototype._toJSON = function () {
          return [];
      };
      Object.defineProperty(Grid.prototype, "bounds", {
          /**
           * just for ts lint, no sense
           */
          get: function () { return new Rect(0, 0, 0, 0); },
          enumerable: true,
          configurable: true
      });
      Grid = __decorate([
          observeProps({
              /**
               * 是否有Sub grid
               */
              minor: { type: Boolean, default: true },
          })
      ], Grid);
      return Grid;
  }(Item));
  //# sourceMappingURL=Grid.js.map

  // const defaultOptions = {
  //   showX: true,
  //   showY: true,
  //   mode: 'numeric',
  //   position: 'center',
  // };
  var gap = 50; //in pixels
  /**
   * 简单坐标轴
   * simple axes
   */
  var Axes = /** @class */ (function (_super) {
      __extends(Axes, _super);
      function Axes(options) {
          if (options === void 0) { options = {}; }
          var _this = _super.call(this, options) || this;
          _this.minX = 0;
          _this.minY = 0;
          return _this;
      }
      /**
       * draw X axis
       * @param ctx
       * @param width
       * @param height
       */
      Axes.prototype.drawXAxis = function (ctx, width, height) {
          this.drawLine(ctx, 0, height / 2, width, height / 2);
          var mark = this.minX;
          var x = 10;
          while (x < width) {
              x += gap;
              mark++;
              this.drawMark(ctx, x, height / 2, mark);
          }
          ctx.stroke();
      };
      Axes.prototype.drawYAxis = function (ctx, width, height) {
          this.drawLine(ctx, width / 2, height, width / 2, 0);
          var mark = this.minY;
          var y = height;
          while (y > 0) {
              y -= gap;
              mark++;
              this.drawMarkY(ctx, width / 2, y, mark);
          }
          ctx.stroke();
      };
      Axes.prototype.drawMarkY = function (ctx, x, y, mark) {
          ctx.moveTo(x, y);
          ctx.lineTo(x - 4, y);
          ctx.fillText(mark.toString(), x - 12, y - 6);
      };
      Axes.prototype.drawMark = function (ctx, x, y, mark) {
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + 4);
          ctx.fillText(mark.toString(), x - 3, y + 15);
      };
      Axes.prototype.drawLine = function (ctx, x1, y1, x2, y2) {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
      };
      Axes.prototype._draw = function (ctx) {
          var _a = this.layer, width = _a.width, height = _a.height;
          ctx.lineWidth = 1;
          // ctx.fontSize = 10;
          ctx.font = '9px serif';
          ctx.strokeStyle = '#000';
          this.minX = -Math.floor(width / gap / 2);
          this.minY = -Math.floor(height / gap / 2);
          if (this.showX) {
              this.drawXAxis(ctx, width, height);
          }
          if (this.showY) {
              this.drawYAxis(ctx, width, height);
          }
          return this;
      };
      /**
       * just for ts lint, no sense
       */
      Axes.prototype._toJSON = function () {
          return [];
      };
      Object.defineProperty(Axes.prototype, "bounds", {
          /**
           * just for ts lint, no sense
           */
          get: function () { return new Rect(0, 0, 0, 0); },
          enumerable: true,
          configurable: true
      });
      Axes = __decorate([
          observeProps({
              /**
               * 是否有Sub grid
               */
              showX: { type: Boolean, default: true },
              showY: { type: Boolean, default: true },
          })
      ], Axes);
      return Axes;
  }(Item));
  //# sourceMappingURL=Axes.js.map

  /**
   * Manage & cache materials of whiteboard.
   */
  var MaterialProvider = /** @class */ (function () {
      /**
       * Init MaterialProvider with image src list. order-sensitive
       * @param images image src list
       */
      function MaterialProvider(images) {
          var e_1, _a;
          this.cached = {};
          this.preload = 1;
          this.length = 0;
          if (!images)
              return;
          try {
              for (var images_1 = __values(images), images_1_1 = images_1.next(); !images_1_1.done; images_1_1 = images_1.next()) {
                  var url = images_1_1.value;
                  var material = new Img({}, url);
                  if (this.length < this.preload)
                      material.loadImage();
                  this.length++;
                  this.cached[url] = material;
              }
          }
          catch (e_1_1) { e_1 = { error: e_1_1 }; }
          finally {
              try {
                  if (images_1_1 && !images_1_1.done && (_a = images_1.return)) _a.call(images_1);
              }
              finally { if (e_1) throw e_1.error; }
          }
      }
      /**
       * Get material image by url.
       * @param url
       */
      MaterialProvider.prototype.get = function (url) {
          var cached = this.cached;
          if (cached[url])
              return cached[url];
          var material = new Img({}, url);
          this.length++;
          cached[url] = material;
          return cached[url];
      };
      /**
       * Remove material image by url.
       * @param url
       */
      MaterialProvider.prototype.remove = function (url) {
          var img = this.cached[url];
          delete this.cached[url];
          this.length--;
          return img;
      };
      MaterialProvider.prototype.clear = function () {
          this.cached = {};
      };
      return MaterialProvider;
  }());
  //# sourceMappingURL=MaterialProvider.js.map

  /**
   * enum of action type
   */
  // const ActionType = {
  //   translate: 'translate',
  //   add: 'add',
  //   remove: 'remove',
  //   scale: 'scale',
  //   typing: 'typing',
  // };
  /**
   * Action of redo-undo history
   */
  var Action = /** @class */ (function () {
      // private _hot = 0; // 操作热度计数
      function Action(delta) {
          this.recordTimeStamp = +new Date();
          this.type = delta.type;
          this._redo = {};
      }
      /**
       * Get undo-action for current action
       * @param {Object} delta
       * @param {Object} oldDelta used fro anti-action
       */
      Action.prototype._calcUndo = function (delta) {
          var hash = delta.data;
          switch (delta.action) {
              case 'ADD':
                  return Object.assign({}, delta, {
                      action: 'DELETE',
                  });
              case 'DELETE':
                  return Object.assign({}, delta, {
                      action: 'ADD',
                  });
              case 'MOVE':
                  var _a = hash.offset, x = _a.x, y = _a.y;
                  return {
                      action: 'MOVE',
                      data: {
                          ids: hash.ids,
                          offset: { x: -x, y: -y },
                      },
                  };
              case 'SCALE':
                  var _b = hash.scale, sx = _b.sx, sy = _b.sy, basePoint = _b.basePoint;
                  return {
                      action: 'SCALE',
                      data: {
                          ids: hash.ids,
                          scale: {
                              sx: 1 / sx,
                              sy: 1 / sy,
                              basePoint: basePoint,
                          },
                      },
                  };
              case 'TYPING':
                  return {
                      action: 'TYPING',
                      data: {
                          id: hash.id,
                          value: hash.lastTypedText,
                      },
                  };
          }
          return null;
      };
      Object.defineProperty(Action.prototype, "redo", {
          get: function () {
              return this._redo;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Action.prototype, "undo", {
          get: function () {
              return this._undo;
          },
          enumerable: true,
          configurable: true
      });
      return Action;
  }());
  //# sourceMappingURL=Action.js.map

  // History Stack for undo/redo
  /**
   * options.maxStack : max length limit in history stack
   * options.enableKeyboard : If enable keyboard to redo-undo actions. (e.g. ctrl + z)
   *
   * methods:
   *  redo: replay last action.
   *  undo: cancel last action.
   *  record: record action in history stack.
   *  clear: clear current history stack.
   */
  //TODO: 返回undo stack 和 redo stack 为空的callback，方便UI展示按钮的disable状态
  var defaultOptions = {
      maxStack: 300,
      enableKeyboard: true,
  };
  var History = /** @class */ (function () {
      // private emit: (eventName: string, args: Object) => void;
      function History(options) {
          if (options === void 0) { options = {}; }
          this.lastRecorded = 0;
          this.clear();
          this.options = Object.assign({}, defaultOptions, options);
      }
      /**
       * Clear Current Stack
       */
      History.prototype.clear = function () {
          this.stack = { undo: [], redo: [] };
          this.emit('change', { stackLength: [0, 0] });
      };
      /**
       * Record changed and store to stack
       * @param delta
       */
      History.prototype.record = function (delta) {
          if (!delta)
              throw TypeError('Invalid record point.');
          // clear redo list on an new record point.
          this.stack.redo = [];
          var action = new Action(delta);
          this.stack.undo.push(action);
          if (this.stack.undo.length > this.options.maxStack) {
              this.stack.undo.shift();
          }
      };
      /**
       * handle undo/redo actions
       * @param source, "undo" or "redo"
       * @param dest, "redo" or "undo"
       */
      History.prototype.change = function (source, dest) {
          if (!this.options.enableKeyboard)
              return;
          if (this.stack[source].length === 0)
              return;
          var delta = this.stack[source].pop();
          if (!delta[source])
              return;
          this.emit('change', {
              action: source.toUpperCase(),
              delta: delta[source],
              stackLength: [this.stack.redo.length, this.stack.undo.length],
          });
          this.lastRecorded = 0;
          this.stack[dest].push(delta);
      };
      /**
       * Redo last undo action.
       */
      History.prototype.redo = function () {
          this.change('redo', 'undo');
      };
      /**
       * undo last record action.
       */
      History.prototype.undo = function () {
          this.change('undo', 'redo');
      };
      History = __decorate([
          emittable()
      ], History);
      return History;
  }());
  //# sourceMappingURL=History.js.map

  // const _createContext = Symbol('_createContext');
  var defaultOptions$1 = {
      selectionMode: 'bounds',
      refreshMode: 'loop',
      width: 1000,
      height: 800,
      showGrid: false,
      showAxes: false,
      alignToGrid: false,
      throttle: 0,
      minDistance: 0,
      verbose: false,
      precision: 1,
      zoom: 1,
      dragThreshold: 2
  };
  /**
   * 白板的初始化选项。
   * Initialize options of whiteboard.
   * Options:
   *
   *  - selectionMode: 'bounds', 'path'
   *  - alignToGrid: boolean 对齐到网格
   *  - loop / notify
   *  - command-mode: verbose // 当绘制时发送更多的指令
   *  - precision (精度)
   */
  var Whiteboard = /** @class */ (function () {
      function Whiteboard(options) {
          this.isLoop = false;
          this._zoom = 1;
          this.material = new MaterialProvider();
          this.history = new History();
          this.options = Object.assign({}, defaultOptions$1, options);
          var _a = this.options, container = _a.container, width = _a.width, height = _a.height;
          /** 一个container不能加载两个白板*/
          Whiteboard_1.instances.find(function (instance) {
              if (instance.wrapper === container)
                  throw new Error("Can't instance at same container twice!");
              return false;
          });
          setStyle(container, {
              width: width + "px",
              height: height + "px",
              position: 'relative',
          });
          this.wrapper = container;
          this.width = width;
          this.height = height;
          this.context = this._createContext();
          var layerDep = {
              wrapper: this.wrapper,
              context: this.context
          };
          this.backgroundLayer = new Layer(this.width, this.height, 'background', layerDep);
          this.activeLayer = new Layer(this.width, this.height, 'active', layerDep);
          this.operateLayer = new OperateLayer(this.width, this.height, 'operate', layerDep);
          //operateLayer must be last one
          this.operateLayer.el.tabIndex = 1; //make container focusable.
          var handler = (this.handler = new EventHandler(this.items));
          handler.context = this.context;
          handler.bind(this.operateLayer);
          // this.tool = 'selection';
          if (this.options.zoom !== 1)
              this.zoom = this.options.zoom;
          this.context.zoom = this.options.zoom;
          Whiteboard_1.instances.push(this);
      }
      Whiteboard_1 = Whiteboard;
      /**
       * 白板实例的context, 每个白板唯一
       * context 可以被layers, item-collection, tools访问
       * 注意，要区分白板实例的context，和canvas getContext
       *
       */
      Whiteboard.prototype._createContext = function () {
          var proto = {
              textWrapper: this.wrapper,
              whiteboard: this,
              currentMode: null,
              refreshCount: 0,
              settings: Object.freeze(this.options),
              bounds: new Rect(0, 0, this.width, this.height),
              emit: this.emit.bind(this),
          };
          return Object.create(proto);
      };
      /**
       * Watch mode. Redraw layer if it mark as dirty in every tick.
       */
      Whiteboard.prototype.watch = function () {
          var _this = this;
          if (this.isLoop === true)
              throw new Error("Can't watch twice!");
          var drawDirtyLayer = function () {
              if (_this.activeLayer.isDirty)
                  _this.activeLayer.refresh();
              if (_this.operateLayer.isDirty)
                  _this.operateLayer.refresh();
              if (_this.backgroundLayer.isDirty)
                  _this.backgroundLayer.refresh();
              requestAnimationFrame(drawDirtyLayer);
          };
          //invoke immediately！
          drawDirtyLayer();
          this.isLoop = true;
      };
      /**
       * refresh activeLayer in next tick.
       * Ensure redraw only once in every tick.
       */
      Whiteboard.prototype.refresh = function () {
          var _this = this;
          requestAnimationFrame(function () { return _this.activeLayer.refresh(); });
      };
      /**
       * refresh all layers in next tick.
       * Ensure redraw only once in every tick.
       */
      Whiteboard.prototype.refreshAll = function () {
          var _this = this;
          requestAnimationFrame(function () { return _this.layers.forEach(function (layer) { return layer.refresh(); }); });
      };
      Object.defineProperty(Whiteboard.prototype, "data", {
          /**
           * get data of items in all layers.
           */
          get: function () {
              return this.items.toJSON();
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Whiteboard.prototype, "zoom", {
          /**
           * Get zoom of current whiteboard.
           */
          get: function () {
              return this._zoom;
          },
          /**
           * Set zoom of current whiteboard.
           */
          set: function (radio) {
              this._zoom = radio;
              this.context.zoom = radio;
              this.layers.forEach(function (layer) { return layer.zoom(radio); });
              setStyle(this.wrapper, {
                  width: this.width * radio + "px",
                  height: this.height * radio + "px",
                  position: 'relative',
              });
          },
          enumerable: true,
          configurable: true
      });
      Whiteboard.prototype.addItem = function (item) {
          this.items.add(item);
      };
      Whiteboard.prototype.createItem = function (type, style) {
          if (!type)
              throw new TypeError('Argument illegal!');
          if (typeof type === 'string')
              return createItem(type, style);
          if (type instanceof Item)
              return type;
          var ins = createItemViaJSON(type);
          if (ins.type === 'text') { // TODO: need to refactor
              ins.textWrapper = this.wrapper;
              ins.zoom = this.zoom;
          }
          return ins;
      };
      Whiteboard.prototype.typingText = function (json) {
          var textInstance = this.items.find(function (item) { return item.id === json[0]; });
          textInstance && textInstance.input && (textInstance.input.innerHTML = json[1]);
      };
      Whiteboard.prototype.add = function (json) {
          var instance = this.createItem(json);
          this.items.add(instance);
          return instance;
      };
      Whiteboard.prototype.remove = function (json) {
          this.items.deleteById(json);
      };
      Whiteboard.prototype.resize = function (json) {
          var ids = json[0];
          var _a = __read(json[1], 4), sx = _a[0], sy = _a[1], X = _a[2], Y = _a[3];
          this.items.filter(function (item) { return ids.includes(item.id); }).map(function (item) { return item.scale(sx, sy, new Point(X, Y)); });
      };
      Whiteboard.prototype.move = function (json) {
          var ids = json[0];
          var _a = __read(json[1], 2), x = _a[0], y = _a[1];
          this.items.filter(function (item) { return ids.includes(item.id); }).map(function (item) { return item.translate(new Point(x, y)); });
      };
      Object.defineProperty(Whiteboard.prototype, "items", {
          /**
           * Items of activeLayer is whiteboard 'real' items.
           * It's read-only.
           */
          get: function () {
              return this.activeLayer.items;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(Whiteboard.prototype, "tool", {
          set: function (val) {
              this.handler.tool = getTool(val);
          },
          enumerable: true,
          configurable: true
      });
      Whiteboard.prototype.getTool = function () {
          return this.handler.tool;
      };
      Whiteboard.prototype.getToolByName = function (name) {
          var tool = getTool(name);
          tool.layer = this.handler.layer;
          return tool;
      };
      Object.defineProperty(Whiteboard.prototype, "layers", {
          /**
           * Get Layers of Whiteboard.
           */
          get: function () {
              return [this.backgroundLayer, this.activeLayer, this.operateLayer];
          },
          enumerable: true,
          configurable: true
      });
      Whiteboard.prototype.redo = function () {
          this.history.redo();
      };
      Whiteboard.prototype.undo = function () {
          this.history.undo();
      };
      Whiteboard.prototype.command = function () { };
      Whiteboard.prototype.drawMaterial = function (url) {
          var material = this.material.get(url);
          this.backgroundLayer.items.set(material, 0);
      };
      Whiteboard.prototype.drawGrid = function (minor) {
          if (minor === void 0) { minor = false; }
          var grid = new Grid({ minor: minor });
          this.backgroundLayer.items.set(grid, 1);
      };
      Whiteboard.prototype.drawAxes = function () {
          var axes = new Axes();
          this.backgroundLayer.items.set(axes, 2);
      };
      Whiteboard.prototype.saveImage = function (filename, type) {
          var _this = this;
          if (filename === void 0) { filename = 'material'; }
          if (type === void 0) { type = 'png'; }
          if (!/^jpeg|jpg|png$/.test(type))
              throw new Error("Can't support type " + type);
          //创建离屏canvas，绘制layers；
          var offscreenCanvas = new Layer(this.width, this.height, '', {
              context: this.context
          });
          var ctx = offscreenCanvas.ctx;
          this.layers.forEach(function (layer) { return ctx.drawImage(layer.el, 0, 0, _this.width, _this.height); });
          var $link = document.createElement('a');
          function downloadCanvas() {
              $link.href = offscreenCanvas.el.toDataURL("image/" + type);
              $link.download = filename;
              $link.click();
          }
          downloadCanvas();
      };
      Whiteboard.prototype.dispose = function () {
          var wrapper = this.wrapper;
          //TODO: remove all canvas DOM.
          wrapper.removeChild(this.backgroundLayer.el);
          wrapper.removeChild(this.activeLayer.el);
      };
      /**
       * Clear layers of whiteboard.
       */
      Whiteboard.prototype.clear = function () {
          this.layers.forEach(function (layer) { return layer.clear(); });
          this.context.emit('layers:clear');
          return this;
      };
      var Whiteboard_1;
      Whiteboard.instances = [];
      Whiteboard = Whiteboard_1 = __decorate([
          emittable()
      ], Whiteboard);
      return Whiteboard;
  }());
  //# sourceMappingURL=index.js.map

  /**
   * Adapt from  https://github.com/sole/tween.js/blob/master/src/Tween.js
   * @see http://sole.github.io/tween.js/examples/03_graphs.html
   */
  var easing = {
    /**
     * @param {number} k
     * @return {number}
     */
    linear: function linear(k) {
      return k;
    },

    /**
     * @param {number} k
     * @return {number}
     */
    quadraticIn: function quadraticIn(k) {
      return k * k;
    },

    /**
     * @param {number} k
     * @return {number}
     */
    quadraticOut: function quadraticOut(k) {
      return k * (2 - k);
    },

    /**
     * @param {number} k
     * @return {number}
     */
    quadraticInOut: function quadraticInOut(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k;
      }

      return -0.5 * (--k * (k - 2) - 1);
    },
    // 三次方的缓动（t^3）

    /**
     * @param {number} k
     * @return {number}
     */
    cubicIn: function cubicIn(k) {
      return k * k * k;
    },

    /**
     * @param {number} k
     * @return {number}
     */
    cubicOut: function cubicOut(k) {
      return --k * k * k + 1;
    },

    /**
     * @param {number} k
     * @return {number}
     */
    cubicInOut: function cubicInOut(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k;
      }

      return 0.5 * ((k -= 2) * k * k + 2);
    },
    // 四次方的缓动（t^4）

    /**
     * @param {number} k
     * @return {number}
     */
    quarticIn: function quarticIn(k) {
      return k * k * k * k;
    },

    /**
     * @param {number} k
     * @return {number}
     */
    quarticOut: function quarticOut(k) {
      return 1 - --k * k * k * k;
    },

    /**
     * @param {number} k
     * @return {number}
     */
    quarticInOut: function quarticInOut(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k;
      }

      return -0.5 * ((k -= 2) * k * k * k - 2);
    },
    // 五次方的缓动（t^5）

    /**
     * @param {number} k
     * @return {number}
     */
    quinticIn: function quinticIn(k) {
      return k * k * k * k * k;
    },

    /**
     * @param {number} k
     * @return {number}
     */
    quinticOut: function quinticOut(k) {
      return --k * k * k * k * k + 1;
    },

    /**
     * @param {number} k
     * @return {number}
     */
    quinticInOut: function quinticInOut(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k * k;
      }

      return 0.5 * ((k -= 2) * k * k * k * k + 2);
    },
    // 正弦曲线的缓动（sin(t)）

    /**
     * @param {number} k
     * @return {number}
     */
    sinusoidalIn: function sinusoidalIn(k) {
      return 1 - Math.cos(k * Math.PI / 2);
    },

    /**
     * @param {number} k
     * @return {number}
     */
    sinusoidalOut: function sinusoidalOut(k) {
      return Math.sin(k * Math.PI / 2);
    },

    /**
     * @param {number} k
     * @return {number}
     */
    sinusoidalInOut: function sinusoidalInOut(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    },
    // 指数曲线的缓动（2^t）

    /**
     * @param {number} k
     * @return {number}
     */
    exponentialIn: function exponentialIn(k) {
      return k === 0 ? 0 : Math.pow(1024, k - 1);
    },

    /**
     * @param {number} k
     * @return {number}
     */
    exponentialOut: function exponentialOut(k) {
      return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
    },

    /**
     * @param {number} k
     * @return {number}
     */
    exponentialInOut: function exponentialInOut(k) {
      if (k === 0) {
        return 0;
      }

      if (k === 1) {
        return 1;
      }

      if ((k *= 2) < 1) {
        return 0.5 * Math.pow(1024, k - 1);
      }

      return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
    },
    // 圆形曲线的缓动（sqrt(1-t^2)）

    /**
     * @param {number} k
     * @return {number}
     */
    circularIn: function circularIn(k) {
      return 1 - Math.sqrt(1 - k * k);
    },

    /**
     * @param {number} k
     * @return {number}
     */
    circularOut: function circularOut(k) {
      return Math.sqrt(1 - --k * k);
    },

    /**
     * @param {number} k
     * @return {number}
     */
    circularInOut: function circularInOut(k) {
      if ((k *= 2) < 1) {
        return -0.5 * (Math.sqrt(1 - k * k) - 1);
      }

      return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    },
    // 创建类似于弹簧在停止前来回振荡的动画

    /**
     * @param {number} k
     * @return {number}
     */
    elasticIn: function elasticIn(k) {
      var s;
      var a = 0.1;
      var p = 0.4;

      if (k === 0) {
        return 0;
      }

      if (k === 1) {
        return 1;
      }

      if (!a || a < 1) {
        a = 1;
        s = p / 4;
      } else {
        s = p * Math.asin(1 / a) / (2 * Math.PI);
      }

      return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
    },

    /**
     * @param {number} k
     * @return {number}
     */
    elasticOut: function elasticOut(k) {
      var s;
      var a = 0.1;
      var p = 0.4;

      if (k === 0) {
        return 0;
      }

      if (k === 1) {
        return 1;
      }

      if (!a || a < 1) {
        a = 1;
        s = p / 4;
      } else {
        s = p * Math.asin(1 / a) / (2 * Math.PI);
      }

      return a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
    },

    /**
     * @param {number} k
     * @return {number}
     */
    elasticInOut: function elasticInOut(k) {
      var s;
      var a = 0.1;
      var p = 0.4;

      if (k === 0) {
        return 0;
      }

      if (k === 1) {
        return 1;
      }

      if (!a || a < 1) {
        a = 1;
        s = p / 4;
      } else {
        s = p * Math.asin(1 / a) / (2 * Math.PI);
      }

      if ((k *= 2) < 1) {
        return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
      }

      return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
    },
    // 在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动

    /**
     * @param {number} k
     * @return {number}
     */
    backIn: function backIn(k) {
      var s = 1.70158;
      return k * k * ((s + 1) * k - s);
    },

    /**
     * @param {number} k
     * @return {number}
     */
    backOut: function backOut(k) {
      var s = 1.70158;
      return --k * k * ((s + 1) * k + s) + 1;
    },

    /**
     * @param {number} k
     * @return {number}
     */
    backInOut: function backInOut(k) {
      var s = 1.70158 * 1.525;

      if ((k *= 2) < 1) {
        return 0.5 * (k * k * ((s + 1) * k - s));
      }

      return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    },

    /**
     * @param {number} k
     * @return {number}
     */
    bounceIn: function bounceIn(k) {
      return 1 - easing.bounceOut(1 - k);
    },

    /**
     * @param {number} k
     * @return {number}
     */
    bounceOut: function bounceOut(k) {
      if (k < 1 / 2.75) {
        return 7.5625 * k * k;
      } else if (k < 2 / 2.75) {
        return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
      } else if (k < 2.5 / 2.75) {
        return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
      } else {
        return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
      }
    },

    /**
     * @param {number} k
     * @return {number}
     */
    bounceInOut: function bounceInOut(k) {
      if (k < 0.5) {
        return easing.bounceIn(k * 2) * 0.5;
      }

      return easing.bounceOut(k * 2 - 1) * 0.5 + 0.5;
    }
  };

  var INTERVAL = 1000;
  /**
   * Runtime Context of current playback.
   */

  var Pointer$1 =
  /*#__PURE__*/
  function () {
    //客户端时间用于和playback时间戳计算偏移量。
    function Pointer() {
      _classCallCheck(this, Pointer);

      _defineProperty(this, "_clientStartTime", 0);

      _defineProperty(this, "currentStamp", 0);

      _defineProperty(this, "index", 0);

      this._clientStartTime = +new Date();
    }

    _createClass(Pointer, [{
      key: "goto",
      value: function goto() {}
    }, {
      key: "next",
      value: function next() {}
    }]);

    return Pointer;
  }();

  var SnapshotProvider =
  /*#__PURE__*/
  function () {
    function SnapshotProvider() {
      _classCallCheck(this, SnapshotProvider);

      _defineProperty(this, "cached", {});
    }

    _createClass(SnapshotProvider, [{
      key: "get",
      value: function get() {}
    }]);

    return SnapshotProvider;
  }();

  var EventPlayer =
  /*#__PURE__*/
  function () {
    function EventPlayer(logs) {
      _classCallCheck(this, EventPlayer);

      _defineProperty(this, "events", []);

      _defineProperty(this, "members", []);

      _defineProperty(this, "roomInfo", null);

      _defineProperty(this, "_pointer", null);

      _defineProperty(this, "_timer", 0);

      _defineProperty(this, "_currentTime", 0);

      _defineProperty(this, "_startTime", 0);

      _defineProperty(this, "_duration", 0);

      this._preprocess(logs);

      this.snapshotProvider = new SnapshotProvider();
    }

    _createClass(EventPlayer, [{
      key: "sanitize",
      value: function sanitize() {}
    }, {
      key: "_preprocess",
      value: function _preprocess(_ref) {
        var head = _ref.head,
            events = _ref.events;
        this.members = head.minfo.map(function (item) {
          return JSON.parse(item);
        });
        this.roomInfo = typeof head.rinfo === 'string' ? JSON.parse(head.rinfo) : head.rinfo;
        console.log(events.length);
        var lastPointTS = 0;

        for (var i = 0, len = events.length; i < len; i++) {
          var _event = events[i];
          if (_event.sid === 7 && _event.ssid === 11) continue;

          if (_event.sid === 4 && _event.ssid === 22) {
            if (lastPointTS === _event.ts) continue;
            lastPointTS = _event.ts;
          }

          var body = _event.body,
              rest = _objectWithoutProperties(_event, ["body"]); // this.events.push({ ...rest, body : JSON.parse(body) });


          this.events.push(_objectSpread({}, rest, {
            body: body
          }));
        }
      }
    }, {
      key: "_tickAction",
      value: function _tickAction() {
        this.pointer.next();
      }
    }, {
      key: "seek",
      value: function seek(time) {
        if (time > 10000000000) time /= 100; // mill-seconds -> seconds

        var snapshot = this.snapshotProvider.get(time);

        if (!snapshot) {
          snapshot = this.calcSnapShot();
        }
      }
    }, {
      key: "play",
      value: function play() {
        var _this = this;

        this._timer = window.setInterval(function () {
          _this._tickAction();
        }, INTERVAL);

        this._tickAction();
      }
    }, {
      key: "pause",
      value: function pause() {
        window.clearInterval(this._timer);
      }
    }, {
      key: "pointer",
      get: function get() {
        if (this._pointer) return this._pointer;
        return this._pointer = new Pointer$1();
      }
    }]);

    return EventPlayer;
  }();

  //A playground of this proj
  var playground = {
    init: function init() {
      window.whiteboard = this.whiteboard = new Whiteboard({
        container: document.getElementById('draw-panel'),
        width: 1000,
        height: 800,
        zoom: 1,
        selectionMode: 'contains' // cross

      });
      window.whiteboard2 = this.whiteboard2 = new Whiteboard({
        container: document.getElementById('draw-panel2'),
        width: 1000,
        height: 800,
        zoom: 0.5,
        selectionMode: 'contains' // cross

      });
      window.items = window.whiteboard.items;
      this.whiteboard.on('item:add', function (arg) {// console.log(arg);
      }).on('layer:refresh', function (arg) {// console.log(`${arg.layer.role}, refreshed!`);
      }).on('item:add', function (arg) {
        console.log('item:add', arg);
      });
      this.whiteboard.watch();
      this.whiteboard2.watch();
      this.simulateComm();
      window.player = this.player = new EventPlayer(eventlog);
      return whiteboard;
    },
    simulateComm: function simulateComm() {
      var wb2 = this.whiteboard2;

      function addItem(hash) {
        wb2.add(hash);
      }

      function removeItem(hash) {
        wb2.remove(hash);
      }

      function typingText(hash) {
        wb2.typingText(hash);
      }

      function pointerMove(hash) {
        wb2.remove(hash);
      }

      function pointerDraw(hash) {
        wb2.remove(hash);
      }

      function moveItem(hash) {
        wb2.move(hash);
      }

      function resizeItems(hash) {
        wb2.resize(hash);
      }

      this.whiteboard.on('item:add', function (arg) {
        addItem(arg);
      }).on('items:delete', function (arg) {
        removeItem(arg);
      }).on('item:typing', function (arg) {
        typingText(arg);
      }).on('pointer:move', function (arg) {
        pointerMove(arg);
      }).on('pointer:draw', function (arg) {
        pointerDraw(arg);
      }).on('items:move', function (arg) {
        moveItem(arg);
      }).on('items:resize', function (arg) {
        resizeItems(arg);
      });
    },
    drawPolyline: function drawPolyline(type) {
      type = type || 'linear';
      var p1 = new Path();
      p1.moveTo(new Point(0, 500));

      for (var i = 0; i < 10; i++) {
        var k = ease[type](i / 10);
        p1.lineTo(new Point(i * 50, 500 - k * 500));
      } // p1.simplify();


      p1.draw(this.whiteboard.ctx);
      window.paths.push(p1);
    },
    animateScale: function animateScale() {
      var item = items[0];
      var point = item.position; // let ease = easing.bounceInOut;

      var ease = easing.cubicIn;
      console.time('anim');

      animate$1({
        startValue: 0,
        endValue: 720,
        duration: 400,
        easing: ease,
        onChange: function onChange(value, valueProgress, timeProgress) {
          // item.scale(value / lastValue, value / lastValue);
          item.rotate(value);
          canvas.refresh();
        },
        onComplete: function onComplete(value, valueProgress, timeProgress) {
          console.log(value, valueProgress, timeProgress);
          console.timeEnd('anim');
        }
      });
    },
    animate: function animate() {
      var item = items[0];
      var point = item.position; // let ease = easing.bounceInOut;

      var ease = easing.cubicIn;
      console.time('anim');

      animate$1({
        startValue: 0,
        endValue: 100,
        duration: 400,
        easing: ease,
        onChange: function onChange(value, valueProgress, timeProgress) {
          item.setPosition(point.x + value, point.y + value);
          canvas.refresh();
        },
        onComplete: function onComplete(value, valueProgress, timeProgress) {
          console.log(value, valueProgress, timeProgress);
          console.timeEnd('anim');
        }
      });
    },
    animateRotate: function animateRotate() {
      var item = items[0];
      var point = item.position;
      var ease = easing.cubicIn;
      console.time('anim');
      var lastValue = 1;

      animate$1({
        startValue: 0,
        endValue: 1350,
        duration: 1000,
        easing: ease,
        onChange: function onChange(value, valueProgress, timeProgress) {
          console.log(value - lastValue);
          item.rotate(value - lastValue);
          lastValue = value;
          canvas.refresh();
        },
        onComplete: function onComplete(value, valueProgress, timeProgress) {
          console.log(value, valueProgress, timeProgress);
          console.timeEnd('anim');
        }
      });
    }
  };

  //top-level APIs
  /**
   * on('type', handler);
   *  possible-values:
   *  - changed 当白板上元素发生变化时，（返回变更的数据和Hash）
   *  - add 当元素新增时
   *  - remove 当元素删除时
   *  -
   *
   * options:
   *  - selectionMode: 'bounds', 'path'
   *  - alignToGrid: boolean 对齐到网格
   *  - loop / notify
   *  -
   *
   */
  //mount graphic on namespace (top-level).
  //@ts-ignore
  var nebula = typeof nebula !== 'undefined' ? nebula : { Point: Point, Rect: Rect, Style: Style, Path: Path, Color: Color$1, Matrix: Matrix, Layer: Layer };
  // let nebula;
  // if (typeof nebula === 'undefined') {
  //   nebula = { Point, Rect, Style, Path, Color, Matrix, Layer };
  // }
  //mount util on namespace.
  nebula.util = { RGB2HSL: RGB2HSL, HSL2RGB: HSL2RGB, RGB2Gray: RGB2Gray, Gray2RGB: Gray2RGB, Gray2HSB: Gray2HSB, animateColor: animateColor, animate: animate$1 };
  //mount Whiteboard constructor on namespace.
  nebula.Whiteboard = Whiteboard;
  //mount enum on namespace.
  // nebula.enum = { keyCode };
  //tmp for debug
  {
      playground.init();
  }
  window.nebula = nebula;
  //# sourceMappingURL=index.js.map

  exports.default = nebula;
  exports.Whiteboard = Whiteboard;
  exports.Point = Point;
  exports.Rect = Rect;
  exports.Style = Style;
  exports.Path = Path;

  return exports;

}({}));
//# sourceMappingURL=app.js.map
