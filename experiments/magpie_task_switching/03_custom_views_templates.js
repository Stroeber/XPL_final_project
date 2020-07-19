// In this file you can create your own custom view templates

// A view template is a function that returns a view,
// this functions gets some config (e.g. trial_data, name, etc.) information as input
// A view is an object, that has a name, CT (the counter of how many times this view occurred in the experiment),
// trials the maximum number of times this view is repeated
// and a render function, the render function gets CT and the magpie-object as input
// and has to call magpie.findNextView() eventually to proceed to the next view (or the next trial in this view),
// if it is an trial view it also makes sense to call magpie.trial_data.push(trial_data) to save the trial information

const custom_views = {};

// Create the used views *after* the language was set
function create_custom_views(){
    custom_views.task_switch = function(config) {
        const view = {
            name: config.name,
            CT: 0,
            current_block:0,                // Counts the whole trial blocks from first consonant stimulus to recall trial
            block_trial:"title",            // Sets the next to show view
            consonant:0,                    // Counts the displayed consonants of the current block
            digit:0,                        // Counts the displayed digits for the current consonant
            trials: config.trials,          // All trials (type info, consonant, digits, recal)
            trial_data: {                   // Stores the trial data of the current block
                trial_number : 0,
                trial_type: config.name,
                task_type: "",
                consonant_series: [],
                digit_series: [],
                colors: [],
                expected_keys: [],
                response: [],
                recall: [],
                recall_time: NaN,
                correctness: NaN,
                RT: []
            },
            RT_list: _.fill(Array(8),NaN),  // Stores reaction times for current digit series
            res_list: _.fill(Array(8),NaN), // Stores responses for current digit series
            render: function (CT, magpie) {
                console.log(CT,this.block_trial);

                //waits for keypress or automatically continues to next view if participant takes to long (the first practice has no keypress trial)
                function digit_task(){
                    const startingTime = Date.now();                    
                    let timeout = setTimeout(function(){
                        $("body").off("keydown");
                        if (view.digit==8) {
                            view.trial_data.RT.push(view.RT_list);
                            view.trial_data.response.push(view.res_list);
                            view.RT_list = _.fill(Array(8),NaN);
                            view.res_list = _.fill(Array(8),NaN);
                        }
                        magpie.findNextView();
                        },
                        900);

                    if (view.name != "first_practice") {                       
                        $("body").on("keydown",function (e) {
                            if(e.key==="ArrowRight"||e.key==="ArrowLeft"){
                                const RT = Date.now() - startingTime;
                                $("body").off("keydown");
                                clearTimeout(timeout);

                                // Save key input for trial data                            
                                view.RT_list[view.digit-1] = RT;
                                view.res_list[view.digit-1] = e.key;

                                if (view.digit==8) {
                                    view.trial_data.RT.push(view.RT_list);
                                    view.trial_data.response.push(view.res_list);
                                    view.RT_list = _.fill(Array(8),NaN);
                                    view.res_list = _.fill(Array(8),NaN);
                                }

                                magpie.findNextView();
                            }                
                        });    
                    }                
                }

                // Display the current view
                switch(this.block_trial){
                    case "title":                        
                        // Store current trial data
                        this.trial_data.trial_number = this.current_block;
                        this.trial_data.task_type = config.data[this.current_block].type;
                        this.trial_data.consonant_series = config.data[this.current_block].consonants;
                        this.trial_data.digit_series = config.data[this.current_block].numbers;
                        this.trial_data.colors = config.data[this.current_block].colors;
                        this.trial_data.expected_keys = config.data[this.current_block].expected_keys;

                        // Next view should be a consonant
                        this.block_trial="consonant";
                        
                        // Show title until participant hits space
                        $("main").html(
                            `<div class="magpie-view">
                                <div class='magpie-view-stimulus-container'>
                                    <div class='magpie-view-stimulus' style="font-size:50px; align-self:center">${config.data[this.current_block].type_string}</div>
                                </div>                                           
                            </div>`);
                        
                        $("body").on("keyup",function (e) {
                            if (e.which===32) {               
                                $("body").off("keyup");
                                magpie.findNextView();
                            }
                        });
                        break;
                    case "consonant":                        
                        // Show current consonant
                        $("main").html(`<div class="magpie-view">
                            <div class='magpie-view-stimulus-container'>
                                <div class='magpie-view-stimulus magpie-nodisplay' style="font-size:50px; align-self:center">${config.data[this.current_block].consonants[this.consonant]}</div>
                            </div>                  
                        </div>`);

                        // Reset digit count and set next view to display digit
                        this.digit=0;
                        this.block_trial="digit";

                        // Creates DOM of view 
                        // Only controls duration for consonant stimulus then automatically continues to next view
                        magpieUtils.view.createTrialDOM({
                            stim_duration: 1500,
                            data: config.data,
                        },
                        magpie.findNextView
                        );
                        break;
                    case "digit":
                        // Show current digit in its right color
                        $("main").html(`<div class="magpie-view">
                            <div class='magpie-view-stimulus-container'>
                                <div class='magpie-view-stimulus magpie-nodisplay' style="font-size:50px; align-self:center; color:${config.data[this.current_block].colors[this.consonant][this.digit]}">${config.data[this.current_block].numbers[this.consonant][this.digit]}</div>
                            </div>                  
                        </div>`);
                        
                        this.digit++;
                        
                        // If all digits were shown, set next view to show the next consonant or the final recall trial (The second practice has no recall trial)
                        if (this.digit==8) {
                            this.consonant++;
                            if (this.consonant==config.data[this.current_block].seq_length && this.name != "second_practice") {
                                this.block_trial="recall";
                            } else {
                                this.block_trial="consonant";
                            }
                        }
                        
                        // Creates DOM of view 
                        // Controls duration for blank screen then waits for keypress or 
                        // automatically continues to next view if participant takes to long
                        magpieUtils.view.createTrialDOM({
                            pause: 300,
                            data: config.data,
                        },
                        digit_task
                        );
                        break;
                    case "recall":
                        // Length of series to enter in textbox
                        const expLength = config.data[this.current_block].seq_length === undefined ? 6 : config.data[this.current_block].seq_length;

                        // Show textinput trial
                        $("main").html(`<div class="magpie-view">
                            <div class='magpie-view-title' style="font-size:50px; align-self:center">${config.data[this.current_block].recall_info}</div>
                            <div class='magpie-view-answer-container'>
                                <input type="text" autofocus="autofocus" id="recall_input" class='magpie-response-text' maxLength=${expLength} size=${expLength} style="text-transform: uppercase; font-size:30px"/>
                                <button id='next' class='magpie-view-button magpie-nodisplay'>${config.buttonText}</button>
                            </div>
                        </div>`);

                        const startingTime = Date.now();

                        // Displays ? when space was pressed 
                        $("#recall_input").on("keydown", function(e){
                            if(e.which===32){    	
                                e.preventDefault();
                                if(this.value.length < expLength) {
                                    this.value+='?';
                                }
                            }
                        });
                        // Display next button if input is as long as expected
                        $("#recall_input").on("keyup", function(e){                        
                            if (this.value.length == expLength) {
                                $("#next").removeClass("magpie-nodisplay");
                            } else {
                                $("#next").addClass("magpie-nodisplay");
                            }
                        });

                        $("#next").on("click", function() {
                            const recall_time = Date.now() - startingTime;
                            let recalled = $("#recall_input")[0].value.toUpperCase();                        
                            let correctness = [];
                            for(let i in recalled){
                                correctness.push(recalled[i]===config.data[view.current_block].consonants[i]);
                            }
                            // correct_percentage = (correctness.filter(correctness=>correctness).length/expLength);

                            view.trial_data.recall_time = recall_time;
                            view.trial_data.recall = recalled;            
                            view.trial_data.correctness = correctness;
                            // Save trial data of current block
                            magpie.trial_data.push(view.trial_data);
                            console.log(view.trial_data);

                            // Clear trial data for next block
                            view.trial_data = {
                                trial_number : 0,
                                trial_type: config.name,
                                task_type: "",
                                consonant_series: [],
                                digit_series: [],
                                colors: [],
                                expected_keys: [],
                                response: [],
                                recall: [],
                                recall_time: NaN,
                                correctness: NaN,
                                RT: []
                            };
                            
                            // Reset digit and consonant count, set view to start with next block
                            view.digit=0;
                            view.consonant=0;
                            view.current_block++;
                            view.block_trial="title";

                            magpie.findNextView();
                        });  
                        break;                                      
                }
            }
        }
        return view;
    };
}