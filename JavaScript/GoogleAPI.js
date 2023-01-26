// Translate API Reference: https://cloud.google.com/translate/docs/reference/rest/v2/translate
// AJAX Reference: https://www.w3schools.com/jquery/jquery_ref_ajax.asp, https://api.jquery.com/jquery.ajax/

$(document).ready(function () {

    // When the French button is clicked
    $("#toFrench").on("click", function () {

        // Select all elements with the text class
        $(".text").find("*").each(function () {

            // Store the current element to replace later
            var currentElement = this;

            // Access Google API using AJAX
            $.ajax({
                // URL requested
                url: "https://translation.googleapis.com/language/translate/v2",
                type: "POST",

                // Text data to be sent - q is data to be sent, target is target language, format is source text - taken from API reference https://cloud.google.com/translate/docs/reference/rest/v2/translate
                data: { q: $(this).text(), target: "fr", format: "text", key: "KEY" },

                // When the API sends a response
                success: function (data) {

                    // Get translated text from API structure - can be found on API website
                    var translatedText = data.data.translations[0].translatedText;

                    // Replace text of stored element with translated text
                    $(currentElement).text(translatedText);
                }
            });

        });
    });


    // When the English button is clicked
    $("#toEnglish").on("click", function () {

        // Select all elements with the text class
        $(".text").find("*").each(function () {

            // Store the current element to replace later
            var currentElement = this;

            // Access Google API using AJAX
            $.ajax({
                // URL requested
                url: "https://translation.googleapis.com/language/translate/v2",
                type: "POST",

                // Text data to be sent - q is data to be sent, target is target language, format is source text - taken from API reference 
                data: { q: $(this).text(), target: "en", format: "text", key: "KEY"},

                // When the API sends a response
                success: function (data) {

                    // Get translated text from API structure - can be found on API reference
                    var translatedText = data.data.translations[0].translatedText;

                    // Replace text of stored element with translated text
                    $(currentElement).text(translatedText);
                }
            });

        });
    });

    // TTS Reference: https://cloud.google.com/text-to-speech/docs/reference/rest/v1/text/synthesize#VoiceSelectionParams

    // When the Text-To-Speech button is clicked
    $("#tts").on("click", function () {

        // Concatenate all text on the page
        var allText = "";
        
        $(".text").find("*").each(function () {
            allText += $(this).text();
        });

        // Access Google TTS API using AJAX
        $.ajax({

            // URL with key to be requested - have to add key to URL https://stackoverflow.com/questions/50445448/google-cloud-text-to-speech-api-authentication-from-the-frontend-via-api-key-pos 
            url: "https://texttospeech.googleapis.com/v1/text:synthesize?key=" + "KEY",
            type: "POST",

            dataType: "json",
            contentType: "application/json",

            /// Text data to be sent - input is data to be sent, voice is target language, audioConfig is audio format - taken from API reference 
            data: JSON.stringify({ input: { text: allText }, voice: { languageCode: "en-US" }, audioConfig: { audioEncoding: "MP3" } }),

            // When the API sends a response
            success: function (data) {

                // Get audio content from API structure
                var audioContent = data.audioContent;

                // Create an audio element 
                var audio = new Audio();

                // Set the src to the audio generated
                audio.src = 'data:audio/mp3;base64,' + audioContent;

                audio.play();
            }
        });

    });

});


