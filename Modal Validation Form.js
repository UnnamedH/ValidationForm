$(document).ready(function(){
    //login tab listener, login tab change color to white 
    function setError(inputBox,ErrorMessage){
        var parent = inputBox.parent();
        var small = parent.find("small");
        small.text(ErrorMessage);
        small.css("visibility","visible");
        inputBox.css("border-color","#e74c3c");
        var circleElementPositive =  parent.find(".circle__element__positive");
        circleElementPositive.css("visibility","hidden");
        var circleElementNegative = parent.find(".circle__element__negative");
        circleElementNegative.css("visibility","visible");
    }

    function setCheckMarkUp(inputBox){
        inputBox.css("border-color","#2ecc71");
        var parent = inputBox.parent();
        var circleElementNegative =  parent.find(".circle__element__negative");
        circleElementNegative.css("visibility","hidden");
        var circleElementPositive = parent.find(".circle__element__positive");
        circleElementPositive.css("visibility","visible");
    }

    $(".login").click(function(){
        $(".signup").css("background","#e9eaea")
        $(".login").css("background","#fff");
        $(".sign_up_form").css("display","none");
        $(".log_in_form").css("display","block");
    });

    $(".signup").click(function(){
        $(".login").css("background","#e9eaea")
        $(".signup").css("background","#fff");
        $(".log_in_form").css("display","none");
        $(".sign_up_form").css("display","block");
    });

    function fillTheTable(arrayData){
        $(".table__user__data").append("Username: ",arrayData[0],"<br>");
        $(".table__user__data").append("Email: ",arrayData[1],"<br>");
        $(".table__user__data").append("Password: ",arrayData[2],"<br>");
        $(".table__user__data").show();
    }
    $("#validation-form-sign").submit(function(e){
    //e.preventDefault();
    var name = $("#username").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var form = $("#validation-form");
    var passwordLength = 10;
    var value = true;
    var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        $(".error").css("visibility","hidden");
        if(name.length < 1){
            setError($("#username"), "The field is required");
            value = false; 
            e.preventDefault();
        }
        else{
            if(name.length < 6){
                setError($("#username"), "Username must be atleast 6 characters!");
                value = false; 
                e.preventDefault();
            }
            else{
                setCheckMarkUp($("#username"));   
            }
        }
        if(email.length < 1){
            setError($("#email"), "The field is required");
            value = false;
            e.preventDefault();
        }
        else{
            var validEmail = regEx.test(email);
            if(!validEmail){
                setError($("#email"),"The email is invalid!");
                value = false;
                e.preventDefault();
            }
            else{
                setCheckMarkUp($("#email"));  
            }
        }
        if(password.length < passwordLength){
            setError($("#password"),"Password must be atleast 10 characters!");
            value = false;
            e.preventDefault();
        }
        else{
            setCheckMarkUp($("#password"));  
        }
        //getDataFromForm(form,value);

    });

    $("#validation-form-login").submit(function(e){
        var name = $("#username_login").val();
        var password = $("#password_login").val();
        var passwordLength = 10;
        var value = true;
        $(".error").css("visibility","hidden");
        if(name.length < 1){
            setError($("#username_login"), "The field is required");
            value = false; 
            e.preventDefault();
        }
        else{
            if(name.length < 6){
                setError($("#username_login"), "Username must be atleast 6 characters!");
                value = false; 
                e.preventDefault();
            }
            else{
                setCheckMarkUp($("#username_login"));
            }
        }
        if(password.length < passwordLength){
            setError($("#password_login"),"Password must be atleast 10 characters!");
            value = false;
            e.preventDefault();
        }
        else{
            setCheckMarkUp($("#password_login"));  
        }
    });

});