~ function() {
  var requestAnimationFrame = window.requestAnimationFrame;
  var updateButton = document.querySelector('#updateButton');
  var updateText = document.querySelector('#updateText');
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  //var TEXT = 'HELLO WORLD';
  var TEXT = 'MUACM';
  var WIDTH, HEIGHT;
  var mouseX = 1000,
    mouseY = 1000;
  window.onload = main;
  window.addEventListener("mousemove", mouseMove, false);
  window.addEventListener("touchmove", touchMove, false);

  window.onload = function() {
    var img = document.getElementById('target');
    var width = img.naturalWidth;
    var height = img.naturalHeight;

    var canvas = document.createElement('canvas'); //Create a canvas element
    //Set canvas width/height
    canvas.style.width=width;
    canvas.id = 'mycanvas';
    canvas.style.height=height;
    //Set canvas drawing area width/height
    canvas.width = width;
    canvas.height = height-100;
    //Position canvas
    canvas.style.position='relative';
    canvas.style.left=0;
    canvas.style.top=0;
    canvas.style.zIndex=100000;
    canvas.style.pointerEvents='none'; //Make sure you can click 'through' the canvas
    $('#container').append(canvas);
}

  updateButton.onclick = function(){
    TEXT = updateText.value || TEXT;
    main();
  }

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

    createParticles();
    function run() {
      requestAnimationFrame(run);
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.beginPath();

      particles.forEach(function(particle, index) {
        particle.tick(mouseX, mouseY, ctx);
      });
    }
    run();

    function createParticles() {
      if(WIDTH < 480) {
        ctx.font = "30px 'Times New Roman'";
      }else {
        ctx.font = "80px 'Times New Roman'";
      }
      // createLinearGradient
      var gradient = ctx.createLinearGradient(0, 0, WIDTH, 0);
      gradient.addColorStop("0", "white");
      gradient.addColorStop("0.8", "cyan");
      gradient.addColorStop("0.4", "#00bfff");
      gradient.addColorStop("0.6", "#00ffff");
      //gradient.addColorStop("1.0", "");
      //gradient.addColorStop("0.7", "green");
      //gradient.addColorStop("0.7", "green");
      // lineGradient
      ctx.strokeStyle = gradient;
      var textWidth = ctx.measureText(TEXT).width;
      ctx.strokeText(TEXT, WIDTH/2 - textWidth/2, HEIGHT/11);
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
    WIDTH = canvas.width = 600;
    HEIGHT = canvas.height = 1500;
    canvas.height = canvas.height - 2900;
    //canvas.width = canvas.width - 100;

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
