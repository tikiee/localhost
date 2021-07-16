var qfs_emptyString = /^\s*$/;
var qfs_triggerQuestionObj;
var qfs_ajaxFormDialogueActionsHelper;

var qfs_submitForm = function() {
    // Als het response in hetzelfde venster komt dat ook document.form bevat, dan maken we de knoppen onbruikbaar.
    if (qis_jQuery("#" + "qfs_form").get(0).target=='' || qis_jQuery("#" + "qfs_form").get(0).target=='_self') {
        // Het response komt in hetzelfde venster dat ook document.form bevat.
    	qfs_disableButtons();
    }
    qis_jQuery("#" + "qfs_form").get(0).submit();
};

//  Voert de actie 'id' uit. 
function qfs_goAction(id) {
	// Sla de 'oude' actie zolang op, zodat we deze na het submitten van het formulier terug kunnen zetten.
	var oldAction = qis_jQuery("#" + "qfs_form" + " :input[name=action]").get(0).value;
	qis_jQuery("#" + "qfs_form" + " :input[name=action]").get(0).value = id;
	qis_jQuery("#" + "qfs_form" + " :input[name=isFormChanged]").get(0).value = (qfs_isFormChanged || qfs_formChanged(document));
	if (false) {
		qfs_goActionHandlerHelper(id);
	} else {
		qfs_submitForm();
	}
    	
	// Zet de 'oude' actie terug, dit gebeurt alleen als de pagina niet ververst wordt, dus wanneer een popup gebruikt
	// wordt (ajax maakt geen gebruik van het formulier om de actie te verzenden).
	qis_jQuery("#" + "qfs_form" + " :input[name=action]").get(0).value = oldAction;
}

// Zet de verificatiemelding op schermniveau.
function qfs_updateGeneralVerificationMessage(message) {
	var $messageContainer = qis_jQuery('div.message.error');
	$messageContainer.find('ul').append('<li>' + message + '</li>');

	// Toon de container.
	$messageContainer.show();

	// Scroll naar de positie van de container. We kunnen hier geen focus() gebruiken omdat dit geen invoerveld is.
	qis_jQuery('html, body').scrollTop($messageContainer.position().top);
}

// Functie om de validatie melding als data-attribuut op de value te zetten.
function qfs_updateValueValidationMessage(elementId, message) {
	// Zet de melding op de dom elementen.
	var $valueElem = qis_jQuery("#" + elementId);
	if (message) {
		$valueElem.attr('data-validation-message', message);
	} else {
		$valueElem.removeAttr('data-validation-message');
	}
}

// Functie om de verificatie melding als data-attribuut op de value te zetten.
function qfs_updateValueVerificationMessage(elementId, message) {
	// Zet de melding op de dom elementen.
	var $valueElem = qis_jQuery("#" + elementId);
	if (message) {
		$valueElem.attr('data-verification-message', message);
	} else {
		$valueElem.removeAttr('data-verification-message');
	}
}

// Functie om de controlestatus van de vraag te zetten.
function qfs_determineValueValidationStatus(elementId) {
	// Bepaal het jQuery object dat de value voorstelt.
	var $valueElem = qis_jQuery("#" + elementId);
	// Bepaal de meldingen die op de value zitten.
	var validationMessage = $valueElem.attr('data-validation-message');
	var verificationMessage = $valueElem.attr('data-verification-message');

	// Bepaal de waarde van de status.
	var validationStatus = 'valid';
	if ((validationMessage !== undefined) || (verificationMessage !== undefined)) {
		validationStatus = 'invalid';
	}

	// Zet de status op het data-attribuut.
	$valueElem.attr('data-validation-status', validationStatus);

	// Trigger het validatie-event.
	$valueElem.trigger('fieldValidation');
}

//Functie om de controlestatus van de vraag te resetten.
function qfs_resetValueValidationStatus(elementId) {
	// Bepaal het jQuery object dat de value voorstelt.
	var $valueElem = qis_jQuery("#" + elementId);

	// Zet de status op het data-attribuut.
	$valueElem.attr('data-validation-status', 'unvalidated');

	// Trigger het validatie-event.
	$valueElem.trigger('fieldValidation');
}

// Verwijdert de verificatiemelding op schermniveau.
function qfs_resetGeneralVerificationMessage() {
	// Selecteer de message container op schermniveau. Dit is de container direct binnen de div met klasse formDialogue.
	var $messageContainer = qis_jQuery('div.formDialogue > div.message.error');
	$messageContainer.find('ul li').remove();
	$messageContainer.hide();
}

// Verwijdert de algemene verificatiemeldingen en de verificatiemeldingen bij de vragen.
// De functie verwijdert altijde de algemene verificatiemeldingen. Wanneer de vraag een knop is verwijdert de functie
// alle verificatiemeldingen tot aan de knop. Anders verwijdert de functie de verificatiemeldingen bij de triggervraag.
function qfs_resetValueVerificationMessages() {
	// Reset de algemene melding altijd.
	qfs_resetGeneralVerificationMessage();

	// Wanneer er geen triggervraag is hoeven we ook niets te resetten.
	if (!qfs_triggerQuestionObj) {
		return;
	}

	// Bepaal de id van de value die bij de triggervraag hoort.
	var valueId = qfs_triggerQuestionObj.id + '_value';
	// Bepaal het jQuery-object voor de triggervraag.
	var $triggerQuestion = qis_jQuery(qfs_triggerQuestionObj);

	// Wanneer de reset getriggerd is na het verlaten/wijzigen van een input veld resetten we alleen de melding bij dat
	// veld.
	if (!$triggerQuestion.is('.button')) {
		// Verwijder de verificatiemelding.
		$triggerQuestion.removeAttr('data-verification-message');
		qfs_determineValueValidationStatus(valueId);
		return;
	}

	// Wanneer we hier komen is de trigger een knop, in dat geval resetten we alles tot en met de knop.

	// Loop over alle values heen.
	qis_jQuery('.value').each(function() {
		var $this = qis_jQuery(this);
		// Verwijder de verificatiemelding.
		$this.removeAttr('data-verification-message');
		// Bepaal de id van de huidige value.
		var thisId = $this.attr('id');
		qfs_determineValueValidationStatus(thisId);
		// Wanneer we niet helemaal tot het laatste element itereren (valueId !== null) en dit het laatste element is
		// waar we naar toe itereren (thisId === valueId) stappen we nu uit de loop.
		if (valueId !== null && thisId === valueId) {
			return false;
		}
	});
}

//  Controleert of het formulier gewijzigd is, en voert de actie 'id' uit. 
function qfs_goActionCheckFormChanged(id) {
	if (qfs_checkForFormChanged && (qfs_isFormChanged || qfs_formChanged(document))) {
		if (confirm(qfs_confirmDiscardFormChangesMessage)) {
			qfs_goAction(id);
		}
	} else {
		qfs_goAction(id);
	}
}

//  Controleert of de formuliergegevens correct ingevuld zijn, en zo ja, voert de actie 'id' uit. 
function qfs_goActionCheckInputs(id) {
	if (qfs_checkInputs()){
		qfs_goAction(id);
	} else {
		alert(qfs_errorMessage);
		qfs_setFocus(qfs_errorMessage);
		if (typeof qfs_errorField == "string") {
			if (qfs_errorField != "") qfs_setFocus(qis_jQuery("#" + "qfs_form" + " :input[name=" + qfs_errorField + "]").get(0));
		} else {
			qfs_setFocus(qfs_errorField);
		}
	}
}

//  Bepaalt of alle rijen binnen een G-element onzichtbaar zijn op het scherm.
function qfs_areAllRowsInvisible(gElementId) {
	// Alle vragen in de groep zijn onzichtbaar als er geen zichtbare vragen zijn.
	return qis_jQuery("#" + gElementId).find("div.entry, div.row").not(".nonApplicable").length == 0;
}

/**
 * Bepaalt welke rij(en) er bij een vraag behoren.
 */
function qfs_determineQuestionRows(fieldId) {
	// Bepaal de div met entry en de div met row die het dichtst bij het element in de buurt liggen.
	return qis_jQuery('#qfs_LA' + fieldId + ', #qfs_IF' + fieldId + '_value').closest('div.entry, div.row');
}

/**
 * Zet de CSS-class van de vragenrij die de vraag met de meegegeven id bevat op 'applicable' of 'nonApplicable'.
 */
function qfs_updateStyleOfQuestionRow(rowElement) {
	// Wrap het element in een jQuery-object
	var $rowElement = qis_jQuery(rowElement);
	
	// Er zijn twee soorten rijen:
	// - matrix rijen; div.row.
	//   Hierin zitten altijd span.value's.
	// - gewone rijen; div.entry
	//   Hierin zitten infoteksten (div.labels label.label) of gewone vragen (div.labels label.label EN span.value) of
	//   een blok HTML (div.htmlBlock)

	// Bepaal of een onderdeel van de vraagrij (zie hierboven) NIET de klasse 'nonApplicable' heeft. In dit geval is de
	// vragenrij van toepassing.
	var isEnabled = $rowElement.find('div.labels label.label, span.value, div.htmlBlock').not('.nonApplicable').length > 0;

	// Toggle de klassen afhankelijk van hun zichtbaarheid.
	$rowElement.toggleClass('applicable', isEnabled).toggleClass('nonApplicable', !isEnabled);
}

function qfs_changeStyleOfLabel(nameLabel, isVisible) {
	// Bepaal het element met de gegeven naam.
	var $element = qis_jQuery('#'+ nameLabel);

	// Toggle de klassen afhankelijk van hun zichtbaarheid.
	$element.toggleClass('applicable', isVisible).toggleClass('nonApplicable', !isVisible);
}

function qfs_changeGroupVisibility(groupId, isVisible) {
	// Bepaal het element met de gegeven naam.
	var $element = qis_jQuery('#qfs_G'+ groupId).closest('.float').add('#qfs_G'+ groupId + ', #qfs_GLA' + groupId);

	// Toggle de klassen afhankelijk van hun zichtbaarheid.
	$element.toggleClass('applicable', isVisible).toggleClass('nonApplicable', !isVisible);
}

//  Sets the focus to the specified form element and changes the class of the element to the class style.
function qfs_setFocusOnField(el, style) {
	qfs_setFocus(el);
	//  Moet de stijl van het focusveld worden gezet? 
	if (style != null) {
		//  Ja, want de parameter is niet null. 
		qfs_addActiveStyleClassForElement(el, style);
	}
}

// Check the inputs. If all inputs are ok, disable the button and go to the given action. If an input is incorrect, set the focus to
// that field. The method setFocusOnField also changes the style of the inputfield.
function qfs_goActionCheckInputsFormState(id, doDisableButtons, performInputCheck) {
	if (!performInputCheck || qfs_checkInputs()){
		//  Disable alle buttons en roep goAction aan 
		if (doDisableButtons) {
			qfs_disableButtons();
		}
		qfs_goAction(id);
	} else {
		if (!qfs_showMessagesAtInputField) {
			alert(qfs_errorMessage);
		}

		if (typeof qfs_errorField == "string") {
			if (qfs_errorField != "") {
				qfs_setFocusOnField(qis_jQuery("#" + "qfs_form" + " :input[name=" + qfs_errorField + "]").get(0), 'errorField');
			}
		} else {
			qfs_setFocusOnField(qfs_errorField, 'errorField');
		}
	}
}

function qfs_disableButtons() {
    // Disable HTML4-buttons
	var entries = document.getElementsByTagName('input');
	for (var i=0; i < entries.length; i++) {
		if (qfs_isButton(entries[i])) {
			//  This element is a button, disable it. 
			entries[i].disabled="disabled";	
		}
	}

    // Disable HTML5-buttons
    var buttons = document.getElementsByTagName('button');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].disabled="disabled";
    }
}

function qfs_performActions(questionGroupId, questionId, questionObj, performInputCheck){
	qfs_triggerQuestionObj = questionObj;
	qis_jQuery("#qfs_form :input[name=questionGroupId]").get(0).value = questionGroupId;
	qis_jQuery("#qfs_form :input[name=questionId]").get(0).value = questionId;
	qfs_goActionCheckInputsFormState('ProcessQuestionTrigger', true, performInputCheck);
	qfs_triggerQuestionObj = null;
}

function qfs_performActionInPopup(questionGroupId, questionId, questionObj, performInputCheck){

	// Laat het action attribuut van het formulier verwijzen naar dynamicresourcepath; 
	// Bewaar ook de oude action zodat we deze naderhand kunnen terugzetten. 
	var oldAction = qfs_getFormAction("qfs_form");
	qfs_setFormAction("qfs_form", qfs_dynamicResourcePath);

	qfs_triggerQuestionObj = questionObj;
	qis_jQuery("#qfs_form :input[name=questionGroupId]").get(0).value = questionGroupId;
	qis_jQuery("#qfs_form :input[name=questionId]").get(0).value = questionId;
	qis_jQuery("#qfs_form").get(0).target = "reportPopUp";
	var popup = window.open("", "reportPopUp", "height=600,width=800,top=20, resizable=yes, left=20,status=no,toolbar=no,menubar=yes,location=no,scrollbars=yes");
	qfs_goActionCheckInputsFormState('ProcessPopupButtonClick', false, performInputCheck);
	qis_jQuery("#qfs_form").get(0).target = "";
	qfs_setFormAction("qfs_form", oldAction);
	qfs_triggerQuestionObj = null;
}

function qfs_getFormAction(formName) {
	return qis_jQuery('#' + formName).attr('action');
}

function qfs_setFormAction(formName, action) {
    qis_jQuery('#' + formName).closest('form').attr('action', action);
}

function qfs_performActionsAJAX(questionGroupId, questionId, questionObj, performInputCheck){
	qfs_triggerQuestionObj = questionObj;

	// Reset de verificatiemeldingen.
	qfs_resetValueVerificationMessages();

	if (!performInputCheck || qfs_checkInputs()) {
		// Stuur AJAX-request.
		qfs_ajaxFormDialogueActionsHelper.sendRequest(questionGroupId, questionId);
	} else {
		if (!qfs_showMessagesAtInputField) {
			alert(qfs_errorMessage);
		}

		if (typeof qfs_errorField == "string") {
			if (qfs_errorField != "") qfs_setFocusOnField(qis_jQuery("#qfs_form :input[name=" + qfs_errorField + "]").get(0), 'errorField');
		} else {
			qfs_setFocusOnField(qfs_errorField, 'errorField');
		}
	}
	qfs_triggerQuestionObj = null;
}

function qfs_performActionGenerateFormDocument(questionGroupId, questionId){
	qis_jQuery("#qfs_form :input[name=questionGroupId]").get(0).value = questionGroupId;
	qis_jQuery("#qfs_form :input[name=questionId]").get(0).value = questionId;
	qis_jQuery("#qfs_form").get(0).target = "reportPopUp";
	var popup = window.open("", "reportPopUp", "height=600,width=800,top=20, resizable=yes, left=20,status=no,toolbar=no,menubar=yes,location=no,scrollbars=yes");
	qfs_goActionCheckInputsFormState("ProcessButtonClickGenerateFormDocument", false, true);
	qis_jQuery("#qfs_form").get(0).target = "";
}

function qfs_GoToScreen(screenNumber) {
	qis_jQuery("#qfs_form :input[name=nextScreenNumber]").get(0).value = screenNumber;
	qfs_goAction("GoToParticularScreen");
}

function qfs_emptyTextArea(inputObj, message){
	var value = inputObj.value;
	if (value == message) {
		inputObj.value = "";
	}
}
function qfs_fillTextArea(inputObj, message){
	var value = inputObj.value;
	if (value.length == 0) {
		inputObj.value = message;
	}
	inputObj.focus();
	inputObj.select();
}
          
//  Roept de methode uit de handler aan die het formulier leeg maakt en terug gaat naar de eerste pagina van het formulier. 
function qfs_goActionResetForm() {
	if (confirm(qfs_eraseFormMessage)) {
		qfs_goAction("ResetForm");
	}
}

//  Deze methode sluit het window met het formulier. 
function qfs_cancelForm() {
	if (confirm(qfs_closeFormMessage)) {
		if (qfs_openFormsInNewWindow) {
			window.close();
		} else {
			window.location = qfs_baseUrl + "/DisplayOverview"
		}
	}
}


//  De volgende javascript-functies zijn alleen nodig in de debugmodus. 
function qfs_goDebugValuesScreen(target) {
	var oldAction = qfs_getFormAction("qfs_form");
	qfs_setFormAction("qfs_form", qfs_dynamicResourcePath);
	qis_jQuery('#qfs_form').get(0).target = "_blank";
	qis_jQuery('#qfs_form :input[name=debugValuesSelected]').get(0).value = target;
	qfs_goActionDebug("ShowDebugValuesScreen");
	qis_jQuery('#qfs_form').get(0).target = "";
	qfs_setFormAction("qfs_form", oldAction);
}

function qfs_goDebugTriggersScreen() {
	var oldAction = qfs_getFormAction("qfs_form");
	qfs_setFormAction("qfs_form", qfs_dynamicResourcePath);
	qis_jQuery("#" + 'qfs_form').closest("form").get(0).target = "_blank";
	qfs_goActionDebug("ShowDebugTriggersScreen");
	qis_jQuery("#" + 'qfs_form').closest("form").get(0).target = "";
	qfs_setFormAction("qfs_form", oldAction);
}

// Voert de actie 'id' uit. Doet hetzelfde als goAction(), maar dan zonder het onderscheid tussen de overgangsvorm
// en de oude situatie: goActionDebug() doet *altijd* een submit van het formulier.
function qfs_goActionDebug(id) {
	// Sla de 'oude' actie zolang op, zodat we deze na het submitten van het formulier terug kunnen zetten.
	var oldAction = qis_jQuery("#" + "qfs_form" + " :input[name=action]").get(0).value;
	qis_jQuery("#" + "qfs_form" + " :input[name=action]").get(0).value = id;
	qfs_submitForm();
    	
	// Zet de 'oude' actie terug, dit gebeurt alleen als de pagina niet ververst wordt, dus wanneer een popup gebruikt
	// wordt (ajax maakt geen gebruik van het formulier om de actie te verzenden).
	qis_jQuery("#" + "qfs_form" + " :input[name=action]").get(0).value = oldAction;
}

function qfs_printScreenXSLT(templateindex) {
	qis_jQuery("#qfs_form :input[name=templateIndex]").get(0).value = templateindex;
	qis_jQuery("#qfs_form").get(0).target = "reportPopUp";
	var popup = window.open("", "reportPopUp", "height=600, width=800, top=20, resizable=yes, left=20, status=no, toolbar=no, menubar=yes, location=no, scrollbars=yes");
	qfs_goAction("DisplayFormAsHTML");
	qis_jQuery("#qfs_form").get(0).target = "";
	qis_jQuery("#qfs_form :input[name=templateIndex]").get(0).value = "";
}
	 	
function qfs_printScreenPDF(templateindex) {
	qis_jQuery("#qfs_form :input[name=templateindex]").get(0).value = templateindex;
	qfs_goAction("DisplayFormAsPDF");
}

function qfs_Upload(buttonObj) {
	var formObj = qis_jQuery("#qfs_form").get(0);
	if (!qfs_checkInputsUpload(formObj))
		return;
	document.getElementById("qfs_wachten").style.display='block';
	qis_jQuery(":input[name=action]", formObj).get(0).value = "Upload";
	qis_jQuery(":input[name=isFormChanged]", formObj).get(0).value = (qfs_isFormChanged || qfs_formChanged(document));
	formObj.submit();
}

// Creeert JavaScript AJAX-object t.b.v. uitvoeren acties indien vraag met AJAX-trigger is geselecteerd.
function qfs_createAjaxFormDialogueActionsHelper() {
	var requestParameters = {};	

	// Creeer errorParameters, t.b.v. het tonen van een foutmelding als de AJAX call mislukt.
	var errorParameters = {
		errorMessageOuterElementId	: 'qfs_errorMessageAJAX',
		errorMessageInnerElementId	: 'qfs_errorMessageAJAX',
		defaultErrorMessage	: qfs_ajaxErrorMessage
	};

	//  Bepaal de naam van de handler a.d.h.v. het request attribuut 'screen'. 
	var handlerName = qis_jQuery("#" + "qfs_form" + " :input[name=" + "screen" + "]").get(0).value;
	
	var ajaxUrl = qfs_dynamicResourcePath;
	
	// Creeer handlerParameters object t.b.v. het samenstellen van het AJAX request.
	var handlerParameters = {
		ajaxUrl				: ajaxUrl,
		handlerName			: handlerName,
		handlerMethod		: "ProcessQuestionTriggerAJAX"
	};			
		
	var options = {};
	
	// Creeer JavaScript object t.b.v. AJAX-call.
	qfs_ajaxFormDialogueActionsHelper =
		new AjaxFormDialogueActionsHelper(requestParameters, errorParameters, handlerParameters, options, 'qfs_', qfs_imagePath + '/ajax-loader.gif');
}

//  Initialiseer het AJAX object. jQuery voert deze functie uit op het moment dat de DOM compleet geladen is. 
qis_jQuery(qfs_createAjaxFormDialogueActionsHelper);


/**
 * Toont/verbergt alle vragen binnen een groep. De zichtbaarheid van een vraag op het scherm wordt alleen aangepast als
 * dit nodig is.
 *
 * Deze functie overschrijft de gelijknamige functie in QuinityForms.js
 */
function qfs_showQuestions(fieldNameStart, isGroupVisible){
	// Doorloop alle elementen in de QuestionDisplayParameters array.
	for (var i = 0; i < qfs_questionDisplayParametersArray.length; i++) {
		var fieldName = qfs_questionDisplayParametersArray[i].fieldName;

		// Controleer of de naam begint met 'IF<questionGroupId>'.
		if (fieldName.substring(0, fieldName.indexOf("_", 'qfs_'.length)) == fieldNameStart){
			// De vraag behoort tot de groep. Toon/verberg de vraag op het scherm.
			qfs_showQuestionInGroup(fieldName, isGroupVisible);
		}
	}
}

/**
 * Toont/verbergt de vraag op het scherm t.g.v. nieuwe zichtbaarheid op vraagniveau. De zichtbaarheid van de vraag op
 * het scherm wordt alleen aangepast als dit nodig is.
 *
 * Deze functie overschrijft de gelijknamige functie in QuinityForms.js
 */
function qfs_showQuestion(fieldName, isQuestionVisibleNew) {
	// Bepaal de index van het juiste element in de QuestionDisplayParameters array.
	var idx = qfs_determineIndexInQuestionDisplayParametersArray(fieldName);

	// Bepaal de huidige zichtbaarheid van de vraag en de groep.
	var isQuestionVisibleOld = qfs_questionDisplayParametersArray[idx].isQuestionVisible;
	var isGroupVisibleOld = qfs_questionDisplayParametersArray[idx].isGroupVisible;

	// Pas de zichtbaarheid van de vraag aan in de QuestionDisplayParameters array.
	qfs_questionDisplayParametersArray[idx].isQuestionVisible = isQuestionVisibleNew;

	// Controleer of de zichtbaarheid van de vraag op het scherm moet veranderen.
	if (!qfs_shouldQuestionVisibilityBeChanged(isQuestionVisibleOld, isGroupVisibleOld, isQuestionVisibleNew)) {
		return;
	}

	// De vraag moet zichtbaar zijn wanneer de vraag zichtbaar is en de groep al zichtbaar was.
	var isQuestionVisible = isQuestionVisibleNew && isGroupVisibleOld;

	// Als we de vraag onzichtbaar maken op het scherm, reset dan de vraag.
	if (!isQuestionVisible) {
		qfs_emptyQuestion(fieldName);
		qfs_updateValueValidationMessage(fieldName + '_value', '');
		qfs_updateValueVerificationMessage(fieldName + '_value', '');
		
		if (window.qfs_resetValueValidationStatus) {
			qfs_resetValueValidationStatus(fieldName + '_value');
		}
	}

	// Als we de vraag zichtbaar maken op het scherm, en de vraag hoort bij een lijstje radiobuttons, dan geven we
	// het veld de waarde van de geselecteerde radiobutton.
	if (isQuestionVisibleNew && qis_jQuery('[name=' + fieldName + '_radio]').length > 0) {
		var checkedRadiobuttonValue = qis_jQuery('[name=' + fieldName + '_radio]:radio:checked').val();
		qis_jQuery('#' + fieldName).val(checkedRadiobuttonValue);
	}

	// Verander de zichtbaarheid van de waarde zelf.
	qis_jQuery('#' + fieldName + '_value').toggleClass('applicable', isQuestionVisible)
											.toggleClass('nonApplicable', !isQuestionVisible);

	// Pas ook de stijl van de labels aan. De labels zijn zichtbaar op het scherm als zowel de vraag als de groep
	// zichtbaar zijn.
	qfs_changeStyleOfLabels(fieldName, isQuestionVisible);
}

/**
 * Toont/verbergt de vraag op het scherm t.g.v. nieuwe zichtbaarheid op groepniveau. De zichtbaarheid van de vraag op
 * het scherm wordt alleen aangepast als dit nodig is.
 *
 * Deze functie overschrijft de gelijknamige functie in QuinityForms.js
 */
function qfs_showQuestionInGroup(fieldName, isGroupVisibleNew) {
	// Bepaal de index van het juiste element in de QuestionDisplayParameters array.
	var idx = qfs_determineIndexInQuestionDisplayParametersArray(fieldName);

	// Bepaal de huidige zichtbaarheid van de vraag en de groep.
	var isQuestionVisibleOld = qfs_questionDisplayParametersArray[idx].isQuestionVisible;
	var isGroupVisibleOld = qfs_questionDisplayParametersArray[idx].isGroupVisible;

	// Pas de zichtbaarheid van de groep aan in de QuestionDisplayParameters array.
	qfs_questionDisplayParametersArray[idx].isGroupVisible = isGroupVisibleNew;

	// Controleer of de zichtbaarheid van de vraag op het scherm moet veranderen.
	if (!qfs_shouldQuestionInGroupVisibilityBeChanged(isQuestionVisibleOld, isGroupVisibleOld, isGroupVisibleNew)) {
		return;
	}

	// De vraag moet zichtbaar zijn wanneer de vraag al zichtbaar was en de groep zichtbaar is.
	var isQuestionVisible = isQuestionVisibleOld && isGroupVisibleNew;


	// Als we de vraag onzichtbaar maken op het scherm, reset dan de vraag.
	if (!isQuestionVisible) {
		qfs_emptyQuestion(fieldName);
		qfs_updateValueValidationMessage(fieldName + '_value', '');
		qfs_updateValueVerificationMessage(fieldName + '_value', '');
		
		if (window.qfs_resetValueValidationStatus) {
			qfs_resetValueValidationStatus(fieldName + '_value');
		}
	}

	// Verander de zichtbaarheid van de waarde zelf.
	qis_jQuery('#' + fieldName + '_value').toggleClass('applicable', isQuestionVisible)
											.toggleClass('nonApplicable', !isQuestionVisible);

	// Pas ook de stijl van de labels aan.
	// De labels zijn zichtbaar op het scherm als zowel de vraag als de groep zichtbaar zijn.
	qfs_changeStyleOfLabels(fieldName, isQuestionVisible);
}

/**
 * Maakt een vraag wijzigbaar.
 *
 * Deze functie overschrijft de gelijknamige functie uit QuinityForms.js
 */
function qfs_showQuestionEditable(fieldName){
	// Bepaal de index van het juiste element in de QuestionDisplayParameters array.
	var idx = qfs_determineIndexInQuestionDisplayParametersArray(fieldName);

	// Pas de wijzigbaarheid van de vraag aan in de QuestionDisplayParameters array.
	qfs_questionDisplayParametersArray[idx].isQuestionEditable = true;

	// Maak het veld read/write.
	qis_jQuery('#' + fieldName + '_value :input').attr('disabled', false);
}

/**
 * Maakt een vraag niet-wijzigbaar.
 *
 * Deze functie overschrijft de gelijknamige functie uit QuinityForms.js
 */
function qfs_showQuestionNotEditable(fieldName){
	// Bepaal de index van het juiste element in de QuestionDisplayParameters array.
	var idx = qfs_determineIndexInQuestionDisplayParametersArray(fieldName);

	// Bepaal de huidige wijzigbaarheid van de vraag.
	var isQuestionEditableOld = qfs_questionDisplayParametersArray[idx].isQuestionEditable;

	// Controleer of de wijzigbaarheid van de vraag op het scherm moet veranderen.
	if (isQuestionEditableOld) {
		// De vraag was wijzigbaar, we maken hem niet-wijzigbaar (eerst maken we de vraag leeg).
		qfs_emptyQuestion(fieldName);

		// Maak het veld disabled.
		qis_jQuery('#' + fieldName + '_value :input').attr('disabled', true);
	}

	// Pas de wijzigbaarheid van de vraag aan in de QuestionDisplayParameters array.
	qfs_questionDisplayParametersArray[idx].isQuestionEditable = false;
}

// Wijzigt de opgeslagen gegevens als de gebruiker een ander keuzerondje aanklikt.
function qfs_changeRadio(radioName, hiddenInputId) {
	qis_jQuery("#qfs_form input[name=" + radioName + "]")
		.add("#colorbox input[name=" + radioName + "]")
		.each(function() {
			var $this = qis_jQuery(this);
			var radioId = $this.attr('id');
			if (radioId == hiddenInputId + "_radio_0") {
				// Dit is de geselecteerde radio-button.
				// Zet het bijbehorende hidden input element op 'waar'.
				qis_jQuery("#" + hiddenInputId).val('1');
			} else {
				// Dit is een radiobutton in dezelfde groep die niet geselecteerd is.
				// Bepaal de id van het hidden input element dat bij deze radio hoort.
				var elementId = radioId.substr(0,radioId.length-8);
				// Zet het hidden input element dat bij deze radio hoort op 'niet waar'.
				qis_jQuery("#" + elementId).val('0');
				$this.change();
			}
		});
}
