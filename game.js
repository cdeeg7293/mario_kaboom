 kaboom({
     global: true,
     fullscreen: true,
     scale: 1,
     debug: true,
     clearColor: [0, 0, 0, 1],
})

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
        '                                               ',
        '                                               ',
        '                                               ',
        '================================    ===========',
    ]

    const levelCfg = {
        width: 20,
        height: 20,
        '=': [sprite('block', solid())]
    }

    const gameLevel = addLevel(map, levelCfg);

})

start("game")