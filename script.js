function verificar() {
    var data = new Date()
    var ano = data.getFullYear()
    var fano = window.document.getElementById('txtano')

    var http = new XMLHttpRequest() // Cria request para envio de pesquisa no banco de dados da API
    
    var res = window.document.getElementById('res')
    if (fano.value.length == 0 || fano.value > ano) {
        window.alert('[ERRO] Verifique o ano!')
    } else {
        var fsex = document.getElementsByName('radsex')
        var idade = ano - Number(fano.value)
        var gen = ''
        var img = window.document.createElement('img')
        var tUrl = 'https://api.generated.photos/api/v1/faces'

        img.setAttribute('id', 'foto')
        if (fsex[0].checked) {
            gen = 'Homem'

            if (idade <= 10){ 
                //Criança
                tUrl = 'https://api.generated.photos/api/v1/faces?gender=male&age=child' // Define o url com os parametros
            }else if (idade < 21) {
                //Jovem
                tUrl = 'https://api.generated.photos/api/v1/faces?gender=male&age=young-adult' // Define o url com os parametros
            } else if (idade < 50) {
                //Adulto
                tUrl = 'https://api.generated.photos/api/v1/faces?gender=male&age=adult' // Define o url com os parametros
            } else {
                //Idoso
                tUrl = 'https://api.generated.photos/api/v1/faces?gender=male&age=elderly' // Define o url com os parametros
            }

            http.open('GET', tUrl, true) // Abre a request em GET para o URL da API
            http.setRequestHeader('Content-type', 'application/json') // Define o tipo de conteudo da request
            http.setRequestHeader('Authorization', 'API-Key bSGCZorrN19B3rxPsM4EsQ')
            http.responseType = 'json' // O tipo de resposta

            http.onload = function() { // Altera a imagem quando receber um status de OK, caso contrario, usa a Database local
                console.log(http.response)
                img.setAttribute('src', http.response.faces[0].urls[3][256])
            }

            http.onerror = function() { // Usa a database local em caso de erros na API
                if(idade <= 10) {
                    img.setAttribute('src', 'homem_bebe.png')
                } else if(idade <= 21) {
                    img.setAttribute('src', 'homem_jovem.png')
                } else if(idade <= 50) {
                    img.setAttribute('src', 'homem_adulto.png')
                } else {
                    img.setAttribute('src', 'homem_idoso.png')
                }
            }

            http.send()
        } else if (fsex[1].checked) {
            gen = 'Mulher'

            if (idade <= 10){ 
                //Criança
                tUrl = 'https://api.generated.photos/api/v1/faces?gender=female&age=child' // Define o url com os parametros
            }else if (idade < 21) {
                //Jovem
                tUrl = 'https://api.generated.photos/api/v1/faces?gender=female&age=young-adult' // Define o url com os parametros
            } else if (idade < 50) {
                //Adulto
                tUrl = 'https://api.generated.photos/api/v1/faces?gender=female&age=adult' // Define o url com os parametros
            } else {
                //Idoso
                tUrl = 'https://api.generated.photos/api/v1/faces?gender=female&age=elderly' // Define o url com os parametros
            }

            http.open('GET', tUrl, true) // Abre a request em GET para o URL da API
            http.setRequestHeader('Content-type', 'application/json') // Define o tipo de conteudo da request
            http.setRequestHeader('Authorization', 'API-Key bSGCZorrN19B3rxPsM4EsQ')
            http.responseType = 'json' // O tipo de resposta

            http.onload = function() { // Altera a imagem quando receber um status de OK, caso contrario, usa a Database local
                console.log(http.response)
                img.setAttribute('src', http.response.faces[0].urls[3][256])
            }

            http.onerror = function() { // Usa a database local em caso de erros na API
                if (idade <= 10){ 
                    //Criança
                    img.setAttribute('src', 'mulher_bebe.png')
                }else if (idade < 21) {
                    //Jovem
                    img.setAttribute('src', 'mulher_jovem.png')
                } else if (idade < 50) {
                    //Adulto
                    img.setAttribute('src', 'mulher_adulta.png')
                } else {
                    //Idoso
                    img.setAttribute('src', 'mulher_idosa.png')
                }
            }

            http.send()
        }
        res.style.textAlign = 'center'
        res.innerHTML = `Detectamos ${gen} com ${idade} anos`
        res.appendChild(img) //
    }
}