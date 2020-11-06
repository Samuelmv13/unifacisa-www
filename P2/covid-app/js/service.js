$(document).ready(function(){
   
    $("#searchContent").hide();
    const urlApiCovid = "https://covid19-brazil-api.now.sh/api/report/v1"
    getStates()

    function getStates(nomeEstado){
        let request = new XMLHttpRequest()
        request.open('GET', urlApiCovid)
        request.responseType = 'json'
        request.send()

        request.onload = function(){
            let responseData = request.response
            if(nomeEstado){
                formatStatesSearch(responseData.data, nomeEstado)
            } else{
                formatStates(responseData.data)
            }
        }
    }

    function showStates(states){
        $("#covid_table").append("<tr>")

        let object_keys = Object.keys(states);
        for (let key = 0; key < object_keys.length; key++) {
            let currentKey = object_keys[key]
            $("#covid_table").append("<td>" + states[currentKey] + "</td>")
        }
        $("#covid_table").append("</tr>")
    }
    
    function showState(state){
        $("#search_table").append("<tr>")

        let object_keys = Object.keys(state);
        for(let key=0; key < object_keys.length; key++){
            let currentKey = object_keys[key]
            $("#search_table").append("<td>" + state[currentKey] + "</td>")
        }

        $("#search_table").append("</tr>")
    }
    
    function formatStates(states){
        for(let i=0; i < states.length; i++){
            let state = {
                state: states[i].state,
                cases: states[i].cases,
                deaths: states[i].deaths,
                suspects: states[i].suspects,
                refuses: states[i].refuses
            }

            showStates(state)
        }
    }
    
    function formatStatesSearch(jsonArray, nomeEstado){
        let naoEncontrado = true

        for(let i=0; i < jsonArray.length; i++){
            if(jsonArray[i].state == nomeEstado){
                let search = {
                    state: jsonArray[i].state,
                    cases: jsonArray[i].cases,
                    deaths: jsonArray[i].deaths,
                    suspects: jsonArray[i].suspects,
                    refuses: jsonArray[i].refuses
                }
                showState(search)
                naoEncontrado = false
            }
        }
        if (naoEncontrado) {
            $("#searchContent").append("Estado não encontrado")
        }
        $("#searchContent").append("<a href='#' target='_blank'>Voltar ao inicio</a>")
    }

    $("#btnPesquisar").click(function(){
        $("#covidContent").hide();
        $("#searchContent").show();

        let nomeEstado = $("input").val()
        getStates(nomeEstado)
    })
})
