function solution1() {
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


function asyncSolution() {
    const submit = document.getElementById("submit");
    submit.addEventListener("click", submitted);

    const symbol = {
        Sunny: "\u2600",
        "Partly sunny": "\u26C5",
        Overcast: "\u2601",
        Rain: "\u2614",
    };

    async function submitted() {
        const forecast = document.getElementById("forecast");
        const location = document.getElementById("location");

        document.getElementById("upcoming").textContent = "";
        document.getElementById("current").textContent = "";
        document.getElementById("current").appendChild(creator("div", "label", "Current conditions"));
        document.getElementById("upcoming").appendChild(creator("div", "label", "Three-day forecast"));
        try {
            let count = 0;
            let data = await fetch("http://localhost:3030/jsonstore/forecaster/locations");
            data = await data.json();
            data.forEach(loc => {
                if (loc.name === location.value) {
                    forcaster(loc.code);

                } else {
                    count++;
                }
                if (count === 3) {
                    throw Error()
                }
            });
        } catch (err) {
            forecast.style.display = "block";
            document.getElementById("upcoming").textContent = "";
            document.getElementById("current").textContent = "Error";
        }
    }

    function creator(type, className = "", textContent = "") {
        const created = document.createElement(type);
        created.className = className;
        created.textContent = textContent;
        return created;
    }

    async function forcaster(code) {

        const forecast = document.getElementById("forecast");
        const current = document.getElementById("current");
        try {
            forecast.style.display = "block";
            let data = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`);
            data = await data.json();
            if (!data) {
                throw Error();
            }
            const parentDiv = creator("div", "forecasts");
            parentDiv.appendChild(creator("span", "condition symbol", symbol[data.forecast.condition]));

            const spanCondition = creator("span", "condition");
            spanCondition.appendChild(creator("span", "forecast-data", data.name));
            spanCondition.appendChild(creator("span", "forecast-data", `${data.forecast.low}°/${data.forecast.high}°`));
            spanCondition.appendChild(creator("span", "forecast-data", data.forecast.condition));

            parentDiv.appendChild(spanCondition);
            current.appendChild(parentDiv);
        } catch (err) {
            forecast.style.display = "block";
            document.getElementById("upcoming").textContent = "";
            document.getElementById("current").textContent = "Error";
        }

        try {
            let data = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`);
            data = await data.json();

            const div = document.createElement("div");
            div.className = "forecast-info";
            data.forecast.forEach(day => {
                const span = creator("span", "upcoming");
                span.appendChild(creator("span", "symbol", symbol[day.condition]));
                span.appendChild(creator("span", "forecast-data", `${day.low}°/${day.high}°`));
                span.appendChild(creator("span", "forecast-data", day.condition));
                div.appendChild(span);
            });
            document.getElementById("upcoming").appendChild(div);

        } catch (err) {
            forecast.style.display = "block";
            document.getElementById("upcoming").textContent = "";
            document.getElementById("current").textContent = "Error";
        }
    }
}


asyncSolution();