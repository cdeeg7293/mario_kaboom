 kaboom({
     global: true,
     fullscreen: true,
     scale: 1,
     debug: true,
     clearColor: [0, 0, 0, 1],
})

// global variables
const MOVE_SPEED = 120
const JUMP_FORCE = 360

loadRoot('/sprites/')
loadSprite('coin', 'super-mario-coin.png')
loadSprite('evil-shroom', 'super-mario-evil-shroom.png')
loadSprite('brick', 'super-mario-block.png')
loadSprite('block', 'super-mario-block.png')
loadSprite('mario', 'super-mario-mario-sprite.png')
loadSprite('mushroom', 'super-mario-mushroom.png')
loadSprite('surprise', 'super-mario-surprise.png')
loadSprite('unboxed', 'super-mario-unboxed.png')
loadSprite('pipe-top-left', 'pipe-top-left.png')
loadSprite('pipe-top-right', 'pipe-top-right.png')
loadSprite('pipe-bottom-left', 'pipe-bottom-left.png')
loadSprite('pipe-bottom-right', 'pipe-bottom-right.png')

scene("game", () => {   
    layers(['bg', 'obj', 'ui'], 'obj')

    const map = [
        '                                               ',
        '                                               ',
        '                                               ',
        '                                               ',
        '                                               ',
        '                                               ',
        '                                               ',
        '                                               ',
        '    %     =*=%=                                     ',
        '                     ^    ^   -+                   ',
        '                              ()                  ',
        '================================    ===========',
    ]

    const levelCfg = {
        width: 20,
        height: 20,
        '=': [sprite('block'), solid()],
        '$': [sprite('coin')],
        '%': [sprite('surprise'), solid(), 'coin-surprise'],
        '*': [sprite('surprise'), solid(), 'mushroom-surprise'],
        '}': [sprite('unboxed'), solid()],
        '(': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
        ')': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
        '-': [sprite('pipe-top-left'), solid(), scale(0.5)],
        '+': [sprite('pipe-top-right'), solid(), scale(0.5)],
        '^': [sprite('evil-shroom'), solid()],
        '#': [sprite('mushroom'), solid()],
    }

    const gameLevel = addLevel(map, levelCfg);

    const scoreLabel = add([
        text('score'),
        pos(30, 6),
        layer('ui'),
        {
            value: 'test',
        }
    ])

    add([text('level ' + 'test', pos(4,6))])

    function big() {
        let timer = 0;
        let isBig = false;
        return {
            update() {
                if(isBig) {
                    timer -=dt()
                    if (timer <= 0) {
                        this.smallify()
                    }
                }
            },
            isBig() {
                return isBig
            },
            smallify() {
                this.scale = vec2(1, 1)
                timer = 0
                isBig = false
            },
            biggify() {
                this.scale = vec2(2)
                timer = time
                isBig = true
            }
        }
    }

    const player = add([
        sprite('mario'), solid(),
        pos(30, 0),
        body(),
        big(),
        origin('bot')
    ])
    //player event handlers

    keyDown('left', () => {
        player.move(-MOVE_SPEED, 0)
    })

    keyDown('right', () => {
        player.move(MOVE_SPEED, 0)
    })

    keyPress('up', () => {
        if(player.grounded()) {
            player.jump(JUMP_FORCE)
        }
    })

})

start("game")