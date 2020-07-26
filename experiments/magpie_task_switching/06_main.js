// In this file you initialize and configure your experiment using magpieInit

$("document").ready(function() {
    // prevent scrolling when space is pressed
    window.onkeydown = function(e) {
        if (e.keyCode === 32 && e.target === document.body) {
            e.preventDefault();
        }
    };

    // Set language for experiment, then start it
    set_language_and_start = function(lang) {   
        native_language = lang;
        my_experiment();     
    };

    // Starting experiment *after* language was set 
    function my_experiment() {    
        // Call creator functions to setup the experiment 
        create_custom_views();
        create_trials();
        create_views();
        // calls magpieInit
        // in debug mode this returns the magpie-object, which you can access in the console of your browser
        // e.g. >> window.magpie_monitor or window.magpie_monitor.findNextView()
        // in all other modes null will be returned
        window.magpie_monitor = magpieInit({
            // You have to specify all views you want to use in this experiment and the order of them
            views_seq: [
                intro,
                instructions,
                first_practice_inst,
                first_practice,
                second_practice_inst,
                second_practice,
                third_practice_inst,
                third_practice,
                experiment_inst,
                main_experiment,
                post_test,
                thanks
            ],
            // Here, you can specify all information for the deployment
            deploy: {
                experimentID: "168",
                serverAppURL: "https://magpie-demo.herokuapp.com/api/submit_experiment/",
                // Possible deployment methods are:
                // "debug" and "directLink"
                // As well as "MTurk", "MTurkSandbox" and "Prolific"
                deployMethod: "directLink",
                contact_email: "mbanser@uos.de",
                prolificURL: "https://app.prolific.ac/submissions/complete?cc=SAMPLE1234"
            },
            // Here, you can specify how the progress bar should look like
            progress_bar: {
                in: [
                    // list the view-names of the views for which you want a progress bar
                                        
                ],
                // Possible styles are "default", "separate" and "chunks"
                style: "separate",
                width: 100
            }
        });
    }
});
