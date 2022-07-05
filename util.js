function isJson(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

function isEmptyJSON(obj) {
	for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function isExistJSONKey(obj, key) {
    if(obj.hasOwnProperty(key)){
    	return true;
    }
            
    return false;
}

function isValidateEmail(email) {
  	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
			return true;
  	}else{
  	    return false;
  	}
}

function isbackSlash(data) {
  	if ((/\\/).test(data)){
		return true;
  	}else{
  	    return false;
  	}
}

function isNumeric(data) {
    var regExp = new RegExp("^\\d+$");
    var isValid = regExp.test(data);
    return isValid;
}

function rePlace(data, replace, change, word){
	data = '';
	for (var i = 0; i < word.length; i++) {
		if (word[i] == change) {
			data+=replace;
		}else{
			data+=word[i];
		}
	}
	
	return data;
}

function isNullOrEmpty(data){
	return data === null || data === '';
}


function isNullorEmptyString(s) {
	if (isNullOrEmpty(s)) {
		return "";
	}else {
		return s;
	}
}

function formatDateYYYYMMDD(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function formatDateDDMMYYYY(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('-');
}

function formatDateMMYYYY(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [month, year].join('-');
}

function hhmmss(secs) {
	var minutes = Math.floor(secs / 60);
  	secs = secs%60;
  	var hours = Math.floor(minutes/60)
  	minutes = minutes%60;
  	return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
	  // return pad(hours)+":"+pad(minutes)+":"+pad(secs); for old browsers
}
function pad(num) {
    return ("0"+num).slice(-2);
}

function alertDialog(title, message, dialogID){
	$("#dialogTitle").text(title);
	$("#dialog").text(message);
	$("#dialogID").val(dialogID);
	$("#modalDialog").modal('show');
}

function alertMessage(title, message, alertID){
	$("#alertTitle").text(title);
	$("#alert").text(message);
	$("#alertID").val(alertID);
	$("#modalAlert").modal('show');
}

function alertError(title, message, errorID){
	$("#errorTitle").text(title);
	$("#error").text(message);
	$("#errorID").val(errorID);
	$("#modalError").modal('show');
}

function confirmDialog(title, message, confirmID){
	$('#modalConfirm').modal('show');
   	$("#confirmTitle").text(title);
   	$("#confirm").text(message);
	$("#confirmID").val(confirmID);
}

function hideDialog(modalID){
	modalID.modal('hide');
}

function showModal(modalID){
	modalID.modal({
		backdrop: 'static', 
		keyboard: false
	});
}

function isLineBreak(enteredText){
	let numberOfLineBreaks = (enteredText.match(/\n/g)||[]).length;
	let characterCount = enteredText.length + numberOfLineBreaks;
	
	return characterCount;
}

function doQuotation(s) {
	let a;
	 if(s.indexOf('"') >= 0) {
		 a = s.replaceAll(/"/g, '\\"');
	 }else if(s.indexOf('\'') >= 0) {
		 a = s.replaceAll(/'/g,"\\'");
	 }else{
		 a = s;
	 }
	 
	return a;
}

function doGetSession(){
	$.ajax({
		url: "homeSession", 
		type:'POST',
		data:{},
		success:function(response){
			if(response == timeOut()){
			 	gotoIndex();
			}
		}
	});
}

function errorMessage(e, exception){
	 let message;
	 let statusErrorMap = {
         '400' : "Server understood the request, but request content was invalid.",
         '401' : "Unauthorized access.",
         '403' : "Forbidden resource can't be accessed.",
         '500' : "Internal server error.",
         '503' : "Service unavailable."
     };
     if (e.status) {
         message =statusErrorMap[e.status];
        if(!message){
              message="Unknown Error \n.";
         }
     }else if(exception=='parsererror'){
         message="Error.\nParsing JSON Request failed.";
     }else if(exception=='timeout'){
         message="Request Time out.";
     }else if(exception=='abort'){
         message="Request was aborted by the server";
     }else {
         message="Unknown Error \n.";
     }
     
     return message;
}

function gotoIndex(){
	window.location.href = "/UncalIntegrationConfiguration";
}

function timeOut(){
	return "TimeOut";
}

function escapeCharacter(data){
	let str = data;
    str = str.replace(/\W+(?!$)/g, '-').toLowerCase();
    str = str.replace(/\W$/, '').toLowerCase();
	
	return str;
}

function doCloseEmptyTab(){
	$('.nav-tabs li').each(function(index) {
		if(isNullOrEmpty($(this).text())){
			$(this).closest('li').remove();
		}
	});
	let idx = $(".nav-tabs li a").length;
	if(idx <= 0){
		$('#mainTab').css('display', 'none');
	}
}

function doSetArrayGlobal(transID, name){
   // Update channel Array Global
   let channelIDX = arrChannel.findIndex((e) => e.channelID == transID);
   arrChannel[channelIDX].channelID = transID;
   arrChannel[channelIDX].channelName = name;
   arrChannel[channelIDX].type = 1;
}

function doRemoveTabList(channel, status){
	if (status == 0) {
     	let data = {
     		transID:channel.transID
     	}
     	let menu = {
     		menuID:channel.tobMenu.parentID
     	}
     	$.ajax({
     		url:"delChannel",
     		type:'POST',
     		data:{
     			channel:JSON.stringify(menu),
     			model:JSON.stringify(data)
     		},
     		success:function(response){
 				$.ajax({
 					url : 'dTabList',
 					type : 'POST',
 					data : {
 						id : channel.transID
 					},
 					success : function(response) {
 						doReloadPage();
 					}
 				});
     		}
     	});
	}else{
		$.ajax({
			url : 'updStatOpenChannel',
			type : 'POST',
			data : {
				channel : channel.transID
			},
			success : function(response) {
				$.ajax({
					url : 'dTabList',
					type : 'POST',
					data : {
						id : channel.transID
					},
					success : function(response) {
					}
				});
			}
		});
	}
}

function doShowLoad(){
	$(".loader").fadeIn();
	$(".pre-loader").fadeIn();
}
function doCloseLoad(process, status, name){
	$(".loader").fadeOut();
	$(".pre-loader").fadeOut();
	
	if(process == "save-project"){
		$(".save-project").hide();
		if(status == "success"){
			successNotification(name);		
		}
	}
}