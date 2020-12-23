let tetris = document.createElement('div');
tetris.classList.add('tetris');

for(let i =1; i<181; i++) {
    let excel = document.createElement('div');
    excel.classList.add('excel');
    tetris.appendChild(excel);
}

let main = document.getElementsByClassName('main')[0];
main.appendChild(tetris);

 let excel = document.getElementsByClassName('excel'); 
 let i = 0;

 for (let y=18; y>0; y--) {
     for (let x=1; x<11; x++) {
           excel[i].setAttribute('posX', x);
           excel[i].setAttribute('posY', y);  
           i++;
     }
 }

 let x = 5, y =15;
 let mainArr = [  
               //   многомерный массив
    //палка
    [
        [0,1],
        [0,2],
        [0,3]
    ],
    //квадрат
    [
        [1,0],
        [0,1],
        [1,1] 
    ],
    //буква L 
    [
        [1,0],
        [0,1],
        [0,2] 
    ],
    //зеркальная буква L 
    [
        [1,0],
        [1,1],
        [1,2] 
    ],
    //молния вправо
    [
        [1,0],
        [-1,1],
        [0,1] 
    ],
    //молния влево
    [
        [1,0],
        [1,1],
        [2,1] 
    ],
    //деталь лего
    [
        [1,0],
        [2,0],
        [1,1] 
    ],

 ]
let currentFigure = 0;
let figureBody = 0;

 function create() {
     function getRandom() {
         return Math.round(Math.random()*(mainArr.length-1))
     }
     currentFigure = getRandom();

     figureBody = [
         document.querySelector(`[posX = "${x}"][posY = "${y}"]`),

         document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),

         document.querySelector(`[posX = '${x + mainArr[currentFigure][1][0]}'][posY = '${y + mainArr[currentFigure][1][1]}']`),

         document.querySelector(`[posX = '${x + mainArr[currentFigure][2][0]}'][posY = '${y + mainArr[currentFigure][2][1]}']`),
     ]

     for (let i=0; i<figureBody.length; i++) {
         figureBody[i].classList.add('figure');
     }
 }
 create();

 function move() {
     let moveFlag = true;
     let coordinats = [
         [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
         [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
         [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
         [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')],
     ];
      for (i = 0; i < coordinats.length; i++) {
          if (coordinats[i][1] == 1 || document.querySelector(`[posX = "${coordinats[i][0]}"][posY = "${coordinats[i][1] -1}"]`).classList.contains('set')) {
              moveFlag = false;
              break;  
          }
      }
      if (moveFlag) {
        for (let i=0; i<figureBody.length; i++) {
            figureBody[i].classList.remove('figure');
        } 
        figureBody = [
            document.querySelector(`[posX = "${coordinats[0][0]}"][posY = "${coordinats[0][1] -1}"]`),
            document.querySelector(`[posX = "${coordinats[1][0]}"][posY = "${coordinats[1][1] -1}"]`), 
            document.querySelector(`[posX = "${coordinats[2][0]}"][posY = "${coordinats[2][1] -1}"]`),
            document.querySelector(`[posX = "${coordinats[3][0]}"][posY = "${coordinats[3][1] -1}"]`),
        ];
        for (let i=0; i<figureBody.length; i++) {
            figureBody[i].classList.add('figure');
        }
    } else {

        for (let i=0; i<figureBody.length; i++) {
            figureBody[i].classList.remove('figure');
            figureBody[i].classList.add('set'); 
        }
        create();
    }
}

let interval =  setInterval(() => {
    move();
}, 300);

let flag = true;

window.addEventListener('keydown', function(e) {
    let coordinats1 = [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')];
    let coordinats2 = [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')];
    let coordinats3 = [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')];
    let coordinats4 = [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')];
 
    function getNewState(a) {

        flag = true;

        let figureNew = [
            document.querySelector(`[posX = "${+coordinats1[0]+a}"][posY = "${coordinats1[1]}"]`),
            document.querySelector(`[posX = "${+coordinats2[0]+a}"][posY = "${coordinats2[1]}"]`),
            document.querySelector(`[posX = "${+coordinats3[0]+a}"][posY = "${coordinats3[1]}"]`),
            document.querySelector(`[posX = "${+coordinats4[0]+a}"][posY = "${coordinats4[1]}"]`),
        ];
        for (let i=0; i<figureNew.length; i++) {
            if (!figureNew[i] || figureNew[i].classList.contains('set')) {
                flag =false; 
            }
        }
        if (flag == true) {
            for (let i=0; i<figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
            } 
            figureBody = figureNew;

            for (let i=0; i<figureBody.length; i++) {
                figureBody[i].classList.add('figure');
            } 
        }
    }
    if (e.keyCode == 37 ) {
        getNewState(-1);
    } else if (e.keyCode == 39) {
        getNewState(1);
    } else if (e.keyCode == 40) {
        move();
    }
})
 