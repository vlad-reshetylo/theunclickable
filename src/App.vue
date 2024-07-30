<template>
    <div class="layout">
        <section class="app">
            <div class="logo-container">
                <div class="logo">
                    <div>
                        The Unclickable
                    </div>
                    <span>
                        It's a bird? It's a plane? No, it's... a Button?
                    </span>
                </div>
            </div>

            <transition name="modal">
                <modal v-if="modal.isShown" @okay="handleOkay" :class="modal.mode">
                    <template v-if="state === 'started'">
                        {{ modal.text }}
                    </template>

                    <div class="note" v-if="state === 'loading'">
                        Use your web development skills, logic, and maybe even a bit of agility to complete all the levels!
                        <div>
                            Please note, the game was tested only on Google Chrome 126. Older or other browsers are expected to work but are not guaranteed.
                        </div>
                    </div>
                    
                    <template v-if="state === 'finished'">
                        Great Job! 🎉
                        <br>
                        <br>
                        Thank you for playing! You did fantastic!
                        <br>
                        <br>
                        I'd love to hear your thoughts. You can rate the game and share your experience, suggestions, ideas via the <a href="https://github.com/vlad-reshetylo/theunclickable/discussions/1">Link</a>
                    </template>
                </modal>
            </transition>
            
            <template v-if="currentLevel !== 0">
                <div class="level-counter">
                    {{ currentLevel }} / {{ levelsNumber }}
                </div>

                <div class="task">
                    Level {{ currentLevel }}: {{ task }}
                </div>
            </template>
        </section>

        <section v-pre id="playground"></section>
    </div>
</template>

<script setup>
import Modal from "@/Modal.vue";
import {onMounted, reactive, ref} from "vue";
import {DisabledButton} from "@/Levels/DisabledButton.js";
import {DisplayNoneButton} from "@/Levels/DisplayNoneButton.js";
import {CrazyAnimatedButton} from "@/Levels/CrazyAnimatedButton.js";
import {TinyButtonHiddenByBefore} from "@/Levels/TinyButtonHiddenByBefore.js";
import {HiddenCursor} from "@/Levels/HiddenCursor.js";
import {ShouldBeGreenButton} from "@/Levels/ShouldBeGreenButton.js";
import {SimpleClick} from "@/Levels/SimpleClick.js";
import {FakeButton} from "@/Levels/FakeButton.js";
import {TooManyButtons} from "@/Levels/TooManyButtons.js";
import {Layers} from "@/Levels/Layers.js";
import {ConsoleButton} from "@/Levels/ConsoleButton.js";
import {DoNotForce} from "@/Levels/DoNotForce.js";

const state = ref('loading');
const modal = reactive({
    text: 'Use your web development skills, logic, and maybe even a bit of agility to complete all the levels!',
    mode: 'info',
    isShown: false,
});
const showModal = () => modal.isShown = true;
const hideModal = () => modal.isShown = false;

const colors = [
    'rgb(194 96 189)',
    'rgb(96 146 194)',
    'rgb(96 194 125)',
    'rgb(250 202 77)',
    'rgb(250 105 77)',
    'rgb(39 136 244)',
    'rgb(201 45 164)',
    'rgb(96 194 125)',
    'rgb(96 146 194)',
    'rgb(250 105 77)',
    'rgb(113,111,217)',
    'rgb(194 96 189)',
    'rgb(38,164,150)',
];

const levels = [    
    new SimpleClick(),
    new DisabledButton(),
    new HiddenCursor(),

    new DoNotForce(),
    new DisplayNoneButton(),
    new Layers(),

    new CrazyAnimatedButton(),
    new FakeButton(),
    new TinyButtonHiddenByBefore(),

    new ConsoleButton(),
    new TooManyButtons(),
    new ShouldBeGreenButton(),
];

const levelsNumber = +levels.length;
const currentLevel = ref(0);
const task = ref('');

let okayHandler = () => {
    state.value = 'started';
    nextLevel();
}

const nextLevel = () => {
    const level = levels.shift();
    const color = colors.shift();
    
    const playground = document.querySelector('#playground');
    playground.innerHTML = '';
    
    if (!level) {
        state.value = 'finished';
        okayHandler = () => window.location.href = 'https://github.com/vlad-reshetylo/theunclickable/discussions/1';
        return showModal();
    }
    
    playground.setAttribute('level', level.getSymbol ? level.getSymbol() : '');
    
    currentLevel.value = levelsNumber - levels.length;
    
    task.value = level.getTask();

    level.render(
        playground,
        {
            color,
            pass (text) {
                modal.text = text;
                modal.mode = 'info';

                showModal();
                okayHandler = () => nextLevel();
            },
            
            panic (text) {
                modal.text = text;
                modal.mode = 'panic';

                showModal();
                okayHandler = () => hideModal();
            }
        }
    );
};

const handleOkay = () => {
    hideModal();
    okayHandler();
};

onMounted(() => {
    document.addEventListener('keydown', function(event) {
        if (!modal.isShown) {
            return;
        }
        
        if (event.code === 'Space' || event.code === 'Enter') {
            handleOkay();
        }
    }); 
});

showModal();
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Zain:wght@200;300;400;700;800;900&display=swap');

    body {
        margin: 0;
        padding: 0;
        background-color: #EAE7DC;
        font-family: "Noto Sans JP", sans-serif;
        min-height: 100vh;
    }
    
    .note {
        div {
            font-size: 60%;
            line-height: initial;
            text-align: left;
            font-weight: initial;
            margin-top: 30px;
        }
    }
    
    .logo {
        display: inline-block;
        text-align: center;
        padding: 30px 30px;
        
        div {
            font-family: 'Zain', sans-serif;
            font-weight: 400;
            font-size: 50px;
            margin-bottom: -15px;
        }
        
        span {
            font-family: 'Zain', sans-serif;
            font-weight: 200;
            font-size: 16px;
        }
    }
    
    #app {
        min-height: 100vh;
    }
    
    .layout {
        min-height: 100vh;
        display: grid;
        grid-template-rows: 350px auto;
        
        .app {
            border-bottom: 1px #bbb solid;
            box-shadow: 0 1px 3px #ccc;
            z-index: 10;
        }
        
        .logo-container {
            display: flex;
            align-items: center;
            flex-direction: column-reverse;
        }
        
        #playground {
            padding-top: 60px;
            background-color: hsl(47 25% 91% / 1);
            z-index: 5;
            text-align: center;
        }
    }

    @keyframes fa-beat {
        0%, 90% {
            transform: scale(1);
        }
        45% {
            transform: scale(1.03);
        }
    }
    
    .hoverable {
        &:not([disabled]):hover {
            animation-name: fa-beat;
            animation-duration: 1s;
            animation-iteration-count: infinite;
        }
    }
    
    .level-counter {
        text-align: center;
        font-size: 25px;
        font-family: 'Noto Sans JP';
        color: #666;
        font-weight: 200;
        margin-top: 10px;
    }
    
    .task {
        text-align: center;
        font-size: 46px;
        font-family: 'Noto Sans JP';
        color: #222;
        font-weight: 300;
        margin-top: 40px;
        text-shadow: 0px 0px 5px #ddd;
    }
    
    button {
        user-select: none;
    }
    
    button[disabled] {
        opacity: .4;
        cursor: default !important;
    }

    @keyframes catchme {
        0% {
            transform: translate(5vw, -5vh) scale(1) skew(0deg);
        }
        10% {
            transform: translate(50vw, 10vh) scale(0.8) skew(20deg);
        }
        20% {
            transform: translate(-40vw, -20vh) scale(1.2) skew(-15deg);
        }
        30% {
            transform: translate(30vw, -30vh) scale(0.5) skew(10deg);
        }
        40% {
            transform: translate(-20vw, 40vh) scale(1.5) skew(-25deg);
        }
        50% {
            transform: translate(10vw, -10vh) scale(0.3) skew(5deg);
        }
        60% {
            transform: translate(-50vw, 20vh) scale(1.8) skew(-10deg);
        }
        70% {
            transform: translate(40vw, -40vh) scale(0.6) skew(15deg);
        }
        80% {
            transform: translate(-30vw, 30vh) scale(1.1) skew(-20deg);
        }
        90% {
            transform: translate(20vw, -20vh) scale(0.4) skew(25deg);
        }
        100% {
            transform: translate(-5vw, 5vh) scale(1) skew(3deg);
        }
    }
    
    #playground {
        &[level="sx"] {
            & > * {
                cursor: none !important;
            }
            
            & {
                cursor: none !important;
            }
        }

        &[level="fb"] {
            button {
                display: none;
            }
        }

        &[level="fv"] {
            button {
                z-index: 10;
                position: relative;
                width: 0;
                font-size: 0;
                height: 0;
                border: none;
                padding: 0;
            }
            
            button:before {
                z-index: 20;
                left: -75px;
                top: -25px;
                content: "Click Me";
                position: absolute;
                width: 150px;
                height: 50px;
                pointer-events: none;
                text-align: center;
                background-color: hsl(120deg 44.82% 56.97%);
                color: #fff;
                font-size: 34px;
                border: none;
                padding: 15px 30px 20px 30px;
                letter-spacing: .7px;
                font-weight: 300;
                font-family: "Noto Sans JP";
                display: inline-block;
                border-radius: 13px;
                box-shadow: 0 5px 6px 1px #ddd;
                border-top: 3px hsl(120deg 81.29% 86.99%) solid;
                cursor: pointer;
                
                &:hover {
                    animation-name: fa-beat;
                    animation-duration: 1s;
                    animation-iteration-count: infinite;
                }
            }
        }
    }
    
    a {
        color: #0a003c;
    }
</style>
