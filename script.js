let overlay = document.querySelector('.overlay'); 
let modal = document.querySelector('.modal'); 
let speed = 0;

modal.addEventListener('click', function(e){
    if(e.target.classList.contains('easy')) {
        speed = 1000;
     } else if(e.target.classList.contains('normal ')) {
        speed = 500;
     } else if(e.target.classList.contains('hard')) {
        speed = 200;
     }

     if (e.target.classList.contains('button')){
         modal.style.display = "none"; 
         overlay.style.display = "none";
         startGame();

     }
} );
 

function startGame(){

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
    let mainArr=[[[0,1],[0,2],[0,3],[[-1,1],[0,0],[1,-1],[2,-2]],[[1,-1],[0,0],[-1,1],[-2,2]],[[-1,1],[0,0],[1,-1],[2,-2]],[[1,-1],[0,0],[-1,1],[-2,2]],],[[1,0],[0,1],[1,1],[[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0]],],[[1,0],[0,1],[0,2],[[0,0],[-1,1],[1,0],[2,-1]],[[1,-1],[1,-1],[-1,0],[-1,0]],[[-1,0],[0,-1],[2,-2],[1,-1]],[[0,-1],[0,-1],[-2,0],[-2,0]],],[[1,0],[1,1],[1,2],[[0,0],[0,0],[1,-1],[-1,-1]],[[0,-1],[-1,0],[-2,1],[1,0]],[[2,0],[0,0],[1,-1],[1,-1]],[[-2,0],[1,-1],[0,0],[-1,1]],],[[1,0],[-1,1],[0,1],[[0,-1],[-1,0],[2,-1],[1,0]],[[0,0],[1,-1],[-2,0],[-1,-1]],[[0,-1],[-1,0],[2,-1],[1,0]],[[0,0],[1,-1],[-2,0],[-1,-1]]],[[1,0],[1,1],[2,1],[[2,-1],[0,0],[1,-1],[-1,0]],[[-2,0],[0,-1],[-1,0],[1,-1]],[[2,-1],[0,0],[1,-1],[-1,0]],[[-2,0],[0,-1],[-1,0],[1,-1]],],[[1,0],[2,0],[1,1],[[1,-1],[0,0],[0,0],[0,0]],[[0,0],[-1,0],[-1,0],[1,-1]],[[1,-1],[1,-1],[1,-1],[0,0]],[[-2,0],[0,-1],[0,-1],[-1,-1]]],]
    let currentFigure = 0;

    let figureBody = 0;

    let rotate = 1;

    function create() {

        function getRandom() {

            return Math.round(Math.random()*(mainArr.length-1))

        }
        rotate = 1;

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

    let score = 0;
    let input =document.getElementsByTagName('input')[0];
    input.value = `Ваши очки: ${score} `;


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
            for (let i =1; i < 15; i++) {
                let count = 0;
                for (let k = 1; k < 11; k++) {
                    if (document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.contains('set')) {
                        count ++;
                        if (count == 10 ) {
                            score += 10;
                            input.value = `Ваши очки: ${score} `; 
                            for ( let m = 1; m < 11; m ++) {
                                document.querySelector(`[posX = "${m}"][posY = "${i}"]`).classList.remove('set')
                            }
                            let set = document.querySelectorAll('.set');
                            let newSet = [];
                            for (let s = 0; s < set.length; s ++){
                                let setCordinates = [set[s].getAttribute("posX"), set[s].getAttribute('posY')];
                                if(setCordinates[1] > i){
                                    set[s].classList.remove('set');
                                    newSet.push(document.querySelector(`[posX = "${setCordinates[0]}"][posY = "${setCordinates[1]-1}"]`));
                                }
                            }
                            for (let a = 0; a < newSet.length; a++) {
                                newSet[a].classList.add('set');
                            }
                            i--;
                        }
                    } 
                }
            }
            for (n=1; n< 11; n++){
                if(document.querySelector(`[posX = "${n}"][posY = "15"]`).classList.contains('set')){
                    clearInterval(interval );
                    alert(`Игра оконченна, ваш счет: ${score}`); 
                    break; 
                }
            }
            create();
        }
    }

    let interval =  setInterval(() => {

        move();

    }, speed);

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

        } else if (e.keyCode == 38) {

            flag = true;

            let figureNew = [

                document.querySelector(`[posX = "${+coordinats1[0]+ mainArr[currentFigure][rotate+2][0][0]}"][posY = "${+coordinats1[1]+ mainArr[currentFigure][rotate+2][0][1]}"]`),
                document.querySelector(`[posX = "${+coordinats2[0]+ mainArr[currentFigure][rotate+2][1][0]}"][posY = "${+coordinats2[1]+ mainArr[currentFigure][rotate+2][1][1]}"]`),
                document.querySelector(`[posX = "${+coordinats3[0]+ mainArr[currentFigure][rotate+2][2][0]}"][posY = "${+coordinats3[1]+ mainArr[currentFigure][rotate+2][2][1]}"]`),
                document.querySelector(`[posX = "${+coordinats4 [0]+ mainArr[currentFigure][rotate+2][3][0]}"][posY ="${+coordinats4[1]+ mainArr[currentFigure][rotate+2][3][1]}"]`),

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
                if (rotate < 4) {

                    rotate++;

                } else {

                    rotate =1; 
                }
            }
        }
    })

}
  