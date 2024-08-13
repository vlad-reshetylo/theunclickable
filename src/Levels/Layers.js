import {mouseOnly, styleButton} from "@/helpers.js";

const hex = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Layers {
    getTask () {
        return 'Click the button! 😜';
    }

    render (playground, {pass, panic, color}) {
        const container = document.createElement('div');
        
        container.style.width = '50%';
        container.style.display = 'inline-block';
        container.style.position = 'relative';

        const layer = document.createElement('div');
        
        layer.style.position = 'absolute';
        layer.style.left = '0';
        layer.style.top = '0';
        layer.style.width = '100%';
        layer.style.height = '100%';
        layer.style.zIndex = '30';

        const button = document.createElement('button');

        styleButton(button, {color});

        button.innerText = 'Click me!';
        button.classList.add('hoverable');
        button.style.zIndex = '5';
        button.onclick = e => {
            if (!mouseOnly(e)) {
                return panic('No, not this way 😉');
            }

            button.remove();
            pass('That was too easy!');
        }

        container.appendChild(layer);
        container.appendChild(button);
        playground.appendChild(container);
    }
}

export {Layers}