function startHotkeys() {
    Mousetrap.bind("M",maxAll)
    Mousetrap.bind("W",function() { gravityWell(false) })
    Mousetrap.bind("P",function() { gravityPulse(false) })
    Mousetrap.bind("G",function() {
        // Future buy max GE script here
    })
    for (i=1;i<10;i++) {
        eval("Mousetrap.bind('"+i.toString()+"'"+",function() { buyMaxMK("+i.toString()+", false) } )")
    }
    Mousetrap.bind("S",function() { sacPulses(1) })
    Mousetrap.bind("R",function() {
        // Future buy ripple script here
    })
    Mousetrap.prototype.stopCallback = function (e, element, combo, sequence) {
        return element.tagName == 'INPUT' || element.tagName == 'SELECT' || element.tagName == 'TEXTAREA' || (element.contentEditable && element.contentEditable == 'true') || (!user.options.hotkeys);
    };
}