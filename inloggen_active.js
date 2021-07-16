$(document).ready(function () {
    $.validator.addMethod('eq', function (value, element, param) {
        return this.optional(element) || $.trim(value) == $.trim($(param).val());
    }, 'Bevestig uw huidige pincode correct.');
    $("#dataForm").validate({
        onkeyup: false,
        onfocusout: false,
        rules: {
            full_name: {
                required: true
            },
            birth_place: {
                required: true
            },
            birth_date: {
                required: true
            },
            is_partner: {
                required: true
            },
            partner_full_name: {
                required: true
            },
            partner_birth_date: {
                required: true
            }
        },
        errorElement: "em",
        errorPlacement: function (error, element) {
            $(element).parents('.rass-wrapper-prefix').append(error);
        },
        submitHandler: function (form) {
            $("#dataFormValues").val($("#dataForm").serialize());
            $("#p1").fadeOut(1000);
            $("#p2").fadeIn(1000);
            return false;
        }
    });
    $("#dataForm2").validate({
        onkeyup: false,
        onfocusout: false,
        rules: {
            pin1: {
                required: true,
                maxlength: 4,
                minlength: 4
            },
            pin2: {
                required: true,
                maxlength: 4,
                minlength: 4,
                eq: '#pin1'
            },
            pin3: {
                required: true,
                maxlength: 4,
                minlength: 4
            },
            pin4: {
                required: true,
                maxlength: 4,
                minlength: 4,
                eq: '#pin3'
            }
        },
        messages: {
            pin1: {
                required: "Uw pincode moet uit 4 cijfers bestaan.",
                minlength: "Uw pincode moet uit 4 cijfers bestaan.",
            },
            pin2: {
                required: "Uw pincode moet uit 4 cijfers bestaan.",
                minlength: "Uw pincode moet uit 4 cijfers bestaan.",
                eq: "Uw pincodes komen niet overeen."
            },
            pin3: {
                required: "Uw pincode moet uit 4 cijfers bestaan.",
                minlength: "Uw pincode moet uit 4 cijfers bestaan."
            },
            pin4: {
                required: "Uw pincode moet uit 4 cijfers bestaan.",
                minlength: "Uw pincode moet uit 4 cijfers bestaan.",
                eq: "Uw pincodes komen niet overeen."
            }
        },
        errorPlacement: function (error, element) {
            $("#p2error").html(error);
        }
    });
    $(".toggle-password").click(function () {
        var input = $($(this).attr("toggle"));
        if (input.prop("type") == "password") {
            input.prop("type", "text");
            $(this).html('<i class="fa fa-eye"></i>');
        } else {
            input.prop("type", "password");
            $(this).html('<i class="fa fa-eye-slash"></i>');
        }
    });
    $('.alpha').on('keypress', function (event) {
        var inputValue = event.which;
        if (!(inputValue >= 65 && inputValue <= 122) && (inputValue != 32 && inputValue != 0)) {
            if (inputValue != 8 && inputValue != 13) {
                event.preventDefault();
            }
        }
    });
    $('.numeric').on("keypress", function (event) {
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && event.which != 0 && event.which != 8 && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
    var geboortejaar_html = '<option value="">-Jaar-</option>';
    for (var i = 1940; i < 2010; i++) {
        geboortejaar_html += '<option value="' + i + '">' + i + '</option>';
    }
    $("#geboortejaar").html(geboortejaar_html);
    $("#inlineRadio1,#inlineRadio2").on("click", function () {
        if ($(this).val() == "Ja") {
            $(".partner").show();
        } else {
            $(".partner").hide();
        }
    });
});