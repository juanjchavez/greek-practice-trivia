const vocabulary = [
    {"word":"Ἀβραὰμ (ὁ)","translation":"Abraham"},
    {"word":"ἀδελφός","translation":"Hermano"},
    {"word":"Ἀγάπη (ἡ)","translation":"Amor"},
    {"word":"ἄγιος","translation":"Santo"},
    {"word":"αἶμα","translation":"Sangre"},
    {"word":"ἄλλος","translation":"Otro, Algún otro"},
    {"word":"ἁμαρτία","translation":"Pecado"},
    {"word":"ἀμήν","translation":"Ciertamente, en verdad, Amen"},
    {"word":"Ἄγγελος (ὁ)","translation":"mensajero, ángel"},
    {"word":"Ἄνθρωπος (ὁ)","translation":"Hombre, humanidad, persona, ser humano"},
    {"word":"Ἀπόστολος (ὁ)","translation":"Apostol, enviado, mensajero"},
    {"word":"αὐτός,  αὐτή, αὐτό","translation":"Pronombre el, ella, ella, ellos, ellas"},
    {"word":"βασιλεία (ἡ)","translation":"reino"},
    {"word":"Γαλιλαία (ἡ)","translation":"Galilea"},
    {"word":"γλῶσσα","translation":"Lengua, idioma"},
    {"word":"Γραφή (ἡ)","translation":"escritura"},
    {"word":"Δαῦίδ","translation":"David"},
    {"word":"δέ","translation":"pero, y, mas"},
    {"word":"δόξα (ἡ)","translation":"Gloria,majestad, fama"},
    {"word":"ἐγώ","translation":"Yo"},
    {"word":"εἰμί","translation":"Soy, existo, vivo, estoy presente"},
    {"word":"ἐκκλησία","translation":"Iglesia, asamblea, congregación"},
    {"word":"ἐν","translation":"en, sobre"},
    {"word":"ἔργον (τό)","translation":"obra, trabajo, acción"},
    {"word":"ἔσχατος","translation":"último"},
    {"word":"ἐστίν","translation":"es, está, existe"},
    {"word":"εὐαγγέλιον","translation":"Buenas nuevas, Evangelio"},
    {"word":"ζωή (ἡ)","translation":"Vida"},
    {"word":"ἦν","translation":"Era, estaba, existía"},
    {"word":"θάνατος","translation":"muerte"},
    {"word":"Θεός (ὁ)","translation":"Dios, deidad"},
    {"word":"θρόνος","translation":"Trono"},
    {"word":"Ἰησοῦς","translation":"Jesús"},
    {"word":"Ἰσραήλ","translation":"Israel"},
    {"word":"καί","translation":"Y, aún, también"},
    {"word":"καιρός (ὁ)","translation":"Tiempo, estación, era"},
    {"word":"καρδία","translation":"Corazón, ser interior"},
    {"word":"κόσμος (ὁ)","translation":"Universo, mundo, humanidad"},
    {"word":"λίθος","translation":"Piedra"},
    {"word":"λόγος (ὁ)","translation":"Palabra, declaración, mensaje"},
    {"word":"μέγας","translation":"Grande"},
    {"word":"μήτηρ","translation":"madre"},
    {"word":"Μωϋσῆς","translation":"Moises"},
    {"word":"νόμος","translation":"ley"},
    {"word":"νῦν","translation":"Adv. Ahora, Sust. Presente"},
    {"word":"ὁ, ἡ, τό","translation":"art. el, la, lo"},
    {"word":"ὅτι","translation":"que, desde, porque"},
    {"word":"οὐ, οὐκ, οὐχ","translation":"no"},
    {"word":"παραβολή","translation":"Parábola"},
    {"word":"πατήρ","translation":"Padre"},
    {"word":"Παῦλος (ὁ)","translation":"Pablo"},
    {"word":"Πέτρος (ὁ)","translation":"Pedro"},
    {"word":"Πιλᾶτος (ὁ)","translation":"Pilato"},
    {"word":"πνεῦμα (τό)","translation":"Espíritu, soplo, viento, vida eterna"},
    {"word":"πρεσβύτερος","translation":"Anciano"},
    {"word":"προφήτης (ὁ)","translation":"Profeta"},
    {"word":"πῦρ","translation":"fuego"},
    {"word":"σάββατον (τό)","translation":"Sábado"},
    {"word":"Σίμων (ὁ)","translation":"Simón"},
    {"word":"ὕδωρ","translation":"Agua"},
    {"word":"φαρισαῖος","translation":"Fariseo"},
    {"word":"φωνή (ἡ)","translation":"Sonido, ruido, voz"},
    {"word":"Χριστός (ὁ)","translation":"Cristo, mesías, el ungido"},
    {"word":"ψυχή","translation":"Alma, vida, ser"},
    {"word":"ὥρα (ή)","translation":"hora, ocasión, momento"}
    ];

    const getAnswer = (word) => {
        if(word ==''){
            return null;
        }
        const filteredVocabulary = vocabulary.filter( (el) => {
            return (el.word == word);
        } );
        
        if( filteredVocabulary.length > 0 ){
            return filteredVocabulary[0].translation;
        }else{
            return null;
        }
    }

    const getOptions = (word) => {
        let index = 0;
        let options = [];
        while (index < 4) {
            let random = randomNumber(0, vocabulary.length-1);
            let value = vocabulary[random];
            if(!options.includes(value.translation)){
                options.push(value.translation);
                index ++;
            }else if(random - 1 >= 0){
                let value = vocabulary[random - 1];
                if(!options.includes(value.translation)){
                    options.push(value.translation);
                    index ++;
                }else if(random + 1 <= vocabulary.length){
                    let value = vocabulary[random + 1];
                    if(!options.includes(value.translation)){
                        options.push(value.translation);
                        index ++;
                    }
                }
            }
                
        }
    
        const answer = getAnswer(word);
        if(!options.includes(answer)){
            options[randomNumber(0,3)] = getAnswer(word);
        }
        return options;
    }

    function randomNumber(min, max) { 
        return Math.floor(Math.random() * (max - min) + min);
    } 

    export {vocabulary, getAnswer, getOptions};