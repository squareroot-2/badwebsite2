// Responsive based on screen size
let calculator = document.getElementById("calculator")

// Get textbox
let calculatorText = document.getElementById("result");

// Define calculator buttons
let calculatorButtons = document.getElementsByClassName("calc_UI_babybutton");

// Audio
let pressAudio = document.getElementById("press");

// Variables
let errorMsg = false;

// Cookie Variables
let pieTrophy = false;
let eTrophy = false;

let et_visual = document.getElementById("et");
let pt_visual = document.getElementById("pt");

if (document.cookie == "")
{
    document.cookie = "eTrophy =" + eTrophy + ";"
    document.cookie = "piTrophy =" + pieTrophy + ";"
}
else
{
    if (eTrophy == true)
    {
        et_visual.style.display = "block"
    }

    if (pieTrophy == true)
    {
        pt_visual.style.display = "block"
    }
}

// Get cookie (online code)
function getCookie(cname) {
    // Declares chop as variable=
    let chop = cname + "=";

    // Makes the cookie readable if it has special characters
    let decodedCookie = decodeURIComponent(document.cookie);
    
    // Split cookie into array with ; being the cut
    let ca = decodedCookie.split(';');

    // Repeats through the whole array
    for(let i = 0; i <ca.length; i++) {
        // Grabs element i of 
        let c = ca[i];
        
        // Cuts the spaces at the start (some may start as ' hello=true')
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        // Checks if element has chop
        if (c.indexOf(chop) == 0) {
            // Cuts "variable="
            return c.substring(chop.length, c.length);
        }
    }
    
    return "No cookie found."
}

// Resize calculator event
window.addEventListener("resize", function()
{
    if (window.screen.width <= 500)
    {
        calculator.style.width = "90vw";
    }
    else
    {
        calculator.style.width = "30vw";
    }
});

// Add calculator button functionality
for (let i = 0; i < calculatorButtons.length; i++)
{
    calculatorButtons[i].addEventListener("click", function()
    {
        pressAudio.currentTime = 0;
        pressAudio.play();

        let buttonText = calculatorButtons[i].innerHTML;
        
        if (errorMsg)
        {
            calculatorText.innerHTML = "";
            errorMsg = false;
        }

        if (buttonText == "=")
        {
            let mathExpression = calculatorText.innerHTML;
            calculatorText.innerHTML = "";

            try
            {
                let result = eval(mathExpression);
                
                if (Math.abs(result) < Number.EPSILON)
                {
                    result = 0;
                }

                if (mathExpression.includes("0/0"))
                {
                    calculatorText.innerHTML = "Don't do that.";
                    errorMsg = true;
                }
                else if (mathExpression.includes("/0") || isNaN(result))
                {
                    calculatorText.innerHTML = "Math Error";
                    errorMsg = true;
                }
                else
                {
                    calculatorText.innerHTML = result;
                }
            }
            catch (error)
            {
                let userError = "";
                let caughtError = String(error);

                if (caughtError.includes("SyntaxError"))
                {
                    userError = "Syntax Error";
                }
                else
                {
                    userError = "Unexpected error: " + error;
                }

                calculatorText.innerHTML = userError;
                errorMsg = true;
            }

            console.log(eval(mathExpression));
        }
        else if (buttonText == "C")
        {
            calculatorText.innerHTML = "";
        }
        else if (calculatorButtons[i].getAttribute("specialValue"))
        {
            if (calculatorButtons[i].getAttribute("specialValue") == "Backspace")
            {
                calculatorText.innerHTML = calculatorText.innerHTML.substring(0,(calculatorText.innerHTML.length-1));
            }
            else
            {
                console.log(calculatorButtons[i].getAttribute("specialValue"));
                calculatorText.innerHTML = calculatorText.innerHTML + calculatorButtons[i].getAttribute("specialValue");
            }
        }
        else
        {
            calculatorText.innerHTML = calculatorText.innerHTML + buttonText;
        }
    });
}

// Rotating gradient
let rotation = 0;
function rotateGradient()
{
    document.body.style.background = `linear-gradient(${String(rotation)}deg, rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 100%)`;
    rotation = (rotation + 1) % 360;
}

setInterval(rotateGradient, 100);

// euler's dedication

let scoreElement = document.getElementById("secretscore")
let eulersNumber = "2.71828182845904523536028747135266249775724709369995957496696762772407663035359457138217852516642742";
let pi = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679"

const observer = new MutationObserver(() => {
    let typeText = calculatorText.innerHTML.replace(/\s/g, "");

    // Euler's Game //
    
    // Win Screen //
    if (typeText.substring(0, 100) == eulersNumber.substring(0, 100))
    {
        scoreElement.innerHTML = "dEdication";
        scoreElement.style.color = "rgba(217, 0, 255, 1)";
        
        eTrophy = true;
        et_visual.style.display = "block"
        document.cookie = "eTrophy=" + eTrophy;
    }
    
    // Scoreboard
    else if (typeText.substring(0, typeText.length) == eulersNumber.substring(0, typeText.length) && typeText.length >= 5)
    {
        scoreElement.innerHTML = "score:" + (typeText.length);

        if (typeText.length >= 75)
        {
            scoreElement.style.color = `rgba(252, 232, 43, ${typeText.length/100})`;
        }
        else if (typeText.length >= 75)
        {
            scoreElement.style.color = `rgba(200, 180,0,${typeText.length/100})`;
        }
        else if (typeText.length >= 50)
        {
            scoreElement.style.color = `rgba(200,50,0,${typeText.length/100})`;
        }
        else if (typeText.length >= 20)
        {
            scoreElement.style.color = `rgba(100,0,0,${typeText.length/100})`;
        }
        else
        {
            scoreElement.style.color = `rgba(0,0,0,${typeText.length/100})`;
        }
    }
    
    // Pie's Game //
    
    // Win Screen //
    else if (typeText.substring(0, 100) == pi.substring(0, 100))
    {
        scoreElement.innerHTML = "have a slice of some pie";
        scoreElement.style.color = "rgb(255, 209, 109)";

        pieTrophy = true;
        pt_visual.style.display = "block"
        document.cookie = "eTrophy=" + pieTrophy;
    }
    
    // Scoreboard
    else if (typeText.substring(0, typeText.length) == pi.substring(0, typeText.length) && typeText.length >= 4)
    {
        scoreElement.innerHTML = "slices of pie:" + (typeText.length);

        if (typeText.length >= 75)
        {
            scoreElement.style.color = `rgba(252, 232, 43, ${typeText.length/100})`;
        }
        else if (typeText.length >= 75)
        {
            scoreElement.style.color = `rgba(200, 180,0,${typeText.length/100})`;
        }
        else if (typeText.length >= 50)
        {
            scoreElement.style.color = `rgba(200,50,0,${typeText.length/100})`;
        }
        else if (typeText.length >= 20)
        {
            scoreElement.style.color = `rgba(100,0,0,${typeText.length/100})`;
        }
        else
        {
            scoreElement.style.color = `rgba(0,0,0,${typeText.length/100})`;
        }
    }
    
    else
    {
        scoreElement.style.color = "rgba(0,0,0,0)";
    }
});

observer.observe(calculatorText, {
    childList: true, 
    characterData: true,
    subtree: true,
});