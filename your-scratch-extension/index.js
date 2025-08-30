const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const TargetType = require('../../extension-support/target-type');

class Scratch3XboxController {
    constructor(runtime) {
        this.runtime = runtime;

        // initial states
        this.buttonStates = {
            A: false,
            B: false,
            X: false,
            Y: false,
            Up: false,
            Down: false,
            Left: false,
            Right: false
        };

        this.axisStates = {
            LX: 0, // left stick X
            LY: 0, // left stick Y
            RX: 0, // right stick X
            RY: 0  // right stick Y
        };

        // If you use TurboWarp, you could poll navigator.getGamepads() here
        // Example:
        // setInterval(() => this.updateGamepad(), 50);
    }

    getInfo() {
        return {
            id: 'xboxController',
            name: 'Xbox Controller',
            color1: '#00aaff',
            color2: '#005577',
            blockIconURI: '',
            menuIconURI: '',
            blocks: [
                {
                    opcode: 'isButtonPressed',
                    blockType: BlockType.BOOLEAN,
                    text: 'button [BUTTON] pressed?',
                    arguments: { BUTTON: { type: ArgumentType.STRING, defaultValue: 'A', menu: 'buttons' } },
                    filter: [TargetType.SPRITE, TargetType.STAGE]
                },
                {
                    opcode: 'axisValue',
                    blockType: BlockType.REPORTER,
                    text: '[AXIS] axis value',
                    arguments: { AXIS: { type: ArgumentType.STRING, defaultValue: 'LX', menu: 'axes' } },
                    filter: [TargetType.SPRITE, TargetType.STAGE]
                }
            ],
            menus: {
                buttons: ['A', 'B', 'X', 'Y', 'Up', 'Down', 'Left', 'Right'],
                axes: ['LX', 'LY', 'RX', 'RY']
            }
        };
    }

    isButtonPressed({ BUTTON }) {
        return this.buttonStates[BUTTON] || false;
    }

    axisValue({ AXIS }) {
        return this.axisStates[AXIS] || 0;
    }

    // Only works in TurboWarp / unsandboxed
    updateGamepad() {
        const gamepads = navigator.getGamepads();
        if (!gamepads[0]) return;
        const gp = gamepads[0];

        // Buttons
        this.buttonStates.A = gp.buttons[0].pressed;
        this.buttonStates.B = gp.buttons[1].pressed;
        this.buttonStates.X = gp.buttons[2].pressed;
        this.buttonStates.Y = gp.buttons[3].pressed;
        this.buttonStates.Up = gp.buttons[12].pressed;
        this.buttonStates.Down = gp.buttons[13].pressed;
        this.buttonStates.Left = gp.buttons[14].pressed;
        this.buttonStates.Right = gp.buttons[15].pressed;

        // Axes
        this.axisStates.LX = gp.axes[0];
        this.axisStates.LY = gp.axes[1];
        this.axisStates.RX = gp.axes[2];
        this.axisStates.RY = gp.axes[3];
    }
}

module.exports = Scratch3XboxController;
