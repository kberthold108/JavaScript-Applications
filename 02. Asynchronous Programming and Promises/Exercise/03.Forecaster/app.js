function solution() {
    const submit = document.getElementById("submit");
    submit.addEventListener("click", submitted);


    function submitted() {
        const location = document.getElementById("location");

        fetch("http://localhost:3030/jsonstore/forecaster/locations")
        .then(response => {
            if (!response.ok) {
                throw Error();
            }
            return response.json();
        })
        .then(data => {
            data.forEach(loc => {
                if (loc.name === location.value) {
                    forcaster(loc.code);
                }
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    const symbol = {
        Sunny: "\u2600",
        "Partly sunny": "\u26C5",
        Overcast: "\u2601",
        Rain: "\u2614",
        Degrees: ""
    };


    function forcaster(code) {
        const forecast = document.getElementById("forecast");
        const current = document.getElementById("current");
        fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`)
        .then(response => {
            
            if (!response.ok || response.textContent === "") {
                throw Error("Error");
            }
            forecast.style.display = "block";
            return response.json();
        })
        .then(data => {
            
            const parentDiv = document.createElement("div");
            parentDiv.className = "forecasts";
            const conditionSpan = document.createElement("span");
            conditionSpan.className = "condition symbol";
            conditionSpan.textContent = symbol[data.forecast.condition];
            
            parentDiv.appendChild(conditionSpan);

            const spanCondition = document.createElement("span");
            spanCondition.className = "condition";
            const spanCity = document.createElement("span");
            spanCity.className = "forecast-data";
            spanCity.textContent = data.name;
            spanCondition.appendChild(spanCity);
            const highLow = document.createElement("span");
            highLow.className = "forecast-data";
            highLow.textContent = `${data.forecast.low}°/${data.forecast.high}°`;
            spanCondition.appendChild(highLow);
            const weather = document.createElement("span");
            weather.className = "forecast-data";
            weather.textContent = data.forecast.condition;
            spanCondition.appendChild(weather);
            parentDiv.appendChild(spanCondition);

            current.appendChild(parentDiv);
        })
        .catch(err => {
            document.getElementById("current").textContent = err.message;
        });

        fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)
        .then(response => {
            if (!response.ok) {
                throw Error();
            }
            return response.json();
        })
        .then(data => {
            const div = document.createElement("div");
            div.className = "forecast-info";
            data.forecast.forEach(day => {
                const span = document.createElement("span");
                span.className = "upcoming";
                const spanSymbol = document.createElement("span");
                spanSymbol.className = "symbol";
                spanSymbol.textContent = symbol[day.condition];
                span.appendChild(spanSymbol);

                const highLow = document.createElement("span");
                highLow.className = "forecast-data";
                highLow.textContent = `${day.low}°/${day.high}°`;
                span.appendChild(highLow);

                const condition = document.createElement("span");
                condition.className = "forecast-data";
                condition.textContent = day.condition;
                span.appendChild(condition);
                div.appendChild(span);
            });
            document.getElementById("upcoming").appendChild(div);
        });
    }
}

solution();