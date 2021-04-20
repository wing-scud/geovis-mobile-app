/* eslint-disable */
var i = {};
i.decode = function (e, t) {
    for (var a, n, i = 0, o = 0, r = 0, s = [], d = 0, l = 0, u = null, m = Math.pow(10, t || 5); i < e.length;) {
        u = null, d = 0, l = 0;
        do { u = e.charCodeAt(i++) - 63, l |= (31 & u) << d, d += 5 } while (u >= 32);
        a = 1 & l ? ~(l >> 1) : l >> 1, d = l = 0;
        do { u = e.charCodeAt(i++) - 63, l |= (31 & u) << d, d += 5 } while (u >= 32);
        n = 1 & l ? ~(l >> 1) : l >> 1, o += a, r += n, s.push([o / m, r / m])
    }
    return s
}, i.encode = function (e, t) {
    if (!e.length) return "";
    for (var a = Math.pow(10, t || 5), i = n(e[0][0], a) + n(e[0][1], a), o = 1; o < e.length; o++) {
        var r = e[o],
            s = e[o - 1];
        i += n(r[0] - s[0], a), i += n(r[1] - s[1], a)
    }
    return i
}

function convertRoute(e) {
    var t, a, n, i, o, r, s, d = {
        name: "",
        coordinates: [],
        instructions: [],
        summary: {
            totalDistance: e.distance,
            totalTime: e.duration
        }
    },
        l = [],
        u = 0,
        m = e.legs.length,
        h = e.legs[0].steps.length > 0;
    for (t = 0; t < m; t++)
        for (n = e.legs[t],
            l.push(n.summary && n.summary.charAt(0).toUpperCase() + n.summary.substring(1)),
            a = 0; a < n.steps.length; a++)
            i = n.steps[a],
                o = _decodePolyline(i.geometry),
                d.coordinates.push.apply(d.coordinates, o),
                r = _maneuverToInstructionType(i.maneuver, t === m - 1),
                s = _maneuverToModifier(i.maneuver),
                r && d.instructions.push({
                    type: r,
                    distance: i.distance,
                    time: i.duration,
                    road: i.name,
                    direction: _bearingToDirection(i.maneuver.bearing_after),
                    exit: i.maneuver.exit,
                    index: u,
                    mode: i.mode,
                    modifier: s
                }),
                u += o.length;
    return d.name = l.join(", "),
        h || (d.coordinates = _decodePolyline(e.geometry)),
        d
}

function _bearingToDirection(e) {
    return ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.round(e / 45) % 8]
}

function _decodePolyline(e) {
    var t, n = i.decode(e, 5),
        o = new Array(n.length);
    for (t = n.length - 1; t >= 0; t--)
        o[t] = n[t];
    return o
}

function _maneuverToInstructionType(e, t) {
    switch (e.type) {
        case "new name":
            return "Continue";
        case "depart":
            return "Head";
        case "arrive":
            return t ? "DestinationReached" : "WaypointReached";
        case "roundabout":
        case "rotary":
            return "Roundabout";
        case "merge":
        case "fork":
        case "on ramp":
        case "off ramp":
        case "end of road":
            return _camelCase(e.type);
        default:
            return _camelCase(e.modifier)
    }
}

function _maneuverToModifier(e) {
    var t = e.modifier;
    switch (e.type) {
        case "merge":
        case "fork":
        case "on ramp":
        case "off ramp":
        case "end of road":
            t = _leftOrRight(t)
    }
    return t && _camelCase(t)
}

function _camelCase(e) {
    for (var t = e.split(" "), a = "", n = 0, i = t.length; n < i; n++)
        a += t[n].charAt(0).toUpperCase() + t[n].substring(1);
    return a
}

function _leftOrRight(e) {
    return e.indexOf("left") >= 0 ? "Left" : "Right"
}



const mode = {
    ordinalize: {
        1: "第一",
        2: "第二",
        3: "第三",
        4: "第四",
        5: "第五",
        6: "第六",
        7: "第七",
        8: "第八",
        9: "第九",
        10: "第十"
    },
    direction: {
        north: "北",
        northeast: "东北",
        east: "东",
        southeast: "东南",
        south: "南",
        southwest: "西南",
        west: "西",
        northwest: "西北"
    },
    modifier: {
        "left": "向左",
        "right": "向右",
        "sharpleft": "急向左",
        "sharpright": "急向右",
        "slightleft": "稍向左",
        "slightright": "稍向右",
        "straight": "直行",
        "uturn": "调头"

    },
    lanes: {
        xo: "靠右行驶",
        ox: "靠左行驶",
        xox: "保持在道路中间行驶",
        oxo: "保持在道路左侧或右侧行驶"
    },
    modes: {
        ferry: {
            default: "乘坐轮渡",
            name: "乘坐{way_name}轮渡",
            destination: "乘坐开往{destination}的轮渡"
        }
    },
    "phrase": {
        "two linked by distance": "{instruction_one}，{distance}后{instruction_two}",
        "two linked": "{instruction_one}，随后{instruction_two}",
        "one in distance": "{distance}后{instruction_one}",
        "name and ref": "{name}（{ref}）",
        "exit with number": "出口{exit}"
    },
    "destinationreached": { //"DestinationReached"
        default: {
            default: "您已经到达您的目的地",
            upcoming: "您即将到达您的个目的地",
            short: "已到达目的地",
            "short-upcoming": "即将到达目的地",
            named: "您已到达{waypoint_name}"
        },
        "left": {
            default: "您已经到达您的目的地，目的地在道路左侧",
            upcoming: "您即将到达您的个目的地，目的地在道路左侧",
            short: "已到达目的地",
            "short-upcoming": "即将到达目的地",
            named: "您已到达{waypoint_name}，目的地在您左边。"
        },
        "right": {
            default: "您已经到达您的目的地，目的地在道路右侧",
            upcoming: "您即将到达您的个目的地，目的地在道路右侧",
            short: "已到达目的地",
            "short-upcoming": "即将到达目的地",
            named: "您已到达{waypoint_name}，目的地在您右边。"
        },
        "sharpleft": {
            default: "您已经到达您的个目的地，目的地在道路左侧",
            upcoming: "您即将到达您的个目的地，目的地在道路左侧",
            short: "已到达目的地",
            "short-upcoming": "即将到达目的地",
            named: "您已到达{waypoint_name}，目的地在您左边。"
        },
        "sharpright": {
            default: "您已经到达您的个目的地，目的地在道路右侧",
            upcoming: "您即将到达您的个目的地，目的地在道路右侧",
            short: "已到达目的地",
            "short-upcoming": "即将到达目的地",
            named: "您已到达{waypoint_name}，目的地在您右边。"
        },
        "slightright": {
            default: "您已经到达您的个目的地，目的地在道路左侧",
            upcoming: "您即将到达您的个目的地，目的地在道路左侧",
            short: "已到达目的地",
            "short-upcoming": "即将到达目的地",
            named: "您已到达{waypoint_name}，目的地在您右边。"
        },
        "slightleft": {
            default: "您已经到达您的个目的地，目的地在道路右侧",
            upcoming: "您即将到达您的个目的地，目的地在道路右侧",
            short: "已到达目的地",
            "short-upcoming": "即将到达目的地",
            named: "您已到达{waypoint_name}，目的地在您左边。"
        },
        "straight": {
            default: "您已经到达您的个目的地，目的地在您正前方",
            upcoming: "您即将到达您的个目的地，目的地在您正前方",
            short: "已到达目的地",
            "short-upcoming": "即将到达目的地",
            named: "您已到达{waypoint_name}，目的地在您前方。"
        }
    },
    "continue": {
        default: {
            default: "行驶",
            name: "在{way_name}上继续{modifier}行驶",
            destination: "{modifier}行驶，{destination}方向",
            exit: "{modifier}行驶，驶入{way_name}"
        },
        "straight": {
            default: "继续直行",
            name: "在{way_name}上继续直行",
            destination: "继续直行，前往{destination}",
            distance: "继续直行{distance}",
            namedistance: "继续在{way_name}上直行{distance}"
        },
        "sharpleft": {
            default: "前方左急转弯",
            name: "前方左急转弯，继续在{way_name}上行驶",
            destination: "左急转弯，前往{destination}"
        },
        "sharpright": {
            default: "前方右急转弯",
            name: "前方右急转弯，继续在{way_name}上行驶",
            destination: "右急转弯，前往{destination}"
        },
        "slightleft": {
            default: "前方稍向左转",
            name: "前方稍向左转，继续在{way_name}上行驶",
            destination: "稍向左转，前往{destination}"
        },
        "slightright": {
            default: "前方稍向右转",
            name: "前方稍向右转，继续在{way_name}上行驶",
            destination: "前方稍向右转，前往{destination}"
        },
        "uturn": {
            default: "前方调头",
            name: "前方调头，继续在{way_name}上行驶",
            destination: "前方调头，前往{destination}"
        }
    },
    "head": {
        default: {
            default: "出发",
            name: "出发向{direction}，驶入{way_name}",
            namedistance: "出发向{direction}，在{way_name}上继续行驶{distance}"
        }
    },
    "end of road": {
        default: {
            default: "行驶",
            name: "{modifier}行驶，驶入{way_name}",
            destination: "{modifier}行驶，前往{destination}"
        },
        "straight": {
            default: "继续直行",
            name: "继续直行，驶入{way_name}",
            destination: "继续直行，前往{destination}"
        },
        "uturn": {
            default: "在道路尽头调头",
            name: "在道路尽头调头驶入{way_name}",
            destination: "在道路尽头调头，前往{destination}"
        }
    },
    "fork": {
        default: {
            default: "在岔道保持",
            name: "在岔道口保持{modifier}，驶入{way_name}",
            destination: "在岔道口保持{modifier}，前往{destination}"
        },
        "slightleft": {
            default: "在岔道口保持左侧行驶",
            name: "在岔道口保持左侧行驶，驶入{way_name}",
            destination: "在岔道口保持左侧行驶，前往{destination}"
        },
        "slightright": {
            default: "在岔道口保持右侧行驶",
            name: "在岔道口保持右侧行驶，驶入{way_name}",
            destination: "在岔道口保持右侧行驶，前往{destination}"
        },
        "sharpleft": {
            default: "在岔道口左急转弯",
            name: "在岔道口左急转弯，驶入{way_name}",
            destination: "在岔道口左急转弯，前往{destination}"
        },
        "sharpright": {
            default: "在岔道口右急转弯",
            name: "在岔道口右急转弯，驶入{way_name}",
            destination: "在岔道口右急转弯，前往{destination}"
        },
        "uturn": {
            default: "前方调头",
            name: "前方调头，驶入{way_name}",
            destination: "前方调头，前往{destination}"
        }
    },
    "merge": {
        default: {
            default: "并道",
            name: "{modifier}并道，驶入{way_name}",
            destination: "{modifier}并道，前往{destination}"
        },
        "straight": {
            default: "直行并道",
            name: "直行并道，驶入{way_name}",
            destination: "直行并道，前往{destination}"
        },
        "slightleft": {
            default: "稍向左并道",
            name: "稍向左并道，驶入{way_name}",
            destination: "稍向左并道，前往{destination}"
        },
        "slightright": {
            default: "稍向右并道",
            name: "稍向右并道，驶入{way_name}",
            destination: "稍向右并道，前往{destination}"
        },
        "sharpleft": {
            default: "急向左并道",
            name: "急向左并道，驶入{way_name}",
            destination: "急向左并道，前往{destination}"
        },
        "sharpright": {
            default: "急向右并道",
            name: "急向右并道，驶入{way_name}",
            destination: "急向右并道，前往{destination}"
        },
        "uturn": {
            default: "前方调头",
            name: "前方调头，驶入{way_name}",
            destination: "前方调头，前往{destination}"
        }
    },
    "new name": {
        default: {
            default: "继续",
            name: "继续{modifier}，驶入{way_name}",
            destination: "继续{modifier}，前往{destination}"
        },
        "straight": {
            default: "继续直行",
            name: "继续在{way_name}上直行",
            destination: "继续直行，前往{destination}"
        },
        "sharpleft": {
            default: "前方左急转弯",
            name: "前方左急转弯，驶入{way_name}",
            destination: "左急转弯，前往{destination}"
        },
        "sharpright": {
            default: "前方右急转弯",
            name: "前方右急转弯，驶入{way_name}",
            destination: "右急转弯，前往{destination}"
        },
        "slightleft": {
            default: "继续稍向左",
            name: "继续稍向左，驶入{way_name}",
            destination: "继续稍向左，前往{destination}"
        },
        "slightright": {
            default: "继续稍向右",
            name: "继续稍向右，驶入{way_name}",
            destination: "继续稍向右，前往{destination}"
        },
        "uturn": {
            default: "前方调头",
            name: "前方调头，上{way_name}",
            destination: "前方调头，前往{destination}"
        }
    },
    "notification": {
        default: {
            default: "继续",
            name: "继续{modifier}，驶入{way_name}",
            destination: "继续{modifier}，前往{destination}"
        },
        "uturn": {
            default: "前方调头",
            name: "前方调头，驶入{way_name}",
            destination: "前方调头，前往{destination}"
        }
    },
    "off ramp": {
        default: {
            default: "下匝道",
            name: "下匝道，驶入{way_name}",
            destination: "下匝道，前往{destination}",
            exit: "从{exit}出口驶出",
            exit_destination: "从{exit}出口驶出，前往{destination}"
        },
        "left": {
            default: "下左侧匝道",
            name: "下左侧匝道，上{way_name}",
            destination: "下左侧匝道，前往{destination}",
            exit: "从左侧{exit}出口驶出",
            exit_destination: "从左侧{exit}出口驶出，前往{destination}"
        },
        "right": {
            default: "下右侧匝道",
            name: "下右侧匝道，驶入{way_name}",
            destination: "下右侧匝道，前往{destination}",
            exit: "从右侧{exit}出口驶出",
            exit_destination: "从右侧{exit}出口驶出，前往{destination}"
        },
        "sharpleft": {
            default: "急向左下匝道",
            name: "急向左下匝道，驶入{way_name}",
            destination: "急向左下匝道，前往{destination}",
            exit: "从左侧{exit}出口驶出",
            exit_destination: "从左侧{exit}出口驶出，前往{destination}"
        },
        "sharpright": {
            default: "急向右下匝道",
            name: "急向右下匝道，驶入{way_name}",
            destination: "急向右下匝道，前往{destination}",
            exit: "从右侧{exit}出口驶出",
            exit_destination: "从右侧{exit}出口驶出，前往{destination}"
        },
        "slightleft": {
            default: "稍向左下匝道",
            name: "稍向左下匝道，驶入{way_name}",
            destination: "稍向左下匝道，前往{destination}",
            exit: "从左侧{exit}出口驶出",
            exit_destination: "从左侧{exit}出口驶出，前往{destination}"
        },
        "slightright": {
            default: "稍向右下匝道",
            name: "稍向右下匝道，驶入{way_name}",
            destination: "稍向右下匝道，前往{destination}",
            exit: "从右侧{exit}出口驶出",
            exit_destination: "从右侧{exit}出口驶出，前往{destination}"
        }
    },
    "on ramp": {
        default: {
            default: "上匝道",
            name: "上匝道，驶入{way_name}",
            destination: "上匝道，前往{destination}"
        },
        "left": {
            default: "上左侧匝道",
            name: "上左侧匝道，驶入{way_name}",
            destination: "上左侧匝道，前往{destination}"
        },
        "right": {
            default: "上右侧匝道",
            name: "上右侧匝道，驶入{way_name}",
            destination: "上右侧匝道，前往{destination}"
        },
        "sharpleft": {
            default: "急向左上匝道",
            name: "急向左上匝道，驶入{way_name}",
            destination: "急向左上匝道，前往{destination}"
        },
        "sharpright": {
            default: "急向右上匝道",
            name: "急向右上匝道，驶入{way_name}",
            destination: "急向右上匝道，前往{destination}"
        },
        "slightleft": {
            default: "稍向左上匝道",
            name: "稍向左上匝道，驶入{way_name}",
            destination: "稍向左上匝道，前往{destination}"
        },
        "slightright": {
            default: "稍向右上匝道",
            name: "稍向右上匝道，驶入{way_name}",
            destination: "稍向右上匝道，前往{destination}"
        }
    },
    "rotary": {
        default: {
            default: {
                default: "进入环岛",
                name: "通过环岛后驶入{way_name}",
                destination: "通过环岛后前往{destination}"
            },
            name: {
                default: "进入{rotary_name}环岛",
                name: "通过{rotary_name}环岛后驶入{way_name}",
                destination: "通过{rotary_name}环岛后前往{destination}"
            },
            exit: {
                default: "进入环岛后从{exit_number}出口驶出",
                name: "进入环岛后从{exit_number}出口驶出，上{way_name}",
                destination: "进入环岛后从{exit_number}出口驶出，前往{destination}"
            },
            name_exit: {
                default: "进入{rotary_name}环岛后从{exit_number}出口驶出",
                name: "进入{rotary_name}环岛后从{exit_number}出口驶出，上{way_name}",
                destination: "进入{rotary_name}环岛后从{exit_number}出口驶出，前往{destination}"
            }
        }
    },
    "roundabout": {
        default: {
            exit: {
                default: "进入环岛后从{exit_number}出口驶出",
                name: "进入环岛后从{exit_number}出口驶出，上{way_name}",
                destination: "进入环岛后从{exit_number}出口驶出，前往{destination}"
            },
            default: {
                default: "进入环岛",
                name: "通过环岛后驶入{way_name}",
                destination: "通过环岛后前往{destination}"
            }
        }
    },
    "roundabout turn": {
        default: {
            default: "转弯",
            name: "{modifier}转弯，驶入{way_name}",
            destination: "{modifier}转弯，前往{destination}"
        },
        "left": {
            default: "左转",
            name: "左转，驶入{way_name}",
            destination: "左转，前往{destination}"
        },
        "right": {
            default: "右转",
            name: "右转，驶入{way_name}",
            destination: "右转，前往{destination}"
        },
        "straight": {
            default: "继续直行",
            name: "继续直行，驶入{way_name}",
            destination: "继续直行，前往{destination}"
        }
    },
    "exit roundabout": {
        default: {
            default: "驶离环岛",
            name: "驶离环岛，驶入{way_name}",
            destination: "驶离环岛，前往{destination}"
        }
    },
    "exit rotary": {
        default: {
            default: "驶离环岛",
            name: "驶离环岛，驶入{way_name}",
            destination: "驶离环岛，前往{destination}"
        }
    },
    "turn": {
        default: {
            default: "转弯",
            name: "{modifier}转弯，驶入{way_name}",
            destination: "{modifier}转弯，前往{destination}"
        },
        "left": {
            default: "左转",
            name: "左转，驶入{way_name}",
            destination: "左转，前往{destination}"
        },
        "right": {
            default: "右转",
            name: "右转，驶入{way_name}",
            destination: "右转，前往{destination}"
        },
        "straight": {
            default: "直行",
            name: "直行，驶入{way_name}",
            destination: "直行，前往{destination}"
        }
    },
    "uselane": {
        no_lanes: {
            default: "继续直行"
        },
        default: {
            // default: "{lane_instruction}"
            default: "继续直行"
        }
    }

}

function textFormat(instruction) {
    var item = { "text": "", icon: "" }
    let text = ""
    let icon = ""
    let road = instruction.road
    if (road.length != 0) {
        road = "驶入" + road
    } else {
        road = ""
    }
    let type = instruction.type.toLowerCase()
    if (type === "right" || type === "left" || type === "straight") {
        type = "turn"
    }
    let modifier = ""
    if (typeof (instruction.modifier) == "undefined") {
        modifier = "default"
    } else {
        modifier = instruction.modifier.toLowerCase().replace(/[\s\t\n]+/g, '');
    }
    switch (type) {
        case "destinationreached":
            icon = "leaflet-routing-icon-arrive"
            if (mode[type][modifier]) {
                text = mode[type][modifier].default
            } else {
                text = mode[type].default.default
            }
            break;
        case "continue":
            icon = "leaflet-routing-icon-continue"
            if (mode[type][modifier]) {
                text = mode[type][modifier].default
            } else {
                text = road + mode.modifier[modifier] + mode[type].default.default
            }
            break;
        case "head":
            icon = "leaflet-routing-icon-depart "
            text = mode[type].default.default;
            break;
        case "end of road":
            icon = "leaflet-routing-icon-end"
            if (mode[type][modifier]) {
                text = mode[type][modifier].default + road
            } else {
                text = mode.modifier[modifier] + mode[type].default.default + road
            }
            break;
        case "fork":
            icon = "leaflet-routing-icon-fork"
            if (mode[type][modifier]) {
                text = mode[type][modifier].default + road
            } else {
                text = mode[type].default.default + mode.modifier[modifier] + road
            }
            break;
        case "merge":
            icon = "leaflet-routing-icon-merge-left"
            if (mode[type][modifier]) {
                text = mode[type][modifier].default + road
            } else {
                text = mode.modifier[modifier] + mode[type].default.default + road
            }
            break;
        case "new name":
            icon = "leaflet-routing-icon-via"
            if (mode[type][modifier]) {
                text = mode[type][modifier].default + road
            } else {
                text = mode[type].default.default + mode.modifier[modifier] + road
            }
            break;
        case "notification":
            icon = "leaflet-routing-icon-u-turn "
            if (mode[type][modifier]) {
                text = mode[type][modifier].default + road
            } else {
                text = mode[type].default.default + mode.modifier[modifier] + road
            }
            break;
        case "off ramp":
            if (mode[type][modifier]) {
                icon = "leaflet-routing-icon-ramp-" + modifier
                text = mode[type][modifier].default + road
            } else {
                text = mode[type].default.default + road
            }
            break;
        case "rotary":
            icon = "leaflet-routing-icon-enter-roundabout"
            if (mode[type][modifier]) {
                text = mode[type][modifier].default + road
            } else {
                text = mode[type].default.default + road
            }
            break;
        case "roundabout":
            icon = "leaflet-routing-icon-enter-roundabout"
            text = mode[type].default.default.default + road
            break;
        case "roundabout turn":
            icon = "leaflet-routing-icon-enter-roundabout"
            if (mode[type][modifier]) {
                text = mode[type][modifier].default + road
            } else {
                text = mode.modifier[modifier] + mode[type].default.default + road
            }
            break;
        case "exit roundabout":
            icon = "leaflet-routing-icon-enter-roundabout"
            text = mode[type].default.default + road
            break;
        case "exit rotary":
            icon = "leaflet-routing-icon-enter-roundabout"
            text = mode[type].default.default + road
            break;
        case "turn":
            if (mode[type][modifier]) {
                icon = "leaflet-routing-icon-turn-" + modifier
                text = mode[type][modifier].default + road
            } else {
                text = mode.modifier[modifier] + mode[type].default.default + road
            }
            break;
        case "use lane":
            icon = "leaflet-routing-icon-continue"
            if (mode[type][modifier]) {
                text = mode[type][modifier].default
            } else {
                text = mode[type].default.default
            }
            break;
    }
    item.icon = icon
    item.text = text
    return item;
}

function parseMetersToKm(meters) {
return (meters/1000).toFixed(1)
}
function parseSecondsToMinutes(seconds) {
    return (seconds / 60).toFixed(1)
}
export default convertRoute;
export { mode, textFormat, parseMetersToKm, parseSecondsToMinutes };