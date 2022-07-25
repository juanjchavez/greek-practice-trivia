import { initializeButtons } from "./buttonValidation";
import { vocabulary, getOptions } from "./database";

let workingVocabulary = [];
const initApp = () => {
    workingVocabulary = [];
    workingVocabulary = vocabulary.map(({word, translation}) =>{
        return {word,translation, options:getOptions(word), answer:''};
    });
    workingVocabulary=shuffle(workingVocabulary);
    paintTest();
}

const shuffle = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
   
        // Generate random number
        var j = Math.floor(Math.random() * (i + 1));
                    
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
        
    return array;
  }

const paintTest = () => {
    const word = document.querySelector('#greek-vocabullary-app .word');
    const options = document.querySelector('#greek-vocabullary-app .options');
    const total =  document.querySelector('#greek-vocabullary-app .total');
    const unanswered = workingVocabulary.filter( (el) => {
        return el.answer == '';
    });
    if (unanswered.length>0){
        let buttons = '';
        unanswered[0].options.forEach(element => {
            buttons += `<a class='greek-answer' href='#' data-value='${element}'>${element}</a>`;
        });
    
        word.innerHTML = unanswered[0].word;
        options.innerHTML = buttons;
        total.innerHTML = `${ workingVocabulary.length - unanswered.length +1 } / ${ workingVocabulary.length }`
        initializeButtons();
    }else{
        getResults();
    }
}
const getResults = () => {
    const main = document.querySelector('#greek-vocabullary-app');
    
    const wrongAnswers = workingVocabulary.filter( el => {
        return el.answer == 'fail';
    });
    let errorsTable = '';
    const score = (( workingVocabulary.length - wrongAnswers.length) * 100) / workingVocabulary.length;
    if(wrongAnswers.length > 0){
        let errors = '';
        wrongAnswers.forEach(el => {
            errors += `
            <tr>
            <td>${el.word}</td>
            <td>${el.translation}</td>
            </tr>
            `;
        });
        errorsTable += `<p>Le dejamos una lista de palabras a practicar:<br></p>
        <table class='errors-table'>
        <thead>
        <tr>
        <td>Palabra</td>
        <td>Traducción</td>
        </tr>
        </thead>
        <tbody>
        ${errors}
        </tbody>
        </table>`
    }else{
        errorsTable += '<p>Excelente! A alcanzado el cien porciento de éxtio!</p>';
    }

    const result = `<div class='results'><p>Su puntaje final fue de  <br> <span class='score'>${score.toFixed(2)}%</span></p></div>
    <div class='table-wrapper'>
        ${errorsTable}
    </div>
    <div class='restart-wrapper'>
    <a href='#' class='restart'> Reiniciar</a>
    </div>`;

    main.innerHTML = result;

    const restartButton = document.querySelector('#greek-vocabullary-app .restart');
    restartButton.addEventListener('click', () => {
        location.reload(true);
    });


}
export {workingVocabulary, initApp, paintTest}