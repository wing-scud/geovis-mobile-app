function exceptNull(array, type) {
  //model 2;airport  2;airline ;time 4
  const types = ["model", "airport", "time", "airline"];
  const index = types.indexOf(type);
  const length = [2, 2, 4];
  if (!array || array.length === 0) {
    if (index === 3) {
      array = "暂无信息";
    } else {
      array = new Array(length[index]).fill("暂无信息");
    }
  } else if (0 < array.length <= length[index]) {
    array = array.map(item => (item ? item : "暂无信息"));
  }
  return array;
}
export function generateInforByLive(data, id) {
  const attribute = {
    id: id,
    model: { code: data.mblb, text: data.mbxz },
    time: {
      scheduled: {
        departure: 1595392476 - Math.random() * 19000,
        arrival: 1595392476 + Math.random() * 109000 + 100000
      },
      real: {
        departure: 1595392476 + Math.random() * 18000,
        arrival: 1595392476 + Math.random() * 109000 + 100000
      }
    },
    airport: {
      origin: "无",
      destination: "无"
    },
    airline: "未知"
  };
  return attribute;
}
export function solveDataDefault(data, id) {
  Array.from(Object.keys(data)).map(key => {
    data[key] = exceptNull(data[key], key);
  });
  let { model, airport, time } = data;
  const airline = data.airline;
  model = { code: model[0], text: model[1] };
  airport = { origin: airport[0], destination: airport[1] };
  time = {
    scheduled: {
      departure: time[0],
      arrival: time[2]
    },
    real: {
      departure: time[1],
      arrival: time[3]
    }
  };
  const attribute = {
    model,
    airline,
    airport,
    time,
    id
  };
  return attribute;
}
