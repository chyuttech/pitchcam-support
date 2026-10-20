// 依截圖時記錄的元素位置，在截圖上疊加編號框；沒有 JavaScript 時只顯示截圖
(function () {
  var lang = document.documentElement.getAttribute('data-shots');
  var load = function (path) { return fetch(path).then(function (r) { return r.json(); }).catch(function () { return {}; }); };
  Promise.all([load('manual/' + lang + '/marks.json'), load('manual/facebook/marks.json')]).then(function (all) {
    var marks = Object.assign({}, all[0], all[1]);
    document.querySelectorAll('figure.shot[data-marks]').forEach(function (fig) {
      var frames = marks[fig.getAttribute('data-shot')] || {};
      var wrap = fig.querySelector('.shot-wrap');
      fig.getAttribute('data-marks').split(',').forEach(function (pair) {
        var parts = pair.split(':'), f = frames[parts[0]];
        if (!f) { return; }
        var box = document.createElement('div');
        // 太靠近圖片上緣時，編號放在框的下方
        box.className = f[1] < 0.09 ? 'box below' : 'box';
        box.style.left = (f[0] * 100) + '%';
        box.style.top = (f[1] * 100) + '%';
        box.style.width = (f[2] * 100) + '%';
        box.style.height = (f[3] * 100) + '%';
        var label = document.createElement('span');
        label.textContent = parts[1];
        box.appendChild(label);
        wrap.appendChild(box);
      });
    });
  }).catch(function () {});
})();
