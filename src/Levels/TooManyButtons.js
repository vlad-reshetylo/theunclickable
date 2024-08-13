import {mouseOnly, styleButton} from "@/helpers.js";

const hex = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class TooManyButtons {
    getTask () {
        return 'Click THE BUTTON! 🙄';
    }

    render (playground, {pass, panic, color}) {
        const container = document.createElement('div');
        
        container.style.width = '50%';
        container.style.display = 'inline-block';
        
        const placement = random(9, 31);
        
        for (let i = 0; i < 36; i++) {
            const button = document.createElement(i === placement ? 'button' : 'div');

            styleButton(button, {
                color: hex(),
                fontSize: '16px',
                padding: '10px',
            });

            button.innerText = 'Click me!';
            button.classList.add('hoverable');
            
            if (i === placement) {
                button.onclick = e => {
                    if (!mouseOnly(e)) {
                        return panic('No, not this way 😉');
                    }
                    
                    button.remove();
                    pass('Good job!');
                }
            } else {
                button.onclick = e => {
                    panic('Nope 😑');
                }
            }

            container.appendChild(button);
        }

        playground.appendChild(container);
    }
}

export {TooManyButtons}