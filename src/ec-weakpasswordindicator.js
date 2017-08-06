
(function($) {
    'use strict';

    $.widget('ec.weakpasswordindicator', {
        options: {
            showGuesses: false, //Displays number of guesses needed to guess the password
            showSuggestions: false, //Displays suggestions about password typed
            showScore: false, //Displays score 0-4 of password
            showWarning: false, //Displays warning about password
            showMeter: true, //Displays progressbar-like meter
            showStrength: false, //DIsplays strength of word using strengthMap
            strengthMap: {
                0: "Worst",
                1: "Bad",
                2: "Weak",
                3: "Good",
                4: "Strong"
            } //Map of strength values to display to user
        },
        _create: function() {
            //Meter show element
            if(this.options.showMeter) {

                this.meter = $('<div class="loading-bar__bar" role="progressbar" style="width: 0%;"></div>')

                    $('<div class="weakpasswordindicator__meter loading-bar"></div>')
                    .append($('<div class="loading-bar__bg"></div>').append(this.meter))
                    .css('width', this.element.css('width'))
                    .insertAfter(this.element)

            
                // Remove after accepting above
                // this.meter = $(`
                //     <meter 
                //         class="weakpasswordindicator__meter"
                //         min="0"
                //         max="4" 
                //         value="0"
                //     ></meter>
                // `)
                // .insertAfter(this.element)
            }

            //Strength element
            if(this.options.showStrength) {
                this.strength = $(`
                    <div
                        class="weakpasswordindicator__strength"
                    ></div>
                `)
                .insertAfter(this.element)
            }

            //Show suggestions element
            if(this.options.showSuggestions) {
                this.suggestions = $(`
                    <div
                        class="weakpasswordindicator__suggestions"
                    ></div>
                `)
                .insertAfter(this.element)
            }

            // Show score element
            if(this.options.showScore) {
                this.score = $(`
                    <div
                        class="weakpasswordindicator__score"
                    ></div>
                `)
                .insertAfter(this.element)
            }

            //Guesses element
            if(this.options.showGuesses) {
                this.guesses = $(`
                    <div
                        class="weakpasswordindicator__guesses"
                    ></div>
                `)
                .insertAfter(this.element)
            }


            //Add event listener
            this._on(this.element, {
                input: "inputHandler"
            })
                
        },

        inputHandler: function(e) {
            let val = e.target.value
            let result = zxcvbn(val)
            
            // console.log(result)

            // Show suggestions
            if(this.options.showSuggestions) {
                this.suggestions.text(result.feedback.suggestions
                    .reduce((prev, value) =>  prev + ' ' + value, ''))
            }

            // Show guesses number
            if(this.options.showGuesses) {
                this.guesses.text(result.guesses)
            }

            // Show score numver
            if(this.options.showScore) {
                this.score.text(result.score)
            }

            // Show strength
            if(this.options.showStrength) {
                this.strength.text(this.options.strengthMap[result.score])
            }

            // Show meter
            if(this.options.showMeter) {
                // this.meter.attr('value', result.score)
                this.meter.css('width', `${result.score ? 100 * result.score / 4 : 0}%`)
            }
        }
    })
})(jQuery)






