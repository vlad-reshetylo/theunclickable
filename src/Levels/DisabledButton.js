import {mouseOnly, styleButton} from "@/helpers.js";

class DisabledButton {
    getTask () {
        return 'Click the button again! 🤔';
    }

    render (playground, {pass, panic, color}) {
        const button = document.createElement('button');

        styleButton(button, {color});

        button.innerText = 'Click me!';
        button.classList.add('hoverable');
        button.disabled = true;

        button.onclick = e => {
            if (!mouseOnly(e)) {
                return panic('No, not this way 😉');
            }

            pass('Good job!');
        }

        playground.appendChild(button);
    }
}

export {DisabledButton};