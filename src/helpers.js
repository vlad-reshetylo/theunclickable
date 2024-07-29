const mouseOnly = e => {
    if (!e.isTrusted) {
        return false;
    }

    return e instanceof MouseEvent || e?.pointerType?.length > 0;
};

const keepAnimated = (element, styles) => {
    const checkAnimation = () => {
        const style = getComputedStyle(element);

        for (let name in styles) {
            if (style[name] !== styles[name]) {
                element.style[name] = styles[name];
            }
        }
    }

    checkAnimation();

    const observer = new MutationObserver(() => checkAnimation());

    const config = { attributes: true, attributeFilter: ['style'] };

    observer.observe(element, config);
};

const isShadeOfGreen = (rgb) => {
    const regex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
    const match = rgb.match(regex);

    if (match) {
        const r = parseInt(match[1], 10);
        const g = parseInt(match[2], 10);
        const b = parseInt(match[3], 10);

        return g > r && g > b;
    }

    return false;
}

const styleButton = (button, {color, fontSize, padding}) => {
    button.style.backgroundColor = color ?? 'hsl(120deg 44.82% 56.97%)';
    button.style.color = '#fff';
    button.style.fontSize = fontSize ?? '34px';
    button.style.border = 'none';
    button.style.padding = padding ?? '15px 30px 20px 30px';
    button.style.letterSpacing = '.7px';
    button.style.fontWeight = '300';
    button.style.fontFamily = '"Noto Sans JP"';
    button.style.display = 'inline-block';
    button.style.borderRadius = '13px';
    button.style.boxShadow = '0 5px 6px 1px #ddd';
    button.style.cursor = 'pointer';
    button.style.userSelect = 'none';
}

export {mouseOnly, keepAnimated, isShadeOfGreen, styleButton};