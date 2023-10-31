//We need a variable to hold our image
let img;

//We will divide the image into segments
let numSegments = 10;

//We will store the segments in an array
let segments = [];

//lets add a variable to switch between drawing the image and the segments
let drawSegments = true;

//lets load the image from disk
function preload() {
  img = loadImage('/assets/Mona_Lisa_by_Leonardo_da_Vinci_500_x_700.jpg');
}

function setup() {
  //We will make the canvas the same size as the image using its properties
  createCanvas(img.width, img.height);
  //We can use the width and height of the image to calculate the size of each segment
  let segmentWidth = img.width / numSegments;
  let segmentHeight = img.height / numSegments;
  /*
  Divide the original image into segments, we are going to use nested loops
  */

  for (let segYPos = 0; segYPos < img.height; segYPos += segmentHeight) {
    //this is looping over the height
    for (let segXPos = 0; segXPos < img.width; segXPos += segmentWidth) {
      //We will use the x and y position to get the colour of the pixel from the image
      //lets take it from the centre of the segment
      let segmentColour = img.get(segXPos + segmentWidth / 2, segYPos + segmentHeight / 2);
      let segment = new ImageSegment(segXPos, segYPos, segmentWidth, segmentHeight, segmentColour);
      segments.push(segment);
    }
  }
}

function draw() {
  background(0);
  image(img, 0, 0);
  if (drawSegments) {
    //lets draw the segments to the canvas
    for (const segment of segments) {
      segment.draw();
    }
  } else {
    //lets draw the image to the canvas
    image(img, 0, 0);
  }
}
function keyPressed() {
  if (key == ' ') {
    //this is a neat trick to invert a boolean variable,
    //it will always make it the opposite of what it was
    drawSegments = !drawSegments;
  }
}

//Here is our class for the image segments, we start with the class keyword
class ImageSegment {
  constructor(
    srcImgSegXPosInPrm,
    srcImgSegYPosInPrm,
    srcImgSegWidthInPrm,
    srcImgSegHeightInPrm,
    srcImgSegColourInPrm,
  ) {
    //these parameters are used to set the internal properties of an instance of the segment
    //These parameters are named as imageSource as they are derived from the image we are using
    this.srcImgSegXPos = srcImgSegXPosInPrm;
    this.srcImgSegYPos = srcImgSegYPosInPrm;
    this.srcImgSegWidth = srcImgSegWidthInPrm;
    this.srcImgSegHeight = srcImgSegHeightInPrm;
    this.srcImgSegColour = srcImgSegColourInPrm;
    this.isHover = false;
  }

  draw() {
    //lets draw the segment to the canvas, for now we will draw it as an empty rectangle so we can see it
    stroke(0);
    strokeWeight(2);
    fill(this.srcImgSegColour);
    rect(this.srcImgSegXPos, this.srcImgSegYPos, this.srcImgSegWidth, this.srcImgSegHeight);
    if (this.isHover) {
      stroke('red');
      rect(
        this.srcImgSegXPos + 2,
        this.srcImgSegYPos + 2,
        this.srcImgSegWidth - 4,
        this.srcImgSegHeight - 4,
      );
    }
  }
}
// 用来保存 srcImgSegColour 之前的颜色
let srcImgSegColourBbackup = [0, 0, 0, 0];
// 更新 srcImgSegColour
function updateSrcImgSegColour(event, type) {
  const { x, y } = event;
  segments.forEach((segment) => {
    if (
      segment.srcImgSegXPos < x &&
      x < segment.srcImgSegXPos + segment.srcImgSegWidth &&
      segment.srcImgSegYPos < y &&
      y < segment.srcImgSegYPos + segment.srcImgSegHeight
    ) {
      if (type === 'mousePressed') {
        srcImgSegColourBbackup = segment.srcImgSegColour;
        segment.srcImgSegColour = [0, 0, 0, 0];
      }
      if (type === 'mouseReleased') {
        segment.srcImgSegColour = srcImgSegColourBbackup;
      }
      if (type === 'mouseMoved') {
        segment.isHover = true;
      }
    } else {
      if (segment.isHover) {
        segment.isHover = false;
      }
    }
  });
}
// 鼠标按下事件
function mousePressed(event) {
  updateSrcImgSegColour(event, 'mousePressed');
}
// 鼠标抬起事件
function mouseReleased(event) {
  updateSrcImgSegColour(event, 'mouseReleased');
}
// 鼠标滑过事件
function mouseMoved(event) {
  updateSrcImgSegColour(event, 'mouseMoved');
}
