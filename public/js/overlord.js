trigger = {
  stack: [],

  activate: function () {
    code = this.activated_code();

    if (!code || 0 === code.length) {
      code = $("#trigger-code").val();
    }

    $.post("/set/" + timer.time, function () {
      window.location = "/enter/" + code;
    });
  },

  activated_code: function () {
    return this.stack.join("");
  },

  update_display: function () {
    $("#trigger-code").val(this.activated_code());
    if (this.stack.length < 4) {
      $("#trigger-code-display").addClass("has-error");
    } else {
      $("#trigger-code-display").removeClass("has-error");
    }
  },

  keypad: function (code) {
    if (this.stack.length < 4) {
      this.stack.push(code);
      this.update_display();
    }
  },

  delete: function () {
    this.stack.pop();
    this.update_display();
  },

  reset: function () {
    window.location = "/overlord";
  },
};

timer = {
  time: 0,

  start: function () {
    setInterval(function () {
      timer.updateTimeDisplay(timer.time - 1);
    }, 1000);
  },

  padTime: function (value, count, fill) {
    var buffer = "" + value;

    for (var idx = buffer.length; idx < count; idx++) {
      buffer = fill + buffer;
    }

    return buffer;
  },

  timeDisplay: function () {
    var minutes = this.padTime(Math.floor(this.time / 60), 2, "0");
    var seconds = this.padTime(this.time % 60, 2, "0");

    return minutes + ":" + seconds;
  },

  updateDisplay: function () {
    $("#timer-output").val(this.timeDisplay());
  },

  updateTimeDisplay: function (time) {
    this.time = time;

    if (time < 0) {
      window.location.reload();
    }

    this.updateDisplay();
  },
};

$(document).ready(function () {
  $("#provision-bomb-form").validate({
    rules: {
      activation_code: {
        required: true,
        digits: true,
        minlength: 4,
        maxlength: 4,
      },
      deactivation_code: {
        required: true,
        digits: true,
        minlength: 4,
        maxlength: 4,
      },
      countdown_value: {
        required: true,
        digits: true,
        min: 1,
        minlength: 1,
        maxlength: 4,
      },
    },
    messages: {
      activation_code: {
        required: "You must provide an activation code.",
        digits: "The activation code must be numeric.",
        minlength: "The activation code must be four numeric characters.",
        maxlength: "The activation code must be four numeric characters.",
      },
      deactivation_code: {
        required: "You must provide an deactivation code.",
        digits: "The deactivation code must be numeric.",
        minlength: "The deactivation code must be four numeric characters.",
        maxlength: "The deactivation code must be four numeric characters.",
      },
      countdown_value: {
        required: "A countdown must be supplied.",
        digits: "The countdown value must be a whole number.",
        min: "The countdown must be at least one second.",
        minlength: "The countdown must be a numeric value.",
        maxlength: "The countdown must be a numeric value.",
      },
    },
  });

  var time_remaining = parseInt($("#timer-countdown").val());

  timer.updateTimeDisplay(time_remaining);

  $("#trigger button").click(function (e) {
    var code = e.target.getAttribute("data-value");
    trigger.keypad(code);
  });

  $("#trigger-deleter").click(function (e) {
    trigger.delete();
  });

  $("#change-bomb-state").click(function (e) {
    trigger.activate();
  });

  $("#reset-bomb-state").click(function (e) {
    trigger.reset();
  });

  if ($("#timer-started").val() == "true") {
    timer.start();
  }
});
