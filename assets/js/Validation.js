$(document).ready(function() {
    
    const button = $("#button");
    const errors = [0, 0, 0, 0, 0];
    const imageCard = $('#ccicon')
    var clickButton = 0;
    const inputs = [
        $("#cardnumber"), 
        $("#month").find($(".select")), 
        $("#year").find($(".select")),
        $("#username"), 
        $("#securitycode")
    ]
    const forErrors = [
        $("#cardnumber").next().children(".error-text"), 
        $("#year").parent().next().children(".error-text"), 
        $("#year").parent().next().children(".error-text"),
        $("#username").next().children(".error-text"), 
        $("#securitycode").parent().next().children(".error-text"), 
    ]
    const listErorrs = [
        ["", "Empty field", "Incomplete field"],
        ["", "Empty field", "Invalid expiration date"],
        ["", "Empty field", "Invalid expiration date"],
        ["", "Empty field", "Incomplete field"],
        ["", "Empty field", "Incomplete field", "Invalid cvc/cvv"]
    ]

    const emptyField = (i) => {
        inputs[i].val().length == 0 ? errors[i] = 1 : errors[i] = 0
    }

    const unBlockButton = () => {
        for (i = 0; i < inputs.length; i++) {
            if (errors[0] == 0 && errors[1] == 0 && errors[2] == 0 && errors[3] == 0 && errors[4] == 0) {
                button.attr('disabled', false)
            }
        }
    }

    const fullField = (i, len) => {
        if (errors[i] == 0) {
            inputs[i].val().length != len ? errors[i] = 2 : errors[i] = 0
        }
    }

    const hideError = (i) => {
        forErrors[i].removeClass('show')
        inputs[i].removeClass("error")
    }

    const showError = (i) => {
        if (clickButton == 1 && errors[i] != 0) {
            forErrors[i].addClass('show')
            inputs[i].addClass("error")
            forErrors[i].html(listErorrs[i][errors[i]])
            if (errors[0] != 0) {
                imageCard.addClass('hide')
            }
        }
    }

    const showErrorSelector = () => {
        setTimeout(() => {
            if (clickButton == 1 ) {
                if (errors[1] != 0 || errors[2] != 0) {
                    $("#month").addClass("error")
                    $("#year").addClass("error")
                    forErrors[2].addClass('show')
                    if (errors[1] == 2 || errors[2] == 2) {
                        forErrors[2].html(listErorrs[2][errors[2]])
                    }
                }
                if (errors[1]  == 0 && errors[2] == 0) {
                    $("#month").removeClass("error")
                    $("#year").removeClass("error")
                }
            }
        }, 100);
    }

    const hideErrorSelector = (i, el) => {
        inputs[i].removeClass('error')
        forErrors[i].removeClass('show')
        el.removeClass("error")
    }

    const checkDate = () => {
        if (inputs[2].val() == new Date().getFullYear()) {
            if (inputs[1].val() > 0 && inputs[1].val() < new Date().getMonth() + 1) {
                errors[1] = 2;
                errors[2] = 2;
            }
        } if (inputs[2].val() > new Date().getFullYear() && inputs[1].val() > 0) {
            errors[1] = 0;
            errors[2] = 0;
        } if (inputs[2].val() == new Date().getFullYear() && inputs[1].val() >= new Date().getMonth() + 1) {
            errors[1] = 0;
            errors[2] = 0;
        } 
    }

    const useForm = () => {
        sum = eval(errors.join("+"));
        if (sum == 0) {
            button.attr('form', 'pay')
        }
        console.log(sum)
    }

    inputs[0].on('keyup', () => {
        emptyField(0)
        fullField(0, 19)
        unBlockButton()
    });

    $("#month").siblings($(".optionals")).children().on('click', () => {
        emptyField(1)
        unBlockButton()
        checkDate()
        showErrorSelector()
    })
    $("#month").on('blur', () => {
        emptyField(1)
        checkDate()
        showErrorSelector()
    });
    inputs[1].on('blur', () => {
        emptyField(1)
        checkDate()
        showErrorSelector()
    });

    $("#year").siblings($(".optionals")).children().on('click', () => {
        emptyField(2)
        unBlockButton()
        checkDate()
        showErrorSelector()
    })
    $("#year").on('blur', () => {
        emptyField(2)
        checkDate()
        showErrorSelector()
    });
    inputs[2].on('blur', () => {
        emptyField(2)
        checkDate()
        showErrorSelector()
    });

    $("#month").on('focus', () => {hideErrorSelector(1, $("#month"))});
    inputs[1].on('focus', () => {hideErrorSelector(1, $("#month"))});

    $("#year").on('focus', () => {hideErrorSelector(2, $("#year"))});
    inputs[2].on('focus', () => {hideErrorSelector(2, $("#year"))});
    
    inputs[3].on('keyup', () => {
        emptyField(3)
        unBlockButton()
    });

    inputs[4].on('keyup', () => {
        emptyField(4)
        fullField(4, 3)
        if (inputs[4].val() == 666) {
            errors[4] = 3
        }
        unBlockButton()
    });

    inputs[3].on('keydown', (e) => {
        if(e.key.match(/[^a-za-Я\s]/gi)) {
            return e.preventDefault()
        };
    });

    inputs[0].on('focus', () => {
        hideError(0)
        imageCard.removeClass('hide')
    });

    inputs[3].on('focus', () => {
        hideError(3)
    });

    inputs[4].on('focus', () => {
        hideError(4)
    });

    inputs[0].on('blur', () => {
        showError(0)
    });

    inputs[3].on('blur', () => {
        showError(3)
    });

    inputs[4].on('blur', () => {
        showError(4)
    });

    button.on('click', () => {
        clickButton = 1;
        for (i = 0; i < errors.length; i++) {
            if (inputs[i].val().length == 0) {
                button.attr('disabled', true)
                errors[i] = 1;
            }
            if (errors[i] != 0) {
                button.attr('disabled', true)
                forErrors[i].addClass('show')
                forErrors[i].html(listErorrs[i][errors[i]])
                inputs[i].addClass("error")
                if (errors[0] != 0) {
                    imageCard.addClass('hide')
                }
                if (errors[1] != 0 || errors[2] != 0) {
                    $("#month").addClass("error")
                    $("#year").addClass("error")
                    if (errors[1] == 1 && errors[2] == 0) {
                        forErrors[2].addClass('show')
                    }
                }
            } else {
                forErrors[i].removeClass('show')
                inputs[i].removeClass('error')
                if (errors[1] == 0 || errors[2] == 0) {
                    $("#month").removeClass("error")
                    $("#year").removeClass("error")
                }
            }
        }
        useForm()
    });
});