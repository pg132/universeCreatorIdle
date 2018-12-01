function startHotkeys() {
  Mousetrap.bind("m", maxAll)
  Mousetrap.bind("w", function() {
    gravityWell(false)
  })
  Mousetrap.bind("p", function() {
    gravityPulse(false)
  })
  Mousetrap.bind("g", buyMaxAllGE)
  for (i = 1; i < 10; i++) {
    eval("Mousetrap.bind('" + i.toString() + "'" + ",function() { buyMaxMK(" + i.toString() + ", false) } )")
  }
  Mousetrap.bind("s", function() {
    sacPulses(1)
  })
  Mousetrap.bind("r", function() {
    // Future buy ripple script here
  })
  Mousetrap.prototype.stopCallback = function(e, element, combo, sequence) {
    return element.tagName == 'INPUT' || element.tagName == 'SELECT' || element.tagName == 'TEXTAREA' || (element.contentEditable && element.contentEditable == 'true') || (!user.options.hotkeys);
  };
}