import {mouseOnly, styleButton} from "@/helpers.js";

const nested = (n, element) => {
    const tags = ['span', 'section', 'div'];

    const wrap = (e, depth) => {
        if (depth === 0) {
            return e;
        }

        const tag = tags[Math.floor(Math.random() * tags.length)];
        const wrapper = document.createElement(tag);
        wrapper.appendChild(wrap(e, depth - 1));

        return wrapper;
    };

    return wrap(element, n);
};

class FakeButton {
    getTask () {
        return 'Click the BUTTON! 🤌';
    }
    
    getSymbol () {
        return 'fb';
    }

    render (playground, {pass, panic, color}) {
        const fake = document.createElement('div');

        styleButton(fake, {color});

        fake.innerText = 'Click me!';
        fake.classList.add('hoverable');
        fake.onclick = e => {
            panic('No, that would be too easy 😬');
        }

        playground.appendChild(nested(18, document.createElement('section')));
        playground.appendChild(fake);

        const button = document.createElement('button');

        button.innerText = 'yes';
        button.onclick = e => {
            if (!mouseOnly(e)) {
                return;
            }

            button.remove();
            pass('Exactly 👏');
        }

        playground.appendChild(nested(4, document.createElement('span')));
        playground.appendChild(nested(6, document.createElement('span')));
        playground.appendChild(nested(15, button));
        playground.appendChild(nested(4, document.createElement('a')));
    }
}

export {FakeButton}