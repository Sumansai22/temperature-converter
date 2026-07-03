// ==========================================
// Temperature Converter
// ==========================================

async function convertTemperature() {

    const value = document.getElementById("value").value.trim();
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const result = document.getElementById("result");

    // -----------------------------
    // Validation
    // -----------------------------
    if (value === "") {

        result.style.display = "block";
        result.style.background = "#dc2626";
        result.innerHTML = "⚠ Please enter a temperature.";

        return;
    }

    if (from === to) {

        result.style.display = "block";
        result.style.background = "#f59e0b";
        result.innerHTML = "⚠ Please select different units.";

        return;
    }

    try {

        const response = await fetch("/convert", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                value: parseFloat(value),
                from: from,
                to: to
            })

        });

        const data = await response.json();

        result.style.display = "block";
        result.style.background = "#16a34a";

        result.innerHTML = `
            <strong>${value}° ${from}</strong>
            <br><br>
            =
            <br><br>
            <strong>${data.result}° ${to}</strong>
        `;

    }

    catch (error) {

        console.error(error);

        result.style.display = "block";
        result.style.background = "#dc2626";
        result.innerHTML = "❌ Server Error!";

    }

}


// ==========================================
// Reset Form
// ==========================================

function resetForm() {

    document.getElementById("value").value = "";

    document.getElementById("from").selectedIndex = 0;

    document.getElementById("to").selectedIndex = 0;

    const result = document.getElementById("result");

    result.style.display = "none";
    result.innerHTML = "";

}


// ==========================================
// Press Enter to Convert
// ==========================================

document.getElementById("value").addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        convertTemperature();

    }

});