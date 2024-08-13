import {mouseOnly} from "@/helpers.js";

class TinyButtonHiddenByBefore {
    getTask () {
        return 'Click the button 😉';
    }

    getSymbol () {
        return 'fv';
    }

    render (playground, {pass, panic, color}) {
        const button = document.createElement('button');

        button.innerText = 'Click me';

        button.onclick = e => {
            if (!mouseOnly(e)) {
                return panic('No, not this way 😉');
            }

            button.remove();
            pass('Yes, it was not so hard 🙃');
        }

        playground.appendChild(button);
    }
}

export {TinyButtonHiddenByBefore}