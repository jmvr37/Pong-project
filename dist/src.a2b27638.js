// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles/game.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../../public/fonts/slkscr-webfont.eot":[["slkscr-webfont.ffa4090f.eot","public/fonts/slkscr-webfont.eot"],"public/fonts/slkscr-webfont.eot"],"./../../public/fonts/slkscr-webfont.woff":[["slkscr-webfont.1e0cef22.woff","public/fonts/slkscr-webfont.woff"],"public/fonts/slkscr-webfont.woff"],"./../../public/fonts/slkscr-webfont.ttf":[["slkscr-webfont.e002edc4.ttf","public/fonts/slkscr-webfont.ttf"],"public/fonts/slkscr-webfont.ttf"],"./../../public/fonts/slkscr-webfont.svg":[["slkscr-webfont.16d40719.svg","public/fonts/slkscr-webfont.svg"],"public/fonts/slkscr-webfont.svg"],"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/settings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KEYS = exports.TEXT_SIZE = exports.RADIUS = exports.SPEED = exports.BOARD_GAP = exports.PADDLE_HEIGHT = exports.PADDLE_WIDTH = exports.SVG_NS = void 0;
var SVG_NS = "http://www.w3.org/2000/svg";
exports.SVG_NS = SVG_NS;
var PADDLE_WIDTH = 8,
    PADDLE_HEIGHT = 56,
    BOARD_GAP = 10,
    SPEED = 30,
    RADIUS = 8,
    TEXT_SIZE = 30;
exports.TEXT_SIZE = TEXT_SIZE;
exports.RADIUS = RADIUS;
exports.SPEED = SPEED;
exports.BOARD_GAP = BOARD_GAP;
exports.PADDLE_HEIGHT = PADDLE_HEIGHT;
exports.PADDLE_WIDTH = PADDLE_WIDTH;
var KEYS = {
  p1up: 'a',
  p1down: 'z',
  p2up: 'ArrowUp',
  p2down: 'ArrowDown',
  pause: ' '
};
exports.KEYS = KEYS;
},{}],"src/partials/Board.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _settings = require("../settings");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Board =
/*#__PURE__*/
function () {
  function Board(width, height) {
    _classCallCheck(this, Board);

    this.width = width;
    this.height = height;
  }

  _createClass(Board, [{
    key: "render",
    value: function render(svg) {
      var rect = document.createElementNS(_settings.SVG_NS, 'rect');
      rect.setAttributeNS(null, "width", this.width);
      rect.setAttributeNS(null, "height", this.height);
      rect.setAttributeNS(null, "fill", "#353535");
      rect.setAttributeNS(null, "x", 0);
      rect.setAttributeNS(null, "y", 0);
      svg.appendChild(rect);
      var line = document.createElementNS(_settings.SVG_NS, 'line');
      line.setAttributeNS(null, "x1", this.width / 2);
      line.setAttributeNS(null, "y1", 0);
      line.setAttributeNS(null, "x2", this.width / 2);
      line.setAttributeNS(null, "y2", this.height);
      line.setAttributeNS(null, "stroke", "white");
      line.setAttributeNS(null, "stroke-width", 4);
      line.setAttributeNS(null, "stroke-dasharray", "20 15");
      svg.appendChild(line);
    }
  }]);

  return Board;
}();

exports.default = Board;
},{"../settings":"src/settings.js"}],"src/partials/Paddles.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _settings = require("../settings");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Paddle =
/*#__PURE__*/
function () {
  function Paddle(boardHeight, paddleWidth, paddleHeight, initialX, initialY, keyUp, keyDown) {
    var _this = this;

    _classCallCheck(this, Paddle);

    this.boardHeight = boardHeight;
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
    this.x = initialX;
    this.y = initialY;
    this.firstY = initialY;
    this.score = 0;
    this.speed = _settings.SPEED;
    document.addEventListener("keydown", function (event) {
      switch (event.key) {
        case keyUp:
          _this.moveUp();

          break;

        case keyDown:
          _this.moveDown();

          break;
      }
    });
  }

  _createClass(Paddle, [{
    key: "increaseScore",
    value: function increaseScore() {
      this.score++;
    }
  }, {
    key: "getScore",
    value: function getScore() {
      return this.score;
    }
  }, {
    key: "resetScore",
    value: function resetScore() {
      this.score = 0;
      this.y = this.firstY;
    }
  }, {
    key: "setPaddleHeight",
    value: function setPaddleHeight(height) {
      this.paddleHeight = height;
    }
  }, {
    key: "moveUp",
    value: function moveUp() {
      this.y = Math.max(0, this.y - this.speed);
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      this.y = Math.min(this.boardHeight - this.paddleHeight, this.y + this.speed);
    }
  }, {
    key: "getCoordinates",
    value: function getCoordinates() {
      var walls = {
        left: this.x,
        top: this.y,
        right: this.x + this.paddleWidth,
        bottom: this.y + this.paddleHeight
      };
      return walls;
    }
  }, {
    key: "render",
    value: function render(svg) {
      var rect = document.createElementNS(_settings.SVG_NS, 'rect');
      rect.setAttributeNS(null, "width", this.paddleWidth);
      rect.setAttributeNS(null, "height", this.paddleHeight);
      rect.setAttributeNS(null, "fill", "orange");
      rect.setAttributeNS(null, "x", this.x);
      rect.setAttributeNS(null, "y", this.y);
      svg.appendChild(rect);
    }
  }]);

  return Paddle;
}();

exports.default = Paddle;
},{"../settings":"src/settings.js"}],"public/sounds/pong-02.wav":[function(require,module,exports) {
module.exports = "/pong-02.da6e8897.wav";
},{}],"public/sounds/pong-03.wav":[function(require,module,exports) {
module.exports = "/pong-03.494ec16d.wav";
},{}],"src/partials/Ball.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _settings = require("../settings");

var _pong = _interopRequireDefault(require("../../public/sounds/pong-02.wav"));

var _pong2 = _interopRequireDefault(require("../../public/sounds/pong-03.wav"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ball =
/*#__PURE__*/
function () {
  function Ball(boardWidth, boardHeight, radius, color, size) {
    _classCallCheck(this, Ball);

    this.color = color;
    this.size = size;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.radius = radius;
    this.direction = 0.5;
    this.ping = new Audio(_pong.default);
    this.pang = new Audio(_pong2.default);
    this.reset();
  }

  _createClass(Ball, [{
    key: "reset",
    value: function reset() {
      this.x = this.boardWidth / 2;
      this.y = this.boardHeight / 2;
      this.vy = 0;
      this.vx = 0;

      while (this.vy === 0) {
        this.vy = Math.floor(Math.random() * 10 - 5);
      }

      this.vx = this.direction * (6 - Math.abs(this.vy));
    }
  }, {
    key: "wallCollision",
    value: function wallCollision() {
      var hitsTop = this.y - this.radius <= 0;
      var hitsBottom = this.y + this.radius >= this.boardHeight;

      if (hitsTop || hitsBottom) {
        this.vy = this.vy * -1;
      }
    }
  }, {
    key: "goalCollision",
    value: function goalCollision(player1, player2) {
      if (this.x <= 0) {
        player2.increaseScore();
        this.direction = this.direction * -1;
        this.pang.play();
        this.reset();
      } else if (this.x >= this.boardWidth) {
        player1.increaseScore();
        this.direction = this.direction * -1;
        this.pang.play();
        this.reset();
      }
    }
  }, {
    key: "paddleCollision",
    value: function paddleCollision(player1, player2) {
      if (this.vx > 0) {
        var p2 = player2.getCoordinates(); //check for hit with player2

        if (this.x + this.radius >= p2.left && this.x + this.radius <= p2.right && this.y >= p2.top && this.y <= p2.bottom) {
          this.vx = this.vx * -1;
          this.ping.play();
        }
      } else {
        //check for hit with player1
        var p1 = player1.getCoordinates(); //check for hit with player2

        if (this.x - this.radius <= p1.right && this.x - this.radius >= p1.left && this.y >= p1.top && this.y <= p1.bottom) {
          this.vx = this.vx * -1;
          this.ping.play();
        }
      }
    }
  }, {
    key: "render",
    value: function render(svg, player1, player2) {
      var circle = document.createElementNS(_settings.SVG_NS, 'circle');
      circle.setAttributeNS(null, "fill", this.color);
      circle.setAttributeNS(null, "cx", this.x);
      circle.setAttributeNS(null, "cy", this.y);
      circle.setAttributeNS(null, "r", this.radius);
      this.x = this.x + this.vx;
      this.y = this.y + this.vy;
      this.wallCollision();
      this.goalCollision(player1, player2);
      this.paddleCollision(player1, player2);
      svg.appendChild(circle);
    }
  }]);

  return Ball;
}();

exports.default = Ball;
},{"../settings":"src/settings.js","../../public/sounds/pong-02.wav":"public/sounds/pong-02.wav","../../public/sounds/pong-03.wav":"public/sounds/pong-03.wav"}],"src/partials/Score.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _settings = require("../settings");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Score =
/*#__PURE__*/
function () {
  function Score(xPosition, yPosition) {
    _classCallCheck(this, Score);

    this.x = xPosition;
    this.y = yPosition;
  }

  _createClass(Score, [{
    key: "render",
    value: function render(svg, score) {
      var text = document.createElementNS(_settings.SVG_NS, 'text');
      text.setAttributeNS(null, "fill", "white");
      text.setAttributeNS(null, "font-size", _settings.TEXT_SIZE);
      text.setAttributeNS(null, "font-family", "'Silkscreen Web', monotype");
      text.setAttributeNS(null, "x", this.x);
      text.setAttributeNS(null, "y", this.y);
      text.textContent = score;
      svg.appendChild(text);
    }
  }]);

  return Score;
}();

exports.default = Score;
},{"../settings":"src/settings.js"}],"src/partials/Game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _settings = require("../settings");

var _Board = _interopRequireDefault(require("./Board"));

var _Paddles = _interopRequireDefault(require("./Paddles"));

var _Ball = _interopRequireDefault(require("./Ball"));

var _Score = _interopRequireDefault(require("./Score"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game =
/*#__PURE__*/
function () {
  function Game(element, width, height) {
    var _this = this;

    _classCallCheck(this, Game);

    this.element = element;
    this.numGame = 1;
    this.width = width;
    this.height = height;
    this.paused = false;
    this.newGame = false;
    this.gameElement = document.getElementById(this.element);
    this.board = new _Board.default(this.width, this.height);
    var boardMid = (this.height - _settings.PADDLE_HEIGHT) / 2;
    this.paddle1 = new _Paddles.default(this.height, _settings.PADDLE_WIDTH, _settings.PADDLE_HEIGHT, _settings.BOARD_GAP, boardMid, _settings.KEYS.p1up, _settings.KEYS.p1down);
    var paddle2Gap = this.width - _settings.BOARD_GAP - _settings.PADDLE_WIDTH;
    this.paddle2 = new _Paddles.default(this.height, _settings.PADDLE_WIDTH, _settings.PADDLE_HEIGHT, paddle2Gap, boardMid, _settings.KEYS.p2up, _settings.KEYS.p2down);
    this.ball = new _Ball.default(this.width, this.height, 7, 'orange');
    this.ball2 = new _Ball.default(this.width, this.height, 10, 'orange'); // this.ball3 = new Ball(this.width, this.height, RADIUS, 'yellow');
    // this.ball4 = new Ball(this.width, this.height, RADIUS, 'purple');
    // this.ball5 = new Ball(this.width, this.height, RADIUS, 'pink');
    // this.ball6 = new Ball(this.width, this.height, RADIUS);

    this.score1 = new _Score.default(this.width / 2 - 50, 30);
    this.score2 = new _Score.default(this.width / 2 + 25, 30);
    document.addEventListener("keydown", function (event) {
      if (event.key === _settings.KEYS.pause) {
        _this.paused = !_this.paused;
      }
    }); // Other code goes here...
  }

  _createClass(Game, [{
    key: "declareWinner",
    value: function declareWinner(player1, player2) {
      if (player1 === 3) {
        this.gameElement.innerHTML = 'PLAYER 2 WINS!!!';
        this.paused = true;
        this.newGame = true;
        this.numGame += this.numGame;
        var h2 = document.querySelector('h2');
        var p = document.querySelectorAll('p');
        h2.setAttribute('style', 'display: none');
        p[0].setAttribute('style', 'display: none');
        p[1].setAttribute('style', 'display: none');
        p[2].setAttribute('style', 'display: none');
        p[3].setAttribute('style', 'display: none');
        this.paddle1.resetScore();
        this.paddle2.resetScore();
        this.ball.reset();
      } else if (player2 === 3) {
        this.gameElement.innerHTML = 'PLAYER 1 WINS!!!';
        this.paused = true;
        this.newGame = true;
        this.numGame += this.numGame;
        this.paddle1.resetScore();
        this.paddle2.resetScore();
        this.ball.reset();

        var _h = document.querySelector('h2');

        var _p = document.querySelectorAll('p');

        _h.setAttribute('style', 'display: none');

        _p[0].setAttribute('style', 'display: none');

        _p[1].setAttribute('style', 'display: none');

        _p[2].setAttribute('style', 'display: none');

        _p[3].setAttribute('style', 'display: none');
      }
    }
  }, {
    key: "checkPaddleHeight",
    value: function checkPaddleHeight(player1, player2) {
      if (player1 === 5) {
        this.paddle1.setPaddleHeight(40);
      }

      if (player2 === 5) {
        this.paddle2.setPaddleHeight(40);
      }
    }
  }, {
    key: "render",
    value: function render() {
      this.declareWinner(this.paddle1.getScore(), this.paddle2.getScore()); // if (this.paused){
      //   return false;
      // }

      if (this.paused === false) {
        this.gameElement.innerHTML = '';
        var svg = document.createElementNS(_settings.SVG_NS, 'svg');
        svg.setAttributeNS(null, "width", this.width);
        svg.setAttributeNS(null, "height", this.height);
        svg.setAttributeNS(null, "viewBox", "0 0 ".concat(this.width, " ").concat(this.height));
        this.gameElement.appendChild(svg);
        this.board.render(svg);
        this.paddle1.render(svg);
        this.paddle2.render(svg);
        this.checkPaddleHeight(this.paddle1.getScore(), this.paddle2.getScore());
        this.ball.render(svg, this.paddle1, this.paddle2);

        if (this.newGame === true) {
          this.ball2.render(svg, this.paddle1, this.paddle2);
          var h2 = document.querySelector('h2');
          var p = document.querySelectorAll('p');
          h2.setAttribute('style', 'display: block');
          p[0].setAttribute('style', 'display: block');
          p[1].setAttribute('style', 'display: block');
          p[2].setAttribute('style', 'display: block');
          p[3].setAttribute('style', 'display: block');
        }

        if (this.numGame > 4) {
          this.gameElement.innerHTML = 'Game Over ☠️';

          var _h2 = document.querySelector('h2');

          var _p2 = document.querySelectorAll('p');

          _h2.setAttribute('style', 'display: none');

          _p2[0].setAttribute('style', 'display: none');

          _p2[1].setAttribute('style', 'display: none');

          _p2[2].setAttribute('style', 'display: none');

          _p2[3].setAttribute('style', 'display: none');
        } // this.ball3.render(svg, this.paddle1, this.paddle2);
        // this.ball4.render(svg, this.paddle1, this.paddle2);
        // this.ball5.render(svg, this.paddle1, this.paddle2);
        // this.ball6.render(svg, this.paddle1, this.paddle2);


        this.score1.render(svg, this.paddle1.getScore());
        this.score2.render(svg, this.paddle2.getScore()); // More code goes here....
      }
    }
  }]);

  return Game;
}();

exports.default = Game;
},{"../settings":"src/settings.js","./Board":"src/partials/Board.js","./Paddles":"src/partials/Paddles.js","./Ball":"src/partials/Ball.js","./Score":"src/partials/Score.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles/game.css");

var _Game = _interopRequireDefault(require("./partials/Game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create a game instance
var game = new _Game.default('game', 512, 256);

(function gameLoop() {
  game.render();
  requestAnimationFrame(gameLoop);
})();
},{"./styles/game.css":"src/styles/game.css","./partials/Game":"src/partials/Game.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53352" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map