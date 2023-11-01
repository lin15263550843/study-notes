// let sideLength = 150; // 大圆的直径
// let gap = 20; // 大圆之间的间隔
// let rows = 5; // 行数
// let cols = 5; // 列数
// let rotationSpeed = 0.01; // 自旋速度
// let smallEllipseDiameter = 10; // 小椭圆的直径
// let smallEllipseCount = 12; // 每个大圆的小椭圆数量
// let smallEllipseDistance = 22; // 小椭圆距离大圆的距离

// function setup() {
//   createCanvas(600, 600);
//   angleMode(DEGREES); // 将角度模式更改为度数
// }

// function draw() {
//   background(102);
//   noStroke(); // 不描边

//   for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//       push();
//       translate((j + 0.5 * (i % 2)) * (sideLength + gap + 10), i * (sideLength + gap) + sideLength / 2); // 将原点移动到每个大圆的中心
//       rotate(frameCount * rotationSpeed); // 使每个大圆自旋

//       // 设置填充颜色为从灰色渐变到蓝色
//       let gray = map(j, 0, cols - 1, 0, 255);
//       let blue = map(j, 0, cols - 1, 255, 0);
//       fill(gray, 0, blue);

//       // 绘制大圆
//       ellipse(0, 0, sideLength, sideLength);

//       // 绘制小椭圆
//       let smallEllipses = [];
//       for (let k = 0; k < smallEllipseCount; k++) {
//         let angle = map(k, 0, smallEllipseCount, 0, 360);
//         let x = (sideLength / 2 + smallEllipseDistance) * cos(angle);
//         let y = (sideLength / 2 + smallEllipseDistance) * sin(angle);
//         smallEllipses.push({ x, y });
//         fill(255);
//         ellipse(x, y, smallEllipseDiameter, smallEllipseDiameter);
//       }

//       // 绘制红色线条
//       stroke(255, 0, 0);
//       for (let l = 0; l < smallEllipseCount; l++) {
//         let nextIndex = (l + 1) % smallEllipseCount;
//         line(smallEllipses[l].x, smallEllipses[l].y, smallEllipses[nextIndex].x, smallEllipses[nextIndex].y);
//       }

//       pop();
//     }
//   }
// }

// /**
//  *  获取对比色
//  */
// function getContrastColor(hexColor) {
//     let c = color(hexColor); // 创建颜色
//     let r = red(c); // 获取红色分量
//     let g = green(c); // 获取绿色分量
//     let b = blue(c); // 获取蓝色分量

//     // 计算对比色
//     let contrastR = 255 - r;
//     let contrastG = 255 - g;
//     let contrastB = 255 - b;

//     return color(contrastR, contrastG, contrastB);
// }

// // 使用 p5js 在画布上绘制n个大圆，并且自旋，圆的直径为 150，沾满 600x600 的画布，左侧和上测边缘显示半个圆，要以对角线的方式斜着交错排列，排列方式为第2列的起始原心要在第1列的起相邻两个圆心中间，每个圆上下左右都间隔20。大圆为5层同心圆，同心内圆的颜色透明，边框为虚线，边框宽度为5，边框颜色随机。并且，在大圆外边，每个大圆之间的间隙中，有一些随机分布的小椭圆，小椭圆的直径为 10，并且每个小椭圆之间有红色线条相连，一定一要有小椭圆
// let sideLength = 200; // 大圆的直径
// let gap = 10; // 大圆之间的间隔
// let rows = 5; // 行数
// let cols = 5; // 列数
// let rotationSpeed = 0.01; // 自旋速度
// let smallEllipseDiameter = 14; // 小椭圆的直径
// let smallEllipseCount = 12; // 每个大圆的小椭圆数量
// let smallEllipseDistance = 20; // 小椭圆距离大圆的距离
// let concentricCircles = 4; // 同心圆的数量
// let concentricCircleColors = []; // 同心圆的颜色
// let dottedCircles = 3; // 每层同心圆虚线环的数量

// function setup() {
//     //   frameRate(3); // 设置帧率为30帧/秒
//     createCanvas(800, 800);
//     angleMode(DEGREES); // 将角度模式更改为度数

//     for (let i = 0; i < rows; i++) {
//         concentricCircleColors.push([]); // 初始化二维数组
//         for (let j = 0; j < cols; j++) {
//             concentricCircleColors[i].push([]);
//             // 生成随机的同心圆颜色值
//             for (let k = 0; k < concentricCircles; k++) {
//                 concentricCircleColors[i][j].push(color(random(255), random(255), random(255)));
//             }
//         }
//     }
// }

// function draw() {
//     background(102);
//     // noStroke(); // 不描边

//     for (let i = 0; i < rows; i++) {
//         for (let j = 0; j < cols; j++) {
//             push();
//             translate((j + 0.5 * (i % 2)) * (sideLength + gap * 3), i * (sideLength + gap) + sideLength / 2); // 将原点移动到每个大圆的中心
//             rotate(frameCount * rotationSpeed); // 使每个大圆自旋

//             // fill(255, 165, 100); // 设置填充颜色为橙色
//             // // 绘制大圆
//             // ellipse(0, 0, sideLength, sideLength);
//             // fill(255, 150, 10); // 设置填充颜色为橙色

//             // 绘制同心圆
//             // for (let k = 0; k < concentricCircles; k++) {
//             //     let radius = sideLength / 2 - k * (sideLength / (1.6 * concentricCircles));
//             //     fill(concentricCircleColors[i][j][k]); // 设置填充颜色为橙色
//             //     noStroke(); // 不描边
//             //     ellipse(0, 0, radius * 2, radius * 2); // 绘制内圆
//             // }
//             for (let k = 0; k < concentricCircles; k++) {
//                 let radius = sideLength / 2 - k * (sideLength / (1.6 * concentricCircles));
//                 fill(concentricCircleColors[i][j][k]); // 设置填充颜色为随机色
//                 noStroke(); // 不描边
//                 ellipse(0, 0, radius * 2, radius * 2); // 绘制同心圆

//                 if (i % 2 === 0 && j % 2 !== 0) {
//                     push();
//                     rotate(frameCount / (50.0 / (j + 50))); // 根据圆的索引改变旋转速度
//                     // 绘制波浪形状的圆
//                     beginShape();
//                     noFill();
//                     stroke(getContrastColor(concentricCircleColors[i][j][k])); // 设置描边颜色
//                     strokeWeight(1); // 设置描边宽度
//                     for (let angle = 0; angle < 360; angle += 0.5) {
//                         let r = radius * 0.85 + 12 * sin(80 * angle); // 使用度来计算sin函数
//                         let x = r * cos(angle);
//                         let y = r * sin(angle);
//                         vertex(x, y);
//                     }
//                     endShape(CLOSE);
//                     beginShape();
//                     // strokeWeight(1); // 设置描边宽度
//                     for (let angle = 0; angle < 360; angle += 0.5) {
//                         let r = 38 + 8 * sin(60 * angle); // 使用度来计算sin函数
//                         let x = r * cos(angle);
//                         let y = r * sin(angle);
//                         vertex(x, y);
//                     }
//                     endShape(CLOSE);
//                     pop();
//                 } else {
//                     // 绘制虚线环
//                     for (let n = 0; n < dottedCircles; n++) {
//                         // let radius = sideLength / 2 - k * (sideLength / (2 * dottedCircles));
//                         // noFill(); // 设置填充颜色为透明色
//                         // // stroke(random(255), random(255), random(255)); // 设置边框颜色为随机颜色
//                         // stroke(255, 255, 0); // 设置边框颜色为黄色
//                         // strokeWeight(5); // 设置虚线的宽度为5
//                         // ellipse(0, 0, radius * 2, radius * 2); // 绘制内圆
//                         push();
//                         rotate(frameCount / (50.0 / (k + 50))); // 根据圆的索引改变旋转速度
//                         stroke(getContrastColor(concentricCircleColors[i][j][k])); // 设置描边颜色
//                         strokeWeight(2); // 设置描边宽度
//                         noFill(); // 不填充
//                         // 设置虚线样式，根据圆的索引改变虚线的间隔
//                         // drawingContext.setLineDash([2, 2 * (k + 1)]);
//                         drawingContext.setLineDash([5, 5]);
//                         ellipse(0, 0, 20 + 20 * n); // 绘制同心圆，根据圆的索引改变半径
//                         pop();
//                         drawingContext.setLineDash([]); // 重置虚线样式
//                     }
//                 }
//             }

//             // if (i % 2 === 0 && j % 2 !== 0) {
//             //     push();
//             //     rotate(frameCount / (50.0 / (j + 50))); // 根据圆的索引改变旋转速度
//             //     stroke(getContrastColor(concentricCircleColors[i][j][0])); // 设置描边颜色
//             //     // 绘制波浪形状的圆
//             //     beginShape();
//             //     noFill();
//             //     // strokeWeight(1); // 设置描边宽度
//             //     for (let angle = 0; angle < 360; angle += 0.5) {
//             //         let r = 62 + 8 * sin(80 * angle); // 使用度来计算sin函数
//             //         let x = r * cos(angle);
//             //         let y = r * sin(angle);
//             //         vertex(x, y);
//             //     }
//             //     endShape(CLOSE);
//             //     beginShape();
//             //     // strokeWeight(1); // 设置描边宽度
//             //     for (let angle = 0; angle < 360; angle += 0.5) {
//             //         let r = 38 + 8 * sin(60 * angle); // 使用度来计算sin函数
//             //         let x = r * cos(angle);
//             //         let y = r * sin(angle);
//             //         vertex(x, y);
//             //     }
//             //     endShape(CLOSE);
//             //     pop();
//             // } else {
//             //     // 绘制同心圆
//             //     for (let k = 0; k < dottedCircles; k++) {
//             //         // let radius = sideLength / 2 - k * (sideLength / (2 * dottedCircles));
//             //         // noFill(); // 设置填充颜色为透明色
//             //         // // stroke(random(255), random(255), random(255)); // 设置边框颜色为随机颜色
//             //         // stroke(255, 255, 0); // 设置边框颜色为黄色
//             //         // strokeWeight(5); // 设置虚线的宽度为5
//             //         // ellipse(0, 0, radius * 2, radius * 2); // 绘制内圆
//             //         push();
//             //         rotate(frameCount / (50.0 / (k + 50))); // 根据圆的索引改变旋转速度
//             //         stroke(204, 102, 0); // 设置描边颜色
//             //         strokeWeight(4); // 设置描边宽度
//             //         noFill(); // 不填充
//             //         // 设置虚线样式，根据圆的索引改变虚线的间隔
//             //         drawingContext.setLineDash([5, 3 * (k + 1)]);
//             //         ellipse(0, 0, 20 + 20 * k); // 绘制同心圆，根据圆的索引改变半径
//             //         pop();
//             //         drawingContext.setLineDash([]); // 重置虚线样式
//             //     }
//             // }

//             strokeWeight(3); // 设置虚线的宽度为2

//             // 绘制小椭圆
//             let smallEllipses = [];
//             for (let k = 0; k < smallEllipseCount; k++) {
//                 // rotate(frameCount / (50.0 / (k + 0))); // 根据小椭圆的索引改变旋转速度
//                 let angle = map(k, 0, smallEllipseCount, 0, 360);
//                 let x = (sideLength / 2 + smallEllipseDistance) * cos(angle + smallEllipseDistance);
//                 let y = (sideLength / 2 + smallEllipseDistance) * sin(angle + smallEllipseDistance * 1.5);
//                 // let x = (sideLength / 2 + smallEllipseDistance) * cos(angle + smallEllipseDistance / 2);
//                 // let y = (sideLength / 2 + smallEllipseDistance) * sin(angle + smallEllipseDistance);
//                 // let randomOffsetX = random(-10, 10); // 随机X偏移量
//                 // let randomOffsetY = random(-10, 10); // 随机Y偏移量
//                 // let x = (sideLength / 2 + smallEllipseDistance) * cos(angle + 10) + randomOffsetX;
//                 // let y = (sideLength / 2 + smallEllipseDistance) * sin(angle + 20) + randomOffsetY;
//                 smallEllipses.push({ x, y });
//                 // fill(255);
//                 // ellipse(x, y, smallEllipseDiameter, smallEllipseDiameter);
//             }

//             // // 绘制红色线条
//             // stroke(255, 0, 0);
//             // for (let l = 0; l < smallEllipseCount; l++) {
//             //     let nextIndex = (l + 1) % smallEllipseCount;
//             //     line(smallEllipses[l].x, smallEllipses[l].y, smallEllipses[nextIndex].x, smallEllipses[nextIndex].y);
//             // }

//             // 绘制红色曲线
//             stroke(204, 102, 0);
//             noFill();
//             beginShape();
//             for (let l = 0; l < smallEllipseCount; l++) {
//                 curveVertex(smallEllipses[l].x, smallEllipses[l].y);
//                 // curveVertex(smallEllipses[l].x + randomOffsetX, smallEllipses[l].y + randomOffsetY);
//             }
//             endShape(CLOSE);
//             for (let l = 0; l < smallEllipseCount; l++) {
//                 fill(255);
//                 ellipse(smallEllipses[l].x, smallEllipses[l].y, smallEllipseDiameter, smallEllipseDiameter);
//             }

//             //   // 绘制半弧线
//             //   //   rotate(frameCount / (50.0 / (i + 50))); // 根据圆的索引改变旋转速度
//             //   stroke(0, 255, 0); // 设置边框颜色为绿色
//             //   strokeWeight(5); // 设置边框宽度为5
//             //   noFill(); // 设置填充颜色为透明色
//             //   arc(sideLength / 2, 0, sideLength, sideLength * 2, 180, 300); // 绘制半弧线

//             pop();
//         }
//     }

//     for (let i = 0; i < rows; i++) {
//         for (let j = 0; j < cols; j++) {
//             if (!(i % 2 === 0 && j % 2 !== 0) && !(i % 2 !== 0 && j % 2 === 0)) {
//                 push();
//                 translate((j + 0.5 * (i % 2)) * (sideLength + gap + 10), i * (sideLength + gap) + sideLength / 2); // 将原点移动到每个大圆的中心
//                 rotate(PI / cols); // 根据圆的索引改变旋转速度
//                 // 绘制半弧线
//                 rotate(frameCount / (50.0 / (i + 50))); // 根据圆的索引改变旋转速度
//                 stroke(338, 70, 93); // 设置边框颜色为绿色
//                 strokeWeight(5); // 设置边框宽度为5
//                 noFill(); // 设置填充颜色为透明色
//                 arc(sideLength / 2, 0, sideLength, sideLength * 2, 180, 270); // 绘制半弧线
//                 pop();
//             }
//         }
//     }

//     // background(220);
//     // translate(width / 2, height / 2); // 将原点移动到画布中心

//     // // 绘制波浪形状的圆
//     // beginShape();
//     // for (let angle = 0; angle < 360; angle += 0.5) {
//     //     let r = 150 + 100 * sin(10 * angle); // 使用度来计算sin函数
//     //     let x = r * cos(angle);
//     //     let y = r * sin(angle);
//     //     vertex(x, y);
//     // }
//     // endShape(CLOSE);
// }

// let n = 5; // 同心圆的数量

// function setup() {
//   createCanvas(720, 400);
//   angleMode(DEGREES); // 将角度模式更改为度数
// }

// function draw() {
//   background(102);
//   translate(width / 2, height / 2); // 将原点移动到画布中心

//   for (let i = 0; i < n; i++) {
//     push();
//     rotate(frameCount / (50.0 / (i + 50))); // 根据圆的索引改变旋转速度
//     stroke(204, 102, 0); // 设置描边颜色
//     strokeWeight(4); // 设置描边宽度
//     noFill(); // 不填充

//     // 设置虚线样式，根据圆的索引改变虚线的间隔
//     drawingContext.setLineDash([5, 5 * (i + 1)]);

//     ellipse(0, 0, 100 + 20 * i); // 绘制同心圆，根据圆的索引改变半径
//     pop();

//     drawingContext.setLineDash([]); // 重置虚线样式
//   }
// }

// /**
//  * 使用 p5js 在画布上绘制n个大圆，1、大圆的颜色为从左到右灰色渐变到蓝色，并且自旋，圆的直径为 150，沾满 600x600 的画布，左侧和上测边缘显示半个圆，要以对角线的方式斜着交错排列，排列方式为第2列的起始原心要在第1列的起相邻两个圆心中间，每个圆上下左右都间隔20，2、并且，在大圆外边，每个大圆之间的间隙中，有一些随机分布的小椭圆，小椭圆的直径为 10，并且每个小椭圆之间有红色线条相连，一定一要有小椭圆。3、在每个大圆的圆心上有个从圆心延伸出来的，半径为大圆直径的半弧线，颜色为绿色，宽度为 5，会跟随大圆旋转
//  */
// let sideLength = 150; // 大圆的直径
// let gap = 20; // 大圆之间的间隔
// let rows = 5; // 行数
// let cols = 5; // 列数
// let rotationSpeed = 0.01; // 自旋速度
// let smallEllipseDiameter = 10; // 小椭圆的直径
// let smallEllipseCount = 12; // 每个大圆的小椭圆数量
// let smallEllipseDistance = 22; // 小椭圆距离大圆的距离

// function setup() {
//   createCanvas(600, 600);
//   angleMode(DEGREES); // 将角度模式更改为度数
// }

// function draw() {
//   background(102);
//   noStroke(); // 不描边

//   for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//       push();
//       translate((j + 0.5 * (i % 2)) * (sideLength + gap + 10), i * (sideLength + gap) + sideLength / 2); // 将原点移动到每个大圆的中心
//       rotate(frameCount * rotationSpeed); // 使每个大圆自旋

//       // 设置大圆的颜色为从左到右灰色渐变到蓝色
//       let c = lerpColor(color(128, 128, 128), color(0, 0, 255), j / cols);
//       fill(c);
//       ellipse(0, 0, sideLength, sideLength); // 绘制大圆

//       // 绘制半弧线
//       stroke(0, 255, 0); // 设置边框颜色为绿色
//       strokeWeight(5); // 设置边框宽度为5
//       noFill(); // 设置填充颜色为透明色
//       arc(sideLength / 2, 0, sideLength, sideLength, 0, 180); // 绘制半弧线

//       // 绘制小椭圆
//       let smallEllipses = [];
//       for (let k = 0; k < smallEllipseCount; k++) {
//         let angle = map(k, 0, smallEllipseCount, 0, 360);
//         let x = (sideLength / 2 + smallEllipseDistance) * cos(angle);
//         let y = (sideLength / 2 + smallEllipseDistance) * sin(angle);
//         smallEllipses.push({ x, y });
//         fill(255);
//         ellipse(x, y, smallEllipseDiameter, smallEllipseDiameter);
//       }

//       // 绘制红色线条
//       stroke(255, 0, 0);
//       for (let l = 0; l < smallEllipseCount; l++) {
//         let nextIndex = (l + 1) % smallEllipseCount;
//         line(smallEllipses[l].x, smallEllipses[l].y, smallEllipses[nextIndex].x, smallEllipses[nextIndex].y);
//       }

//       pop();
//     }
//   }
// }

// p5js 绘制一个波浪形状的圆
// function setup() {
//     createCanvas(400, 400);
// }

// function draw() {
//     background(220);
//     translate(width / 2, height / 2); // 将原点移动到画布中心

//     // 绘制波浪形状的圆
//     beginShape();
//     for (let angle = 0; angle < TWO_PI; angle += 0.01) {
//         let r = 100 + 20 * sin(50 * angle); // 波浪线的半径
//         let x = r * cos(angle);
//         let y = r * sin(angle);
//         vertex(x, y);
//     }
//     endShape(CLOSE);
// }

// let sideLength = 150; // 大圆的直径
// let gap = 20; // 大圆之间的间隔
// let rows = 5; // 行数
// let cols = 5; // 列数
// let rotationSpeed = 0.01; // 自旋速度
// let smallEllipseDiameter = 10; // 小椭圆的直径
// let smallEllipseCount = 12; // 每个大圆的小椭圆数量
// let smallEllipseDistance = 22; // 小椭圆距离大圆的距离

// function setup() {
//   createCanvas(600, 600);
//   angleMode(DEGREES); // 将角度模式更改为度数
// }

// function draw() {
//   background(102);
//   noStroke(); // 不描边

//   for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//       push();
//       translate((j + 0.5 * (i % 2)) * (sideLength + gap + 10), i * (sideLength + gap) + sideLength / 2); // 将原点移动到每个大圆的中心
//       rotate(frameCount * rotationSpeed); // 使每个大圆自旋

//       // 设置填充颜色为从灰色渐变到蓝色
//       let gray = map(j, 0, cols - 1, 0, 255);
//       let blue = map(j, 0, cols - 1, 255, 0);
//       fill(gray, 0, blue);

//       // 绘制大圆
//       ellipse(0, 0, sideLength, sideLength);

//       // 绘制小椭圆
//       let smallEllipses = [];
//       for (let k = 0; k < smallEllipseCount; k++) {
//         let angle = map(k, 0, smallEllipseCount, 0, 360);
//         let x = (sideLength / 2 + smallEllipseDistance) * cos(angle);
//         let y = (sideLength / 2 + smallEllipseDistance) * sin(angle);
//         smallEllipses.push({ x, y });
//         fill(255);
//         ellipse(x, y, smallEllipseDiameter, smallEllipseDiameter);
//       }

//       // 绘制红色线条
//       stroke(255, 0, 0);
//       for (let l = 0; l < smallEllipseCount; l++) {
//         let nextIndex = (l + 1) % smallEllipseCount;
//         line(smallEllipses[l].x, smallEllipses[l].y, smallEllipses[nextIndex].x, smallEllipses[nextIndex].y);
//       }

//       pop();
//     }
//   }
// }

/**
 *  获取对比色
 */
function getContrastColor(hexColor) {
    let c = color(hexColor); // 创建颜色
    let r = red(c); // 获取红色分量
    let g = green(c); // 获取绿色分量
    let b = blue(c); // 获取蓝色分量

    // 计算对比色
    let contrastR = 255 - r;
    let contrastG = 255 - g;
    let contrastB = 255 - b;

    return color(contrastR, contrastG, contrastB);
}

// 使用 p5js 在画布上绘制n个大圆，并且自旋，圆的直径为 150，沾满 600x600 的画布，左侧和上测边缘显示半个圆，要以对角线的方式斜着交错排列，排列方式为第2列的起始原心要在第1列的起相邻两个圆心中间，每个圆上下左右都间隔20。大圆为5层同心圆，同心内圆的颜色透明，边框为虚线，边框宽度为5，边框颜色随机。并且，在大圆外边，每个大圆之间的间隙中，有一些随机分布的小椭圆，小椭圆的直径为 10，并且每个小椭圆之间有红色线条相连，一定一要有小椭圆
let sideLength = 200; // 大圆的直径
let gap = 10; // 大圆之间的间隔
let rows = 5; // 行数
let cols = 5; // 列数
let rotationSpeed = 0.01; // 自旋速度
let smallEllipseDiameter = 14; // 小椭圆的直径
let smallEllipseCount = 12; // 每个大圆的小椭圆数量
let smallEllipseDistance = 20; // 小椭圆距离大圆的距离
let concentricCircles = 4; // 同心圆的数量
let concentricCircleColors = []; // 同心圆的颜色
let dottedCircles = 3; // 每层同心圆虚线环的数量

function setup() {
    //   frameRate(3); // 设置帧率为30帧/秒
    createCanvas(800, 800);
    angleMode(DEGREES); // 将角度模式更改为度数

    for (let i = 0; i < rows; i++) {
        concentricCircleColors.push([]); // 初始化二维数组
        for (let j = 0; j < cols; j++) {
            concentricCircleColors[i].push([]);
            // 生成随机的同心圆颜色值
            for (let k = 0; k < concentricCircles; k++) {
                concentricCircleColors[i][j].push(color(random(255), random(255), random(255)));
            }
        }
    }
}

function draw() {
    background(102);
    // noStroke(); // 不描边

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            push();
            translate((j + 0.5 * (i % 2)) * (sideLength + gap * 4), i * (sideLength + gap) + sideLength / 2); // 将原点移动到每个大圆的中心
            rotate(frameCount * rotationSpeed); // 使每个大圆自旋
            // // 绘制大圆
            // ellipse(0, 0, sideLength, sideLength);
            // fill(255, 150, 10); // 设置填充颜色为橙色
            // 绘制同心圆
            // for (let k = 0; k < concentricCircles; k++) {
            //     let radius = sideLength / 2 - k * (sideLength / (1.6 * concentricCircles));
            //     fill(concentricCircleColors[i][j][k]); // 设置填充颜色为橙色
            //     noStroke(); // 不描边
            //     ellipse(0, 0, radius * 2, radius * 2); // 绘制内圆
            // }
            for (let k = 0; k < concentricCircles; k++) {
                let radius = sideLength / 2 - k * (sideLength / (1.6 * concentricCircles));
                fill(concentricCircleColors[i][j][k]); // 设置填充颜色为随机色
                noStroke(); // 不描边
                ellipse(0, 0, radius * 2, radius * 2); // 绘制同心圆

                if (i % 2 === 0 && j % 2 !== 0) {
                    push();
                    rotate(frameCount / (50.0 / (j + 50))); // 根据圆的索引改变旋转速度
                    // 绘制波浪形状的圆
                    beginShape();
                    noFill();
                    stroke(getContrastColor(concentricCircleColors[i][j][k])); // 设置描边颜色
                    strokeWeight(1); // 设置描边宽度
                    for (let angle = 0; angle < 360; angle += 0.5) {
                        let r = radius * 0.85 + 12 * sin(80 * angle); // 使用度来计算sin函数
                        let x = r * cos(angle);
                        let y = r * sin(angle);
                        vertex(x, y);
                    }
                    endShape(CLOSE);
                    beginShape();
                    // strokeWeight(1); // 设置描边宽度
                    for (let angle = 0; angle < 360; angle += 0.5) {
                        let r = 38 + 8 * sin(60 * angle); // 使用度来计算sin函数
                        let x = r * cos(angle);
                        let y = r * sin(angle);
                        vertex(x, y);
                    }
                    endShape(CLOSE);
                    pop();
                } else {
                    // stroke(getContrastColor(concentricCircleColors[i][j][k])); // 设置描边颜色
                    // strokeWeight(4); // 设置描边宽度
                    // noFill(); // 不填充
                    // // 设置虚线样式，根据圆的索引改变虚线的间隔
                    // // drawingContext.setLineDash([2, 2 * (k + 1)]);
                    // drawingContext.setLineDash([5 + 6, 10]);
                    // // ellipse(0, 0, radius + 20 * n + 0); // 绘制同心圆，根据圆的索引改变半径
                    // console.log(radius);
                    // ellipse(0, 0, radius * 2); // 绘制同心圆，根据圆的索引改变半径
                    // 绘制虚线环
                    for (let n = 0; n < dottedCircles && k < concentricCircles - 1; n++) {
                        // let radius = sideLength / 2 - k * (sideLength / (2 * dottedCircles));
                        // noFill(); // 设置填充颜色为透明色
                        // // stroke(random(255), random(255), random(255)); // 设置边框颜色为随机颜色
                        // stroke(255, 255, 0); // 设置边框颜色为黄色
                        // strokeWeight(5); // 设置虚线的宽度为5
                        // ellipse(0, 0, radius * 2, radius * 2); // 绘制内圆
                        push();
                        rotate(frameCount / (50.0 / (k + 50))); // 根据圆的索引改变旋转速度
                        stroke(getContrastColor(concentricCircleColors[i][j][k])); // 设置描边颜色
                        strokeWeight(8 - k); // 设置描边宽度
                        noFill(); // 不填充
                        // 设置虚线样式，根据圆的索引改变虚线的间隔
                        drawingContext.setLineDash([5, 10 + k]);
                        ellipse(0, 0, radius * 2 - 10 - 20 * n); // 绘制同心圆，根据圆的索引改变半径
                        pop();
                        drawingContext.setLineDash([]); // 重置虚线样式
                    }
                }
            }

            strokeWeight(3); // 设置虚线的宽度为3

            // 绘制小椭圆和连线
            let smallEllipses = [];
            for (let k = 0; k < smallEllipseCount; k++) {
                let angle = map(k, 0, smallEllipseCount, 0, 360);
                let x = (sideLength / 2 + smallEllipseDistance) * cos(angle + smallEllipseDistance);
                let y = (sideLength / 2 + smallEllipseDistance) * sin(angle + smallEllipseDistance * 1.5);
                smallEllipses.push({ x, y });
            }
            // 绘制小椭圆之间曲线
            stroke('#E8670D');
            noFill();
            beginShape();
            drawingContext.setLineDash([3, 4]);
            for (let l = 0; l < smallEllipseCount; l++) {
                curveVertex(smallEllipses[l].x, smallEllipses[l].y);
            }
            endShape(CLOSE);
            // 绘制小椭圆
            for (let l = 0; l < smallEllipseCount; l++) {
                // fill(255);
                // ellipse(smallEllipses[l].x, smallEllipses[l].y, smallEllipseDiameter, smallEllipseDiameter);
                let ellipseRadius = smallEllipseDiameter / 2; // 小椭圆的半径
                // 绘制渐变小椭圆
                for (let i = 0; i <= ellipseRadius; i++) {
                    let t = map(i, 0, ellipseRadius, 0, 1); // 将半径映射到0和1之间
                    let gradientColor = lerpColor(color(255), color(0), t); // 获取插值颜色
                    fill(gradientColor); // 设置填充颜色为插值颜色
                    noStroke(); // 不描边
                    ellipse(smallEllipses[l].x, smallEllipses[l].y, smallEllipseDiameter - i, smallEllipseDiameter - i); // 绘制一个小椭圆
                }
            }

            // 绘制渐变半弧线
            if (!(i % 2 === 0 && j % 2 !== 0) && !(i % 2 !== 0 && j % 2 === 0)) {
                rotate(frameCount / (50.0 / (i + 50))); // 根据圆的索引改变旋转速度
                rotate(30 * (i + j)); // 让每个弧线的朝向不同
                let arcStartAngle = 180; // 弧线的开始角度
                let arcEndAngle = 225 + 20 * (i + j); // 弧线的结束角度
                for (let i = arcStartAngle; i <= arcEndAngle; i++) {
                    let t = map(i, arcStartAngle, arcEndAngle, 0, 1); // 将角度映射到0和1之间
                    let gradientColor = lerpColor(color(0, 255, 0), color(255, 0, 0), t); // 获取插值颜色
                    stroke(gradientColor); // 设置描边颜色为插值颜色
                    strokeWeight(5); // 设置描边宽度
                    noFill(); // 不填充
                    arc(sideLength / 4, 0, sideLength / 2, sideLength, i, i + 1); // 绘制一个小段的弧线
                }
            }
            pop();
        }
    }

    // for (let i = 0; i < rows; i++) {
    //     for (let j = 0; j < cols; j++) {
    //         if (!(i % 2 === 0 && j % 2 !== 0) && !(i % 2 !== 0 && j % 2 === 0)) {
    //             push();
    //             translate((j + 0.5 * (i % 2)) * (sideLength + gap * 4), i * (sideLength + gap) + sideLength / 2); // 将原点移动到每个大圆的中心
    //             rotate(PI / cols); // 根据圆的索引改变旋转速度
    //             // 绘制半弧线
    //             rotate(frameCount / (50.0 / (i + 50))); // 根据圆的索引改变旋转速度
    //             stroke(338, 70, 93); // 设置边框颜色为绿色
    //             strokeWeight(5); // 设置边框宽度为5
    //             noFill(); // 设置填充颜色为透明色
    //             arc(sideLength / 2, 0, sideLength, sideLength * 2, 180, 270); // 绘制半弧线
    //             pop();
    //         }
    //     }
    // }

    // background(220);
    // translate(width / 2, height / 2); // 将原点移动到画布中心

    // // 绘制波浪形状的圆
    // beginShape();
    // for (let angle = 0; angle < 360; angle += 0.5) {
    //     let r = 150 + 100 * sin(10 * angle); // 使用度来计算sin函数
    //     let x = r * cos(angle);
    //     let y = r * sin(angle);
    //     vertex(x, y);
    // }
    // endShape(CLOSE);
}

// let n = 5; // 同心圆的数量

// function setup() {
//   createCanvas(720, 400);
//   angleMode(DEGREES); // 将角度模式更改为度数
// }

// function draw() {
//   background(102);
//   translate(width / 2, height / 2); // 将原点移动到画布中心

//   for (let i = 0; i < n; i++) {
//     push();
//     rotate(frameCount / (50.0 / (i + 50))); // 根据圆的索引改变旋转速度
//     stroke(204, 102, 0); // 设置描边颜色
//     strokeWeight(4); // 设置描边宽度
//     noFill(); // 不填充

//     // 设置虚线样式，根据圆的索引改变虚线的间隔
//     drawingContext.setLineDash([5, 5 * (i + 1)]);

//     ellipse(0, 0, 100 + 20 * i); // 绘制同心圆，根据圆的索引改变半径
//     pop();

//     drawingContext.setLineDash([]); // 重置虚线样式
//   }
// }

// /**
//  * 使用 p5js 在画布上绘制n个大圆，1、大圆的颜色为从左到右灰色渐变到蓝色，并且自旋，圆的直径为 150，沾满 600x600 的画布，左侧和上测边缘显示半个圆，要以对角线的方式斜着交错排列，排列方式为第2列的起始原心要在第1列的起相邻两个圆心中间，每个圆上下左右都间隔20，2、并且，在大圆外边，每个大圆之间的间隙中，有一些随机分布的小椭圆，小椭圆的直径为 10，并且每个小椭圆之间有红色线条相连，一定一要有小椭圆。3、在每个大圆的圆心上有个从圆心延伸出来的，半径为大圆直径的半弧线，颜色为绿色，宽度为 5，会跟随大圆旋转
//  */
// let sideLength = 150; // 大圆的直径
// let gap = 20; // 大圆之间的间隔
// let rows = 5; // 行数
// let cols = 5; // 列数
// let rotationSpeed = 0.01; // 自旋速度
// let smallEllipseDiameter = 10; // 小椭圆的直径
// let smallEllipseCount = 12; // 每个大圆的小椭圆数量
// let smallEllipseDistance = 22; // 小椭圆距离大圆的距离

// function setup() {
//   createCanvas(600, 600);
//   angleMode(DEGREES); // 将角度模式更改为度数
// }

// function draw() {
//   background(102);
//   noStroke(); // 不描边

//   for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//       push();
//       translate((j + 0.5 * (i % 2)) * (sideLength + gap + 10), i * (sideLength + gap) + sideLength / 2); // 将原点移动到每个大圆的中心
//       rotate(frameCount * rotationSpeed); // 使每个大圆自旋

//       // 设置大圆的颜色为从左到右灰色渐变到蓝色
//       let c = lerpColor(color(128, 128, 128), color(0, 0, 255), j / cols);
//       fill(c);
//       ellipse(0, 0, sideLength, sideLength); // 绘制大圆

//       // 绘制半弧线
//       stroke(0, 255, 0); // 设置边框颜色为绿色
//       strokeWeight(5); // 设置边框宽度为5
//       noFill(); // 设置填充颜色为透明色
//       arc(sideLength / 2, 0, sideLength, sideLength, 0, 180); // 绘制半弧线

//       // 绘制小椭圆
//       let smallEllipses = [];
//       for (let k = 0; k < smallEllipseCount; k++) {
//         let angle = map(k, 0, smallEllipseCount, 0, 360);
//         let x = (sideLength / 2 + smallEllipseDistance) * cos(angle);
//         let y = (sideLength / 2 + smallEllipseDistance) * sin(angle);
//         smallEllipses.push({ x, y });
//         fill(255);
//         ellipse(x, y, smallEllipseDiameter, smallEllipseDiameter);
//       }

//       // 绘制红色线条
//       stroke(255, 0, 0);
//       for (let l = 0; l < smallEllipseCount; l++) {
//         let nextIndex = (l + 1) % smallEllipseCount;
//         line(smallEllipses[l].x, smallEllipses[l].y, smallEllipses[nextIndex].x, smallEllipses[nextIndex].y);
//       }

//       pop();
//     }
//   }
// }

// p5js 绘制一个波浪形状的圆
// function setup() {
//     createCanvas(400, 400);
// }

// function draw() {
//     background(220);
//     translate(width / 2, height / 2); // 将原点移动到画布中心

//     // 绘制波浪形状的圆
//     beginShape();
//     for (let angle = 0; angle < TWO_PI; angle += 0.01) {
//         let r = 100 + 20 * sin(50 * angle); // 波浪线的半径
//         let x = r * cos(angle);
//         let y = r * sin(angle);
//         vertex(x, y);
//     }
//     endShape(CLOSE);
// }

