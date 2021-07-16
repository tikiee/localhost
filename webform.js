/* Rabobank Quinity Webform Custom Javascript */
/* Authors:  Lennard Kager, Ben Koppenens */
/* Version: 0.0.9 */
/* Date: 17-04-2015 */

if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) { //test for MSIE x.x;
	var ieversion=new Number(RegExp.$1) // capture x.x portion and store as a number
	if (ieversion<=8)
		document.documentElement.className +=' ie8';
	else if (ieversion>=9)
		document.documentElement.className +=' ie';
}


//init binding of portlet stats
webform01 = pM.addBehavior({name:'portlet stats',owner:'pif'});
webform01.scope       = 'ph_content';
webform01.nodeTags    = 'input';
webform01.nodeClass   = 'ra-cf-statsinfo';
webform01.initElms    = init_doPortletStats;

webform02 = pM.addBehavior({name:'extended dt hover',owner:'pif'});
webform02.scope		= 'ph_content';
webform02.nodeTags	= 'dt';
webform02.nodeClass	= '';
//webform02.click		= click_doHoverEvents;
webform02.hover		= mover_doHoverEvents;
webform02.out		= mout_doHoverEvents;

webform03 = pM.addBehavior({name:'extended richButton click',owner:'pif'});
webform03.scope		= 'ph_content';
webform03.nodeTags	= 'span';
webform03.nodeClass	= 'link';
webform03.click		= click_doWfHoverEvents;

webform04 = pM.addBehavior({name:'extended infoicon hover',owner:'pif'});
webform04.scope		= 'ph_content';
webform04.nodeTags	= 'div';
webform04.nodeClass	= 'infoLinkImage';
//webform02.click		= click_doHoverEvents;
webform04.hover		= mover_doHoverEvents;
webform04.out		= mout_doHoverEvents;

// init binding of login redirect
webform05 = pM.addBehavior({name:'login redirect',owner:'quinity'});
webform05.scope		= 'ph_content';
webform05.nodeTags	= 'label';
webform05.nodeClass	= 'ra_bh_loginredirect';
webform05.initElms	= init_dologinredirect;


function init_dologinredirect(osection){
	sUrl = "https://bankieren.rabobank.nl/klanten" + location.pathname;
	aInp = osection.getElementsByTagName('input');
	for(t=0;t<aInp.length;t++){
		addbhEvent(aInp[t], 'click', qfs_toggle_redirect);
		EventCache.add(aInp[t], 'onclick', qfs_toggle_redirect, true);
	};

	//get buttonbar ref
	aButbar = getElementsByClassName('formButtons', document.getElementById('qfs_form'));
	if(isArray(aButbar)){
		oButbar = aButbar[1];

		//get nextbutton ref
		aButtons = getElementsByClassName('primaryAction', oButbar);
		if(isArray(aButtons)){
			oNextbut = aButtons[0];
		};
	};

	sButton =  "<span class='secure'><span class='link'>";
	sButton += "<a lang='nl' xml:lang='nl' href='"+sUrl+"'>Inloggen<span class='btn_leftcorner'></span><span class='btn_rightcorner'></span></a>";
	sButton += "</span></span>";

	butwrap = document.createElement('div');
	butwrap.className = "buttonsecure";
	oButbar.appendChild(butwrap);
	butwrap.innerHTML = sButton;
	butwrap.style.display = "none";

	document.lgbutref = butwrap;
	document.nxbutref = oNextbut;

};


function qfs_toggle_redirect(){
	lgbutref = document.lgbutref;
	nxbutref = document.nxbutref;
	if(this.value == 1){
		lgbutref.style.display = "inline-block";
		nxbutref.style.display = "none";
	}
	else{
		lgbutref.style.display = "none";
		nxbutref.style.display = "inline-block";
	}
};
function click_doWfHoverEvents(){
	bobj = this.getElementsByTagName('input');
	if(bobj){
		bobj[0].click();
	};
};

function init_doPortletStats(sobj){
	sstat = "";
	ra_guid = encodeURIComponent((new Date).getTime());
	pid   = encodeURIComponent(sobj.id);
	pval  = sobj.value;
	apval = pval.split('|');
	sref = pid + ".ref=" + encodeURIComponent(document.referrer);
	for(t=0;t<apval.length;t++){
		apvalpair = apval[t].split('=');
		apvalname = apvalpair[0];
		apvalvalue = apvalpair[1];
		sstat+= pid + "." + encodeURIComponent(apvalname) + "=" + encodeURIComponent(apvalvalue) + "&";
	}
	sstat+= sref;
	pstat_trigger = new Image(1,1);
	pstat_trigger.src = "https://www.rabobank.nl/images/css/whitepixel.gif?portlet.webform.loc=" + encodeURIComponent(location.href) + "&" + sstat + "&ra_guid=" + ra_guid;
};

