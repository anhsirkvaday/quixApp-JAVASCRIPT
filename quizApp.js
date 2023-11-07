let quizAppFunction = () => {
    let get = new XMLHttpRequest;
    get.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/quiz", true);
    get.send();
    get.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            let fetch_data = JSON.parse(this.responseText);
            let formEle = document.getElementsByTagName('form')[0];
            let buttonEle = document.createElement('button');
            buttonEle.setAttribute('type', 'button');
            buttonEle.setAttribute('onclick', 'updateScore()');
            buttonEle.innerText = 'Submit';
            let qNum = 1;
            let optNum = 1;
            for (let inDataArr = 0; inDataArr < fetch_data.length; inDataArr++) {
                let divEle = document.createElement('div');
                for (let inDataObj in fetch_data[inDataArr]) {
                    if (inDataObj == 'question') {
                        let h4Ele = document.createElement('h4');
                        h4Ele.innerHTML = 'Q' + qNum + '. ' + fetch_data[inDataArr][inDataObj];
                        divEle.appendChild(h4Ele);
                    }
                    else if (inDataObj == 'options') {
                        for (let options = 0; options < fetch_data[inDataArr][inDataObj].length; options++) {
                            let spanEle = document.createElement('span');
                            spanEle.className = 'options';
                            let radioEle = document.createElement('input');
                            let labelEle = document.createElement('label');
                            radioEle.setAttribute('type', 'radio');
                            if (inDataArr == 0 || inDataArr == 1 || inDataArr == 2 || inDataArr == 3 || inDataArr == 4) {
                                radioEle.setAttribute('name', 'ques' + qNum);
                                spanEle.appendChild(radioEle);
                            }

                            if (options == 0 || options == 1 || options == 2 || options == 3 || options == 4) {
                                radioEle.setAttribute('id', 'opt' + optNum);
                                labelEle.setAttribute('for', 'opt' + optNum);
                                optNum = optNum + 1;
                            }
                            labelEle.innerHTML = fetch_data[inDataArr][inDataObj][options];
                            spanEle.appendChild(labelEle);
                            divEle.appendChild(spanEle);
                        }
                    }
                    formEle.appendChild(divEle);
                    formEle.appendChild(buttonEle);
                }
                qNum = qNum + 1;
            }
        }
    }
}
quizAppFunction();
function updateScore() {
    let score = 0;
    let getInput = [
        document.querySelectorAll('input[name="ques1"]:checked'),
        document.querySelectorAll('input[name="ques2"]:checked'),
        document.querySelectorAll('input[name="ques3"]:checked'),
        document.querySelectorAll('input[name="ques4"]:checked'),
        document.querySelectorAll('input[name="ques5"]:checked')
    ];
    for (let k = 0; k < getInput.length; k++) {
        // console.log(getInput[k]);
        for (let g = 0; g < getInput[k].length; g++) {
            // console.log(getInput[k][g]);
            if (getInput[k][g].id == 'opt3' || getInput[k][g].id == 'opt5' || getInput[k][g].id == 'opt11' || getInput[k][g].id == 'opt15' || getInput[k][g].id == 'opt18'){
                score = score + 1;
                // console.log(getInput[k][g]);
            }
        }
    }
    document.getElementById('printScore').innerText = score;
}