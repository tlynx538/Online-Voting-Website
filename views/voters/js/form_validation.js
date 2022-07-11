(function(){
    function validateAge()
    {
        var age = parseInt(document.getElementById('age'));
        if(age > 0 && age < 18)
            alert("Sorry, it looks like you are not eligible to vote.")
    }
    window.addEventListener('load', validateAge, false);
})();