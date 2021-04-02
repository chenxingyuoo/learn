/**
 * Created by chenxingyu on 2016/12/22.
 */
var _ = {};
var events = {};

// Bind event
_.on = function(name, callback) {
    debugger;
    var list = events[name] || (events[name] = [])
    list.push(callback)
    return _;
};

// Remove event. If `callback` is undefined, remove all callbacks for the
// event. If `event` and `callback` are both undefined, remove all callbacks
// for all events
_.off = function(name, callback) {
    // Remove *all* events
    if (!(name || callback)) {
        events =  {}
        return _
    }

    var list = events[name]
    if (list) {
        if (callback) {
            for (var i = list.length - 1; i >= 0; i--) {
                if (list[i] === callback) {
                    list.splice(i, 1)
                }
            }
        }
        else {
            delete events[name]
        }
    }

    return _
}

// Emit event, firing all bound callbacks. Callbacks receive the same
// arguments as `emit` does, apart from the event name
_.emit = function(name, data) {
    var list = events[name], fn

    if (list) {
        // Copy callback lists to prevent modification
        list = list.slice()

        // Execute event callbacks
        while ((fn = list.shift())) {
            fn(data)
        }
    }

    return _
};

window._ = _;