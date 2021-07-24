$(document).ready(function () {

    // recibir valor del input y mostrar en pantalla
    $("form").submit(function (event) {
        event.preventDefault();
        let numForm = $('#form_text').val()

        $.ajax({
            method: "GET",
            url: `https://superheroapi.com/api.php/10226070021914379/${numForm}`,
            dataType: "json",
            success: function (data) {
                console.log(data)
                $('#tituloHeroe').text(`SuperHero encontrado`);
                $('#imgHeroe').html(
                    `<img src="${data.image.url}" alt="imagen heroe" class='img-fluid'>`
                )
                $('#resultadoHeroe').html(
                    `<p><span class="font-weight-bold">Nombre:</span> ${data.name}</p>
                    <p><span class="font-weight-bold">Conexiones:</span> ${data.connections["group-affiliation"]} ~ ${data.connections.relatives}</p>
                    <p><span class="font-weight-bold">Publicado:</span> ${data.biography.publisher}</p>
                    <p><span class="font-weight-bold">Ocupación:</span> ${data.work.occupation}</p>
                    <p><span class="font-weight-bold">Primera aparición:</span> ${data.biography["first-appearance"]}</p>
                    <p><span class="font-weight-bold">Altura:</span> ${data.appearance.height[0]} ~ ${data.appearance.height[1]} </p>
                    <p><span class="font-weight-bold">Peso:</span> ${data.appearance.weight[0]} ~ ${data.appearance.weight[1]}</p>
                    <p>Alianza: ${data.biography.aliases} </p>`

                )
                // canvas
                var chart = new CanvasJS.Chart("chartContainer", {
                    animationEnabled: true,
                    title: {
                        text: `Estadisticas de poder de ${data.name}`,
                        fontColor: "whitesmoke",

                    },
                    backgroundColor: 'transparent',
                    legend: {
                        fontColor: "whitesmoke"
                    },
                    data: [{
                        type: "pie",
                        startAngle: 45,
                        toolTipContent: "<b>{label}</b>: {y}%",
                        indexLabelFontColor: "whitesmoke",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} - {y}%",
                        dataPoints: [
                            { label: "Inteligencia", y: parseInt(data.powerstats.intelligence) },
                            { label: "Fuerza", y: parseInt(data.powerstats.strength) },
                            { label: "Velocidad", y: parseInt(data.powerstats.speed) },
                            { label: "Durabilidad", y: parseInt(data.powerstats.durability) },
                            { label: "Poder", y: parseInt(data.powerstats.power) },
                            { label: "Combate", y: parseInt(data.powerstats.combat) },
                        ]
                    }]
                });
                chart.render();

            },
            error: function (data) {
                console.error("Error en consulta", data);
            },
        })

    })

    //Limpiar errores
    var limpiarErrores = (function () {
        $('#error-numero').text('');
    });
    // Validación de números

    $("form").submit(function (event) {
        limpiarErrores();

        let numHero = $('#form_text').val();
        // let validacionNumHero = /^([0-9]{1,2})$/
        let validacionNumHero = /^([0-9])*$/

        if (!validacionNumHero.test(numHero)) {
            $('#error-numero').text('Tiene que ser un número');
            event.preventDefault();
        }

    })

})




