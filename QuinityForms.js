// Array met geldige Nederlandse kengetallen  (excl. de voorloopnul).
// Let op: als je een aanpassing doet in deze array, doe deze dan ook in de klasse DataType, in de statische variabele DUTCH_AREA_CODES!!!
var qfs_dutchAreaCodes = [
                     			"599", "598", "597", "596", "595", "594", "593", "592", "591", "578", "577", "575", "573", "572", "571", "570",
                    			"566", "562", "561", "548", "547", "546", "545", "544", "543", "541", "529", "528", "527", "525", "524",
                    			"523", "522", "521", "519", "518", "517", "516", "515", "514", "513", "512", "511", "499", "497", "495",
                    			"493", "492", "488", "487", "486", "485", "481", "478", "475", "418", "416", "413", "412", "411", "348",
                    			"347", "346", "345", "344", "343", "342", "341", "321", "320", "318", "317", "316", "315", "314", "313", "299",
                    			"297", "294", "255", "252", "251", "229", "228", "227", "226", "224", "223", "222", "187", "186", "184",
                    			"183", "182", "181", "180", "174", "172", "168", "167", "166", "165", "164", "162", "161", "118", "117", 
                    			"115", "114", "113", "111",
                    			"79", "78", "77", "76", "75", "74", "73", "72", "71", "70", "58", "55", "53", "50",
                    			"46", "45", "43", "40", "38", "36", "35", "33", "30", "26", "24", "23", "20", "15", "13", "10",
                    			"6",
                    			"800", "85", "87", "88",
                    			"900", "906", "909", "91"
];

var qfs_emptyString = /^\s*$/;
//The number of milliseconds in one day
var qfs_ONE_DAY = 1000 * 60 * 60 * 24;

// Verbergt het element 'elementIdentifier'.
function qfs_hideElement(elementIdentifier) {  
	qis_jQuery('#' + elementIdentifier).hide();
}

// Toont het element 'elementIdentifier'.
function qfs_showElement(elementIdentifier) {  
	qis_jQuery('#' + elementIdentifier).show();
}

// Toont of verbergt een element, afhankelijk van de waarde van 'show'.
// Deze methode gebruikt visibility zodat de layout niet verschuift.
function qfs_setVisibility(show, element) {
	if (show) {
		qis_jQuery('#' + element).css("visibility", "visible")
	} else {
		qis_jQuery('#' + element).css("visibility", "hidden")
	}
}

// Controleert of het element zichtbaar is. 
function qfs_isVisibleElement(element) {
	return qis_jQuery('#' + element).css("visibility") == "visible";
}

// Toont of verbergt het element 'elementIdentifier', afhankelijk van de waarde van 'show'.
function qfs_showOrHideElement(show, elementIdentifier) {
	if (show) {
		qfs_showElement(elementIdentifier);
	} else {
		qfs_hideElement(elementIdentifier);
	}
}

// Enablet/disablet een specifiek label.
function qfs_enableDisableLabel(enable, elementIdentifier) {

	// Haal het label op.
	var labelObj = qis_jQuery('#' + elementIdentifier);
	
	// Enable of disable het label.
	if (enable) {
		labelObj.attr('class', 'applicable');
	} else {
		labelObj.attr('class', 'labelDisabled');
	}
}

// Enablet/disablet een specifiek invoerveld.
function qfs_enableDisableField(enable, elementIdentifier) {

	// Haal het veld op.
	var fieldObj = document.getElementById(elementIdentifier);
	
	if (fieldObj==null) {
		return;
	}

	// Enable of disable het veld.
	if (enable) {
		fieldObj.disabled = false;
	} else {
		fieldObj.disabled = true;

		// Maak het veld leeg.
		if (fieldObj.type == 'text') {
			fieldObj.value = '';
		} else if (fieldObj.type == 'select-one') {
			fieldObj.selectedIndex = 0;
		}
	}
}

//Enablet/disablet een specifiek invoerveld zonder het veld leeg te maken.
function qfs_enableDisableFieldWithoutResettingValue(enable, elementIdentifier) {

	// Haal het veld op.
	var fieldObj = document.getElementById(elementIdentifier);
	
	if (fieldObj==null) {
		return;
	}

	// Enable of disable het veld.
	if (enable) {
		fieldObj.disabled = false;
	} else {
		fieldObj.disabled = true;
	}
}

//Bepaalt of een element zichtbaar is aan de hand van de afwezigheid van de klasse 'nonApplicable'.
function qfs_isVisible(elementName) {
	var object = document.getElementById(elementName);

	if (object == null) { 
		return true;
	}
	
	return  !qfs_checkActiveStyleClassForElement(object, 'nonApplicable');
}

// Bepaalt of de radiobutton geselecteerd is.
function qfs_isChecked(radioName, radioValue) {
	var radioButtonObj = document.forms["qfs_form"].elements[radioName];
	for (var i=0; i < radioButtonObj.length; i++) {
		if (radioButtonObj[i].value==radioValue) {
			// Radiobutton gevonden, geef terug of die geselecteerd is.
			return radioButtonObj[i].checked;
		}
	}
	return false;
}

// Wijzigt de opgeslagen gegevens als de gebruiker een ander keuzerondje aanklikt.
function qfs_changeRadio(radioName, selectedRadioId) {
	qis_jQuery("#qfs_form input[name=" + radioName + "_radio]")
			.add("#colorbox input[name=" + radioName + "_radio]")
			.each(function() {
		var $this = qis_jQuery(this);
		var radioId = $this.attr('id');
		if (radioId == selectedRadioId + "_radio") {
			// Dit is de geselecteerde radio-button.
			// Zet het bijbehorende hidden input element op 'waar'.
			qis_jQuery("#" + selectedRadioId).val('1');
		} else {
			// Dit is een radiobutton in dezelfde groep die niet geselecteerd is.
			// Bepaal de id van het hidden input element dat bij deze radio hoort.
			var elementId = radioId.substr(0,radioId.length-6);
			// Zet het hidden input element dat bij deze radio hoort op 'niet waar'.
			qis_jQuery("#" + elementId).val('0');
			$this.change();
		}
	});
}

// Date
function qfs_isDateAA(inputObj){
	return qfs_isDate(inputObj, "dd-MM-yyyy");
}

function qfs_compareDatesAA(inputObj, dateValue2){
	qfs_isDateAA(inputObj);
	var dateValue1 = inputObj.value;
	return qfs_compareDates(dateValue1, dateValue2);

}

/**
 * Methode compareDecimals vergelijkt de decimale waarde van twee strings met elkaar.
 *
 * @param inputObj is de waarde die vergeleken wordt met decimalValue2
 * @param decimalValue2 is de waarde waarmee inputObj wordt vergeleken
 * @param decimalSeparator is het scheidingsteken dat gebruikt wordt voor decimalen
 * @param groupingSeparator is het scheidingsteken dat gebruikt wordt voor duizend-tallen
 * @return de waarde 1 als de decimale waarde van inputObj groter is dan decimalValue2, <br/>
 *         de waarde -1 als de decimale waarde van inputObj kleiner is dan decimalValue2, <br/>
 *         de waarde 0 als de twee waardes gelijk aan elkaar zijn.
 */
function qfs_compareDecimals(inputObj, decimalValue2, decimalSeparator, groupingSeparator){
	var decimalValue1 = inputObj.value;

    // In beide strings verwijderen we alle scheidingstekens voor duizend-tallen.
    while (decimalValue1.indexOf(groupingSeparator) != -1) {
        decimalValue1 = decimalValue1.replace(groupingSeparator, '');
	}
    while (decimalValue2.indexOf(groupingSeparator) != -1) {
        decimalValue2 = decimalValue2.replace(groupingSeparator, '');
	}

    // In beide strings vervangen we het opgegeven decimale scheidingsteken door '.'.
    decimalValue1 = decimalValue1.replace(decimalSeparator, '.');
    decimalValue2 = decimalValue2.replace(decimalSeparator, '.');

    // Parse de beide strings naar floating point getallen.
    decimalValue1 = parseFloat(decimalValue1);
	decimalValue2 = parseFloat(decimalValue2);

    // Het systeem retourneert een 1, -1 of 0 afhankelijk of de waarde van decimalValue1 resp. groter, kleiner of
    // gelijk aan de waarde van decimalValue2 is.
    if (decimalValue1 > decimalValue2) {
        return 1;
    } else if (decimalValue1 < decimalValue2) {
        return -1;
    } else {
        return 0;
    }
}

// Functie voor de elf-proef.
function qfs_elevenTest(value) {
	var length = value.length;
	var sum = 0;
	
	for (var i=0; i < length; i++) {
		sum = sum + (value.charAt(i) * (length - i));
	}
	
	return ((sum % 11) == 0) && sum > 0;
}

// Controleert of de meegegeven waarde een geldig rekeningnummer voldoet. 
// Dit kan ofwel een IBAN ofwel een Nederlands BBAN zijn.
function qfs_isValidBankAccountNumber(inputObj) {	
	// Controleer of de meegegeven waarde aan het IBAN formaat
	// of het Nederlands BBAN formaat voldoet.
	return qfs_isInternationalBankAccountNumber(inputObj) ||
			qfs_isBankAccountNrNL(inputObj);
}

// Controleert of de meegegeven waarde aan het IBAN-formaat voldoet.
function qfs_isInternationalBankAccountNumber(inputObj) {	

	// Het is een geldige IBAN als aan de volgende voorwaarden is voldaan:
	// 1. de invoer heeft minimaal lengte 15 en maximaal lengte 34;
	// 2. de invoer op positie 1 en 2 komt voor als ISO landcode binnen het systeem;
	// 3. de invoer op positie 3 en 4 is numeriek (dit bevat het controlegetal) en voldoet aan de ISO 7064 mod 97-10 checksum.
	
	// Clientside controleren we op dit moment nog niet of positie 1 en 2 overeenkomen met een 
	// ISO landencode. 
	
	// Zet de invoer in een tijdelijke variable en verwijder de spaties
	var tempIBAN = inputObj.value.replace(/ /g,'');
	
	// Controleer of de invoer aan het volgende formaat voldoet:
	// 2 letters, 2 cijfers en tussen de 11 en 30 alfanumerieke karakters.
	var match = /^[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{11,30}$/;
	if (!match.test(tempIBAN)) {
		return false;
	}
	
	// Controleer of de invoer voldoet aan de checksum-controle.	
	// Stap 1. Verplaats de eerste vier karakters naar het einde.
	tempIBAN = tempIBAN.substring(4, tempIBAN.length) + tempIBAN.substring(0, 4);
	
	// Stap 2. Vervang letters door cijfers
	// (dit doen we met /A/gi, want we willen alle A's case insensitive vervangen).
	tempIBAN = tempIBAN.replace(/A/gi, "10");
	tempIBAN = tempIBAN.replace(/B/gi, "11");
	tempIBAN = tempIBAN.replace(/C/gi, "12");
	tempIBAN = tempIBAN.replace(/D/gi, "13");
	tempIBAN = tempIBAN.replace(/E/gi, "14");
	tempIBAN = tempIBAN.replace(/F/gi, "15");
	tempIBAN = tempIBAN.replace(/G/gi, "16");
	tempIBAN = tempIBAN.replace(/H/gi, "17");
	tempIBAN = tempIBAN.replace(/I/gi, "18");
	tempIBAN = tempIBAN.replace(/J/gi, "19");
	tempIBAN = tempIBAN.replace(/K/gi, "20");
	tempIBAN = tempIBAN.replace(/L/gi, "21");
	tempIBAN = tempIBAN.replace(/M/gi, "22");
	tempIBAN = tempIBAN.replace(/N/gi, "23");
	tempIBAN = tempIBAN.replace(/O/gi, "24");
	tempIBAN = tempIBAN.replace(/P/gi, "25");
	tempIBAN = tempIBAN.replace(/Q/gi, "26");
	tempIBAN = tempIBAN.replace(/R/gi, "27");
	tempIBAN = tempIBAN.replace(/S/gi, "28");
	tempIBAN = tempIBAN.replace(/T/gi, "29");
	tempIBAN = tempIBAN.replace(/U/gi, "30");
	tempIBAN = tempIBAN.replace(/V/gi, "31");
	tempIBAN = tempIBAN.replace(/W/gi, "32");
	tempIBAN = tempIBAN.replace(/X/gi, "33");
	tempIBAN = tempIBAN.replace(/Y/gi, "34");
	tempIBAN = tempIBAN.replace(/Z/gi, "35");
	
	// Stap 3. Controleer dat de mod 97 gelijk is aan 1.
	// tempIBAN bevat op dit moment (in de meeste gevallen) een te groot getal om in javascript als integer te
	// verwerken, dus we kunnen niet gewoon in een keer de modulo nemen.  We gaan staartdelen om de modulo te bepalen.
	// We hakken het getal op in stukjes van zeven cijfers en gaan dan van links naar rechts door het getal heen.
	// We nemen de modulo van de eerste zeven cijfers en dat levert een getal onder de 97.  We plakken daar de volgende
	// zeven cijfers achter en nemen daar de modulo van, etc.  Het tussenresultaat is dus nooit meer dan negen cijfers
	// lang en dat past in een 32-bit integer (javascript werkt eigenlijk met een 64-bits Number datatype, en die kan
	// grotere integers bevatten maar het kan geen kwaad om voorzichtig te zijn, want Safari kan nog grotere getallen
	// aan, dus het is kennelijk browserafhankelijk).
	
	// Bepaal eerst hoeveel stukjes van zeven of minder cijfers er in ons getal zitten.
	var maxDigitsPerPart = 7;
	var nrOfParts = Math.ceil(tempIBAN.length/maxDigitsPerPart);
	
	// Doe nu een loopje om de staartdeling te doen.  Begin met een lege string.
	var tempResult = "";
	for (var i = 0; i < nrOfParts; i++) {
		// Plak het volgende setje cijfers achter ons tussenresultaat.
		tempResult = tempResult + tempIBAN.substring(i*maxDigitsPerPart,(i+1)*maxDigitsPerPart);
		
		// Neem nu de mod 97.
		tempResult = String(tempResult % 97);
	}
	
	// We zijn klaar met staartdelen.  Controleer nu dat de rest gelijk is aan 1.
	if (tempResult != 1) {
		return false;
	}
	
	// De client side controles zijn gelukt. Nu verwijderen we ook hier de spaties uit.
	inputObj.value = inputObj.value.replace(/ /g,'');
	return true;
}

//Controleert of de meegegeven waarde aan het BIC-formaat voldoet.
function qfs_isBankIdentifierCode(inputObj) {
	
	// Het is een geldige BIC als aan de volgende voorwaarden is voldaan:
	// 1. de invoer heeft lengte 8 of lengte 11;
	// 2. de eerste 4 posities zijn letters (dit is de bankcode);
	// 3. de invoer op positie 5 en 6 komt voor als ISO landcode binnen het systeem;
	// 4. de invoer op positie 7 en 8 is alfanumeriek (dit is de plaatscode); 
	// 5. de invoer op posities 9 tot en met 11 is alfanumeriek, indien de lengte 11 is (dit is de filiaalcode- of het afdelingsnummer).
	
	// Clientside controleren we op dit moment nog niet of positie 5 en 6 overeenkomen met een 
	// ISO landencode, dus dit komt overeen met: 
	// 6 letters, 2 verplichte alfanumerieke karakters en 3 optionele alfanumerieke karakters.	
	var match = /^[a-zA-Z]{6}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?$/;	
	return match.test(inputObj.value);
}

// Bankrekeningnummer
function qfs_isBankAccountNr(inputObj){
	// Verwijder de spaties uit de invoer en zet het resultaat in een tijdelijke variable.
	var value = inputObj.value.replace(/ /g,'');

	// De lengte moet minimaal 9 cijfers zijn. Indien de lengte 9 cijfers is, dan mag het eerste cijfer niet een 0 zijn.
	if (value.length < 9 || (value.length == 9 && value.charAt(0) == "0")){
		return false;
	} 
	
	// De waarde moet de elf-proef doorstaan.
	if (!qfs_elevenTest(value)) {
		return false;
	}
	
	// De clientside controles zijn gelukt. We verwijderen de spaties nu echt.
	inputObj.value = inputObj.value.replace(/ /g,'');
	return true;
	
}
// Beleggingsrekeningnummer
function qfs_isInvestmentAccountNr(inputObj) {
	var value = inputObj.value;

	if (value.length < 8){
		return false;
	}else{
		return qfs_elevenTest(value);
	}
}

// Sofi number
function qfs_isSofiNumber(inputObj){
	var getal = inputObj.value;
	var result = true;

	if (getal.length == 8) {
		getal = "0" + getal;
	}

	if (getal.length != 9){
		result=false;
	}else{
		var optel=(getal.charAt(0)*9)+(getal.charAt(1)*8)+(getal.charAt(2)*7)+(getal.charAt(3)*6)+(getal.charAt(4)*5)+(getal.charAt(5)*4)+(getal.charAt(6)*3)+(getal.charAt(7)*2)+(getal.charAt(8)*-1);
		var deel=optel%11;
		if (deel!="0"){
			result=false;
		}
	}

	inputObj.value = getal;
	return result;
}

// ANWB-lidnummer 
function qfs_isANWBMemberNumber(inputObj) {
	var value = inputObj.value;
	
	// Verwijder eventuele spaties.
	value = value.replace(/ /g,'');
	
	//  De lengte van het ingevoerde nummer is 9 of 10.
	if (value.length != 9 && value.length != 10){
		return false;
	}
		
	// Het lidnummmer mag alleen uit cijfers bestaan.
	if (!qfs_isNumberString(value)) {
		return false;
	}
	
	// Als er 10 cijfers zijn ingevoerd, negeren we het eerste (is jaartal van pas-uitgave).
	if(value.length == 10) {
		value = value.substring(1);
	}
	
	// Voer de elf proef uit.
	var length = value.length;
	var sum = 0;
	
	for (var i=0; i < length; i++) {
		sum = sum + (value.charAt(i) * (length - i));
	}
	// De som is deelbaar door elf.
	if ((sum % 11) == 0 && sum > 0) {
		return true;
	}	
		
	// De som is niet deelbaar door elf, maar als de laatste twee cijfers hetzelfde zijn,
	// en de som van de eerste 8 vermenigvuldigingen plus 10, wel deelbaar is door 11,
	// is het ook een geldig lidmaatschapsnummer.
	var lastDigit = value.charAt(length - 1);
	return value.charAt(length - 1) == value.charAt(length - 2)
			&& (sum - lastDigit + 10) % 11 == 0;
	
}

// Belgisch bankrekeningnummer.
function qfs_isBankAccountNrBE(inputObj) {
	// Verwijder de spaties uit de invoer en zet het resultaat in een tijdelijke variable.
	var number = inputObj.value.replace(/ /g,'');

	// Checks op de vorm van de input.
	if (number.length != 12 
		|| isNaN(number.substring(0,10))
		|| isNaN(number.substring(10,12))) {
		return false;
	}
	
	// Checks op het bankrekeningnummer (de 97-proef).
	var firstTenDigits = new Number(number.substring(0,10));
	var checkDigits = new Number(number.substring(10,12));
	
	var result = firstTenDigits % 97;
	if (result == 0 && checkDigits != 97) {
		return false;
	}
	
	if (result != 0 && result != checkDigits) {
		return false;
	}
	
	// De invoer is geldig. We verwijderen alle spaties.
	inputObj.value = inputObj.value.replace(/ /g,'');
	return true;
}

// Controle voor datatype 'Numerieke code'.
function qfs_isNumericCode(inputObject, minLength, maxLength) {
	var value = inputObject.value;
	
	// Controleer of de lengte van de invoer tussen minLength en maxLength ligt.
	if (value.length < minLength || value.length > maxLength) {
		// De lengte ligt buiten de gestelde grenzen.
		return false;
	}
	
	// Controleer of alle karakters van de invoer cijfers zijn.
	var match = /^[0-9]*$/; // Match een string die uit 0 of meer cijfers van 0-9 bestaat.
	return match.test(value);
}

// Controle op post/bankrekeningnummer voor betalingen.
function qfs_isBankAccountNrPayment(number) {
	var value = number.value;
	
	// Wanneer de lengte van een bankrekeningnummer 10 is, dan moet het eerste cijfer een 0 zijn, en het tweede cijfer
	// juist niet om een betaalrekening te zijn.
	if (value.length == 10 && (value.charAt(1) == "0" || value.charAt(0) != "0")) {
		return false;
	// Nederlandse betaal-bankrekeningnummers langer dan tien cijfers bestaan niet.
	} else if (value.length > 10) {
		return false;
	} else {
		// Lengte is OK. Voer extra controles uit.
		return qfs_isBankAccountNrNL(number);
	}
}

// (Post)bankaccount number
function qfs_isBankAccountNrNL(input) {
	// Controleer of de invoer een geldig girorekeningnummer bevat
	if (qfs_isPostBankAccountNr(input)) {
		// De invoer is een geldig girorekeningnummer
		return true;
	}
	// Controleer of de invoer een geldig Bankrekeningnummer bevat
	else if (qfs_isBankAccountNr(input)) {
		// De invoer is een geldig bankrekeningnummer
		return true;
	}
	// De invoer is geen geldig giro- of bankrekeningnummer.
	return false;
}

// Postbankaccount number.
function qfs_isPostBankAccountNr(input) {
	// Verwijder de spaties uit de invoer en zet het resultaat in een tijdelijke variable.
	var number = input.value.replace(/ /g,'');
	
	// Controleer of de invoer minimaal 3 en maximaal 7 cijfers bevat.
	if (number.length > 2 && number.length < 8 ) {
		// De invoer bestaat uit minimaal 3 en maximaal 7 cijfers.
		// Controleer of het eerste karakter een p is.
		if ((number.charAt(0).toLowerCase()) == "p") {
			// Het eerste karakter is een p
			// We controleren of de rest van de invoer een geldig getal is >= 100.
			if (!qfs_isPositiveInteger(number.substring(1, number.length)) || 
				parseInt(number.substring(1, number.length)) == 0 ||
				Number(number.substring(1, number.length)) < 100) {
				// De rest van de invoer is geen geldig getal of kleiner dan 100.
				return false;
			}
		}
		else {
			// We controleren of de invoer een geldig getal is >= 100.
			if (!qfs_isPositiveInteger(number.substring(0, number.length)) || 
				parseInt(number.substring(0, number.length)) == 0 ||
				Number(number.substring(0, number.length)) < 100) {
				// De invoer is geen geldig getal of kleiner dan 100.
				return false;
			}
		}
	}
	// We controleren of de invoer bestaat uit 8 karakters. In dit geval is een P verplicht.
	else if (number.length == 8) {
		// De invoer bestaat uit 8 karakters.
		// We controleren of het eerste karakter een p is.
		if ((number.charAt(0).toLowerCase()) != "p") {
			// Het eerste karakter is geen p, dus de invoer is geen geldig girorekeningnummer.
			return false;
		}
		else {
			// We controleren of de rest van de invoer een geldig getal is.
			if (!qfs_isPositiveInteger(number.substring(1, number.length)) || 
				parseInt(number.substring(1, number.length)) == 0) {
				// De rest van de invoer is geen geldig getal.
				return false;
			}
		}
	}
	else {
		// De invoer bestaat uit meer dan 8 of minder dan 3 karakters.
		return false;		
	}
	// De invoer is een geldig girorekeningnummer. We verwijderen alle spaties.
	input.value = input.value.replace(/ /g,'');
	return true;
}

function qfs_isPositiveInteger(value) {
	var match = /^[1-9][0-9]*$/;
	return match.test(value);
}

// Airmilesaccount number
function qfs_isAirmilesAccountNr(inputObj){
	var getal = inputObj.value;

	if (getal.length < 9) {
		return false;
	} else {
		return qfs_elevenTest(getal);
	}
}

// Loyalty Program Number
function qfs_isLoyaltyProgramNumber(inputObj){
	var getal = inputObj.value;
	// Het nummer moet beginnen met 360 en vervolgens alleen maar cijfers bevatten.
	var match = /^[3][6][0][0-9]*$/;
	
	return isNumericCode(inputObj, 12, 12) && match.test(getal);
}


// Emailaddress
function qfs_isEmailAddressAA(input){
	var atIndex = input.value.indexOf("@");
	if (atIndex == -1){
		return false;
	}

	var user = input.value.substring(0, atIndex);
	if (user.length == 0) return false;

	var domain = input.value.substring(atIndex+1);	
	if (domain.length == 0) return false;
	if (domain.indexOf(".") == -1) return false;

	var userValidEmailCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&'*+-/=?^_`{|}~.";
	var domainValidEmailCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-";

	for (var j=0 ; j < user.length ; j++) {
		if (userValidEmailCharacters.indexOf(user.charAt(j)) == -1) return false;
	}

	for (j=0 ; j < domain.length ; j++) {
		if (domainValidEmailCharacters.indexOf(domain.charAt(j)) == -1) return false;
	}

	var index = 0;
	var lastIndex = -1;
	while(index != -1){
		index = user.indexOf(".", lastIndex+1);
		if (index == 0 || index == user.length-1) return false;
		if (index - lastIndex == 1) return false;
		lastIndex = index;
	}
	
	index = 0;
	lastIndex = -1;
	while(index != -1){
		index = domain.indexOf(".", lastIndex+1);
		if (index == 0 || index == domain.length-1) return false;
		if (index - lastIndex == 1) return false;
		lastIndex = index;
	}
	
	return true;
}


function qfs_isPostalCodeAA(inputObj) {
	var input = inputObj.value;
	var part1;
	var part2;
	var match1 = /^[0-9]{4}[a-zA-Z]{2}$/;		// Pairs must be 4 nummbers and 2 characters without ' '
	var match2 = /^[0-9]{4} [a-zA-Z]{2}$/;		// Pairs must be 4 nummbers and 2 characters with ' '

	if (match1.test(input)) {
		part1 = input.substring(0,4).toUpperCase();
		part2 = input.substring(4,6).toUpperCase();
	} else if (match2.test(input)) {
		part1 = input.substring(0,4).toUpperCase();
		part2 = input.substring(5,7).toUpperCase();
	} else {
		return false;
	}

	inputObj.value = part1+" "+part2;
	return true;
}

function qfs_isGermanPostalCode(input) {
	var number = input.value;
	// Controleer of de invoer 5 cijfers bevat.
	if (number.length == 5 && qfs_isPositiveInteger(number))  {
		// De invoer bevat 5 cijfers.
		return true;		
	} else {
		// De invoer bevat geen 5 cijfers.
		return false;	
	}
}


function qfs_comparePostalCodesAA(postalCode1, postalCode2){
	var postalCodeValue1 = postalCode1.value;
	return qfs_comparePostalCodes(postalCodeValue1, postalCode2);

}
function qfs_comparePostalCodes(value1, value2){

	if (value1.length == 7){
		value1 = value1.substring(0,4) + value1.substring(5,7);
	}
	if (value2.length == 7){
		value2 = value2.substring(0,4) + value2.substring(5,7);
	}
	var areaCode1 = value1.substring(0,4);
	var areaCode2 = value2.substring(0,4);

	var charCode1 = value1.substring(4,6).toUpperCase();
	var charCode2 = value2.substring(4,6).toUpperCase();

	if (areaCode1 > areaCode2) return 1;
	if (areaCode1 < areaCode2) return -1;
	
	// AreaCodes zijn gelijk.
	if (charCode1 > charCode2) return 1;
	if (charCode1 < charCode2) return -1;
	return 0;
}


//*******************
// From informationLayers.js
//*******************

function qfs_getWindowHeight() {
	var windowHeight = 0;
	if (typeof(window.innerHeight) == 'number') {
		windowHeight = window.innerHeight;
	} 
	else {
		if (document.documentElement && document.documentElement.clientHeight) {
			windowHeight = document.documentElement.clientHeight;
		} 
		else {
			if (document.body && document.body.clientHeight) {
				windowHeight = document.body.clientHeight;
			}
		}
	}
	return windowHeight;
}

function qfs_getBodyHeight(){
	var bodyHeight = 0;
	if (document.body && document.body.scrollHeight){
		bodyHeight = document.body.scrollHeight;
	}else{	
		if (document.body && document.body.offsetHeight){
			bodyHeight = document.body.offsetHeight;
		}
	}
	return bodyHeight;
}

// Toont een informatielaag.
function qfs_showInformationLayerLeftOfMousePointer(event, layer) {
	layer.style.display='inline';
	qfs_positionLayerAtMousePointer(event, layer, false);
	layer.style.visibility = 'visible';
}
function qfs_showInformationLayerRightOfMousePointer(event, layer) {
	layer.style.display='inline';
	qfs_positionLayerAtMousePointer(event, layer, true);
	layer.style.visibility = 'visible';
}
function qfs_hideInformationLayer(layer) {
	layer.style.visibility = 'hidden';
	layer.style.display='none';
}
function qfs_positionLayerAtMousePointer(event, layer, toRight) {
	event = event || window.event;

	var mouseX = event.pageX || (event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
	var mouseY = event.pageY || (event.clientY + (document.documentElement.scrollTop || document.body.scrollTop));

	if (layer && mouseX) { // is the mouseX set ?
		layer.style.top = (mouseY - 15) + "px";

		if (toRight) {
			// Plaats de layer rechts van de muis
			layer.style.left = (mouseX + 15) + "px";
		} else {
			// Plaats de layer links van de muis
			layer.style.left = (mouseX - layer.clientWidth - 15) + "px";
		}
	}
}

//*******************
// From StdInputChecks.js
//*******************

function qfs_isNumberLargerThan(inputObject,min) {
	return !isNaN(inputObject.value) && inputObject.value > min;
}
function qfs_isNumberSmallerThan(inputObject,max) {
	return !isNaN(inputObject.value) && inputObject.value < max;
}
function qfs_isNumberString(string) {
	var match = /^-?[0-9]*$/;
	return match.test(string);
}

function qfs_isNumber(inputObject) {
	return qfs_isNumberString(inputObject.value);
}
function qfs_isInteger(inputObject) {
	if (! qfs_isNumber(inputObject)) {
		return false;
	}
	return inputObject.value <= 0x7fffffff;
}

function qfs_isNumberBetween(inputObject,min,max) {
	return !isNaN(inputObject.value) && min <= inputObject.value && inputObject.value <= max;
}

var qfs_DATEFORMAT_DDMMYYYY = "dd-MM-yyyy",
    qfs_DATEFORMAT_YYYYMMDD = "yyyy-MM-dd";

function qfs_isDate(inputObj, format) {

    var input = inputObj.value,
            formattedDate = qfs_formatDate(input, format);

    if (!formattedDate) {
        return false;
    }

    inputObj.value = formattedDate;

    return true;
}

/**
 * Formatteert de input-datum volgens het meegegeven formaat.
 * @param input De input-datum.
 * @param format 'dd-MM-yyyy' of 'yyyy-MM-dd'
 * @return {*} De geformatteerde datum, of false als er iets mis ging.
 */
function qfs_formatDate(input, format) {
    if (!qfs_isDateString(input, format)) {
        return false;
    }

    var dateFields = qfs_createDateFields(input, format);

    // Pas de waarde in de invoervelden aan.
    if (format == qfs_DATEFORMAT_DDMMYYYY) {
        return dateFields.day + "-" + dateFields.month + "-" + dateFields.year;
    } else if (format == qfs_DATEFORMAT_YYYYMMDD) {
        return dateFields.year + "-" + dateFields.month + "-" + dateFields.day;
    } else {
        return false;
    }
}

/**
 * Controleert of de meegegeven input een datum bevat die we kunnen omzetten naar het meegegeven formaat ('dd-MM-yyyy'
 * of 'yyyy-MM-dd').
 * @param input De te controleren string.
 * @param format 'dd-MM-yyyy' of 'yyyy-MM-dd'
 * @return {boolean} true als de meegegeven datum om te zetten is naar een datum in het meegegeven formaat, anders false.
 */
function qfs_isDateString(input, format) {

    var daymax, dateFields;

    if (format != qfs_DATEFORMAT_DDMMYYYY && format != qfs_DATEFORMAT_YYYYMMDD) {
        return false;
    }

    dateFields = qfs_createDateFields(input, format);

    if (!dateFields) {
        return false;
    }

    if (dateFields.month < 1 || dateFields.month > 12) {
        return false;
    }
    if (dateFields.month == 4 || dateFields.month == 6 || dateFields.month == 9 || dateFields.month == 11) {
        daymax = 30;
    } else {
        if (dateFields.month == 2) {
            if ((dateFields.year % 4 == 0 && dateFields.year % 100 != 0) || dateFields.year % 400 == 0) {
                daymax = 29;
            } else {
                daymax = 28;
            }
        } else {
            daymax = 31;
        }
    }
    if (dateFields.day < 1 || dateFields.day > daymax) {
        return false;
    }
    return true;
}

/**
 * Splitst de meegegeven input-datum op in de componenten dag, maand en jaar en geeft deze terug in een object.
 * @param input De te splitsen datum.
 * @param format 'dd-MM-yyyy' of 'yyyy-MM-dd'
 * @return {*} Een object met daarin de velden day, month, en year (bv. {day: '01', month: '01', year: '1970'}), of false
 * als er iets mis ging.
 */
function qfs_createDateFields(input, format) {

    var match1 = /^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/,              /* 00000000 */
            match2 = /^[0-9][0-9]?\W[0-9][0-9]?\W[0-9][0-9][0-9][0-9]$/,    /* 0[0]-0[0]-0000 */
            match3 = /^[0-9][0-9][0-9][0-9]\W[0-9][0-9]?\W[0-9][0-9]?$/,    /* 0000-0[0]-0[0] */
            match4 = /^[0-9][0-9][0-9][0-9][0-9][0-9]$/,                    /* 000000 */
            match5 = /^[0-9][0-9]?\W[0-9][0-9]?\W[0-9][0-9]$/,              /* 0[0]-0[0]-00 */
            dateFields = {},
            sep,
            sep1,
            sep2,
            i,
            j;

    if (match1.test(input)) {
        // gewenst formaat is "dd-MM-jjjj"
        if (format == qfs_DATEFORMAT_DDMMYYYY) {
            dateFields.day = input.substring(0, 2);
            dateFields.month = input.substring(2, 4);
            dateFields.year = input.substring(4, 8);
        }
        // gewenst formaat is "jjjj-MM-dd"
        if (format == qfs_DATEFORMAT_YYYYMMDD) {
            dateFields.day = input.substring(6, 8);
            dateFields.month = input.substring(4, 6);
            dateFields.year = input.substring(0, 4);
        }
        // controleer of het jaar voor 1231 ligt (en de datum dus hoogstwaarschijnlijk andersom is ingevuld)
        if (dateFields.year < 1231) {
            return false;
        }
        if (dateFields.year > 2050) {
            return false;
        }
    } else if ((match2.test(input) && format == qfs_DATEFORMAT_DDMMYYYY) || (match3.test(input) && format == qfs_DATEFORMAT_YYYYMMDD)) {
        sep = /\W/;
        for (i = 0; i < input.length; i++) {
            if (sep.test(input.charAt(i))) {
                sep1 = i;
                break;
            }
        }
        for (j = i + 1; j < input.length; j++) {
            if (sep.test(input.charAt(j))) {
                sep2 = j;
                break;
            }
        }
        if (format == qfs_DATEFORMAT_DDMMYYYY) {
            dateFields.day = input.substring(0, sep1);
            dateFields.month = input.substring(sep1 + 1, sep2);
            dateFields.year = input.substring(sep2 + 1, input.length);
        }
        if (format == qfs_DATEFORMAT_YYYYMMDD) {
            dateFields.year = input.substring(0, sep1);
            dateFields.month = input.substring(sep1 + 1, sep2);
            dateFields.day = input.substring(sep2 + 1, input.length);
        }
    } else if (match4.test(input)) {
        if (format == qfs_DATEFORMAT_DDMMYYYY) {
            dateFields.day = input.substring(0, 2);
            dateFields.month = input.substring(2, 4);
            dateFields.year = input.substring(4, 6);
            if (dateFields.year >= 20) {
                dateFields.year = "19" + dateFields.year;
            } else {
                dateFields.year = "20" + dateFields.year;
            }
        }
    } else if (match5.test(input)) {
        sep = /\W/;
        for (i = 0; i < input.length; i++) {
            if (sep.test(input.charAt(i))) {
                sep1 = i;
                break;
            }
        }
        for (j = i + 1; j < input.length; j++) {
            if (sep.test(input.charAt(j))) {
                sep2 = j;
                break;
            }
        }
        if (format == qfs_DATEFORMAT_DDMMYYYY) {
            dateFields.day = input.substring(0, sep1);
            dateFields.month = input.substring(sep1 + 1, sep2);
            dateFields.year = input.substring(sep2 + 1, input.length);
            if (dateFields.year >= 20) {
                dateFields.year = "19" + dateFields.year;
            } else {
                dateFields.year = "20" + dateFields.year;
            }
        }
    } else {
        return false;
    }

    if (dateFields.day.length == 1) {
        dateFields.day = "0" + dateFields.day;
    }
    if (dateFields.month.length == 1) {
        dateFields.month = "0" + dateFields.month;
    }

    return dateFields;
}

function qfs_compareDates(dateValue1, dateValue2){
    if (dateValue1 == "" && dateValue2 == "") return 0;
    if (dateValue1 == "" ) return -1;
    if (dateValue2 == "" ) return 1;


	var day = dateValue1.substring(0,2);
	var month = dateValue1.substring(3,5);
	var year = dateValue1.substring(6,10);
	var date1 = year + month + day;

	day = dateValue2.substring(0,2);
	month = dateValue2.substring(3,5);
	year = dateValue2.substring(6,10);
	var date2 = year + month + day;

	if (date1 > date2) return 1;
	if (date1 < date2) return -1;
	return 0;
}

// Controleer of het verschil tussen twee datums kleiner (of gelijk) is dan het gegeven maandverschil
// Het verschil tussen 01-01-2007 en 01-02-2007 is 1 maand en een dag.
function qfs_checkMonthDifferenceBetweenDates(dateValue1, dateValue2, maxMonthsDif){
    if (dateValue1 == "" || dateValue2 == "") return false;

	// Bereken het totaal aantal maanden in datum1 en 2 en vergelijk deze.
	// 1 * zorgt voor de String -> integer conversie 
	// (bij gebruik van parseInt zou je rekening moet houden met voorloop-0)
	var days1 = 1 * dateValue1.substring(0,2);
	var month = 1 * dateValue1.substring(3,5);
	var year = 1 * dateValue1.substring(6,10);
	var totalMonths1 = year * 12 + month;
	
	var days2 = 1 * dateValue2.substring(0,2);
	month = 1 * dateValue2.substring(3,5);
	year = 1 * dateValue2.substring(6,10);
	var totalMonths2 = year * 12 + month;

	// Tel het maximum aantal maanden verschil bij totaalMonths1 op.
	// Als dit totaal groter is dan totalMonths1, 
	// of gelijk maar days1 is groter dan days2, dan liggen datum1 en datum2 binnen maxMonthsDif. 
	return ((totalMonths1 + maxMonthsDif) > totalMonths2 
			|| ((totalMonths1 + maxMonthsDif) == totalMonths2 && days1 > days2));
}

// Bereken het verschil tussen datum1 en datum 2 (dd-mm-yyyy). 
// Als datum1 groter is dan datum2 dan return -1.
// Anders return het aantal dagen tussen 1 en 2.
function qfs_checkDayDifferenceBetweenDates(dateValue1, dateValue2) {
    var date1 = new Date();
	date1 = qis_jQuery.datepicker.parseDate('dd-mm-yy', dateValue1);

	var date2 = new Date();
	date2 = qis_jQuery.datepicker.parseDate('dd-mm-yy', dateValue2); 

	// Als het verschil negatief is. return -1 zodat de JSP dit kan afvangen
	if (date1.getTime() > date2.getTime()) return -1;
	
	// Bereken het verschil in ms.
    var difference_ms = Math.abs(date2.getTime() - date1.getTime());
    
    return (Math.round(difference_ms/qfs_ONE_DAY));
}

// Bepaalt of de datum op een werkdag valt.
function qfs_isDateWorkday(inputObj) {
	return qfs_isDateWorkdayValue(inputObj.value);
}

// Bepaalt of de datum op een werkdag valt.
function qfs_isDateWorkdayValue(value) {
	var date = qis_jQuery.datepicker.parseDate('dd-mm-yy', value);

	// Bepaal dag in de week (0 = zondag, 6 = zaterdag).
	var dayOfWeek = date.getDay();

	return (dayOfWeek != 0 && dayOfWeek != 6);
}

// This function determines the element type of a form element
function qfs_getFormElementType(el) {
	// If nescessary, resolve the first element of an array
	// (radio buttons are typically ordered this way)
	var el0 = el;
	if (typeof el0.tagName == "undefined") {
		el0 = el[0];
	}

	// Resolve the element type
	var eltype = el0.tagName;
	if (eltype == "INPUT") {
		eltype = "INPUT/"+el0.type.toUpperCase();
	}

	return eltype;
}


// This function checks whether the user has changed an input field
function qfs_formChanged(document){
	for (var d = 0; d < document.forms.length; d++) {
		var formObj = document.forms[d];
		for (var i = 0; i < formObj.length; i++) {
			var el = formObj.elements[i];
			var eltype = qfs_getFormElementType(el);

			if (eltype == "INPUT/TEXT") {
				if (el.value != el.defaultValue) {
					return true;
				}
			}
			if (eltype == "INPUT/RADIO") {
				if (el.checked != el.defaultChecked) {
					return true;
				}
			}
			if (eltype == "INPUT/CHECKBOX") {
				if (el.checked != el.defaultChecked) {
					return true;
				}
			}
			if (eltype == "SELECT") {
				for (var j = 0; j < el.length; j++) {
					if (el[j].selected != el[j].defaultSelected) {
						return true;
					}
				}
			}
			if (el.tagName == "TEXTAREA") {
		    	// Vergelijk niet direct met de defaultvalue, maar zet eerst \r\n om in \n. 
		    	// In sommige browsers krijg je anders onterechte meldingen (zie bug 180586) 
		    	var defaultValueToCompare = el.defaultValue;
		    	
				defaultValueToCompare = el.defaultValue.replace(/\r\n/g, "\n");
		    	
		        if (el.value != defaultValueToCompare) {
		            return true;
		        }
			}
		}
	}
	return false;
}

function qfs_clearField(el){
	var eltype = qfs_getFormElementType(el);

	if (eltype == "INPUT/TEXT") {
		el.value = "";
	}
	if (eltype == "INPUT/PASSWORD") {
		el.value = "";
	}
	if (eltype == "INPUT/HIDDEN") {
		el.value = "";
	}
	if (eltype == "INPUT/RADIO") {
		// Zet het radiobutton-element (of de lijst met elementen) om naar een array.
		el = qis_jQuery.makeArray(el);

		// Maak alle radiobuttons leeg.
		for (j=0; j < el.length; j++) {
			el[j].checked = false;
		}

		// Een radio-button-array heeft een verborgen vraag die we waarde bevat.
		// Het id van deze vraag is te bepalen met het id van de eerste radio-button, 
		// door het gedeelte te nemen wat voor _radio staat.
		var elementId = el[0].id;
		var companionId = elementId.substring(0, elementId.indexOf('_radio'));
		var companionElement = document.getElementById(companionId);
		companionElement.value = "";
	}
	if (eltype == "INPUT/CHECKBOX") {
		// Instead of deselecting manually, let the element take care of it.
		// The element will set the inevitable hidden field to the right value.
		if (el.checked) {
			el.click();
		}
	}
	if (eltype == "SELECT") {
		for (var j = 0; j < el.length; j++) {
			if (el[j].value == "") {
				el[j].selected = true;
			} else {
				el[j].selected = false;
			}
		}
	}
	if (eltype == "TEXTAREA") {
		el.value = "";
	}
}

function qfs_resetField(el){
	var eltype = qfs_getFormElementType(el);

	if (eltype == "INPUT/TEXT") {
		el.value = el.defaultValue;
	}
	if (eltype == "INPUT/PASSWORD") {
		el.value = el.defaultValue;
	}
	if (eltype == "INPUT/HIDDEN") {
		el.value = el.defaultValue;
	}
	if (eltype == "INPUT/RADIO") {
		// Zet het radiobutton-element (of de lijst met elementen) om naar een array.
		el = qis_jQuery.makeArray(el);
		
		// Zet alle radiobuttons terug naar de defaultwaarden.
		for (var j=0; j < el.length; j++) {
			el[j].checked = el[j].defaultChecked;
		}

		// Een radio-button-array had standaard een verborgen vraag die de waarde bevat.
		// Als dit veld bestaat moet dit veld ook gereset worden.
		// Het het eventuele id van deze vraag is te bepalen met het id van de eerste radio-button, 
		// door het gedeelte te nemen wat voor _radio staat.
		var elementId = el[0].id;
		var companionId = elementId.substring(0, elementId.indexOf('_radio'));
		var companionElement = document.getElementById(companionId);
		if (companionElement != null) {
			// Het veld bestaat dus zetten we de standaard waarde terug.
			companionElement.value = companionElement.defaultValue;
		}
		
		// Omdat de geselecteerde waarde van het keuzerondje mogelijk is veranderd, moeten we ook de stijlklassen
		// aanpassen die aangeven welk rondje is geselecteerd. De functie voor het aanpassen van de stijlklassen is
		// gekoppeld aan het change-event, dus triggger dit event.
		qis_jQuery(el).change();
	}
	if (eltype == "INPUT/CHECKBOX") {
		// Loop over alle aankruisvakjes heen.
		for (var j=0; j < el.length; j++) {
			// Zet het aankruisvakje terug naar zijn oude waarde. We laten dit door het aankruisvakje zelf doen,
			// waardoor het verborgen veld automatisch de juiste waarde zal krijgen.
			if (el[j].checked != el[j].defaultChecked) {
				el[j].click();
			}
		}
	}
	if (eltype == "SELECT") {
		for (j = 0; j < el.length; j++) {
			el[j].selected = el[j].defaultSelected;
		}
	}
	if (eltype == "TEXTAREA") {
		el.value = el.defaultValue;
	}
}

// Sets the focus to the specified form element.
function qfs_setFocus(el) {
	// If the element is not on the page, we do not set the focus.
	if (el == null) return;

	// Bij radiobuttons moeten we een van de buttons selecteren.
	var eltype = qfs_getFormElementType(el);
	if (eltype == "INPUT/RADIO") {
		// Zet het radiobutton-element (of de lijst met elementen) om naar een array.
		el = qis_jQuery.makeArray(el);

		// Zoek alle elementen met dezelfde naam. Dit is nodig vanwege de functionaliteit 'keuzerondje los'.
		var elName = el[0].name;
		el = qis_jQuery('[name = ' + elName + ']');
		
		// Bepaal de radiobutton die geselecteerd is.
		var checkedRadiobuttonIndex = el.index(el.filter(":checked"));

		// We zetten de focus op het geselecteerde element, en anders het eerste element.
		var index = Math.max(0, checkedRadiobuttonIndex);
		el = el[index];
	}
	
	// Bepaal of het element zichtbaar is. Als dit niet het geval is dan hoeven we ook niet de focus te zetten.
	var elementId = el.id;
	if (elementId == null || elementId.length === 0
			|| !qfs_isVisible(elementId + "_enabled")) {
		return;
	}
	
	// Zet de focus met behulp van elementId.
	qfs_setFocusById(elementId);
}

// Zet de focus op basis van de id van het element.
function qfs_setFocusById(id) {
		// The timeout is to work around a bug in IE:
		// If you set the focus to a text field within 10ms from a focus switch, it doesn't work.
		// Result: you cannot refocus a field after an input check without this timeout.
		setTimeout(function() { qis_jQuery('#' + id).focus(); }, 10);
}

// Zet de klasse van meegegeven element met elementName op 'applicable' als isApplicable waar is, anders op 'nonApplicable'.
function qfs_setApplicable(elementName, isApplicable) {
	var element = qis_jQuery('#' + elementName);
		
	// Controleer of het element bestaat.
	if (element.length == 0) {
		// Bestaat niet. Verander de klasse niet.
		return;
	}	
		
	// Bepaal de nieuwe css-klasse om toe voegen en oude css-klasse om te verwijderen.
	var newClass = isApplicable ? 'applicable' : 'nonApplicable';
	var oldClass = isApplicable ? 'nonApplicable' : 'applicable'; 
	
	// Verwijder de oude klasse van en voeg de nieuwe toe aan het element.
	qfs_removeActiveStyleClassForElement(element, oldClass);
	qfs_addActiveStyleClassForElement(element, newClass);
}

//Function to set the visibility of a named page element.
function qfs_setVisible(elementName, usesSpaceIfHidden, isVisible) {

	var object = document.getElementById(elementName);

	if (object == null) { 
		return;
	}
	
	// Zet de display alleen wanneer die wijzigt
	var oldDisplay = object.style.display;
	var newDisplay = (isVisible || usesSpaceIfHidden ? "" : "none");
	if (oldDisplay != newDisplay) {
		object.style.display = newDisplay;
	}

	// Zet de visibility alleen wanneer die wijzigt
	var oldVisibility = object.style.visibility;
	var newVisibility = (isVisible ? "visible" : "hidden");
	if (oldVisibility != newVisibility) {
		object.style.visibility = newVisibility;
		
		// In IE8 zit een bug, waardoor block level elementen die eerst de visibility "hidden" hebben overgeerfd,
		// niet de visibility "visibile" overerven. Dit probleem treedt op in het formulierensysteem waar de select
		// met id 'foo' in een span zit met id 'foo_enabled'.
		
		// Bepaal de id van het element dat moet worden getoond binnen de '_enabled' span en haal deze op. 
		var element = document.getElementById(elementName.substring(0, elementName.indexOf("_enabled")));

		// Controleer of '_enabled' in de naam voor komt en of het element bestaat.
		if (element) {
			// Pas de zichtbaarheid aan.
			element.style.visibility = newVisibility;
		}
	}
}

// Constructor voor QuestionDisplayParameters object. In dit object slaan we voor een formuliervraag op wat de zichtbaarheid is van
// de vraag en de groep waartoe deze behoort en de wijzigbaarheid van de vraag. We doen dit om de performance te verbeteren:
// * Bij het aanpassen van de zichtbaarheid van alle vragen in een groep doorlopen we alleen de relevante elementen
//   (formuliervragen) i.p.v. alle HTML elementen in het document. Bovendien gaat het doorlopen van een array sneller dan het
//   doorlopen van de elementen in een document.
// * We passen de zichtbaarheid/wijzigbaarheid op het scherm alleen aan als het nodig is.
// Argumenten:
// - fieldName: naam van de formuliervraag
// - isQuestionVisible: geeft weer of de vraag zichtbaar is
// - isGroupVisible: geeft aan of de groep waartoe de vraag behoort zichtbaar is
// - isQuestionEditable: geeft weer of de vraag wijzigbaar is
function qfs_QuestionDisplayParameters(fieldName, isQuestionVisible, isGroupVisible, isQuestionEditable) {
	this.fieldName = fieldName;
	this.isQuestionVisible = isQuestionVisible;
	this.isGroupVisible = isGroupVisible;
	this.isQuestionEditable = isQuestionEditable;
}

// Variabele waarin we de array met QuestionDisplayParameters objecten opslaan. De JavaScript code voor het vullen van deze array wordt
// gegenereerd door de methode FormStateJsp.makeJavaScriptForQuestionDisplayParameters.
var qfs_questionDisplayParametersArray = new Array();

// Bepaalt de index van het element in de QuestionDisplayParameters array met de gegeven waarde voor fieldName.
// Als het element niet is gevonden, retourneert de functie -1.
function qfs_determineIndexInQuestionDisplayParametersArray(fieldName) {
	// Loop over alle elementen in de QuestionDisplayParameters array.
	for (var i = 0; i < qfs_questionDisplayParametersArray.length; i++) {
		// Controleer of fieldName gelijk is aan de gezochte waarde.
		if (fieldName == qfs_questionDisplayParametersArray[i].fieldName) {
			// Retourneer de index.
			return i;
		}
	}
	// Gezochte waarde voor fieldName niet gevonden, retourneer -1 (dit zou in de praktijk niet voor mogen komen!).
	return -1;
}

// Bepaalt of de zichtbaarheid van de vraag op het scherm veranderd moet worden.
// Dit gebeurt op basis van de volgende waarden:
// - huidige zichtbaarheid van de vraag
// - huidige zichtbaarheid van de groep
// - nieuwe zichtbaarheid van de vraag
function qfs_shouldQuestionVisibilityBeChanged(isQuestionVisibleOld, isGroupVisibleOld, isQuestionVisibleNew) {
	// Controleer of de zichtbaarheid van de vraag op het scherm verandert.
	// Dit is het geval als:
	// - de vraag onzichtbaar is op het scherm en hij wordt zichtbaar op het scherm, of
	// - de vraag zichtbaar is op het scherm en hij wordt onzichtbaar op het scherm.
	if (((!isQuestionVisibleOld || !isGroupVisibleOld) && (isQuestionVisibleNew && isGroupVisibleOld))
			|| ((isQuestionVisibleOld && isGroupVisibleOld) && (!isQuestionVisibleNew || !isGroupVisibleOld))) {
		return true;
	}
	return false;
}

// Bepaalt of de zichtbaarheid van de vraag op het scherm veranderd moet worden.
// Dit gebeurt op basis van de volgende waarden:
// - huidige zichtbaarheid van de vraag
// - huidige zichtbaarheid van de groep
// - nieuwe zichtbaarheid van de groep
function qfs_shouldQuestionInGroupVisibilityBeChanged(isQuestionVisibleOld, isGroupVisibleOld, isGroupVisibleNew) {
	// Controleer of de zichtbaarheid van de vraag op het scherm verandert.
	// Dit is het geval als de vraag zichtbaar is en de zichtbaarheid van de groep op het scherm verandert.
	if (isQuestionVisibleOld &&
			(!isGroupVisibleOld && isGroupVisibleNew) || (isGroupVisibleOld && !isGroupVisibleNew)) {
		return true;
	}
	return false;
}

// Toont/verbergt de vraag op het scherm t.g.v. nieuwe zichtbaarheid op vraagniveau.
// De zichtbaarheid van de vraag op het scherm wordt alleen aangepast als dit nodig is.
function qfs_showQuestion(fieldName, isQuestionVisibleNew, useMultipleErrorMessages) {
	// Bepaal de index van het juiste element in de QuestionDisplayParameters array.
	var idx = qfs_determineIndexInQuestionDisplayParametersArray(fieldName);

	// Bepaal de huidige zichtbaarheid van de vraag en de groep.
	var isQuestionVisibleOld = qfs_questionDisplayParametersArray[idx].isQuestionVisible;
	var isGroupVisibleOld = qfs_questionDisplayParametersArray[idx].isGroupVisible;
	
	// Controleer of de zichtbaarheid van de vraag op het scherm moet veranderen.
	if (qfs_shouldQuestionVisibilityBeChanged(isQuestionVisibleOld, isGroupVisibleOld, isQuestionVisibleNew)) {
		// Als we de vraag onzichtbaar maken op het scherm, reset dan de vraag.
		if (!isQuestionVisibleNew || !isGroupVisibleOld) {
			qfs_emptyQuestion(fieldName);
		}

		// Als we de vraag zichtbaar maken op het scherm, en de vraag hoort bij een lijstje radiobuttons, dan geven we 
		// het veld de waarde van de geselecteerde radiobutton.
		if (isQuestionVisibleNew && qis_jQuery('[id^=' + fieldName + "_radio]").length > 0) {
			var checkedRadiobuttonValue = qis_jQuery('#' + fieldName + '_radio input:radio:checked').val();
			qis_jQuery('#' + fieldName).val(checkedRadiobuttonValue);
		}

		// Pas de zichtbaarheid van de vraag aan op het scherm.
		// De vraag is zichtbaar op het scherm als zowel de vraag als de groep zichtbaar zijn.
		qfs_setApplicable(fieldName+"_enabled", (isQuestionVisibleNew && isGroupVisibleOld));

		// Controleer of configuratieparameter useMultipleErrorMessages = true.
		if (useMultipleErrorMessages) {
			// Bepaal de naam van de rij voor de meldingen.
			var nameMessageRow = fieldName.replace(fieldName.substring('qfs_'.length, 'qfs_'.length + 2),"MF");

			// Controleer of de vraag onzichtbaar is op het scherm.
			if (!isQuestionVisibleNew || !isGroupVisibleOld) {
				// Verberg ook de rij voor de messages.
				if (nameMessageRow.lastIndexOf("_") != nameMessageRow.indexOf("_", 'qfs_'.length)) {
					nameMessageRow = nameMessageRow.substring(0, nameMessageRow.lastIndexOf("_"));
				}			
				qfs_setMessage(nameMessageRow, "invisible", "");
			}
			// Pas de zichtbaarheid van de errorLineMarker en de foutmelding/verificatiemelding aan.
			var errorLineMarker = qis_jQuery('#' + nameMessageRow).prevAll("div.errorLineMarker:first");
			var errorFieldRow = qis_jQuery('#' + fieldName.replace(fieldName.substring('qfs_'.length, 'qfs_'.length + 2),"EF"));
			qfs_changeStyleOfErrorFieldLine(errorLineMarker, errorFieldRow, (isQuestionVisibleNew && isGroupVisibleOld));
		}


		// Pas ook de stijl van de labels aan.
		// De labels zijn zichtbaar op het scherm als zowel de vraag als de groep zichtbaar zijn.
		qfs_changeStyleOfLabels(fieldName, (isQuestionVisibleNew && isGroupVisibleOld));
	}

	// Pas de zichtbaarheid van de vraag aan in de QuestionDisplayParameters array.
	qfs_questionDisplayParametersArray[idx].isQuestionVisible = isQuestionVisibleNew;
}

// Toont/verbergt de vraag op het scherm t.g.v. nieuwe zichtbaarheid op groepniveau.
// De zichtbaarheid van de vraag op het scherm wordt alleen aangepast als dit nodig is.
function qfs_showQuestionInGroup(fieldName, isGroupVisibleNew, useMultipleErrorMessages) {
	// Bepaal de index van het juiste element in de QuestionDisplayParameters array.
	var idx = qfs_determineIndexInQuestionDisplayParametersArray(fieldName);

	// Bepaal de huidige zichtbaarheid van de vraag en de groep.
	var isQuestionVisibleOld = qfs_questionDisplayParametersArray[idx].isQuestionVisible;
	var isGroupVisibleOld = qfs_questionDisplayParametersArray[idx].isGroupVisible;

	// Controleer of de zichtbaarheid van de vraag op het scherm moet veranderen.
	if (qfs_shouldQuestionInGroupVisibilityBeChanged(isQuestionVisibleOld, isGroupVisibleOld, isGroupVisibleNew)) {
		// Als we de vraag onzichtbaar maken op het scherm, reset dan de vraag.
		if ((!isQuestionVisibleOld || !isGroupVisibleNew)) {
			qfs_emptyQuestion(fieldName);
		}
		// Pas de zichtbaarheid van de vraag aan op het scherm.
		// De vraag is zichtbaar op het scherm als zowel de vraag als de groep zichtbaar zijn.
		qfs_setApplicable(fieldName+"_enabled", (isQuestionVisibleOld && isGroupVisibleNew));

		// Controleer of configuratieparameter useMultipleErrorMessages = true.
		if (useMultipleErrorMessages) {
			// Bepaal de naam van de rij voor de meldingen.
			var nameMessageRow = fieldName.replace(fieldName.substring('qfs_'.length, 'qfs_'.length + 2),"MF");
			
			// Controleer of de vraag onzichtbaar is op het scherm.
			if (!isQuestionVisibleOld || !isGroupVisibleNew) {
				// Verberg ook de rij voor de messages.
				if (nameMessageRow.lastIndexOf("_") != nameMessageRow.indexOf("_", 'qfs_'.length)) {
					nameMessageRow = nameMessageRow.substring(0, nameMessageRow.lastIndexOf("_"));
				}			
				qfs_setMessage(nameMessageRow, "invisible", "");
			}
			// Pas de zichtbaarheid van de errorLineMarker en de foutmelding/verificatiemelding aan.
			var errorLineMarker = qis_jQuery('#' + nameMessageRow).prevAll("div.errorLineMarker:first");
			var errorFieldRow = qis_jQuery('#' + fieldName.replace(fieldName.substring('qfs_'.length, 'qfs_'.length + 2),"EF"));
			qfs_changeStyleOfErrorFieldLine(errorLineMarker, errorFieldRow, (isQuestionVisibleOld && isGroupVisibleNew));
		}

		// Pas ook de stijl van de labels aan.
		// De labels zijn zichtbaar op het scherm als zowel de vraag als de groep zichtbaar zijn.
		qfs_changeStyleOfLabels(fieldName, (isQuestionVisibleOld && isGroupVisibleNew));
	}
	// Pas de zichtbaarheid van de groep aan in de QuestionDisplayParameters array.
	qfs_questionDisplayParametersArray[idx].isGroupVisible = isGroupVisibleNew;
}

// Maakt een vraag wijzigbaar.
function qfs_showQuestionEditable(fieldName){
	// Bepaal de index van het juiste element in de QuestionDisplayParameters array.
	var idx = qfs_determineIndexInQuestionDisplayParametersArray(fieldName);

	// Bepaal de huidige wijzigbaarheid van de vraag.
	var isQuestionEditableOld = qfs_questionDisplayParametersArray[idx].isQuestionEditable;
	
	// Controleer of de wijzigbaarheid van de vraag op het scherm moet veranderen.
	if (!isQuestionEditableOld) {
		// De vraag was niet wijzigbaar, we maken hem wijzigbaar.
		qfs_setApplicable(fieldName+"_editable", true);
		qfs_setApplicable(fieldName+"_not_editable", false);
	}
	// Pas de wijzigbaarheid van de vraag aan in de QuestionDisplayParameters array.
	qfs_questionDisplayParametersArray[idx].isQuestionEditable = true;
}

// Maakt een vraag niet-wijzigbaar.
function qfs_showQuestionNotEditable(fieldName){
	// Bepaal de index van het juiste element in de QuestionDisplayParameters array.
	var idx = qfs_determineIndexInQuestionDisplayParametersArray(fieldName);

	// Bepaal de huidige wijzigbaarheid van de vraag.
	var isQuestionEditableOld = qfs_questionDisplayParametersArray[idx].isQuestionEditable;
	
	// Controleer of de wijzigbaarheid van de vraag op het scherm moet veranderen.
	if (isQuestionEditableOld) {
		// De vraag was wijzigbaar, we maken hem niet-wijzigbaar (eerst maken we de vraag leeg).
		qfs_emptyQuestion(fieldName);
		qfs_setApplicable(fieldName+"_editable", false);
		qfs_setApplicable(fieldName+"_not_editable", true);
	}
	// Pas de wijzigbaarheid van de vraag aan in de QuestionDisplayParameters array.
	qfs_questionDisplayParametersArray[idx].isQuestionEditable = false;
}

// Verandert de stijl van de labels t.g.v. het tonen/verbergen van een vraag.
function qfs_changeStyleOfLabels(fieldName, isVisible) {
	var idxFirstUnderscore = fieldName.indexOf("_", 'qfs_'.length);
	var idxLastUnderscore = fieldName.lastIndexOf("_");

	// Verander de stijl van het label.
	var nameLabel = fieldName.replace(fieldName.substring('qfs_'.length, 'qfs_'.length + 2),"LA");

	if (idxFirstUnderscore != idxLastUnderscore) {
		nameLabel = nameLabel.substring(0, idxLastUnderscore);
	}
	
	qfs_changeStyleOfLabel(nameLabel, isVisible);

	// Verander de stijl van de tekst links van het invoerveld.
	var nameTextLeft = fieldName.replace(fieldName.substring('qfs_'.length, 'qfs_'.length + 2),"TL");

	if (idxFirstUnderscore != idxLastUnderscore) {
		nameTextLeft = nameTextLeft.substring(0, idxLastUnderscore);
	}
	qfs_changeStyleOfLabel(nameTextLeft, isVisible);

	// Verander de stijl van de tekst rechts van het invoerveld.
	var nameTextRight = fieldName.replace(fieldName.substring('qfs_'.length, 'qfs_'.length + 2),"TR");

	if (idxFirstUnderscore != idxLastUnderscore) {
		nameTextRight = nameTextRight.substring(0, idxLastUnderscore);
	}
	qfs_changeStyleOfLabel(nameTextRight, isVisible);
	
	// Verander de stijl van de infolink.
	var nameInfoLink = fieldName.replace(fieldName.substring('qfs_'.length, 'qfs_'.length + 2),"IL");

	if (idxFirstUnderscore != idxLastUnderscore) {
		nameInfoLink = nameInfoLink.substring(0, idxLastUnderscore);
	}
	qfs_changeStyleOfLabel(nameInfoLink, isVisible);
	
	// Knip de namespace en de twee opvolgende letters (IF) eraf, zodat we groupId_questionId overhouden.
	// Hiermee kan de functie updateStyleOfQuestionRow() gemakkelijk het invoerveld en het bijbehorende label selecteren.
	var fieldId = fieldName.replace(fieldName.substring(0, 'qfs_'.length + 2), "");

	// Maak tabelrij onzichtbaar als alle elementen binnen de rij onzichtbaar zijn.
	// Bij een vraag met weergave 'Invoerveld onder label' kunnen dit twee rijen zijn.
	var questionRows = qfs_determineQuestionRows(fieldId);
	questionRows.each(function(index, questionRow) {
		qfs_updateStyleOfQuestionRow(questionRow);
	});

}

// Reset de vraag.
function qfs_emptyQuestion(fieldName) {
	// Selecteer het veld dat we moeten resetten
	var fields = qis_jQuery('#' + fieldName);

	// Als het veld niet aanwezig is, dan doen we niets.
	if (fields.length == 0) {
		return;
	}

	// Reset het veld.
	qfs_resetField(fields[0]);

	// Voor een radiobutton-array moeten we naast het hidden-field (dat we hierboven gereset hebben)
	// ook iedere individuele radiobutton resetten.
	// Selecteer alle radiobuttons (deze hebben dezelfde naam).
	var radiobuttons = qis_jQuery(':input[name="' + fieldName + '_radio"]');

	// Reset de radiobuttons
	if (radiobuttons.length > 0) {
		qfs_resetField(radiobuttons);
	}

	// Voor een checkbox-array moeten we naast het hidden-field (dat we hierboven gereset hebben)
	// ook iedere individuele checkbox resetten.
	// Selecteer alle checkboxes (deze hebben dezelfde naam).
	var checkboxes = qis_jQuery(':input[name="' + fieldName + '_checkbox"]');

	// Reset de checkboxes
	if (checkboxes.length > 0) {
		qfs_resetField(checkboxes);
	}
}

//This function changes the style class of the element with name elementName in the class given in the 
//attribute cl.
function qfs_setActiveStyleClass(elementName, cl) {
   qis_jQuery('#' + elementName).attr('class', cl);
}

//This function changes the style class of the element element in the class given in the attribute cl.
function qfs_setActiveStyleClassForElement(element,cl) {
	qis_jQuery(element).attr('class', cl);
}

//This function adds the class cl to the style of the given element.
function qfs_addActiveStyleClassForElement(element, cl) {
	qis_jQuery(element).addClass(cl);
}


//This function removes the class cl from the style of the given element.
function qfs_removeActiveStyleClassForElement(element, cl) {
	qis_jQuery(element).removeClass(cl);
}

//This function checks if the class cl is already applied to the element and returns true or false.
function qfs_checkActiveStyleClassForElement(element, cl) {
	return qis_jQuery(element).hasClass(cl);
}

// Toont/verbergt alle vragen binnen een groep.
// De zichtbaarheid van een vraag op het scherm wordt alleen aangepast als dit nodig is.
function qfs_showQuestions(fieldNameStart, isGroupVisible, useMultipleErrorMessages){
	// Doorloop alle elementen in de QuestionDisplayParameters array.
	for (var i = 0; i < qfs_questionDisplayParametersArray.length; i++) {
		var fieldName = qfs_questionDisplayParametersArray[i].fieldName;

		// Controleer of de naam begint met 'IF<questionGroupId>'.
		if (fieldName.substring(0, fieldName.indexOf("_", 'qfs_'.length)) == fieldNameStart){
			// De vraag behoort tot de groep. Toon/verberg de vraag op het scherm.
			qfs_showQuestionInGroup(fieldName, isGroupVisible, useMultipleErrorMessages);
		}
	}	
}

function qfs_showErrorMessageAndFocus(){
	alert(qfs_errorMessage);
	if (typeof qfs_errorField == 'string') {
		if (qfs_errorField.length > 0) {
			qfs_setFocus(document.forms['qfs_form'].elements[qfs_errorField]);
		}
	} else {
		qfs_setFocus(errorField);
	}
}

function qfs_setErrorField(field) {
	// Give all errorfields a highlighted background:
		if (typeof field == "string") {
			if (field != "") {
				qfs_addActiveStyleClassForElement(document.forms["qfs_form"].elements[field],'errorField');
			}
		} else {
			qfs_addActiveStyleClassForElement(field,'errorField')
		}

	// Set the errorField, this will get the focus.
	// only set the errorField if it was not set already before:
	if (qfs_emptyString.test(qfs_errorField)) {
		qfs_errorField = field;
	}
}

function qfs_checkRequired(field, focusField, displayName){
	if ((qfs_trimString(field.value)).length == 0) {
		return false;
	}
	return true;
}

function qfs_isDutchMoney(inputObject) {
	var input = inputObject.value;

	var match = /^[0-9]{1,3}(\.?[0-9]{3})*(,[0-9]{1,2})?$/;

	return match.test(input);
}

function qfs_isDecimalValue(inputObject, numberOfDecimals, decimalSeparator, groupingSeparator) {
	if (decimalSeparator == ',') {
		return qfs_isDecimalValueUsingCommaAsDecimalSeparator(inputObject, numberOfDecimals)
	}
	if (decimalSeparator == '.') {
		return qfs_isDecimalValueUsingDotAsDecimalSeparator(inputObject, numberOfDecimals)
	}
	return false;
}

function qfs_isDecimalValueUsingCommaAsDecimalSeparator(inputObject, numberOfDecimals) {
	var input = inputObject.value;
	var match;
	var inputObjectLength = inputObject.maxLength;

	if (numberOfDecimals == 0){
		match = new RegExp("^-?[0-9]{1,3}(\\.?[0-9]{3})*$");
	}else{
		match = new RegExp("^-?[0-9]{1,3}(\\.?[0-9]{3})*(,[0-9]{1,"+numberOfDecimals+"})?$");
	}

	if (!match.test(input)) {
		return false;
	}

	// Remove all existing thousand separators.
	while (input.match(/.*\..*/)){
		input = input.replace(/\./,'');
	}

	// Vervang komma door punt.
    input = input.replace(/\,/,'.');

    // Converteer de input string naar een float (voor toFixed functie).
	input = parseFloat(input);

	// Controleer het aantal decimalen en vul aan indien nodig.
	input = input.toFixed(numberOfDecimals);

	// Vervang punt door komma.
    input = input.replace(/\./,',');

	// Voeg puntjes toe om de duizendtallen te scheiden.
	while (input.match(/^-?\d\d{3}/)){
		input = input.replace(/(\d)(\d{3}(\.|,|$))/, '$1' + '.' + '$2');
	}

	// Als de geformatteerde invoer NIET in het invoerveld past, stoppen we.
	// Let op: het formaat van de invoer is wel goed (dus we geven true terug), maar we 
	// stoppen de geformatteerde invoer niet in het invoerveld omdat dit niet past.
	// In JavaScript moet vervolgens gecontroleerd worden of de invoer niet groter is 
	// dan de maximale waarde, als dat toch het geval is geeft het systeem alsnog een 
	// foutmelding over de invoer.  
	if (input.length > inputObjectLength){
		return true;
	}

	// Put the formatted number back into the inputfield.
	inputObject.value = input;

	return true;
}

function qfs_isDecimalValueUsingDotAsDecimalSeparator(inputObject, numberOfDecimals) {
	var input = inputObject.value;
	var match;
	var inputObjectLength = inputObject.maxLength;

	if (numberOfDecimals == 0){
		match = new RegExp("^-?[0-9]{1,3}(,?[0-9]{3})*$");
	}else{
		match = new RegExp("^-?[0-9]{1,3}(,?[0-9]{3})*(\\.[0-9]{1,"+numberOfDecimals+"})?$");
	}

	if (!match.test(input)) {
		return false;
	}

	// Remove all existing thousand separators.
	while (input.match(/.*,.*/)){
		input = input.replace(/,/,'');
	}

	// Vervang decimaalteken door punt.
    // Dat hoeft dus niet, want het decimaalteken is een punt.

    // Converteer de input string naar een float (voor toFixed functie).
	input = parseFloat(input);

	// Controleer het aantal decimalen en vul aan indien nodig.
	input = input.toFixed(numberOfDecimals);

	// Vervang punt door decimaalteken.
    // Dat hoeft dus niet, want het decimaalteken is een punt.

	// Add thousand separators.
	while (input.match(/^-?\d\d{3}/)){
		input = input.replace(/(\d)(\d{3}(,|\.|$))/, '$1' + ',' + '$2');
	}

	// Als de geformatteerde invoer NIET in het invoerveld past, stoppen we.
	// Let op: het formaat van de invoer is wel goed (dus we geven true terug), maar we 
	// stoppen de geformatteerde invoer niet in het invoerveld omdat dit niet past.
	// In JavaScript moet vervolgens gecontroleerd worden of de invoer niet groter is 
	// dan de maximale waarde, als dat toch het geval is geeft het systeem alsnog een 
	// foutmelding over de invoer.  
	if (input.length > inputObjectLength){
		return true;
	}
	
	// Put the formatted number back into the inputfield.
	inputObject.value = input;

	return true;
}

/**
 * Formatteert een decimale waarde als een getal met het gegeven aantal decimalen, met het gegeven
 * decimaalscheidingsteken en groepscheidingsteken.
 * @param value De waarde die geformatteerd moet worden.
 * @param numberOfDecimals Het aantal decimalen dat getoond moet worden.
 * @param decimalSeparator Het decimaalscheidingsteken.
 * @param groupingSeparator Het groepscheidingsteken.
 * @returns De geformatteerde waarde.
 */
function qfs_formatDecimalValue(value, numberOfDecimals, decimalSeparator, groupingSeparator) {
	// Converteer de input string naar een float (voor toFixed functie).
	value = parseFloat(value);
	value = value.toFixed(numberOfDecimals);

	// Vervang punt door decimaalteken.
	value = value.replace(/\./,decimalSeparator);

	// Voeg duizendtalscheidingsteken toe.
	while (value.match(/^-?\d\d{3}/)){
		value = value.replace(/(\d)(\d{3}(,|\.|$))/, '$1' + groupingSeparator + '$2');
	}

	return value;
}

function qfs_isDutchLicencePlate(inputObj) {
	var input = inputObj.value;
	// We verwijderen eerst aanwezige streepjes ('-'). 
	input = input.replace(/-/g, "");
	var part1;
	var part2;
	var part3;

	// Sidecode 1 (XX-99-99)
	var match1 = /^([a-zA-Z]{2})(([0-9]){2}){2}$/;
	// Sidecode 2 (99-99-XX)
	var match2 = /^([0-9]{2}){2}[a-zA-Z]{2}$/;
	// Sidecode 3 (99-XX-99)
	var match3 = /^[0-9]{2}[a-zA-Z]{2}[0-9]{2}$/;
	// Sidecode 4 (XX-99-XX)
	var match4 = /^[a-zA-Z]{2}[0-9]{2}[[a-zA-Z]{2}$/;
	// Sidecode 5 (XX-XX-99)
	var match5 = /^([a-zA-Z]{2}){2}[0-9]{2}$/;
	// Sidecode 6 (99-XX-XX	)
	var match6 = /^([0-9]{2})([a-zA-Z]{2}){2}$/;
	// Sidecode 7 (99-XXX-9)
	var match7 = /^([0-9]{2})([a-zA-Z]{3})([0-9]{1})$/;
	// Sidecode 8 (9-XXX-99)
	var match8 = /^([0-9]{1})([a-zA-Z]{3})([0-9]{2})$/;
	// Sidecode 9 (XX-999-X)
	var match9 = /^([a-zA-Z]{2})([0-9]{3})([a-zA-Z]{1})$/;
	// Sidecode 10 (X-999-XX)
	var match10 = /^([a-zA-Z]{1})([0-9]{3})([a-zA-Z]{2})$/;
	// Sidecode 11 (XXX-99-X) (11 en hoger gebruikt vanaf april 2014)
	var match11 = /^([a-zA-Z]{3})([0-9]{2})([a-zA-Z]{1})$/;
	// Sidecode 12 (X-99-XXX)
	var match12 = /^([a-zA-Z]{1})([0-9]{2})([a-zA-Z]{3})$/;
	// Sidecode 13 (9-XX-999)
	var match13 = /^([0-9]{1})([a-zA-Z]{2})([0-9]{3})$/;
	// Sidecode 14 (999-XX-9)
	var match14 = /^([0-9]{3})([a-zA-Z]{2})([0-9]{1})$/;

	if ( match1.test(input) || match2.test(input) || match3.test(input) || match4.test(input) || match5.test(input) || match6.test(input)) {
		// Sidecode 1 t/m 6 
		part1 = input.substring(0,2).toUpperCase();
		part2 = input.substring(2,4).toUpperCase();
		part3 = input.substring(4,6).toUpperCase();
	}	else if (match7.test(input) || match9.test(input)) {
		// Sidecode 7 en 9 
		part1 = input.substring(0,2).toUpperCase();
		part2 = input.substring(2,5).toUpperCase();
		part3 = input.substring(5,6).toUpperCase();
	}  else if (match8.test(input) || match10.test(input)) {
		// Sidecode 8 en 10 
		part1 = input.substring(0,1).toUpperCase();
		part2 = input.substring(1,4).toUpperCase();
		part3 = input.substring(4,6).toUpperCase();				
	}  else if (match11.test(input) || match14.test(input)) {
		// Sidecode 11 en 14 
		part1 = input.substring(0,3).toUpperCase();
		part2 = input.substring(3,5).toUpperCase();
		part3 = input.substring(5,6).toUpperCase();	
	}  else if (match12.test(input) || match13.test(input)) {
		// Sidecode 12 en 13 
		part1 = input.substring(0,1).toUpperCase();
		part2 = input.substring(1,3).toUpperCase();
		part3 = input.substring(3,6).toUpperCase();	
	} else {
		return false;
	}

	inputObj.value = part1+"-"+part2+"-"+part3;
	return true;
}

function qfs_isDutchLicencePlateMotor(inputObj) {
	// Controleer of we een Nederlands kenteken hebben.
	if (!qfs_isDutchLicencePlate(inputObj)) {
		return false;
	} 
	
	var input = inputObj.value;

	var match = /^[0-9-]*M/;		
	// Controleer of de eerste letter van het kenteken een 'M' is. Dit is zo voor alle motorfietskentekens vanaf 1980.
	return match.test(input);
}

function qfs_isDutchLicencePlateMoped(inputObj) {
	// Controleer of we een Nederlands kenteken hebben.
	if (!qfs_isDutchLicencePlate(inputObj)) {
		return false;
	} 
	
	var input = inputObj.value;

	var matchD = /^[0-9-]*D/;
	var matchF = /^[0-9-]*F/;

	// Controleer of de eerste letter van het kenteken een 'D' is of een 'F'. Dit is zo voor alle bromfietskentekens.
	return (matchD.test(input) || matchF.test(input));
}


// Checks if the inputObj is a time in 'uu:mm' or 'u:mm' or 'uu:m' or 'u:m' format,
// If the format is UU:M or U:M or U:MM, the format is changed in UU:MM.
function qfs_isTimeUUMM(inputObj) {
	var input = inputObj.value;
	var hour;
	var minute;

	var match1 = /^[0-9][0-9]:[0-9][0-9]$/;
	var match2 = /^[0-9]:[0-9][0-9]$/;
	var match3 = /^[0-9][0-9]:[0-9]$/;
	var match4 = /^[0-9]:[0-9]$/;

	if (match2.test(input) || match4.test(input)) {
		input = "0" + input;
	}

	if (match1.test(input)) {
		hour = input.substring(0,2);
		minute = input.substring(3,5);
	} else if (match3.test(input)) {
		hour = input.substring(0,2);
		minute = "0" + input.substring(3,4);
	} else {
		return false;
	}

	if (hour > 23) {return false;}
	if (minute > 59) {return false;}

	inputObj.value = hour + ":" + minute;

	return true;
}

// Compares two times of the format 'UU:MM'.
// Returns 1 if the first time is later, -1 if the second time is later and 0 if the times are equal.
function qfs_compareTimesUUMM(timeValue1, timeValue2){
    if (timeValue1 == "" && timeValue2 == "") return 0;
    if (timeValue1 == "" ) return -1;
    if (timeValue2 == "" ) return 1;

	var hour = timeValue1.substring(0,2);
	var minute = timeValue1.substring(3,5);
	var time1 = hour + minute;

	hour = timeValue2.substring(0,2);
	minute = timeValue2.substring(3,5);
	var time2 = hour + minute;

	if (time1 > time2) return 1;
	if (time1 < time2) return -1;
	return 0;
}

// Geeft aan of @string begint met @prefix.
function qfs_startsWith(string, prefix) {
	return string.indexOf(prefix) == 0;
}

// Returns whether or not inputObj.value is a Dutch phone number
function qfs_isDutchPhoneNumber(inputObj) {
    var phoneNumber = inputObj.value;
    
	if (qfs_startsWith(phoneNumber, "0031")) {
		phoneNumber = phoneNumber.substring(4);
	} else if (qfs_startsWith(phoneNumber, "+31")) {
		phoneNumber = phoneNumber.substring(3);
	} else if (qfs_startsWith(phoneNumber, "0")) {
		phoneNumber = phoneNumber.substring(1);
	} else {
		// Dit is geen geldig Nederlands telefoonnummer, want het begint niet
		// met 0031, +31 of 0.
		return false;
	}

	// Het telefoonnummer mag geen letters bevatten.
	if (phoneNumber.search(/[a-zA-Z]/) != -1) {
		return false;
	}

	// Verwijder alle niet-cijfers uit het telefoonnummer.
	phoneNumber = phoneNumber.replace(/[^0-9]/g, "");

	// Er moeten 9 overgebleven cijfers zijn. 
	if (phoneNumber.length != 9) {
		return false;
	}
	
	// Controleer of het telefoonnummer begint met een geldig Nederlands kengetal.
	// Stel het patroon voor de reguliere expressie samen a.d.h.v. de array met Nederlandse kengetallen.
	var patternString = "^(";
	
	for (var i = 0; i < qfs_dutchAreaCodes.length; i++) {
		patternString += ("(" + qfs_dutchAreaCodes[i] + ")");
		
		if (i < (qfs_dutchAreaCodes.length - 1)) {
			patternString += "|";
		}
	}
	patternString += ")";

	var pattern = new RegExp(patternString);
	
    return pattern.test(phoneNumber);
}

function qfs_trimString(str){
	return str.replace(/^\s*|\s*$/g,"");
}

// This function determines the element type of a form element
function qfs_getElementType(el) {
	// If nescessary, resolve the first element of an array
	// (radio buttons are typically ordered this way)
	var el0 = el;
	if (typeof el0.tagName == "undefined") {
		el0 = el[0];
	}

	// Resolve the element type
	var eltype = el0.tagName;
	if (eltype == "INPUT") {
		eltype = "INPUT/"+el0.type.toUpperCase();
	}

	return eltype;
}

// Function that tells whether a document element is a button
function qfs_isButton(el) {
	var eltype = qfs_getElementType(el);

	// Check if this element is a button.
	return eltype == "INPUT/SUBMIT" || eltype == "INPUT/BUTTON";
}


function qfs_disableButtons() {
	var entries = document.getElementsByTagName('input');
	for (var i=0; i < entries.length; i++) {

		if (qfs_isButton(entries[i])) {
			// This element is a button, disable it.
			entries[i].disabled="disabled";	
		}
	}
}

function qfs_callSetIframeHeightIfNeeded(){
  // Check whether this form has a parent-frame (thus lives in an iframe)
  // and the parent-frame has the setIframeHeigth-function.
	if (window.inIframe && parent && parent.setIframeHeight){
    // If both conditions hold, Pass the new height to the parent.
	var bodyHeight = qfs_getBodyHeight();
    parent.setIframeHeight(bodyHeight);

  }
}

function qfs_toUpperCase(value) {
	if (value == null) {
		return value;
	} else {
	 	return value.toUpperCase();
	}
}

// Adds an separator between each character but not at the end.
// Result: strips of all separator, and adds the separator 
// to after each remaining character except the last one.
function qfs_toUpperCaseNormalizedSeparateByIncludingEnd(value, separator) {
		return qfs_toUpperCaseNormalizedSeparateBy(value, separator, true);
}

function qfs_toUpperCaseNormalizedSeparateBy(value, separator, addAtEnd) {
	var separated = qfs_toNormalizedSeparateBy(value, separator, addAtEnd);
	return qfs_toUpperCase(separated);
}


function qfs_toNormalizedSeparateBy(value, separator, addAtEnd) {

    if (value == null || separator == null
    	|| value.length==0 || separator.length == 0) {
    	return value;
    } else {
    	// Strip of all separators.
    	var regexp = new RegExp('(['+separator+'])','g');
    	value = value.replace(regexp,'');
    	
        // Add the separator for each character that is left.
        regexp = new RegExp('([^'+separator+'])','g');
        value = value.replace(regexp, '$1'+separator);
        
        if (!addAtEnd) {
          // remove the last character
          value = value.substring(0,value.length-1);	
        
        }
        return value;
    }
	
}

// De spaties(lege strings) verwijderen. 
function qfs_stripEmptyStrings(value){
	var separator = /^\s*$/; 
	var regexp = new RegExp('(['+separator+'])','g');	
	value = value.replace(regexp,'');
	return value;
}

function qfs_firstCharacterToUpperCase(value) {
	if (value == null || value.length==0 ) {
		return value;
	} else if (value.length == 1){
		return qfs_toUpperCase(value);
	} else {
		var firstCharacter = value.substring(0,1);
		var rest = value.substring(1,value.length);
		
		return qfs_toUpperCase(firstCharacter) + rest;
	}
}

// Tsjechisch bankrekeningnummer
function qfs_isBankAccountNrCZ(inputObj){
	// TODO: Hier is enige verbetering mogelijk!
	var value = inputObj.value;
	return true;
}

// Tsjechisch identificatienummer
function qfs_isCzechPersonalIdNr(inputObj){
	var value = inputObj.value;
	return value.match(/^[\d]{2}[0,1,2,3,5,6,7,8,9][\d][0-3][\d]\/[\d]{3,4}$/);
}

// Bepaalt of de value van inputObj als XML-tagname gebruikt kan worden.
// Dit kan als: het eerste karakter een letter is en de overige karakters letters, cijfers of
// de symbolen '_' (underscore), '.' (dot) of '-' (dash) zijn.
function qfs_isValidForXmlTagName(inputObj) {
	var value = inputObj.value;
	return value.match(/^[a-zA-Z][a-zA-Z0-9_.-]*$/);
}

//Bepaalt of de input een valide ESR nummer is.
function qfs_isValidESRReferenceNumber(numberObj) {
	var numberVal = numberObj.value;

	// De value bevat geen ESR nummer als de lengte ongelijk 16 of 27 is. 
	if (!(numberVal.length == 16 || numberVal.length == 27)) {
		// Geen geldig ESR reference number.
		return false;
	} else {
		// In alle andere gevallen: de waarde is een ESR referentienummer
		// als het check digit aan de modul10-rekusiv proef voldoet.
		return qfs_isModulo10RekursivNumber(numberVal);
	}
}

// Controleert of de gegeven string voldoet aan het modulo10 rekursiv algoritme.
function qfs_isModulo10RekursivNumber(value) {

	// Haal de check digit uit de input (dit is het laatste getal)
	var checkDigit = value.substring(value.length - 1);

	// Bepaal string waarop de modulo 10 rekursiv methode op moet werken
	var valueToComputeCheckDigit = value.substring(0, value.length - 1);
	
	var computedCheckDigit = qfs_determineModulo10RekursivCheckDigit(valueToComputeCheckDigit);
	
	// Bepaal of de check digit in de input klopt met de bepaalde check digit
	return checkDigit == computedCheckDigit;
}
		
// Bepaal het check digit volgens de 'modulo10, rekursiv' test.
// Bron: http://www.hosang.ch/modulo10.htm
function qfs_determineModulo10RekursivCheckDigit(number) {
	// The string number should contain only digits

	var table = new Array(0, 9, 4, 6, 8, 2, 7, 1, 3, 5);
	var carry = 0;

	for (var i=0; i < number.length; i++) {
		carry = table[(carry + parseFloat(number.charAt(i) - '0')) % 10];
	}
        
	return (10 - carry) % 10;
}

// Deze functie bepaalt of het een geldig plaatnummer is.
function qfs_isValidInsurancePlateLicenceNumber(inputObj) {
	// Controleer of de lengte van het plaatnummer 6 is.
	if (inputObj.value == null || inputObj.value.length!=6) {
		return false;
	}
	// De eerste drie tekens zijn alfanumeriek. 
	var insurancePlateNumberLetters = inputObj.value.substring(0,3);
	var matchLetters = /^-?[a-zA-Z]*$/;
	// De laatste drie tekens zijn cijfers. 
	var insurancePlateNumberDigits = inputObj.value.substring(3,6);
	var matchDigits = /^-?[0-9]*$/;
	return matchLetters.test(insurancePlateNumberLetters) && matchDigits.test(insurancePlateNumberDigits);
}

// Functie om de styling te veranderen van de velden die verantwoordelijk zijn voor het tonen een 
// invoercontrole en verificatie-fout bij een vraag.
function qfs_changeStyleOfErrorFieldLine(errorLineMarker, errorFieldRow, isVisible) {
	// Als de vraag niet zichtbaar is, geven we een klasse nonApplicable mee aan de errorLineMarker, en het veld dat een melding bevat.
	// Hierdoor is ook de errorLine en de melding niet zichtbaar wanneer de gebruiker de vraag verbergt.
	if (!isVisible){
		errorLineMarker.addClass("nonApplicable");
		errorFieldRow.addClass("nonApplicable");
	}
	
	// Als de vraag zichtbaar is halen we de klasse 'nonApplicable' weer weg, zodat ook de melding en errorLine weer zichtbaar zijn.
	if (isVisible) {
		errorLineMarker.removeClass("nonApplicable");
		errorFieldRow.removeClass("nonApplicable");
	}
}

// Functie om een popup venster voor de rapporten te tonen.
function createReportPopupWindow(url, name, screen, width, heigth) {
	var formObj = document.forms['form'];
	
	// Zet de action en screen.
	formObj.elements['action'].value = 'Init';
	formObj.elements['screen'].value = 'Generate' + name;

	// Open een nieuw venster.
	var popupWindowOptions = 'width='+width+',height='+heigth+',resizable,status,scrollbars';
	var popupWindow = window.open(url, name, popupWindowOptions);
	formObj.target = name;
	formObj.submit();
	// Na submit, reset target en screen.
	formObj.target = '';
	formObj.elements['screen'].value = screen;
	
	// Controleer of het huidige venster gefocust is. 
	if (window.focus) {
		// Zet het popup-venster gefocust.
		popupWindow.focus();
	}
	
	// Zorg ervoor dat de link niet gevolgd wordt.
	return false;
}


/*
 * Controleert of het Nederlandse telefoonnummer geldig is en zo ja, formatteert de waarde.
 */ 
function qfs_isDutchPhoneNumber(inputObj) {
    var phoneNumber = inputObj.value;
    
	// Verwijder eerst de haakjes en de spatie.
    phoneNumber = phoneNumber.replace(/\(/g, '');
    phoneNumber = phoneNumber.replace(/\)/g, '');
    phoneNumber = phoneNumber.replace(/ /g, '');
    
	if (qfs_startsWith(phoneNumber, "0031")) {
		phoneNumber = phoneNumber.substring(4);
	} else if (qfs_startsWith(phoneNumber, "+31")) {
		phoneNumber = phoneNumber.substring(3);
	} else if (qfs_startsWith(phoneNumber, "0")) {
		phoneNumber = phoneNumber.substring(1);
	} else {
		// Dit is geen geldig Nederlands telefoonnummer, want het begint niet
		// met 0031, +31 of 0.
		return false;
	}

	// Het telefoonnummer mag geen letters bevatten.
	if (phoneNumber.search(/[a-zA-Z]/) != -1) {
		return false;
	}

	// Verwijder alle niet-cijfers uit het telefoonnummer.
	phoneNumber = phoneNumber.replace(/[^0-9]/g, "");

	// Er moeten 9 overgebleven cijfers zijn. 
	if (phoneNumber.length != 9) {
		return false;
	}
	
    // Bepaal het kengetal en het abboneenummer.
	// We maken hierbij gebruik van de array met Nederlandse kengetallen.
    var phoneNumberAreaCode = "";
    var phoneNumberSubscriber = "";
    
	for (i = 0; i < qfs_dutchAreaCodes.length; i++) {
		// Bepaal huidge kengetal in array en de lengte van het kengetal.
		var areaCode = qfs_dutchAreaCodes[i];
		var areaCodeLength = areaCode.length; 

		// Controleer of het telefoonnummer begint met het huidige kengetal.
		if (phoneNumber.substring(0, areaCodeLength) == areaCode) {
			// We splitsen het telefoonnummer op in het kengetal en abonneenummer.
			phoneNumberAreaCode = areaCode;
			phoneNumberSubscriber = phoneNumber.substring(areaCodeLength, phoneNumber.length);
			break;
		}
	}
	
	// Controleer of we het kengetal niet hebben gevonden.
    if (phoneNumberAreaCode.length == 0) {
    	// Het telefoonnummer begint niet met een geldig kengetal.
    	return false;
    }

    // Formatteer het telefoonnummer volgens het formaat '(xxx) yyy', waarbij xxx het kengetal is en yyy het abonneenummer.
    // We voegen ook de voorloopnul voor het kengetal weer toe (die we in het begin van deze functie hebben verwijderd).
	phoneNumber = "(0" + phoneNumberAreaCode + ") " + phoneNumberSubscriber; 

    // Zet de geformatteerde waarde terug in het input object.
    inputObj.value = phoneNumber;
    
    return true;
}
