import {keepAnimated, styleButton} from "@/helpers.js";

class CrazyAnimatedButton {
    getTask () {
        return 'Click the button! ';
    }

    render (playground, {pass, panic, color}) {
        const button = document.createElement('button');

        styleButton(button, {color});

        button.innerText = 'Click me!';

        button.onclick = e => {
            button.remove();
            pass('Wow, got it! Keep it up! 👍');
        }

        keepAnimated(button, {
            animationName: 'catchme',
            animationDuration: '2s',
            animationIterationCount: 'infinite',
        });

        playground.appendChild(button);
    }
}

export {CrazyAnimatedButton}