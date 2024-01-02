document.addEventListener('DOMContentLoaded', function () {
    var playClicked = false;
    var isTimerRunning = false;
    let intervalId;
    let remainMinutes = '00';
    let remainSeconds = '00';
    let session = false;
    let TITLE;


    //*****************break container div which can increase and decrease the length of break*****************//
    const breakIncrement = document.getElementById('break-increment');//console.log('breakIncrement',breakIncrement);
    const breakDecrement = document.getElementById('break-decrement');//console.log('breakDecrement',breakDecrement);

    var breakParent = document.getElementById('break-container');
    var breakChildren = breakParent.children;
    //console.log('breakChildren',breakChildren);

    breakIncrement.addEventListener('click', () => {
        let tempIncrease = parseFloat(breakChildren[1].value)
        tempIncrease += 1
        if (tempIncrease < 60) {
            breakChildren[1].value = tempIncrease;
        } else {
            breakChildren[1].value = '60';
        }

        //console.log(tempIncrease,typeof tempIncrease)
    })
    breakDecrement.addEventListener('click', () => {
        let tempDecrease = parseFloat(breakChildren[1].value);
        tempDecrease -= 1;
        if (tempDecrease > 0) {
            breakChildren[1].value = tempDecrease;
        } else {
            breakChildren[1].value = '1';
        }
    })
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //*****************session container div which can increase and decrease the length of session*****************//
    const sessionIncrement = document.getElementById('session-increment');//console.log('sessionIncrement',sessionIncrement);
    const sessionDecrement = document.getElementById('session-decrement');//console.log('sessionDecrement',sessionDecrement);

    var sessionParent = document.getElementById('session-container');
    var sessionChildren = sessionParent.children;
    //console.log('sessionChildren',sessionChildren);

    sessionIncrement.addEventListener('click', () => {
        let temp2Increase = parseFloat(sessionChildren[1].value)
        temp2Increase += 1
        if (temp2Increase < 60) {
            sessionChildren[1].value = temp2Increase;
        } else {
            sessionChildren[1].value = '60';
        }

        //console.log(temp2Increase,typeof temp2Increase)
    })
    sessionDecrement.addEventListener('click', () => {
        let temp2Decrease = parseFloat(sessionChildren[1].value);
        temp2Decrease -= 1;
        if (temp2Decrease > 0) {
            sessionChildren[1].value = temp2Decrease;
        } else {
            sessionChildren[1].value = '1';
        }
    })
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //*****************setting play-pause and reset buttons*****************//
    var PlayAndPause = document.getElementById("start_stop"); //console.log('PlayAndPause',PlayAndPause)
    var reset = document.getElementById('reset'); //console.log('reset',reset);
    var minutes = document.getElementById('minutes'); //console.log('minutes', minutes);
    var seconds = document.getElementById('seconds'); //console.log('seconds', seconds);
    var audio = document.getElementById('audio'); //console.log('audio', audio);
    var title = document.getElementById('timer'); //console.log('title', title)


    console.log('remain minutes', remainMinutes, 'remain seconds', remainSeconds, 'session', session, 'running', isTimerRunning);


    reset.addEventListener('click', () => {
        clearInterval(intervalId);
        isTimerRunning = false;
        document.getElementById('break-length').value = '5';
        document.getElementById('session-length').value = '25';
        if (!session) {
            minutes.value = '24';
        } else {
            minutes.value = '04'
        }
        seconds.value='59';
        remainMinutes = '00';
        remainSeconds = '00';
        //console.log('remain minutes', remainMinutes, 'remain seconds', remainSeconds, 'session', session, 'running', isTimerRunning);
    })

    PlayAndPause.addEventListener('click', () => {
        //check if timer running or not:
        //play situation  
        if (!isTimerRunning) {
            //determine session or break
            if (!session) {
                title.innerText = 'SESSION';
            } else {
                title.innerText = 'BREAK'
            }
            //determine start time or remain time
            if (remainMinutes === '00' && remainSeconds === '00') {
                if (title.innerText === 'SESSION') {
                    minutes.value = (sessionChildren[1].value - 1).toString().padStart(2, '0');
                    TITLE = 'SESSION';
                } else {
                    minutes.value = (breakChildren[1].value - 1).toString().padStart(2, '0');
                    TITLE = 'BREAK'
                }
                seconds.value = '59'
            } else {
                title.innerText = TITLE;
                minutes.value = remainMinutes;
                seconds.value = remainSeconds;
            }

            intervalId = setInterval(() => {
                let tempMinutes = parseFloat(minutes.value);
                let tempSeconds = parseFloat(seconds.value);
                //console.log('tempMinutes', tempMinutes, 'tempSeconds', tempSeconds);

                if (tempMinutes === 0 && tempSeconds === 0) {
                    clearInterval(intervalId);
                    audio.play();
                    isTimerRunning = false;
                    session = !session;
                    remainMinutes = '00';
                    remainSeconds = '00';
                    console.log('remain minutes', remainMinutes, 'remain seconds', remainSeconds, 'session', session, 'running', isTimerRunning);
                    return;
                }

                if (tempSeconds === 0) {
                    tempMinutes -= 1;
                    tempSeconds = 59;
                } else {
                    tempSeconds -= 1;
                }

                minutes.value = tempMinutes.toString().padStart(2, '0');
                seconds.value = tempSeconds.toString().padStart(2, '0');
            }, 1000);
            isTimerRunning = true;
        }
        //pause situation
        else {
            remainMinutes = minutes.value;
            remainSeconds = seconds.value
            clearInterval(intervalId);
            isTimerRunning = false;
        }
        console.log('remain minutes', remainMinutes, 'remain seconds', remainSeconds, 'session', session, 'running', isTimerRunning);
    })
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
})