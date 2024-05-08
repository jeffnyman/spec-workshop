import "../styles/site.css";

import $ from "jquery";
import "jquery-validation";

interface Trigger {
  resetDevice: () => void;
}

const trigger: Trigger = {
  resetDevice: function () {
    console.log("Resetting device.");
  },
};

$(document).ready(function () {
  console.log("Spec Workshop");

  let activation_code: string;
  let deactivation_code: string;
  let countdown: string;

  $("#provision-device").click(function () {
    activation_code = $("#activation-value").val() as string;
    deactivation_code = $("#deactivation-value").val() as string;
    countdown = $("#countdown-value").val() as string;

    console.log(`DEBUG: activation code: ${activation_code}`);
    console.log(`DEBUG: deactivation code: ${deactivation_code}`);
    console.log(`DEBUG: coutdown: ${countdown}`);

    $("#provision-device").prop("disabled", true);
    $("#trigger").removeClass("hidden");
  });

  $("#reset").click(function () {
    trigger.resetDevice();
  });

  $("form[name='provision-device-form']").validate({
    rules: {
      activation_value: {
        required: true,
        digits: true,
        minlength: 4,
        maxlength: 4,
      },
      deactivation_value: {
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
      activation_value: {
        required: "You must provide an activation code.",
        digits: "The activation code must be numeric.",
        minlength: "The activation code must be four numeric characters.",
        maxlength:
          "The activation code cannot be more than four numeric characters.",
      },
      deactivation_value: {
        required: "You must provide a deactivation code.",
        digits: "The deactivation code must be numeric.",
        minlength: "The deactivation code must be four numeric characters.",
        maxlength:
          "The deactivation code cannot be more than four numeric characters.",
      },
      countdown_value: {
        required: "A countdown value must be supplied.",
        digits: "The countdown value must be a whole number.",
        min: "The countdown value must be at least one second.",
        minlength: "The countdown value must be a numeric value.",
        maxlength: "The countdown value must be a numeric value.",
      },
    },
  });

  $("input").blur(function () {
    if (!$(this).valid()) {
      $(this).focus();
      return false;
    }
  });
});
