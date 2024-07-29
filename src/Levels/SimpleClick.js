import {mouseOnly, styleButton} from "@/helpers.js";

class SimpleClick {
    getTask () {
        return 'Click the button! 🙂';
    }

    render (playground, {pass, panic, color}) {
        const button = document.createElement('button');

        styleButton(button, {color});

        button.innerText = 'Click me!';
        button.classList.add('hoverable');
        button.onclick = e => {
            if (!mouseOnly(e)) {
                return panic('No, not this way 😉');
            }

            pass('That was too easy!');
        }

        playground.appendChild(button);
    }
}

export {SimpleClick}