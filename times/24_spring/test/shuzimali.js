// rgb to #

const rgb = 'rgb(255, 255, 255)';

function rgbToHex(rgb_str) {
    const rgb = rgb_str.match(/\d+/g);
    if(rgb.length !== 3) {
      return sRGE
    }

    if(rgb.some((color) => color < 0 || color > 255)) {
      return sRGE
    }
    let hex = '#';
    rgb.forEach((color) => {
        let hex_color = Number(color).toString(16);
        if (hex_color.length < 2) {
            hex_color = '0' + hex_color;
        }
        hex += hex_color;
    });
    return hex;
}

console.log(rgbToHex(rgb));

// convertToBinary

function convertToBinary(num) {

    const n = num.toString(2);

    // 不足8位的前面补0
    const len = n.length;
    if (len < 8) {
        return '0'.repeat(8 - len) + n;
    }
    return n;
}

console.log(convertToBinary(10));


// 秒数 to 时分秒...应该是能进位就进位

function secondToTime(second) {
  // 取整应该是向下取整...
  // const d = Math.floor(second / (24 * 3600)).toFixed(0);
  // const h = (Math.floor(second - d * 24 * 3600) / 3600).toFixed(0);
  // const m = (Math.floor(second - d * 24 * 3600 - h * 3600) / 60).toFixed(0);
  // const s = (second - d * 24 * 3600 - h * 3600 - m * 60).toFixed(0);

  const d = Math.floor(second / (24 * 3600));
  const h = Math.floor(second % (24 * 3600) / 3600);
  const m = Math.floor(second % 3600 / 60);
  const s = Math.floor(second % 60);

  return {
    day: d,
    hour: h,
    minute: m,
    second: s
  }
}


function render(data) {
    const jsCountdown = document.getElementById('jsCountdown');

    const day = jsCountdown.children[0];
    const hour = jsCountdown.children[1];
    const minute = jsCountdown.children[2];
    const second = jsCountdown.children[3];
    day.classList.remove('hide');
    hour.classList.remove('hide');
    minute.classList.remove('hide');
    second.classList.remove('hide');
    

    const { day: d, hour: h, minute: m, second: s } = data;
    if(d === 0) {
        day.classList.add('hide');
    } else if (day < 10) {
        day.textContent = '0' + d + '天'
    } else {
        day.textContent = d + '天';
    }

    if(h < 10) {
        hour.textContent = '0' + h + ':';
    } else {
        hour.textContent = h + ':';
    }

    if(m < 10) {
        minute.textContent = '0' + m + ':';
    } else {
        minute.textContent = m + ':';
    } 

    if(s < 10) {
        second.textContent = '0' + s;
    } else {
        second.textContent = s;
    }
}

render(secondToTime(0));