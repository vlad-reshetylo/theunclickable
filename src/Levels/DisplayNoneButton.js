import {mouseOnly, styleButton} from "@/helpers.js";

class DisplayNoneButton {
    getTask () {
        return 'Click... the button? 🫣';
    }

    render (playground, {pass, panic, color}) {
        const button = document.createElement('button');

        styleButton(button, {color});

        button.innerText = 'Click me!';
        button.classList.add('hoverable');
        button.style.display = 'none';

        button.onclick = e => {
            if (!mouseOnly(e)) {
                return panic('No, not this way 😉');
            }

            pass('Yep, you found it!');
        }

        playground.appendChild(button);
    }
}

export {DisplayNoneButton}