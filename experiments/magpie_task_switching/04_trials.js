// In this file you can specify the trial data for your experiment

// Initialize lists for trial data
var trial_data = [];
var first_practice_data = [];
var second_practice_data = [];
var third_practice_data = [];

var digits = _.range(1,5).concat(_.range(6,10));

// Grouping consonants to avoid confusion by sound(eg. H,K in german, J,K in english) or vision(eg. V,W)
var ger_consonants = [['B','D','P','T'],['C'],['F','S'],['G'],['H','K'],['J'],['L'],['M','N'],['Q'],['R'],['V','W'],['X'],['Y'],['Z']];
var eng_consonants = [['B','D','P','T'],['C'],['F','S'],['G'],['H'],['J','K'],['L'],['M','N'],['Q'],['R'],['V','W'],['X'],['Y'],['Z']];

// Translations
var letter_string = `letters`;
var magnitude_string = `magnitude tasks`;
var parity_string = `parity tasks`;
var mixed_string = `mixed tasks`;

// create the trial data *after* the language was set
function create_trials(){
    // Setting the rigth consonants and some translations
    if(native_language==="german"){
        var consonants = ger_consonants;
        letter_string = `Buchstaben`;
        magnitude_string = `Größenordungs-Aufgaben`;
        parity_string = `Paritäts-Aufgaben`;
        mixed_string = `gemischte Aufgaben`;
    } else if (native_language==="english") {
        var consonants = eng_consonants;
    }

    // Create 1. practice:
    // One trial for each length of letter series
    for(var letter_count = 3; letter_count<=6; letter_count++){
        first_practice_data.push(create_magnitude_trial(consonants,letter_count));
    }

    // Create 2. practice:
    // One trial for each type of task
    second_practice_data.push(create_magnitude_trial(consonants,1));
    second_practice_data.push(create_parity_trial(consonants,1));
    second_practice_data.push(create_mixed_trial(consonants,1));    

    // Create 3. practice:
    // One mixed trial
    third_practice_data.push(create_mixed_trial(consonants,3));

    // Create main trials:
    // 2 magnitude tasks
    // 2 parity tasks
    // 4 mixed tasks    
    for(var letter_count = 3; letter_count<=6; letter_count++){
        for(const i in _.range(2)){
            trial_data.push(create_magnitude_trial(consonants,letter_count));
            trial_data.push(create_parity_trial(consonants,letter_count));
        }
        for(const i in _.range(4)){
            trial_data.push(create_mixed_trial(consonants,letter_count));
        }
    }
    console.log(trial_data);
}    

function create_magnitude_trial(consonants,letter_count){
    let letters = create_consonant_series(consonants,letter_count);
    let numbers = [];
    let colors = _.fill(Array(letter_count*8),'red');
    for (const i in _.range(letter_count)) {
        numbers[i] = create_number_series();
    }
    trial = {
        type: `${letter_count} ${letter_string} - ${magnitude_string}`,
        letter: letters,
        number: numbers,
        color: colors
    }
    return trial;
}

function create_parity_trial(consonants,letter_count){
    let letters = create_consonant_series(consonants,letter_count);
    let numbers = [];
    let colors = _.fill(Array(letter_count*8),'blue');
    for (const i in _.range(letter_count)) {
        numbers[i] = create_number_series();
    }
    trial = {
        type: `${letter_count} ${letter_string} - ${parity_string}`,
        letter: letters,
        number: numbers,
        color: colors
    }
    return trial;
}

function create_mixed_trial(consonants,letter_count){
    let letters = create_consonant_series(consonants,letter_count);
    let numbers = [];
    let colors = [];
    for (let i in _.range(letter_count)) {
        numbers[i] = create_number_series();
        for (let j in _.range(8)) {
            colors.push(_.sample(['red','blue']));
        }
    }
    trial = {
        type: `${letter_count} ${letter_string} - ${mixed_string}`,
        letter: letters,
        number: numbers,
        color: colors
    }
    return trial;
}

function create_consonant_series(consonants, length){
    // Javascript passes arrays by reference
    cons = _.cloneDeep(consonants);
    let series = [];
    for (let i in _.range(length)) {
        new_cons_group = _.sample(cons);
        // Remove already sampled group to avoid duplicates
        _.pull(cons,new_cons_group);
        series[i] = _.sample(new_cons_group);
    }
    return series;
}

function create_number_series(){
    let series = [];
    for (let i in _.range(8)) {
        last_digit = series[i-1];
        new_digit = _.sample(digits);
        // Checking for immediate repetition
        while (last_digit===new_digit) {
            new_digit = _.sample(digits);
        }
        series[i] = new_digit;
    }
    return series;
}