import { forwardRef, useMemo, useEffect, useCallback, useRef, useImperativeHandle, createElement } from 'react';
import ThreeGlobe from 'three-globe';
import { omit } from 'jerrypick';

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = true,
      o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = true, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o,
    r,
    i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function fromThree(ThreeComponent) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$methodNames = _ref.methodNames,
    methodNames = _ref$methodNames === void 0 ? [] : _ref$methodNames,
    _ref$initPropNames = _ref.initPropNames,
    initPropNames = _ref$initPropNames === void 0 ? [] : _ref$initPropNames;
  return /*#__PURE__*/forwardRef(function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var ref = arguments.length > 1 ? arguments[1] : undefined;
    // instantiate the three component with the defined initPropNames
    var threeObj = useMemo(function () {
      return new ThreeComponent(Object.fromEntries(initPropNames.filter(function (p) {
        return props.hasOwnProperty(p);
      }).map(function (prop) {
        return [prop, props[prop]];
      })));
    }, []);
    useEffect(function () {
      // invoke destructor on unmount, if it exists
      return threeObj._destructor instanceof Function ? threeObj._destructor : undefined;
    }, [threeObj]);

    // Call a component method
    var _call = useCallback(function (method) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      return threeObj[method] instanceof Function ? threeObj[method].apply(threeObj, args) : undefined;
    } // method not found
    , [threeObj]);
    var passThroughProps = Object.fromEntries(Object.entries(props).filter(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 1),
        k = _ref3[0];
      return !threeObj[k] || !(threeObj[k] instanceof Function);
    }));

    // propagate component props that have changed
    var prevPropsRef = useRef({});
    Object.keys(omit(props, [].concat(_toConsumableArray(methodNames), _toConsumableArray(initPropNames), _toConsumableArray(Object.keys(passThroughProps))))).filter(function (p) {
      return prevPropsRef.current[p] !== props[p];
    }).forEach(function (p) {
      return _call(p, props[p]);
    });
    prevPropsRef.current = props;

    // bind external methods to parent ref
    useImperativeHandle(ref, function () {
      return Object.fromEntries(methodNames.map(function (method) {
        return [method, function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          return _call.apply(void 0, [method].concat(args));
        }];
      }));
    });
    return /*#__PURE__*/createElement('primitive', _objectSpread2(_objectSpread2({}, passThroughProps), {}, {
      object: threeObj
    }));
  });
}

var _excluded = ["onHover", "onClick"];
var GlobeComp = fromThree(ThreeGlobe, {
  initPropNames: ['waitForGlobeReady', 'animateIn'],
  methodNames: ['getGlobeRadius', 'getCoords', 'toGeoCoords', 'pauseAnimation', 'resumeAnimation', 'setPointOfView']
});
var getGlobeEventObj = function getGlobeEventObj(_ref) {
  var intersection = _ref.intersection,
    intersections = _ref.intersections;
  var _lookupGlobeObj = function lookupGlobeObj(o) {
    return (
      // recurse up object chain until finding the globe object
      !o ? null : o.hasOwnProperty('__globeObjType') ? o : _lookupGlobeObj(o.parent)
    );
  };

  // XR pmndrs intersection https://pmndrs.github.io/xr/docs/tutorials/interactions
  var globeObjIntersection = (intersection ? [intersection] : intersections).find(function (d) {
    var gObj = _lookupGlobeObj(d.object);
    return gObj && gObj.__globeObjType !== 'atmosphere';
  });
  return [_lookupGlobeObj(globeObjIntersection === null || globeObjIntersection === void 0 ? void 0 : globeObjIntersection.object), globeObjIntersection];
};
var getObjData = function getObjData(obj, intersection) {
  return ({
    polygon: function polygon(d) {
      return d.data;
    },
    particles: function particles(d) {
      return intersection && intersection.hasOwnProperty('index') && d.length > intersection.index ? d[intersection.index] : d;
    }
  }[obj === null || obj === void 0 ? void 0 : obj.__globeObjType] || function (d) {
    return d;
  })(obj === null || obj === void 0 ? void 0 : obj.__data);
};
var Globe = /*#__PURE__*/forwardRef(function (_ref2, ref) {
  var onHover = _ref2.onHover,
    onClick = _ref2.onClick,
    ptProps = _objectWithoutProperties(_ref2, _excluded);
  var curHoverObjRef = useRef(null);
  var onHoverInt = useCallback(function (e) {
    if (!onHover) return;
    var _getGlobeEventObj = getGlobeEventObj(e),
      _getGlobeEventObj2 = _slicedToArray(_getGlobeEventObj, 2),
      hoverObj = _getGlobeEventObj2[0],
      intersection = _getGlobeEventObj2[1];
    if (hoverObj !== curHoverObjRef.current) {
      curHoverObjRef.current = hoverObj;
      onHover(hoverObj === null || hoverObj === void 0 ? void 0 : hoverObj.__globeObjType, getObjData(hoverObj, intersection));
    }
  }, [onHover]);
  var onClickInt = useCallback(function (e) {
    var _getGlobeEventObj3 = getGlobeEventObj(e),
      _getGlobeEventObj4 = _slicedToArray(_getGlobeEventObj3, 2),
      obj = _getGlobeEventObj4[0],
      intersection = _getGlobeEventObj4[1];
    if (obj && onClick) {
      onClick(obj === null || obj === void 0 ? void 0 : obj.__globeObjType, getObjData(obj, intersection), e);
      e.stopPropagation();
    }
  }, [onClick]);
  return /*#__PURE__*/createElement(GlobeComp, _objectSpread2(_objectSpread2({}, ptProps), {}, {
    ref: ref,
    onPointerMove: onHover ? onHoverInt : undefined,
    onClick: onClick ? onClickInt : undefined
  }));
});

export { Globe as default };
