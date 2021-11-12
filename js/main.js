~ function() {
  var requestAnimationFrame = window.requestAnimationFrame;
  // var updateButton = document.querySelector('#updateButton');
  // var updateText = document.querySelector('#updateText');
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  //var TEXT = 'HELLO WORLD';
  var TEXT = 'MUACM';
  var WIDTH, HEIGHT;
  var mouseX = 1000,
    mouseY = 1000;
  window.onresize = main;
  window.addEventListener("mousemove", mouseMove, false);
  window.addEventListener("touchmove", touchMove, false);

  // updateButton.onclick = function(){
  //   TEXT = updateText.value || TEXT;
  //   main();
  // }

  function getQueryParams() {
    var result = {}
    var searchString = location.search.split('?')[1];
    if (searchString) {
      var searchArr = searchString.split('&');
      searchArr.forEach(function (str) {
        strArr = str.split('=');
        result[strArr[0]] = decodeURI(strArr[1])
      })
    }
    return result
  }

  main();
  function main() {

    setWidthHeight(); // setWidthHeight

    var particles = [];
    //ctx.globalAlpha = 1;
    //ctx.globalCompositeOperation = "lighter"; 
    // 新建粒子
    createParticles();
    // 动画循环
    function run() {
      requestAnimationFrame(run);
      // 清除画布
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.beginPath();

      particles.forEach(function(particle, index) {
        particle.tick(mouseX, mouseY, ctx);
      });
    }
    run();

    // createParticles
    function createParticles() {
      if(WIDTH < 480) {
        ctx.font = "30px '微软雅黑'";
      }else {
        ctx.font = "80px '微软雅黑'";
      }
      // createLinearGradient
      var gradient = ctx.createLinearGradient(0, 0, WIDTH, 0);
      gradient.addColorStop("0", "white");
      gradient.addColorStop("0.2", "gold");
      gradient.addColorStop("0.5", "pink");
      gradient.addColorStop("0.7", "white");
      gradient.addColorStop("1.0", "red");
      // lineGradient
      ctx.strokeStyle = gradient;
      var textWidth = ctx.measureText(TEXT).width;
      ctx.strokeText(TEXT, WIDTH/2 - textWidth/2, HEIGHT/3);
      // get particle from canvas
      var imgData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
      for (var i = 0, len = imgData.data.length; i < len; i = i + 4) {
        var r = imgData.data[i];
        var g = imgData.data[i + 1];
        var b = imgData.data[i + 2];
        var a = imgData.data[i + 3];
        var x = Math.floor((i % (WIDTH * 4)) / 4);
        var y = Math.floor(i / (WIDTH * 4));
        var color = 'rgba(' + r + ',' + g + ',' + b + ','+ a +')';
        if (a) {
          particles.push(new Particle({
            x: x,
            y: y,
            color: color
          }));
        }
      }
    }
  };



  // set canvas to full screen
  function setWidthHeight() {
    WIDTH = canvas.width = parseInt(window.getComputedStyle(document.querySelector('body')).width);
    HEIGHT = canvas.height = parseInt(window.getComputedStyle(document.querySelector('body')).height);
  }
  // mouse move event
  function mouseMove(event) {
    event = event || window.event;
    mouseX = event.pageX;
    mouseY = event.pageY;
  }
  // touch move event
  function touchMove(event) {
    event = event || window.event;
    var touch = event.touches[0];
    mouseX = touch.pageX;
    mouseY = touch.pageY;
  }
}();
