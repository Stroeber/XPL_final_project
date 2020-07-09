// In this file you can instantiate your views
// We here first instantiate wrapping views, then the trial views


/** Wrapping views below

* Obligatory properties

    * trials: int - the number of trials this view will appear
    * name: string

*Optional properties
    * buttonText: string - the text on the button (default: 'next')
    * text: string - the text to be displayed in this view
    * title: string - the title of this view

    * More about the properties and functions of the wrapping views - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/01_template_views/#wrapping-views

*/

// Instantiate the used views
var intro;
var instructions;
var first_practice_inst;
var second_practice_inst;
var third_practice_inst;
var experiment_inst;
var post_test;
var thanks;
var first_practice;
var second_practice;
var third_practice;
var main_experiment;


// create the views *after* the language was set
function create_views(){

  if (native_language === 'german') {
    // CREATE GERMAN VIEWS
    //
    //
    // Every experiment should start with an intro view. Here you can welcome your participants and tell them what the experiment is about
    intro = magpieViews.view_generator("intro", {
      trials: 1,
      name: 'intro',
      // If you use JavaScripts Template String `I am a Template String`, you can use HTML <></> and javascript ${} inside
      title:"Willkommen!",
      text: `Das ist die Begrüßung für das 'task switching'-Experiment`,
      buttonText: 'Weiter...'
    });
    // For most tasks, you need instructions views
    instructions = magpieViews.view_generator("instructions", {
      trials: 1,
      name: 'instructions',
      title: 'Generelle Einweisungen',
      text: `Blablabla Einweisung
                <br />
                <br />
                Worum gehts hier`,
      buttonText: 'Weiter...'
    });

    first_practice_inst = magpieViews.view_generator("begin", {
      trials: 1,
      name: 'first_practice',
      title: '1. Übung',
      text: `In der 1. Übung...`,
      buttonText: 'Starte Übung'
    });

    second_practice_inst = magpieViews.view_generator("begin", {
      trials: 1,
      name: 'second_practice',
      title: '2. Übung',
      text: '...',
      buttonText: 'Starte Übung'
    });

    third_practice_inst = magpieViews.view_generator("begin", {
      trials: 1,
      name: 'third_practice',
      title: '3. Übunge',
      text: '...',
      buttonText: 'Starte Übung'
    });

    experiment_inst = magpieViews.view_generator("begin", {
      trials: 1,
      name: 'experiment',
      title: 'Experiment',
      text: '...',
      buttonText: 'Starte Experiment'
    });

    // In the post test questionnaire you can ask your participants addtional questions
    post_test = magpieViews.view_generator("post_test", {
      trials: 1,
      name: 'post_test',
      title: 'Zusätzliche Information',
      text: 'Die Beantwortung der folgenden Fragen ist optional, es hilft uns jedoch bei der weiteren Analyse Ihrer Ergebnisse.',

      // You can change much of what appears here, e.g., to present it in a different language, as follows:
      buttonText: 'Weiter',
      age_question: 'Alter',
      gender_question: 'Geschlecht',
      gender_male: 'männlich',
      gender_female: 'weiblich',
      gender_other: 'divers',
      edu_question: 'Höchster Bildungsabschluss',
      edu_graduated_high_school: 'Abitur',
      edu_graduated_college: 'Hochschulabschluss',
      edu_higher_degree: 'Universitärer Abschluss',
      languages_question: 'Muttersprache',
      languages_more: '(in der Regel die Sprache, die Sie als Kind zu Hause gesprochen haben)',
      comments_question: 'Weitere Kommentare'
    });

    // The 'thanks' view is crucial; never delete it; it submits the results!
    thanks = magpieViews.view_generator("thanks", {
      trials: 1,
      name: 'thanks',
      title: 'Vielen Dank dafür, dass Sie an unserem Experiment teilgenommen haben!',
      prolificConfirmText: 'Bestätigen Sie den Abschluss des Experiments'
    });
  } else {
    // CREATE ENGLISH VIEWS
    //
    //
    // Every experiment should start with an intro view. Here you can welcome your participants and tell them what the experiment is about
    intro = magpieViews.view_generator("intro", {
      trials: 1,
      name: 'intro',
      // If you use JavaScripts Template String `I am a Template String`, you can use HTML <></> and javascript ${} inside
      text: `This is the introduction for the task switching experiment`,
      buttonText: 'begin the experiment'
    });

    // For most tasks, you need instructions views
    instructions = magpieViews.view_generator("instructions", {
      trials: 1,
      name: 'instructions',
      title: 'General Instructions',
      text: `This is a sample instructions view.
                <br />
                <br />
                Tell your participants what they are to do here.`,
      buttonText: 'go to trials'
    });

    first_practice_inst = magpieViews.view_generator("begin", {
      trials: 1,
      name: 'first_practice',
      title: 'Practice instructions',
      text: `This is the first practice block. You picked: `,
      buttonText: 'Start practice block'
    });

    second_practice_inst = magpieViews.view_generator("begin", {
      trials: 1,
      name: 'second_practice',
      title: 'Practice instructions',
      text: 'This is the second practice block.',
      buttonText: 'Start practice block'
    });

    third_practice_inst = magpieViews.view_generator("begin", {
      trials: 1,
      name: 'third_practice',
      title: 'Practice instructions',
      text: 'This is the last practice block.',
      buttonText: 'Start practice block'
    });

    experiment_inst = magpieViews.view_generator("begin", {
      trials: 1,
      name: 'experiment',
      title: 'Experiment instructions',
      text: 'This is the real experiment.',
      buttonText: 'Start experiment'
    });

    // In the post test questionnaire you can ask your participants addtional questions
    post_test = magpieViews.view_generator("post_test", {
      trials: 1,
      name: 'post_test',
      title: 'Additional information',
      text: 'Answering the following questions is optional, but your answers will help us analyze our results.'

      // You can change much of what appears here, e.g., to present it in a different language, as follows:
      // buttonText: 'Weiter',
      // age_question: 'Alter',
      // gender_question: 'Geschlecht',
      // gender_male: 'männlich',
      // gender_female: 'weiblich',
      // gender_other: 'divers',
      // edu_question: 'Höchster Bildungsabschluss',
      // edu_graduated_high_school: 'Abitur',
      // edu_graduated_college: 'Hochschulabschluss',
      // edu_higher_degree: 'Universitärer Abschluss',
      // languages_question: 'Muttersprache',
      // languages_more: '(in der Regel die Sprache, die Sie als Kind zu Hause gesprochen haben)',
      // comments_question: 'Weitere Kommentare'
    });

    // The 'thanks' view is crucial; never delete it; it submits the results!
    thanks = magpieViews.view_generator("thanks", {
      trials: 1,
      name: 'thanks',
      title: 'Thank you for taking part in this experiment!',
      prolificConfirmText: 'Press the button'
    });
  }
  
  /** trial (magpie's Trial Type Views) below

  * Obligatory properties

      - trials: int - the number of trials this view will appear
      - name: string - the name of the view type as it shall be known to _magpie (e.g. for use with a progress bar)
              and the name of the trial as you want it to appear in the submitted data
      - data: array - an array of trial objects

  * Optional properties

      - pause: number (in ms) - blank screen before the fixation point or stimulus show
      - fix_duration: number (in ms) - blank screen with fixation point in the middle
      - stim_duration: number (in ms) - for how long to have the stimulus on the screen
        More about trial life cycle - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/04_lifecycles_hooks/

      - hook: object - option to hook and add custom functions to the view
        More about hooks - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/04_lifecycles_hooks/

  * All about the properties of trial views
  * https://magpie-ea.github.io/magpie-docs/01_designing_experiments/01_template_views/#trial-views
  */

  first_practice = custom_views.first_practice(
    {
      trials:1,
      name:"first_practice"
    }
  );

  /*
  // Here, we initialize a normal forced_choice view
  const task_switching = custom_views.main_experiment({
    // This will use all trials specified in `data`, you can user a smaller value (for testing), but not a larger value
    trials: trial_info.forced_choice.length,
    // name should be identical to the variable name
    name: 'forced_choice_2A',
    data: trial_info.forced_choice,
    // you can add custom functions at different stages through a view's life cycle
    // hook: {
    //     after_response_enabled: check_response
    // }
  });
  */
  // There are many more templates available:
  // forced_choice, slider_rating, dropdown_choice, testbox_input, rating_scale, image_selection, sentence_choice,
  // key_press, self_paced_reading and self_paced_reading_rating_scale

}