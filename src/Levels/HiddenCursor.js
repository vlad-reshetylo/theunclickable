import {mouseOnly, styleButton} from "@/helpers.js";

class HiddenCursor {
    getTask () {
        return 'Click the button! 🫢';
    }

    getSymbol () {
        return 'sx';
    }

    render (playground, {pass, panic, color}) {
        const button = document.createElement('button');

        styleButton(button, {color, fontSize: '16px', padding: '15px'});

        button.innerText = 'Click me!';
        button.style.marginTop = '20vh';
        button.style.marginLeft = '-10vw';
        button.onclick = e => {
            if (!mouseOnly(e)) {
                return panic('No, not this way 😉');
            }

            button.remove();
            pass('That was too easy!');
        }

        playground.appendChild(button);
    }
}

export {HiddenCursor}