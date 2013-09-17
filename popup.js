$(document).ready(function(){
	//Setup the UI
	$("#class-status").hide();
	$("#netid").focus();
	$("#netid").val('cwaldren');
	$("#pin").val('');
	$("#login").prop("disabled", true)
	//timestamp..
	var TS = 0;
	var $form = $("#login-form");

	//Get a valid TS
	$.ajax({
		type : 'get',
	    dataType : 'html',
	    url      : 'https://webreg.its.rochester.edu/prod/web/LoginMain.jsp',
	    success  : function(data) {
	    	var $data = $(data);
	    	var input = $("input", $data)[4];
	    	TS = input.attributes[2].nodeValue;
	    	$("input[name='TS']").val(TS);
	    	$("#login").prop("disabled", false)
	    },
	    error   : function() {
	    	$("#statusMsg").html("Couldn't set up vital things. Click the R again.");
	    }
	});



	$("#login").click(function() {
		if ($("#pin").val() != "" && $("#netid").val() != "")
		{
			
			var url = 'https://webreg.its.rochester.edu/prod/tapp';
			var data = $form.serialize();
			var $inputs = $form.find("input, select, button, textarea");

			$inputs.prop("disabled", true);
			$form.fadeTo(100,0).hide();
			$("html").animate({'height':'34px'});
			var request = $.ajax({
				type: "post",
				url: url,
				data: data,
				// xhrFields: {
    //   				withCredentials: true
  		// 			 }
			});
			$(".modal").fadeTo(0,0).show().fadeTo(300,1)
			request.done(function (){
        		//remove form
        		$form.remove();
        		

        		//get some data
        		$.ajaxSetup({
  					headers:
  					{
  						Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  						'Cache-Control': "no-cache"
  					}
				});
        		var url = 'https://webreg.its.rochester.edu/prod/tapp?Navigate=onlySchedule.jsp&OnError=error.jsp&LOAD_TERMS=true&TRX_ID=GetCollegeRegTerms&LOAD_DEF_REG_TERM=true&LOAD_SCHEDULE=true&TS='+TS;
			    var request = $.ajax({
					type: "get",
					url: url,
					cache: false,
					xhrFields: {
	      				withCredentials: true
	  				}
				});
			  
			    request.done(function(data){

			    		$("#class-status").show();
        				$("html").animate({'height':'100px'});
			    	    $(".modal").css("display","none");
			    		var response = $('<html />').html(data);
			    		var nameAndTerm = response.find("b").eq(8).text()
				    	$("#student-name").html(nameAndTerm)
						$("#classes").append('<div class="class-div">\
							<div class="class-header">\
							<h1>MTH 150</h1>\
							<h2>Discrete Math</h2>\
							</div>\
							<div class="class-info">blah blah</div>\
							</div>');
						$("#classes").append('<div class="class-div">\
							<div class="class-header">\
							<h1>MTH 150</h1>\
							<h2>Discrete Math</h2>\
							</div>\
							<div class="class-info">blah blah</div>\
							</div>');
						$("#classes").append('<div class="class-div">\
							<div class="class-header">\
							<h1>MTH 150</h1>\
							<h2>Discrete Math</h2>\
							</div>\
							<div class="class-info">blah blah</div>\
							</div>');
						$("#classes").append('<div class="class-div">\
							<div class="class-header">\
							<h1>MTH 150</h1>\
							<h2>Discrete Math</h2>\
							</div>\
							<div class="class-info">blah blah</div>\
							</div>');
				    	response.find("tr").each(function(classData) {
				    		console.log(classData)
				    	});

				    	 
				});


    		});
	
			request.fail(function (){
        	// log the error to the console
        		console.error("failed");
    		});

    		request.always(function () {
        // reenable the inputs
       			 $inputs.prop("disabled", false);
       			 
    		});
		}
	});

	
});