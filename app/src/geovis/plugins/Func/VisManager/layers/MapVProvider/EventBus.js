
function EventBus() {
  this._contentInitialize = "contentInitialize";
  this._widgetsInitialize = "widgetsInitialize";
}

Object.defineProperties(EventBus.prototype, {
  CONTENT_INITIALIZE: {
    get: function() {
      return this._contentInitialize;
    }
  },

  WIDGETS_INITIALIZE: {
    get: function() {
      return this._widgetsInitialize;
    }
  }
});

/**
 * app init
 */
EventBus.prototype.appInit = function() {
  $(document).triggerHandler(this._contentInitialize);
};

/**
 * trigger
 * @param evt
 * @param data
 */
EventBus.prototype.trigger = function(evt, data) {
  $(document).triggerHandler(evt, [data]);
};

/**
 * listener
 * @param evt
 * @param callback
 */
EventBus.prototype.listener = function(evt, callback) {
  $(document).on(evt, callback);
};

export default EventBus;
