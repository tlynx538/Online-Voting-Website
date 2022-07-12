(window.onload = function(){
    var age_click = document.getElementById('age');
    var password_click = document.getElementById('pwd');
    function validateAge()
    {
        var age = parseInt(document.getElementById('age').value);
        if(age > 0 && age < 18)
            alert("Sorry it looks like you are ineligible to vote");
    }
    function validatePassword()
    {
        var password =  password_click.value;
        if(password.length < 5)
            alert("Please use a password with length of more than 5 characters");
    }
    age_click.addEventListener("focusout", validateAge);
    password_click.addEventListener("focusout", validatePassword);
})();