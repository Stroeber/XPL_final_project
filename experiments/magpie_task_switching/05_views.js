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

// text for buttons
var btn_txt = "next";

// Create the views *after* the language was set
function create_views(){

  if (native_language === 'german') {
    btn_txt = "Weiter...";

    // CREATE GERMAN VIEWS
    intro = magpieViews.view_generator("intro", {
      trials: 1,
      name: 'intro',
      title:"Willkommen!",
      text: `<b>Vielen Dank, dass Sie an unserem Experiment teilnehmen!</b><br>
      <br>
      Das Experiment wird insgesamt ungefähr <b>60 min</b> dauern. Stellen Sie bitte sicher, dass Sie das Experiment <b>ungestört ohne abgelenkt zu werden</b> durchführen können. 
      Stellen Sie bitte Smartphone, Music etc. aus und versuchen Sie sich so gut wie möglich auf das Experiment zu konzentrieren.`,
      buttonText: "Experiment beginnen"
    });
    
    instructions = magpieViews.view_generator("instructions", {
      trials: 1,
      name: 'instructions',
      title: 'Generelle Einweisungen',
      text: `In diesem Experiment werden Sie <b>zwei</b> Aufgaben haben:<br><br>
      Die erste Aufgabe besteht darin, sich eine Reihe von Konsonanten zu merken.<br>
      Die zweite Aufgabe findet zwischen dem Anzeigen der einzelnen Buchstaben statt.<br><br>
      Für diese Aufgabe werden Ihnen <b><span style="color: red;">rote</span></b> oder <b><span style="color: blue;">blaue</span></b> Zahlen angezeigt.<br><br>
      Eine <b><span style="color: red;">rote</span></b> Nummer bedeutet, die Aufgabe ist eine <b>Größenordnungs</b> Aufgabe, bei der Sie entscheiden sollen, ob die gezeigte Zahl <b>kleiner oder größer als 5</b> ist. <br>
      Dazu benutzen Sie die Pfeiltasten:
      <br>Die <b>linke Pfeiltaste für Zahlen <5: ←</b><br>
      und die
      <b>rechte Pfeiltaste für Zahlen >5: →</b><br><br>
      Eine <b><span style="color: blue;">blaue</span></b> Nummer bedeutet, die Aufgabe ist eine <b>Paritäts</b> Aufgabe. Hier sollen Sie entscheiden ob die Zahl <b>ungerade oder gerade</b> ist.<br>
      Dazu benutzen Sie ebenfalls die Pfeiltasten:
      <br>Die <b>linke Pfeiltaste für ungerade Zahlen: ←</b>
      <br>und die
      <b>rechte Pfeiltaste für gerade Zahlen: →</b><br><br>
      Keine Sorge, bevor das eigentliche Experiment beginnt, werden Sie die verschiedenen Aufgaben Schritt für Schritt in 3 verschiedenen Übungen kennenlernen.`,
      buttonText: btn_txt
    });

    first_practice_inst = magpieViews.view_generator("begin", {
      trials: 1,
      name: 'first_practice',
      title: '1. Übung',
      text: `Das ist der erste Übungsblock.<br><br>
      In dieser Übung sollen Sie nur auf die gezeigten Konsonanten achten.<br>
      Sie werden sehen wie das Experiment aufgebaut ist und können sich ein wenig aufwärmen.<br><br>
      Also ignorieren Sie die gezeigten Zahlen und versuchen Sie nur sich die Buchstaben zu merken.</b>`,
      buttonText: 'Starte Übung'
    });

    second_practice_inst = magpieViews.view_generator("begin", {
      trials: 1,
      name: 'second_practice',
      title: '2. Übung',
      text: `Das ist der zweite Übungsblock.<br><br>
      Diesmal sollen Sie nur auf die gezeigten Zahlen achten und können die Buchstaben ignorieren.<br><br>
      Beim ersten Durchgane werden nur <b><span style="color: red;">rote</span></b> Zahlen gezeigt. 
      Sie sollen also entscheiden, ob die gezeigte Zahl 
      <br><b>kleiner ←
      <br>oder
      <br>größer →
      <br> als 5</b> ist.<br><br>
      Im zweiten Durchgang werden die Zahlen <b><span style="color: blue;">blau</span></b> sein.
      Hier sollen Sie entscheiden,  ob die Zahl
      <br><b>ungerade ←
      <br>oder
      <br>gerade →</b> ist.<br><br>
      Danach werden die Aufgabe vermischt und Sie sollen die richtige Entscheidung, abhängig von der Farbe, treffen.`,
      buttonText: 'Starte Übung'
    });

    third_practice_inst = magpieViews.view_generator("begin", {
      trials: 1,
      name: 'third_practice',
      title: '3. Übunge',
      text: `Das ist die letzte Übung.<br><br>
      Jetzt sollen Sie sich die Buchstaben merken <b>und</b> dabei die Zahlenaufgabe lösen.<br>
      Diese Übung ist aufgebaut, wie der Rest des Experimentes.`,
      buttonText: 'Starte Übung'
    });

    experiment_inst = magpieViews.view_generator("begin", {
      trials: 1,
      name: 'experiment',
      title: 'Experiment',
      text: `Jetzt wissen Sie was Sie in dem Experiment erwartet und das richtige Experiment kann beginnen.<br><br>
      Isgesamt werden Sie 32 Durchgänge mit jeweils 3-6 Konsonanten und verschiedenen Zahlenaufgabe (Größenordnung, Parität oder beides) bearbeiten.<br>
      Der Ablauf ist der gleiche, wie in der letzten Übung.`,
      buttonText: 'Starte Experiment'
    });

    // In the post test questionnaire you can ask your participants addtional questions
    post_test = magpieViews.view_generator("post_test", {
      trials: 1,
      name: 'post_test',
      title: 'Zusätzliche Information',
      text: 'Die Beantwortung der folgenden Fragen ist optional, es hilft uns jedoch bei der späteren Analyse Ihrer Ergebnisse.',

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
    intro = magpieViews.view_generator("intro", {
      trials: 1,
      name: 'intro',
      text: `<b>Thank you for participating in our experiment! </b><br>
      <br>
      You will need around <b>60 min</b> to complete the experiment. Please <b>make sure that you will not be distracted</b>. 
      Switch off all messaging systems, your phone, any background music etc., and try to concentrate as much as possible on the task at hand.`,
      buttonText: 'show instructions'
    });

    instructions = magpieViews.view_generator("instructions", {
      trials: 1,
      name: 'instructions',
      title: 'General Instructions',
      text: `In this experiment you have to do <b>two</b> tasks simultaneously:<br><br>
      For the first task you will be shown a series of consonants, which you should try to memorize.<br>
      Between the display of the single consonants, you have to do a second task.<br><br>
      For this task you will be shown a series of numbers from 1 to 9 in either <b><span style="color: red;">red</span></b> or <b><span style="color: blue;">blue</span></b>.<br><br>
      A <b><span style="color: red;">red</span></b> number indicates a <b>magnitude</b> task where your task is to decide if the shown number is <b>smaller or greater than 5</b>. <br>
      To do this you press the
      <br><b>left arrow key for smaller numbers: ←</b><br>
      and the
      <br><b>right arrow key for greater numbers: →</b><br><br>
      A <b><span style="color: blue;">blue</span></b> number indicates a <b>parity</b> task where you have to decide if the number is <b>odd or even</b>.<br>
      To do this you press the
      <br><b>left arrow key for odd numbers: ←</b>
      <br>and the
      <br><b>right arrow key for even numbers: →</b><br><br>
      Don’t worry, before we start the actual experiment we will have 3 different practices to get accustomed to the tasks one by one.`,
      buttonText: btn_txt
    });

    first_practice_inst = magpieViews.view_generator("begin", {
      trials: 1,
      name: 'first_practice',
      title: 'Practice instructions',
      text: `This is the first practice block.<br><br>
      Here you only need to focus on the shown consonants.<br>
      You will see how the experiment will look like and can warm up a bit.<br><br>
      So don’t pay attention to the numbers and just try to <b>memorize the consonants</b>`,
      buttonText: 'Start practice block'
    });

    second_practice_inst = magpieViews.view_generator("begin", {
      trials: 1,
      name: 'second_practice',
      title: 'Practice instructions',
      text: `This is the second practice block.<br><br>
      Now your focus will be on the numbers and you can ignore the consonants.<br><br>
      The first trial will only contain <b><span style="color: red;">red</span></b> numbers, 
      so your task is to decide if the number is 
      <br><b>smaller ←
      <br>or
      <br>greater →
      <br> than 5</b>.<br><br>
      The second trial will only contain <b><span style="color: blue;">blue</span></b> numbers,
      then you have to decide if the number is
      <br><b>odd ←
      <br>or
      <br>even →</b>.<br><br>
      After that the tasks will be mixed and you have to make the right decision for the respective color.`,
      buttonText: 'Start practice block'
    });

    third_practice_inst = magpieViews.view_generator("begin", {
      trials: 1,
      name: 'third_practice',
      title: 'Practice instructions',
      text: `This is the last practice.<br><br>
      Now you have to memorize the consonants <b>and</b> work on the number tasks.<br>
      This is how the rest of this experiment will look like.`,
      buttonText: 'Start practice block'
    });

    experiment_inst = magpieViews.view_generator("begin", {
      trials: 1,
      name: 'experiment',
      title: 'Experiment instructions',
      text: `Now that you know what to expect, the real experiment can begin.<br><br>
      There will be 32 trials in total with 3-6 consonants per trial and with different number tasks (magnitude, parity or both).<br>
      The procedure will be the same as in the last practice.`,
      buttonText: 'Start experiment'
    });

    // In the post test questionnaire you can ask your participants addtional questions
    post_test = magpieViews.view_generator("post_test", {
      trials: 1,
      name: 'post_test',
      title: 'Additional information',
      text: 'Answering the following questions is optional, but your answers will help us analyze our results.'
    });

    // The 'thanks' view is crucial; never delete it; it submits the results!
    thanks = magpieViews.view_generator("thanks", {
      trials: 1,
      name: 'thanks',
      title: 'Thank you for taking part in this experiment!',
      prolificConfirmText: 'Press the button to end the experiment'
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

  // Calculate complete number of trials for first practice
  // Add type display and recall trial for each block
  var first_practice_length = first_practice_data.length*2;
  // Add consonant and digit trials per block: (1 consonant + 8 digits)*number of consonants
  for (let trial of first_practice_data) {
    first_practice_length += trial.seq_length*9;
  }

  // Calculate complete number of trials for second practice
  // Add type display and recall trial for each block
  var second_practice_length = second_practice_data.length*2;
  // Add consonant and digit trials per block: (1 consonant + 8 digits)*number of consonants
  for (let trial of second_practice_data) {
    second_practice_length += trial.seq_length*9;
  }

  // Calculate complete number of trials for third practice
  // Add type display and recall trial for each block
  var third_practice_length = third_practice_data.length*2;
  // Add consonant and digit trials per block: (1 consonant + 8 digits)*number of consonants
  for (let trial of third_practice_data) {
    third_practice_length += trial.seq_length*9;
  }

  // Calculate complete number of trials for main experiment
  // Add type display and recall trial for each block
  var main_trial_length = main_trial_data.length*2;
  // Add consonant and digit trials per block: (1 consonant + 8 digits)*number of consonants
  for (let trial of main_trial_data) {
    main_trial_length += trial.seq_length*9;
  }

  first_practice = custom_views.task_switch(
    {
      trials:first_practice_length,
      name:"first_practice",
      data:first_practice_data,
      buttonText: btn_txt
    }
  );
  second_practice = custom_views.task_switch(
    {
      trials:second_practice_length,
      name:"second_practice",
      data:second_practice_data,
      buttonText: btn_txt
    }
  );

  third_practice = custom_views.task_switch(
    {
      trials:third_practice_length,
      name:"third_practice",
      data:third_practice_data,
      buttonText: btn_txt
    }
  );

  main_experiment = custom_views.task_switch(
    {
      trials:main_trial_length,
      name:"main_experiment",
      data:main_trial_data,
      buttonText: btn_txt
    }
  );
}