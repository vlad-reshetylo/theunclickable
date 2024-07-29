import {isShadeOfGreen, styleButton} from "@/helpers.js";

class ShouldBeGreenButton {
    getTask () {
        return 'Click the green button! 🎨';
    }

    render (playground, {pass, panic}) {
        const button = document.createElement('button');

        styleButton(button, {color: 'rgb(39 136 244)'});

        button.innerText = 'Click me!';
        button.classList.add('hoverable');
        button.onclick = e => {
            const styling = getComputedStyle(button);
            if (!isShadeOfGreen(styling.backgroundColor)) {
                return panic("No, it's not a green button");
            }

            pass("Good job!");
        }

        playground.appendChild(button);
    }
}

export {ShouldBeGreenButton}