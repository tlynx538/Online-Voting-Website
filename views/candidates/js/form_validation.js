(window.onload = function(){
    var age_click = document.getElementById('age');
    function validateAge()
    {
        var age = parseInt(age_click.value);
        console.log(age);
        if(age >= 0 && age <= 24)
            alert("Sorry, it looks like you are ineligible to be a candidate.");
    }
    age_click.addEventListener("focusout", validateAge);
})();