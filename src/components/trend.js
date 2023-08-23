export default function trendlines(data) {
    let hi1 = data[0];
    let hi2 = null;
    let lo1 = data[0];
    let lo2 = null;
    let temphi = null;
    let templo = null;
    
    let trend = hi1.close >= hi1.open ? 'Sideways up' : 'Sideways down';
    
    let uplines = [];
    let sidelines = [];
    let downlines = [];
    
    for (let i = 1; i < data.length; i++) {
        let candle = data[i];
        if (trend === 'Up') {
            //console.log("uptrending");
            if (candle.close < lo1.low) {
                uplines.push([{time: lo1.time, value: lo1.low}, {time: hi1.time, value: hi1.high}]);
                lo1 = candle;
                hi2 = temphi = templo = lo2 = null;
                trend = 'Sideways down';
            } else if (candle.close < hi1.low && (templo === null || candle.low < templo.low)) {
                if (templo === null) {
                    uplines.push([{time: lo1.time, value: lo1.low}, {time: hi1.time, value: hi1.high}]);
                }
                templo = candle;
            } else if (candle.close > hi1.high && templo === null) {
                hi1 = candle;
            } else if (candle.close > hi1.high && templo !== null) {
                uplines.push([{time: hi1.time, value: hi1.high}, {time: templo.time, value: templo.low}]);
                hi2 = hi1;
                hi1 = candle;
                lo1 = templo;
                lo2 = templo = temphi = null;
            }
        } else if (trend === 'Down') {
            if (candle.close > hi1.high) {
                downlines.push([ {time: hi1.time, value: hi1.high}, {time: lo1.time, value: lo1.low}]);
                hi1 = candle;
                lo2 = templo = temphi = hi2 = null;
                trend = 'Sideways up';
            } else if (candle.close > lo1.high && (temphi === null || candle.high > temphi.high)) {
                if (temphi === null) {
                    downlines.push([ {time: hi1.time, value: hi1.high}, {time: lo1.time, value: lo1.low}]);
                }
                temphi = candle;
            } else if (candle.close < lo1.low && temphi === null) {
                lo1 = candle;
            } else if (candle.close < lo1.low && temphi !== null) {
                downlines.push([ {time: lo1.time, value: lo1.low}, {time: temphi.time, value: temphi.high}]);
                lo2 = lo1;
                lo1 = candle;
                hi1 = temphi;
                hi2 = temphi = templo = null;
            }
        } else if (trend === 'Sideways down') {
            if (candle.high > hi1.high) {
                sidelines.push([{time: hi1.time, value: hi1.high}, {time: lo1.time, value: lo1.low}]);
                templo = temphi = null;
                hi1 = candle;
                trend = 'Sideways up';
            } else if (candle.high > lo1.high && (temphi === null || candle.high > temphi.high)) {
                if (temphi === null) {
                    sidelines.push([ {time: hi1.time, value: hi1.high}, {time: lo1.time, value: lo1.low}]);
                }
                temphi = candle;
            } else if (candle.high < lo1.low) {
                if (temphi === null) {
                    lo1 = candle;
                    //console.log("sideways down => lo1 went lower: ", candle.time);
                } else {
                    downlines.push([{time: lo1.time, value: lo1.low}, {time: temphi.time, value: temphi.high}]);
                    lo2 = lo1;
                    lo1 = candle;
                    hi1 = temphi;
                    hi2 = temphi = templo = null;
                    trend = 'Down';
                }
            } else {
                //console.log("no trend change: ", candle.time);
            }
        } else if (trend === 'Sideways up') {
            if (candle.close < lo1.low) {
                sidelines.push([{time: lo1.time, value: lo1.low}, {time: hi1.time, value: hi1.high}]);
                templo = temphi = null;
                lo1 = candle;
                trend = 'Sideways down';
            } else if (candle.close < hi1.low && (templo === null || candle.low < templo.low)) {
                if (templo === null) {
                    sidelines.push([{time: lo1.time, value: lo1.low}, {time: hi1.time, value: hi1.high}]);
                }
                templo = candle;
            } else if (candle.close > hi1.high) {
                if (templo === null) {
                    hi1 = candle;
                } else {
                    uplines.push([{time: hi1.time, value: hi1.high}, {time: templo.time, value: templo.low}]);
                    hi2 = hi1;
                    hi1 = candle;
                    lo1 = templo;
                    lo2 = templo = temphi = null;
                    trend = 'Up';
                }
            } else {
                //console.log("no trend change: ", candle.time);
            }
        }
    }

    if (trend === 'Up' || trend === 'Sideways up') {
        const line = [{time: lo1.time, value: lo1.low}, {time: hi1.time, value: hi1.high}]
        if (trend === 'Up' && templo === null) uplines.push(line);
        else if (trend === 'Sideways up' && templo === null) sidelines.push(line);
        sidelines.push([{time: hi1.time, value: hi1.high}, {time: data[data.length - 1].time, value: data[data.length - 1].close}]);
    }

    else if (trend === 'Down' || trend === 'Sideways down') {
        const line = [{time: hi1.time, value: hi1.high}, {time: lo1.time, value: lo1.low}]
        if (trend === 'Down' && temphi === null) downlines.push(line);
        else if (trend === 'Sideways down' && temphi === null) sidelines.push(line);
        sidelines.push([{time: lo1.time, value: lo1.low}, {time: data[data.length - 1].time, value: data[data.length - 1].close}]);
    }

    /*
    console.log('Uplines --- ', uplines)
    console.log('Sidelines --- ', sidelines)
    console.log('Downlines --- ', downlines)
    */

    return {uplines, sidelines, downlines, trend}
}