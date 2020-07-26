// In this file you can specify the trial data for your experiment

// Initialize lists for trial data
var main_trial_data = [];
var first_practice_data = [];
var second_practice_data = [];
var third_practice_data = [];

var digits = _.range(1,5).concat(_.range(6,10));

// Grouping consonants to avoid confusion by sound(eg. H,K in german, J,K in english) or vision(eg. V,W)
var ger_consonants = [['B','D','P','T'],['C'],['F','S'],['G'],['H','K'],['J'],['L'],['M','N'],['Q'],['R'],['V','W'],['X'],['Y'],['Z']];
var eng_consonants = [['B','D','P','T'],['C'],['F','S'],['G'],['H'],['J','K'],['L'],['M','N'],['Q'],['R'],['V','W'],['X'],['Y'],['Z']];

// Translations
var consonant_string = `consonants`;
var practice_string = `practice`;
var magnitude_string = `magnitude tasks`;
var parity_string = `parity tasks`;
var mixed_string = `mixed tasks`;
var continue_info = `press space to continue`;
var recall_info = `Now type the series of consonants in their appearing order:
<p style="font-size:x-large;text-align: center">If you can’t remember a letter just use space</p>`;

// Create the trial data *after* the language was set
function create_trials(){
    // Setting the rigth consonants and some translations
    if(native_language==="german"){
        var cons = ger_consonants;
        consonant_string = `Konsonanten`;
        practice_string = `Übung`;
        magnitude_string = `Größenordungs-Aufgaben`;
        parity_string = `Paritäts-Aufgaben`;
        mixed_string = `gemischte Aufgaben`;
        continue_info = `zum Starten Leertaste drücken`;
        recall_info = `Geben Sie jetzt die Konsonanten, die Sie sich gemerkt haben, in der Reihenfolge, in der diese gezeigt wurden, ein:
        <p style="font-size:x-large;text-align: center">Wenn Sie sich nicht mehr an einen Buchstaben erinnern können, drücken sie einfach die Leertaste</p>`;
    } else if (native_language==="english") {
        var cons = eng_consonants;
    }

    /*
    // Create 1. practice:
    // One trial for each length of letter series
    for(var letter_count = 3; letter_count<=6; letter_count++){
        first_practice_data.push(create_trial(cons,letter_count,practice_string,"magnitude"));
    }
    */

    // Create shorter 1. practice:
    first_practice_data.push(create_trial(cons,3,practice_string,"magnitude"));

    // Create 2. practice:
    // One trial for each type of task
    second_practice_data.push(create_trial(cons,1,magnitude_string,"magnitude"));
    second_practice_data.push(create_trial(cons,1,parity_string,"parity"));
    second_practice_data.push(create_trial(cons,1,mixed_string,"mixed"));    

    // Create 3. practice:
    // One mixed trial
    third_practice_data.push(create_trial(cons,3,mixed_string));

    /*
    // Create main trials:
    // 2 magnitude tasks 3-6 letters
    // 2 parity tasks 3-6 letters
    // 4 mixed tasks 3-6 letters
    for(var letter_count = 3; letter_count<=6; letter_count++){
        for(const i in _.range(2)){
            main_trial_data.push(create_trial(cons,letter_count,magnitude_string,"magnitude"));
            main_trial_data.push(create_trial(cons,letter_count,parity_string,"parity"));
        }
        for(const i in _.range(4)){
            main_trial_data.push(create_trial(cons,letter_count,mixed_string,"mixed"));
        }
    }
    */

    // Create main trials:
    // 1 magnitude tasks 4 - 6 lettters
    // 1 parity tasks 4 - 6 lettters
    // 1 mixed tasks 4 - 6 lettters
    for(var letter_count = 4; letter_count<=6; letter_count++){
            main_trial_data.push(create_trial(cons,letter_count,magnitude_string,"magnitude"));
            main_trial_data.push(create_trial(cons,letter_count,parity_string,"parity"));
            main_trial_data.push(create_trial(cons,letter_count,mixed_string,"mixed"));                   
    }

    main_trial_data = _.shuffle(main_trial_data);
}    

function create_trial(cons,letter_count,task_string,task){
    const numbers = create_number_series(letter_count);
    const colors = create_color_series(letter_count,task);
    const trial = {
        type: task,
        type_string: `<p>${letter_count} ${consonant_string} - ${task_string}</p>
            <p style="font-size:x-large;text-align: center">${continue_info}</p>`,
        seq_length: letter_count,
        consonants: create_consonant_series(cons,letter_count),
        numbers: numbers,
        colors: colors,
        expected_keys: create_expected_key(numbers,colors),
        recall_info: recall_info
    }
    return trial;
}

function create_consonant_series(cons, length){
    // Deep copy to remove used groups
    cons_group = _.cloneDeep(cons);
    let series = [];
    for (const i in _.range(length)) {
        new_cons_group = _.sample(cons_group);
        // Remove already sampled group to avoid duplicates
        _.pull(cons_group,new_cons_group);
        series[i] = _.sample(new_cons_group);
    }
    return series;
}

function create_number_series(letter_count){
    let series = [];    
    for (const i in _.range(letter_count)) {
        let block = [];
        for (const j in _.range(8)) {
            last_digit = block[j-1];
            new_digit = _.sample(digits);
            // Checking for immediate repetition
            while (last_digit===new_digit) {
                new_digit = _.sample(digits);
            }
            block.push(new_digit);
        }
        series.push(block);
    }
    return series;
}

function create_color_series(letter_count,task){
    switch (task) {
        case "magnitude":
            return _.fill(Array(letter_count),_.fill(Array(8),'red'));
        case "parity":
            return _.fill(Array(letter_count),_.fill(Array(8),'blue'));   
        default:
            let colors = [];
            for (const i in _.range(letter_count)) {
                let block = [];
                for (const j in _.range(8)) {
                    block.push(_.sample(['red','blue']));
                }
                colors.push(block);
            }
            return colors;
    }
}

function create_expected_key(numbers,colors){
    expected_key=[];
    for (const i in numbers) {
        let block = []; 
        for (const j in numbers[i]) {
            if (colors[i][j]==="red") {
                block.push(numbers[i][j]>5 ? "ArrowRight" : "ArrowLeft");
            } else {
                block.push(numbers[i][j]%2==0 ? "ArrowRight" : "ArrowLeft");
            }
        }
        expected_key.push(block);
    }
    return expected_key;
}