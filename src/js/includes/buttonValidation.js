import { paintTest, workingVocabulary } from "./base";
import { getAnswer } from "./database";

const initializeButtons = () => {
    const buttons = document.querySelectorAll('#greek-vocabullary-app .options a');
    buttons.forEach(el => {
        el.addEventListener('click', (e) =>{
            e.preventDefault();
            if(!e.target.classList.contains('disabled')){
                disableButtons();
                const word = document.querySelector('#greek-vocabullary-app .word');
                const wordIndex = workingVocabulary.findIndex( (el) => {
                    return el.word == word.innerHTML;
                });
                if(getAnswer(word.innerHTML) == e.target.dataset.value){
                    e.target.classList.add('success');
                    workingVocabulary[wordIndex].answer = 'success';
                }else{
                    e.target.classList.add('fail');
                    workingVocabulary[wordIndex].answer = 'fail';
                }

                setTimeout(paintTest, 750);
            }            
        });
    });
}

const disableButtons = () => {
    const buttons = document.querySelectorAll('#greek-vocabullary-app .options a');
    buttons.forEach(el => {
        el.classList.add('disabled');
    });
}

export {initializeButtons};