class ConsoleButton {
    getTask () {
        return '"Click" the "button"! 👨‍💻';
    }

    render (playground, {pass, panic, color}) {
        console.log(
            '%cClick me! theUnclickable.click()',
            `background: ${color}; color: white; padding: 10px 20px; border-radius: 5px; font-size: 16px; border: none; cursor: pointer;`
        );
        
        window.theUnclickable = {
            click () {
                pass('Awesome! 😌');
                window.theUnclickable = undefined;
            }
        }
    }
}

export {ConsoleButton};