let grid=document.getElementById("grid")
let restartBtn=document.getElementById("restartBtn")
let resetBtn=document.getElementById("resetBtn")
let matchResult=document.getElementById("matchResult")
let curtain=document.getElementById("curtain")
let redScoreDom=document.getElementById("redScore")
let yellowScoreDom=document.getElementById("yellowScore")
let redScoreCard=document.getElementById("redScoreCard")

let tab=
    [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
    ]
let isConnected=false
let tracked=1;
let numTurn=1
let cellColorClass="red"
let redScore=0
let yellowScore=0
//let discEffect=new Audio("./yourSoundFileNameHere")
//uncomment after adding audioFileName in lines 25 and 28
//let endEffect=new Audio("./yourSoundFileNameHere")
//uncomment after adding audioFileName in lines 25 and 28
//endEffect.volume=.5



grid.addEventListener("click",(e)=>{
    if(e.target.parentElement.classList.contains("col")){
        //uncomment after adding audioFileName in lines 25 and 28
        //discEffect.play()
        sequence(e.target.parentElement.getAttribute("data-colNum"),e.target.parentElement)
    }
})
restartBtn.addEventListener("click",()=>{restart()})
resetBtn.addEventListener("click",()=>{
    restart()
    redScore=0
    yellowScore=0
    updateScores()
})


function restart(){
    let colored=document.querySelectorAll(".red,.yellow");
    for(el of colored){
        el.classList.remove("red")
        el.classList.remove("yellow")
    }
    tab=
    [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
    ]
    isConnected=false;
    tracked=1;
    numTurn=1
    cellColorClass="red"
    redScoreCard.classList.add("currentTurn")
    yellowScoreCard.classList.remove("currentTurn")
    curtain.classList.add("display-none")
    restartBtn.textContent="Restart"
}

function sequence(numColP,col){
    let numCol=Number(numColP)-1
    for(row of [5,4,3,2,1,0]){
        if(tab[row][numCol]==0){
            tab[row][numCol]=tracked 
            fillCol(col)
            verifyWin()
            updateTurnIndicator()
            changeTracked()
            break 
        }else if(tab[row]==0){
            console.log("column full")
        }
    }
}


function updateTurnIndicator(){
    if(tracked==2){
        redScoreCard.classList.add("currentTurn")
        yellowScoreCard.classList.remove("currentTurn")
    }else{
        yellowScoreCard.classList.add("currentTurn")
        redScoreCard.classList.remove("currentTurn")

    }
}


function updateScores(){
    redScoreDom.textContent=redScore
    yellowScoreDom.textContent=yellowScore
}


function fillCol(col){
    let colCells=col.children
    for(let i=colCells.length;i--;i>=0){
        if(!colCells[i].classList.contains("red")&&!colCells[i].classList.contains("yellow")){
            colCells[i].classList.add(cellColorClass)
            break
        }
    }
}


function changeTracked(){
    numTurn+=1
    if(numTurn%2==0){
        tracked=2
        cellColorClass="yellow"
    }else{
        tracked=1
        cellColorClass="red"
    }
}


function postGameFct(tracked,message){
    matchResult.innerHTML=message
    curtain.classList.remove("display-none")
    restartBtn.textContent="Replay"
    if(tracked==1 && numTurn!=42){
        redScore+=1
    }else if(numTurn!=42){
        yellowScore+=1
    }
    updateScores()
    
}


function verifyWin(){

    outerloop:for(row of [5,4,3,2,1,0]){
        let connected=0
        for(col of tab[row]){
            if(col==tracked){
                connected+=1
                if(connected==4){
                    postGameFct(tracked,`<span style="color:${cellColorClass}">${cellColorClass}</span> wins!`)
                    //uncomment after adding audioFileName in lines 25 and 28
                    //endEffect.play()
                    isConnected=true
                    break outerloop
                }
            }else{
                connected=0
            }
        }
    }
    if(!isConnected){
        outerloop:for(col of [0,1,2,3,4,5,6]){
            let connected=0
            for(row of [5,4,3,2,1,0]){
                if(tab[row][col]==tracked){
                    connected+=1
                    if(connected==4){
                        postGameFct(tracked,`<span style="color:${cellColorClass}">${cellColorClass}</span> wins!`)
                        //uncomment after adding audioFileName in lines 25 and 28
                        //endEffect.play()
                        isConnected=true
                        break outerloop
                    }
                }else{
                    connected=0
                }
            }
        }
    }

    if(!isConnected){
        outerloop:for(row of [5,4,3]){
            for(col of [0,1,2,3]){
                if(tab[row][col]==tracked && tab[row-1][col+1]==tracked && tab[row-2][col+2]==tracked && tab[row-3][col+3]==tracked){
                    postGameFct(tracked,`<span style="color:${cellColorClass}">${cellColorClass}</span> wins!`)
                    //uncomment after adding audioFileName in lines 25 and 28
                    //endEffect.play()
                    isConnected=true
                    break outerloop
                }
                
            }
        }
    }

    if(!isConnected){
        outerloop:for(row of [5,4,3]){
            for(col of [3,4,5,6]){
                if(tab[row][col]==tracked && tab[row-1][col-1]==tracked && tab[row-2][col-2]==tracked && tab[row-3][col-3]==tracked){
                    postGameFct(tracked,`<span style="color:${cellColorClass}">${cellColorClass}</span> wins!`)
                    //uncomment after adding audioFileName in lines 25 and 28
                    //endEffect.play()
                    isConnected=true
                    break outerloop
                }
                
            }
        }
    }

    if(!isConnected && numTurn==42){
        postGameFct(tracked,`Draw`)
        //uncomment after adding audioFileName in lines 25 and 28
        //endEffect.play()
    }
}