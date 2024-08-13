import {mouseOnly, styleButton} from "@/helpers.js";

class DoNotForce {
    getTask () {
        return 'Click the button 😐';
    }

    render (playground, {pass, panic, color}) {
        const button = document.createElement('button');

        styleButton(button, {color});

        button.innerText = 'Do not touch me!';
        button.classList.add('hoverable');
        button.onclick = () => {
            if (!button.innerText.toLowerCase().includes('click me')) {
                return panic('Hmmm, it seems this button really doesn\'t want to be clicked');
            }

            button.remove();
            pass('You know how to convince!');
        }

        playground.appendChild(button);
    }
}

export {DoNotForce}