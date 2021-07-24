$("document").ready(function () {
    $("form").submit(function (event) {
        event.preventDefault();
        // extraer el elemento del input
        let numeroingresado = $("#inputNumero").val();
        // en caso que los numeros no existan se pediran valores que existan
        if (numeroingresado < 0 || numeroingresado > 732) {
            alert("Disculpa pero el numero debe ser entre 1 y 731")
            console.log(numeroingresado)
        }
        // codigo de usuario del api
        let api = 3336902789687411;
        // traer el ajax con el metodo get
        $.ajax({
            method: "get",
            url: `https://superheroapi.com/api.php/${api}/${numeroingresado}`,
            dataType: 'json',
            // Extraccion de informacion del api
            success: function (data) {
                let imagenHero = data.image.url;
                let nombreHero = data.name;
                let aparicionesHero = data.connections["group-affiliation"];
                let editorHero = data.biography.publisher;
                let ocupacionHero = data.work.occupation;
                let primeraAparicion = data.biography["first-appearance"];
                let alturaHero = data.appearance.height[1];
                let pesoHero = data.appearance.weight[1];
                let aliasHero = data.biography.aliases;
                console.log(data)

                // condiciones para los datos sin informacion
                if (nombreHero == "-") {
                    nombreHero = "No hay resultados disponibles para nombre"
                };
                if (aparicionesHero == "-") {
                    aparicionesHero = "No hay resultados disponibles para Apariciones"
                };
                if (editorHero == "-") {
                    editorHero = "No hay resultados disponibles para Editores"
                };
                if (ocupacionHero == "-") {
                    ocupacionHero = "No hay resultados disponibles para Ocupaciones"
                };
                if (alturaHero == "-") {
                    alturaHero = "No hay resultados disponibles para Altura"
                };
                if (pesoHero == "-") {
                    pesoHero = "No hay resultados disponibles para Peso"
                };
                if (aliasHero == "-") {
                    aliasHero = "No hay resultados disponibles para Alias"
                };

                //obtencion de datos para canvas
                let Inteligencia = data.powerstats.intelligence;
                let Fuerza = data.powerstats.strength;
                let Velocidad = data.powerstats.speed;
                let Resistencia = data.powerstats.durability;
                let Poder = data.powerstats.power;
                let Combate = data.powerstats.combat;

                // Dara los datos de poderes del api que tienen como valor null
                if (Inteligencia == "null") {
                    Inteligencia = 1;
                };
                if (Fuerza == "null") {
                    Fuerza = 1
                };
                if (Combate == "null") {
                    Combate = 1
                };
                if (Poder == "null") {
                    Poder = 1
                };
                if (Velocidad == "null") {
                    Velocidad = 1
                };
                if (Resistencia == "null") {
                    Resistencia = 1
                };
                //   Escritura de la informacion en html de la card
                $("#info").html(`
                    <div class="card col-xl-12 col-sm-6 mx-4 border-success" >
                    <img src="${imagenHero}" class="card-img-top" alt="${nombreHero}" style="height: 300px">
                    <div class="card-body">
                        <h5 class="card-title text-center">${nombreHero}</h5>
                        <p class="card-text">Alias: ${aliasHero}</p>
                        <p class="card-text">Casa Editorial: ${editorHero}</p>
                        <p class="card-text">Ocupación: ${ocupacionHero}</p>
                        <p class="card-text">Primera Aparición: ${primeraAparicion}</p>
                        <p class="card-text">Peso: ${pesoHero} - Altura: ${alturaHero}</p>
                        <p class="card-text">Apariciones: ${aparicionesHero}</p>
                    </div>
                    </div> `)

                // Canvas
                let chart = new CanvasJS.Chart("canvas", {
                    animationEnabled: true,
                    title: {
                        text: `Tabla de Habilidades de ${nombreHero}`,
                        horizontalAlign: "center"
                    },
                    data: [{
                        type: "doughnut",
                        startAngle: 40,
                        //innerRadius: 60,
                        indexLabelFontSize: 14,
                        indexLabel: "{label} - {y} ",
                        toolTipContent: "<b>{label}:</b> {y}",
                        dataPoints: [{
                                y: `${Inteligencia}`,
                                label: "Inteligencia"
                            },
                            {
                                y: `${Fuerza}`,
                                label: "Fuerza"
                            },
                            {
                                y: `${Velocidad}`,
                                label: "Velocidad"
                            },
                            {
                                y: `${Resistencia}`,
                                label: "Resistencia"
                            },
                            {
                                y: `${Poder}`,
                                label: "Poder"
                            },
                            {
                                y: `${Combate}`,
                                label: "Combate"
                            },
                        ]
                    }]
                });
                chart.render();
            },
            error: function (data) {
                console.warn(data)
            }
        })
    })
})