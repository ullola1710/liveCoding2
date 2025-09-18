// API
const API_ENDPOINT = 'https://yesno.wtf/api';

const input = document.getElementById("input");
const btn = document.getElementById("button");
const answer = document.getElementById("answer"); 
const error = document.getElementById("error");
let timer = null;

/**
 * STEPS:
 *
 * 1. Create a fetchAnswer function and call the API
 * 2. Output the API's response
 * 3. Attach fetchAnswer to an event listener
 * 4. Clear output after 3 seconds
 * 5. Optional: add loading/error states
 *
 */

async function fetchAnswer(){
    const question = (input.value || '').trim();
    if(!question){
        showError("Escribe una pregunta")
        return;
    } // if

    loading(true);
    clearMsg();
    setAnswer('Asking the oracle...'); 

    try{
        const res = await fetch(API_ENDPOINT, {
            cache: 'no-store'
        });
        if(!res.ok) throw new Error(`${res.status}`);

        const data = await res.json();
        const mayus = String(data.answer).toUpperCase();

        setAnswer(mayus);
        cleanAll(5000);
    } catch (err) {
        console.error(err);
        showError('We have some issue to get the correct answer. Try again later');
        setAnswer('');
    } // try-catch
    finally {
        loading(false);
    } // finally

} // async fetchAnswer

btn.addEventListener('click', fetchAnswer);


function loading(isLoading) {
    btn.disabled = isLoading;
    btn.textContent = isLoading ? 'Searching...' : 'Get answer as soon as posible...'; 
} // loading

function setAnswer(text){
    answer.texgittContent = text || ''; 
} // setAnswer

function showError(msg){
    error.textContent = msg; 
} // showError

function clearMsg(){
    error.textContent = ''; 
} // clearMsg 

function cleanAll(timeMs){
    if(timer) clearTimeout(timer); 
    timer = setTimeout(() => {
        input.value = ''; 
        setAnswer(''); 
        clearMsg();
    }, timeMs); 
} // cleanAll
