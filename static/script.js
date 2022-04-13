var passError = document.getElementById("pass-error");
var emailError = document.getElementById("email-error");
var mainError = document.getElementById("main-error");

var signupEmailError = document.getElementById("signup-email-error");
var signupPass1Error = document.getElementById("signup-pass-error1");
var signupPass2Error = document.getElementById("signup-pass-error2");

var loginForm = document.getElementById("login");
var signupForm = document.getElementById("signup");
var forgotForm = document.getElementById("forgot");

var forgotBTN = document.getElementById("forgotBtn");

var Pass = document.getElementById("pass");
var Email = document.getElementById("email");

var SignupEmail = document.getElementById("signup-email");
var Pass1 = document.getElementById("pass1");
var Pass2 = document.getElementById("pass2");

var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

var Scount = 0;

var VerifyText = document.getElementById("verifyText");

document.addEventListener("DOMContentLoaded", function() {
    var elements = document.getElementsByTagName("INPUT");
    for (var i = 0; i < elements.length; i++) {
        elements[i].oninvalid = function(e) {
            e.target.setCustomValidity("");
            if (!e.target.validity.valid) {
                e.target.setCustomValidity(" ");
            }
        };
        elements[i].oninput = function(e) {
            e.target.setCustomValidity("");
        };
    }
})

function ToForgot(){
    
  loginForm.className = "form--hidden";
	forgotForm.className = "form";
  signupForm.className = "form--hidden";
	forgotBTN.className = "forgot--hidden";

}

function ToSignup(){

	loginForm.className = "form--hidden";
	forgotForm.className = "form--hidden";
  signupForm.className = "form";
	forgotBTN.className = "forgot--hidden";

}

function ToLogin(){

  loginForm.className = "form";
	forgotForm.className = "form--hidden";
  signupForm.className = "form--hidden";
	forgotBTN.className = "forgot";
  
}

function FPass(){

	VerifyText.innerHTML = "Forgot password?";

	VerifyText.style.animation = "FPassAnim 300ms ease";

	setTimeout(function(){  VerifyText.style.opacity = "1";  }, 290);

}

function DFPass(){

	VerifyText.style.animation = "DFPassAnim 300ms ease";
	
	setTimeout(function(){  VerifyText.style.opacity = "0";  }, 290);

}

function FUser(){

	VerifyText.innerHTML = "Forgot username?"

	VerifyText.style.animation = "FUserAnim 300ms ease";

	setTimeout(function(){  VerifyText.style.opacity = "1";  }, 290);

}

function DFUser(){

	VerifyText.style.animation = "DFUserAnim 300ms ease";

	setTimeout(function(){  VerifyText.style.opacity = "0";  }, 290);

}

// Login Input Check

function CheckEmail(){
		
	if(Email.value == '')
		{
			emailError.innerHTML = "Enter an Email";

		}else if(!filter.test(Email.value))
		{
			emailError.innerHTML = "Enter a valid Email";

		}else{
			emailError.innerHTML = "";
		}

		Loop();

}

function CheckPass(){

	if(Pass.value == '')
		{
      passError.innerHTML = "Enter a Password";

		}else if (Pass.value.length >= 1){
			passError.innerHTML = "";
		}

		Loop();

}

async function LoginSubmit(){

	if(Email.value == '')
		{
			emailError.innerHTML = "Enter an Email";
			

		}

	if(Pass.value == '')
		{
      passError.innerHTML = "Enter a Password";

		}
}

function Loop(){

	var Emailcontent = document.getElementById("email-error").textContent;
	var Passcontent = document.getElementById("pass-error").textContent;

	if(Emailcontent == "" && Passcontent == ""){

		const DSubmit = document.getElementById("disableSubmit");

		DSubmit.style.animation = "disableDisable 500ms ease";

		setTimeout(function(){ DSubmit.style.opacity = "0"; DSubmit.style.pointerEvents = "none"; }, 500);

	}else{

		const DSubmit = document.getElementById("disableSubmit");

		DSubmit.style.pointerEvents = "auto";

		DSubmit.style.animation = "enableDisable 500ms ease";

		setTimeout(function(){ DSubmit.style.opacity = ".75"; }, 500);

	}

	var Emailcontent1 = document.getElementById("signup-email-error").textContent;
	var Passcontent2 = document.getElementById("signup-pass-error1").textContent;
	var Passcontent3 = document.getElementById("signup-pass-error2").textContent;

	if(Passcontent3 == "" && Passcontent2 == "" && Emailcontent1 == ""){

		const vDSubmit = document.getElementById("disableRegister");

		vDSubmit.style.animation = "disableDisable 500ms ease";

		setTimeout(function(){ vDSubmit.style.opacity = "0"; vDSubmit.style.pointerEvents = "none"; }, 500);

	}else{

		const vDSubmit = document.getElementById("disableRegister");

		vDSubmit.style.pointerEvents = "auto";

		vDSubmit.style.animation = "enableDisable 500ms ease";

		setTimeout(function(){ vDSubmit.style.opacity = ".75"; }, 500);

	}

}

// register input check

function CheckSignupEmail(){

	if(SignupEmail.value == '')
		{
			signupEmailError.innerHTML = "Enter an Email";

		}else if(!filter.test(SignupEmail.value))
		{
			signupEmailError.innerHTML = "Enter a valid Email";

		}else{
			signupEmailError.innerHTML = "";
		}

		Loop();

}

function CheckPass1(){

	if(Pass1.value == '')
		{
			signupPass1Error.innerHTML = "Enter a Password";

		}else if(Pass1.value.length <= 8)
		{
			signupPass1Error.innerHTML = "Password must have at least 8 characters";

		}else{
			signupPass1Error.innerHTML = "";
		}

		Loop();

}

function CheckPass2(){

   if (Pass1.value != Pass2.value){

		signupPass2Error.innerHTML = "Passwords don't match";

	} else if (Pass1.value == Pass2.value){

		signupPass2Error.innerHTML = "";

	}

	Loop();

}

var msgFromServer;

$( "#signup" ).on( "submit", function(e) {
 
	var dataString = $(this).serialize();

	Scount++;

	$.ajax({
		type: "POST",
		url: "/signup",
		data: dataString,
		success: function () {

			if (msgFromServer == "Email Already Exists"){
				document.getElementById("signupMessage").style.color = "red";

				document.getElementById("signupMessage").innerHTML = "Email Already Exists";

				setTimeout(function(){

					msgFromServer = "";

					document.getElementById("signupMessage").innerHTML = msgFromServer;
					document.getElementById("signupMessage").style.color = "#32a852";
	
				}, 3000);
			}else if (msgFromServer != "Email Already Exists"){

				document.getElementById("signupMessage").innerHTML = "Successfully Signed you up";

			  document.getElementById("signup").reset();

				setTimeout(function(){

					document.getElementById("signupMessage").innerHTML = "";
	
				}, 3000);

			}

		}
	});


	$.get( "/message" + Scount, function( data ) {
		msgFromServer = data.text;

});

	e.preventDefault();
});