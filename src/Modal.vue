<template>
    <div class="modal-container">
        <div class="modal" v-bind="$attrs">
            <div class="content">
                <div>
                    <slot></slot>
                </div>
            </div>
            <div class="buttons">
                <div class="button" @keydown="$emit('okay')" @click="$emit('okay')">Okay</div>
            </div>
        </div>
    </div>
</template>

<script setup>
    defineEmits(['okay']);
</script>

<style scoped lang="scss">
    .modal-container {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #ffffff94;
        backdrop-filter: blur(2px);

        .modal {
            width: 700px;

            border-width: 6px 3px 3px 2px;
            border-style: solid;
            border-radius: 10px;

            border-top-color: #30b0ae;
            border-right-color: #299795;
            border-bottom-color: #299795;
            border-left-color: #299795;
            
            box-shadow: 0 -2px 0 #90d9d980,
                        0 -6px 0 #3ec8c6,
                        0 4px 0 #217c7b,
                        0 5px 6px 1px #888;

            background-color: #30b0ae;
            
            &.panic {
                border-top-color: #f37540;
                border-right-color: #d74e16;
                border-bottom-color: #d74e16;
                border-left-color: #f37540;

                box-shadow: 0 -2px 0 rgb(255 225 194 / 50%),
                0 -6px 0 #e79170,
                0 4px 0 #a64920,
                0 5px 6px 1px #888;

                background-color: #f86427;
                
                .buttons {
                    .button {
                        color: hsl(17.51deg 93.72% 56.27%);
                        background-color: #eee;

                        &:hover {
                            background-color: #fff;
                            box-shadow: 0 -4px 0 hsl(6 73% 83%);
                        }

                        &:active {
                            box-shadow: none;
                            background-color: #eee;
                            transform: scale(0.95);
                        }
                    }
                }
            }
            
            .content {
                padding: 10px 15px;
                
                & > div {
                    color: #fff;
                    font-weight: 400;
                    letter-spacing: .5px;
                    font-size: 24px;
                    text-align: center;
                    line-height: 40px;
                }
            }

            .buttons {
                display: flex;
                align-items: center;
                flex-direction: column;
                padding: 15px 0;

                .button {
                    user-select: none;
                    display: inline-block;
                    padding: 0px 35px 5px 35px;
                    background-color: hsl(6.15deg 72.67% 68.43%);
                    border-radius: 8px;
                    color: hsl(6 103% 118% / 1);
                    font-size: 24px;
                    box-shadow: 0 -4px 0 hsl(6 73% 78%), 0 4px 4px -1px #6a6a6aa1;
                    cursor: pointer;
                    
                    &:hover {
                        background-color: hsl(6.15deg 72.67% 70.43%);
                        box-shadow: 0 -4px 0 hsl(6 73% 83%);
                    }
                    
                    &:active {
                        box-shadow: 0 -2px 0 hsl(6 73% 78%);
                        background-color: hsl(6.15deg 72.67% 65.43%);
                        transform: scale(0.95);
                    }
                }
            }
        }
    }
</style>