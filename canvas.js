

const c = document.querySelector('canvas')
var ctx = c.getContext("2d");
var img = document.querySelector('.display img')
console.log(img)
// img.style.filter = "grayscale(100%)"
ctx.drawImage(img,0,0,600,600)


Caman('canvas', function () {
    // this.brightness(10);
     this.contrast(0);
    this.stackBlur(x)
    this.render();
  });