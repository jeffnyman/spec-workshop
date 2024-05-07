import "../styles/site.css";

import $ from "jquery";

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
});
