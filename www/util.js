'use strict';

function trim(str) {
    if (typeof str !== 'string') {
        return str;
    }
    return str.replace(/^\s+|\s+$/g, '');
}

function isHTMLElement(value) {
    return (value instanceof HTMLElement);
}

function isChildOf(element, parent) {
    if (!isHTMLElement(element) || !element.parentElement) {
        return false;
    }
    if (element.parentElement === parent) {
        return true;
    }
    else {
        return isChildOf(element.parentElement, parent);
    }
}

function contains(parent, element) {
    return isChildOf(element, parent);
}

function removeClass(element, classnm) {
    if (element instanceof window.NodeList) {
        for (var i = 0; i < element.length; i++) {
            removeClass(element[i], classnm);
        }
        return;
    }
    if (!isHTMLElement(element) || typeof classnm !== 'string') {
        return false;
    }
    var className = element.className + '';
    var regex = new RegExp('(?:^|\\s+)' + classnm + '(?:\\s+|$)', 'g');
    className = className.replace(regex, ' ');
    element.className = className;

    if (hasClass(element, classnm)) { // still have the class
        removeClass(element, classnm);
    }
    element.className = trim(element.className);

    return true;
}

function addClass(element, classnm) {
    var i;
    if (element instanceof window.NodeList) {
        for (i = 0; i < element.length; i++) {
            addClass(element[i], classnm);
        }
        return;
    }
    if (!isHTMLElement(element) || typeof classnm !== 'string') {
        return false;
    }
    var tmp = classnm.split(' ');
    if (tmp.length > 1) {
        var success = true;
        for (i = 0; i < tmp.length; i++) {
            if (!addClass(element, tmp[i])) {
                success = false;
            }
        }
        return success;
    }

    if (hasClass(element, classnm)) {
        return false;
    }
    element.className = trim([element.className, classnm].join(' '));
    return true;
}

function hasClass(element, classnm) {
    if (!isHTMLElement(element) || typeof classnm !== 'string') {
        return;
    }
    var className = element.className + '';
    var regex = new RegExp('(?:^|\\s+)' + classnm + '(?:\\s+|$)', 'g');
    return regex.test(className);
}

function getElementExp(elmt) {
    if (!isHTMLElement(elmt)) {
        return '';
    }
    var id = elmt.id || '';
    var cls = elmt.className || '';
    return elmt.tagName + (id ? ('#' + id) : '') + (cls ? ('.' + cls.replace(/ /g, '.')) : '');
}

function isRemoteUrl(url) {
    var reg = /^((ftp|https?):\/\/)?([\da-z\.-]+\.[a-z\.]{2,6}|[\d\.]+)/igm;
    return !!reg.test(url);
}

function getValueOf(exp, base) {
    if (typeof exp !== 'string') {
        return exp;
    }
    var depths = exp.split('.');
    if (depths.length && depths[0] === 'window') {
        depths.shift(); // remove first 'window'
    }

    var curValue = base || window;
    for (var i = 0, len = depths.length; i < len; i++) {
        if (typeof curValue[depths[i]] === 'undefined') {
            return undefined;
        }
        curValue = curValue[depths[i]];
    }
    return curValue;
}

/**
 * getBoundingRect has argument 'mode' as 2nd parameter.
 * This will determine which rectangle would be returned.
 * +-----------------------+--> mode: 'margin'
 * |        margin         |
 * |  +-----------------+--+--> mode: default(undefined)
 * |  |     border      |  |
 * |  |  +-----------+--+--+--> mode: 'innerborder'
 * |  |  |  padding  |  |  |
 * |  |  |  +-----+--+--+--+--> mode: 'innerpadding'
 * |  |  |  |     |  |  |  |
 * |  |  |  +-----+  |  |  |
 * |  |  +-----------+  |  |
 * |  +-----------------+  |
 * +-----------------------+
 */
function getBoundingRect(el, mode) {
    var width = 0,
        height = 0,
        left = 0,
        top = 0,
        borderLeft,
        borderRight,
        borderTop,
        borderBottom,
        marginLeft,
        marginRight,
        marginTop,
        marginBottom,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingBottom;
    if (el && el === el.window) { // window
        width = el.document.documentElement.clientWidth;
        height = el.document.documentElement.clientHeight;
        return {
            left: 0,
            top: 0,
            width: width,
            height: height,
            right: width,
            bottom: height
        };
    }
    if (el && el.nodeType && el.nodeType === 9) { // document
        width = Math.max(el.body.scrollWidth, el.documentElement.scrollWidth, el.body.offsetWidth, el.documentElement.offsetWidth, el.documentElement.clientWidth);
        height = Math.max(el.body.scrollHeight, el.documentElement.scrollHeight, el.body.offsetHeight, el.documentElement.offsetHeight, el.documentElement.clientHeight);
        return {
            left: 0,
            top: 0,
            width: width,
            height: height,
            right: width,
            bottom: height
        };
    }

    if (!isHTMLElement(el) || !el.ownerDocument) {
        return null;
    }

    if ('getBoundingClientRect' in document.documentElement) {
        var clientRect = el.getBoundingClientRect();
        if (el === el.ownerDocument.body) {
            left = document.body.offsetLeft + parseFloat(getStyle(el, 'marginLeft') || 0);
            top = document.body.offsetTop + parseFloat(getStyle(el, 'marginTop') || 0);
        }
        else {
            left += clientRect.left;
            top += clientRect.top;

            // left += (window.pageXOffset || el.ownerDocument.documentElement.scrollLeft || document.body.scrollLeft);
            // top += (window.pageYOffset || el.ownerDocument.documentElement.scrollTop || document.body.scrollTop);
            left -= el.ownerDocument.documentElement.clientLeft;
            top -= el.ownerDocument.documentElement.clientTop;
        }
        width = clientRect.width;
        height = clientRect.height;
    }
    else if (typeof el.offsetWidth !== 'undefined' || typeof el.offsetHeight !== 'undefined') {
        left = parseInt(el.offsetLeft, 10);
        top = parseInt(el.offsetTop, 10);
        width = parseInt(el.offsetWidth, 10);
        height = parseInt(el.offsetHeight, 10);
    }
    else {
        return null;
    }

    // including margin as bounding rect
    if (mode && mode === 'margin') {
        marginLeft = parseInt(getStyle(el, 'marginLeft'), 10) || 0;
        marginRight = parseInt(getStyle(el, 'marginRight'), 10) || 0;
        marginTop = parseInt(getStyle(el, 'marginTop'), 10) || 0;
        marginBottom = parseInt(getStyle(el, 'marginBottom'), 10) || 0;
        left -= marginLeft;
        top -= marginTop;
        width += marginLeft + marginRight;
        height += marginTop + marginBottom;

        return {
            left: left,
            top: top,
            width: width,
            height: height,
            right: left + width,
            bottom: top + height,
            margin: {
                left: marginLeft,
                right: marginRight,
                top: marginTop,
                bottom: marginBottom
            }
        };
    }
    else if (mode && mode === 'innerborder') {
        borderLeft = parseInt(getStyle(el, 'borderLeftWidth'), 10) || 0;
        borderRight = parseInt(getStyle(el, 'borderRightWidth'), 10) || 0;
        borderTop = parseInt(getStyle(el, 'borderTopWidth'), 10) || 0;
        borderBottom = parseInt(getStyle(el, 'borderBottomWidth'), 10) || 0;
        left += borderLeft;
        top += borderTop;
        width -= borderLeft + borderRight;
        height -= borderTop + borderBottom;

        return {
            left: left,
            top: top,
            width: width,
            height: height,
            right: left + width,
            bottom: top + height,
            border: {
                left: borderLeft,
                right: borderRight,
                top: borderTop,
                bottom: borderBottom
            }
        };
    }
    else if (mode && mode === 'innerpadding') {
        borderLeft = parseInt(getStyle(el, 'borderLeftWidth'), 10) || 0;
        borderRight = parseInt(getStyle(el, 'borderRightWidth'), 10) || 0;
        borderTop = parseInt(getStyle(el, 'borderTopWidth'), 10) || 0;
        borderBottom = parseInt(getStyle(el, 'borderBottomWidth'), 10) || 0;
        paddingLeft = parseInt(getStyle(el, 'paddingLeft'), 10) || 0;
        paddingRight = parseInt(getStyle(el, 'paddingRight'), 10) || 0;
        paddingTop = parseInt(getStyle(el, 'paddingTop'), 10) || 0;
        paddingBottom = parseInt(getStyle(el, 'paddingBottom'), 10) || 0;
        left += borderLeft + paddingLeft;
        top += borderTop + paddingTop;
        width -= borderLeft + paddingLeft + paddingRight + borderRight;
        height -= borderTop + paddingTop + paddingBottom + borderBottom;

        return {
            left: left,
            top: top,
            width: width,
            height: height,
            right: left + width,
            bottom: top + height,
            border: {
                left: borderLeft,
                right: borderRight,
                top: borderTop,
                bottom: borderBottom
            },
            padding: {
                left: paddingLeft,
                right: paddingRight,
                top: paddingTop,
                bottom: paddingBottom
            }
        };
    }
    else {
        return {
            left: left,
            top: top,
            width: width,
            height: height,
            right: left + width,
            bottom: top + height
        };
    }
}

function getPosition(elem) {
    var offsetParent, offset,
        parentOffset = {
            top: 0,
            left: 0
        };

    // Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
    if (getStyle(elem, 'position') === 'fixed') {
        // We assume that getBoundingClientRect is available when computed position is fixed
        offset = elem.getBoundingClientRect();

    }
    else {
        // Get *real* offsetParent
        offsetParent = getOffsetParent(elem);

        // Get correct offsets
        offset = getBoundingOffset(elem);
        parentOffset = getBoundingOffset(offsetParent);

        // Add offsetParent borders
        parentOffset.top += parseFloat(getStyle(offsetParent, 'borderTopWidth'));
        parentOffset.left += parseFloat(getStyle(offsetParent, 'borderLeftWidth'));
    }

    offset.top -= parentOffset.top;
    offset.left -= parentOffset.left;

    offset.top -= parseFloat(getStyle(elem, 'marginTop'));
    offset.left -= parseFloat(getStyle(elem, 'marginLeft'));

    // Subtract parent offsets and element margins
    return offset;
}

function getOffsetParent(el) {
    var docElem = el.ownerDocument.documentElement;
    var offsetParent = el.offsetParent || docElem;

    while (offsetParent && getStyle(offsetParent, 'position') === 'static') {
        offsetParent = offsetParent.offsetParent;
    }

    return offsetParent || docElem;
}

function getBoundingSize(el, mode) {
    if (!isHTMLElement(el)) {
        return null;
    }
    var rect = getBoundingRect(el, mode);
    return {
        width: rect.width,
        height: rect.height
    };
}

function getBoundingOffset(el, mode) {
    if (!isHTMLElement(el)) {
        return null;
    }
    var rect = getBoundingRect(el, mode);
    return {
        left: rect.left,
        top: rect.top
    };
}

function getElementVisibility(el) {
    if (!isHTMLElement(el)) {
        return false;
    }
    if (getStyle(el, 'display') === 'none' || getStyle(el, 'visibility') === 'hidden' || getStyle(el, 'opacity') === '0') {
        return false;
    }
    if (el.parentElement && !getElementVisibility(el.parentElement)) {
        return false;
    }
    return true;
}

var camelCache = {};
var rexHypen = /-(.)/gi;
function camelCase(input) {
    if (!rexHypen.test(input)) {
        return input;
    }
    if (camelCache[input]) {
        return camelCache[input];
    }
    camelCache[input] = input.toLowerCase().replace(rexHypen, function(match, word, index) {
        return index === 0 ? word : word.toUpperCase();
    });
    return camelCache[input];
}

function setStyle(element, prop, value) {
    if (element instanceof window.NodeList) {
        for (var i = 0; i < element.length; i++) {
            setStyle(element[i], prop, value);
        }
        return;
    }

    if (!isHTMLElement(element)) {
        return;
    }

    if (prop instanceof Object) {
        for (var p in prop) {
            if (typeof p === 'string' && prop.hasOwnProperty(p)) {
                setStyle(element, camelCase(p), prop[p]);
            }
        }
    }
    else if (typeof prop === 'string') {
        prop = camelCase(prop);
        element.style[prop] = value;
    }
}

function getStyle(element, prop) {
    prop = camelCase(prop);
    return element.currentStyle ?
        element.currentStyle[prop] :
        document.defaultView.getComputedStyle(element, '')[prop];
}

function createElement(tagName, attributes, children) {
    var elem = document.createElement(tagName);
    for (var attr in attributes) {
        if (attr === 'className') { // 'class' is keyword for JavaScript, so we use 'className' for the name
            elem.setAttribute('class', attributes[attr]);
        }
        else {
            elem.setAttribute(attr, attributes[attr]);
        }
    }
    if (typeof children === 'string') {
        elem.appendChild(document.createTextNode(children));
    }
    else if (children && children.length) {
        for (var i = 0; children && i < children.length; i++) {
            if (isHTMLElement(children[i])) {
                elem.appendChild(children[i]);
            }
        }
    }
    else if (isHTMLElement(children)) {
        elem.appendChild(children);
    }
    return elem;
}

module.exports = {
    trim: trim,
    createElement: createElement,
    isHTMLElement: isHTMLElement,
    isChildOf: isChildOf,
    contains: contains,
    removeClass: removeClass,
    hasClass: hasClass,
    addClass: addClass,
    getElementExp: getElementExp,
    isRemoteUrl: isRemoteUrl,
    getValueOf: getValueOf,
    getBoundingRect: getBoundingRect,
    getPosition: getPosition,
    getOffsetParent: getOffsetParent,
    getBoundingSize: getBoundingSize,
    getBoundingOffset: getBoundingOffset,
    getElementVisibility: getElementVisibility,
    setStyle: setStyle,
    getStyle: getStyle
};
