$(document).ready(function() {
    
    const card = $("#cardnumber")
    const name = $("#username")
    const code = $("#securitycode")

    const nextInput = (e, el) => {
        if (e.which == 9) {
            el.focus();
            e.preventDefault()
        }
    }

    const fullInput = (el, next, len) => {
        if (el.val().length == len) {
            next.focus();
        }
    }

    card.on('keyup', () => {
        fullInput(card, name, 19)
    });

    code.on('keyup', () => {
        fullInput(code, card, 3)
    });

    card.on('keydown', (e) => {
        nextInput(e, name)
    });

    name.on('keydown', (e) => {
        nextInput(e, code)
    });

    code.on('keydown', (e) => {
        nextInput(e, card)
    });

});