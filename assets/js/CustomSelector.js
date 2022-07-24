$(document).ready(function() {
    
    const selectorMonth = $("#month");
    const headSelectorMonth = selectorMonth.find($(".select"));
    const optionsMonth = selectorMonth.siblings($(".optionals"));
    const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

    const selectorYear = $("#year");
    const headSelectorYear = selectorYear.find($(".select"));
    const optionsYear = selectorYear.siblings($(".optionals"));
    const year = []

    for (i = 0; i < 11; i++) {
        year.push(new Date().getFullYear() + i) 
    }

    const fillSelector = (el, array) => {
        $.each(array, (index, value) => {
            $('<p/>', {'text': value}).appendTo(el);
        });
    }

    const checkSelect = (head, el, array) => {
        for (var i = 0; i < array.length; i++) {
            if (head.val() == array[i]) {
                el.children().removeClass('selected')
                el.children().eq(i).addClass('selected')
            }
        }
    }

    const toggleSelector = (el) => {
        el.children().next().toggleClass('rot-180');
        el.next().toggleClass('open')
        el.toggleClass('open')
    }

    const deleteClass = (el) => {
        el.children().next().removeClass('rot-180');
        el.next().removeClass('open')
        el.removeClass('open')
    }

    fillSelector(optionsMonth, month)
    checkSelect(headSelectorMonth, optionsMonth, month)
    fillSelector(optionsYear, year)
    checkSelect(headSelectorYear, optionsYear, year)

    selectorMonth.on('click', () => {
        toggleSelector(selectorMonth)
    });

    optionsMonth.children().on('click', (e) => {
        headSelectorMonth.val(e.target.innerHTML)
        toggleSelector(selectorMonth)
        checkSelect(headSelectorMonth, optionsMonth, month)
    });

    selectorYear.on('click', () => {
        toggleSelector(selectorYear)
    });

    optionsYear.children().on('click', (e) => {
        headSelectorYear.val(e.target.innerHTML)
        toggleSelector(selectorYear)
        checkSelect(headSelectorYear, optionsYear, year)
    });

    $(document).click(function (e) {
        const target = $(e.target)
        if (!target.closest('#month').length && !target.closest('.optionals').length) {
            deleteClass(selectorMonth)
        }
        if (!target.closest('#year').length && !target.closest('.optionals').length) {
            deleteClass(selectorYear)
        }
    });
    
});