const Jimp = require("jimp");
const fs = require('fs');
const imagens = fs.readdirSync('./img/');

// Tratamento de imagens
imagens.forEach( function(arquivo){

    Jimp.read('img/' + arquivo).then( function(imagem){
        imagem.quality(70)
        .write('img-otimizadas/' + arquivo);
    }).catch( function(err){
        console.error(err);
    });

});