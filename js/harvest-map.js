
svg1=document.getElementById('svg1');

svgCalifornia=document.getElementById('svgCalifornia');

svgLouisiana=document.getElementById('svgLouisiana');

svgNorthdakota=document.getElementById('svgNorthdakota');

svgTexas=document.getElementById('svgTexas');

//make for each state


svgCalifornia.style.display = 'none';

svgLouisiana.style.display = 'none';

svgNorthdakota.style.display = 'none';

svgTexas.style.display = 'none';

settable=0;
var timeout;
document.getElementById('svg1').addEventListener('mouseover', function(ev){
	

	$("path, circle").mouseenter(function(e) {
	  
	  
	  $('#info-box').css('display','block');
	  $('#info-box').html($(this).data('info'));
	  
	 	  
	  
	  var var1 = $(this).data('info').replace('<div>','');
	  var var2 = var1.replace('</div>','');
	  var myArray    = new Array();
		
		myArray[1] = "Louisiana";
		myArray[2] = "California";
		myArray[3] = "Texas";
		myArray[4] = "Arkansas";
		myArray[5] = "Minnesota";
		myArray[6] = "North Dakota";
		myArray[7] = "Illinois";
		myArray[8] = "Missouri";
		myArray[9] = "Wisconsin";
		myArray[10] = var2;
		

		var myTable= "<table><tr><td style='height:15px; color: black;'>Rank</td>";
		myTable+= "<td style='height:15px; color: black; text-align: left;'> State</td>";
		//myTable+="<td style='width: 100px; color: black; text-align: left;'>State</td></tr>";
		//myTable+= "<td style='width: 10px; color: black; text-align: left;'> Rank cont...</td>";
		//myTable+="<td style='width: 100px; color: black; text-align: left;'>State</td></tr>";
		/*
		myTable+="<tr><td style='width: 10px;                   '>---------------</td>";
		myTable+="<td     style='width: 10px; text-align: left;'>---------------</td>";
		myTable+="<td     style='width: 100px; text-align: right;'>---------------</td></tr>";
	*/
	  	var myTable= "<table><tr><td style='height:15px; color: black;'>Rank</td>";
		//myTable+= "<td style='height:15px; color: black; text-align: left;'> State</td>";
	  for (var i=1; i<11; i++) {
		if (i==10){
			myTable+="<tr><td style='height:15px;'> " + "" + "    "+myArray[i]+"</td>";
		//myTable+="<td style='height:15px; text-align: left;'>" + myArray[i] + "</td>";
		}
		else{
		myTable+="<tr><td style='height:15px;'> " + i +":    "+myArray[i]+"</td>";
		//myTable+="<td style='height:15px; text-align: left;'>" + myArray[i] + "</td>";
		}
	  }  
	   myTable+="</table>";

	 document.getElementById('mytable').innerHTML = myTable;
	 });
	 $("path, circle").mouseleave(function(e) {
  $('#info-box').css('display','none');
});
})



$("path, circle").click(function(e) {
  $('#info-box').css('display','block');
  $('#info-box').html($(this).data('info2'));
});


$(document).mousemove(function(e) {
if (typeof $(this).data('info2') != null){
	
  $('#info-box').css('top',e.pageY-$('#info-box').height()-30);
  $('#info-box').css('left',e.pageX-($('#info-box').width())/2);
	}
}).mouseover();




var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if(ios) {
  $('a').on('click touchend', function() {
    var link = $(this).attr('href');
    window.open(link,'_blank');
    return false;
  });
}


document.getElementById('CA').addEventListener('click', function(ev){
	document.getElementById('svg1').style.display = 'none';
	svgCalifornia.style.display = 'block';
	//svgCalifornia.setAttribute("viewBox", "-124 83 500 500"); 
	svgCalifornia.setAttribute("viewBox", "50 75 50 150"); 
	svgCalifornia.setAttribute("height", "850"); 
	svgCalifornia.setAttribute("width", "1100"); 
	var myArray    = new Array();
		myArray[1] = "-";
		myArray[2] = "-";
		myArray[3] = "-";
		myArray[4] = "-";
		myArray[5] = "-";
		myArray[6] = "-";
		myArray[7] = "-";
		myArray[8] = "-";
		myArray[9] = "-";
		var myArray2    = new Array();
		myArray2[1] = "Merced";
		myArray2[2] = "Colusa";
		myArray2[3] = "Butte";
		myArray2[4] = "Glenn";
		myArray2[5] = "Sutter";
		myArray2[6] = "Imperial";
		myArray2[7] = "Solano";
		myArray2[8] = "Humboldt";
		myArray2[9] = "Siskiyou";
	$("path, circle").mouseenter(function(e) {
	  $('#info-box').css('display','block');
	  $('#info-box').html($(this).data('info2'));
	  var var1 = $(this).data('info').replace('<div>','');
	  var var2 = var1.replace('</div>','');
	  if (typeof $(this).data('info2') != 'undefined'){
	  var var3 = $(this).data('info2').replace('<div>','');
	  var var4 = var3.replace('</div>','');
	  }
		myArray[10] = "";
		myArray[11] = var2;
		myArray2[10] = var4;
		
		var myTable= "<table><tr><td style='height:15px; color: black;'>Rank within state.</td></tr>";
		//myTable+= "<td style='height:15px; color: black;'>Rank within state.</td></tr>";
	  for (var i=1; i<11; i++) {
		if (i==10){
			//myTable+="<tr><td style='height:15px;'>rank " + "    "+myArray[i]+"</td>";
			myTable+="<tr><td style='height:15px;'> " + "    "+myArray2[i]+"</td></tr>";
			myTable+="<tr><td style='height:15px;'> " + " National rank: "+myArray[11]+"</td></tr>";
		}
		
		else{
		//myTable+="<tr><td style='height:15px;'>rank " + i +"    "+myArray[i]+"</td>";
		myTable+="<td style='height:15px;'> " + i +"    "+myArray2[i]+"</td></tr>";
		}
	  }  
	   myTable+="</table>";
	 document.getElementById('mytable').innerHTML = myTable;
	 });
	svgCalifornia.addEventListener('click', function(ev){
		
		svgCalifornia.style.display = 'none';
		//loadsvg1table();
		svg1.style.display = 'block';
		
		return;
		
	})
	$("path, circle").mouseleave(function(e) {
  $('#info-box').css('display','none');
});
	
})

document.getElementById('TX').addEventListener('click', function(ev){
	
	document.getElementById('svg1').style.display = 'none';
	svgTexas.style.display = 'block';
	
	//svgTexas.setAttribute("viewBox", "50 170 600 600"); 
	svgTexas.setAttribute("viewBox", "170 250 200 30"); 
	svgTexas.setAttribute("height", "800"); 
	svgTexas.setAttribute("width", "1200"); 
	 var myArray    = new Array();
	 myArray[1] = "-";
	myArray[2] = "-";
	myArray[3] = "-";
	myArray[4] = "-";
	myArray[5] = "-";
	myArray[6] = "-";
	myArray[7] = "-";
	myArray[8] = "-";
	myArray[9] = "-";
	 var myArray2    = new Array();
	 myArray2[1] = "Colorado";
	myArray2[2] = "Wharton";
	myArray2[3] = "Jefferson";
	myArray2[4] = "Matagorda";
	myArray2[5] = "Brazoria";
	myArray2[6] = "Calhoun";
	myArray2[7] = "Aransas";
	myArray2[8] = "Bell";
	myArray2[9] = "Chambers";
	$("path, circle").mouseenter(function(e) {
	  $('#info-box').css('display','block');
	  $('#info-box').html($(this).data('info2'));
	  var var1 = $(this).data('info').replace('<div>','');
	  var var2 = var1.replace('</div>','');
	  if (typeof $(this).data('info2') != 'undefined'){
	  var var3 = $(this).data('info2').replace('<div>','');
	  var var4 = var3.replace('</div>','');
	  }
		myArray[10] = "";
		myArray[11] = var2;
		myArray2[10] = var4;
		
		var myTable= "<table><tr><td style='height:15px; color: black;'>Rank within state.</td></tr>";
		//myTable+= "<td style='height:15px; color: black;'>Rank within state.</td></tr>";
	  for (var i=1; i<11; i++) {
		if (i==10){
			//myTable+="<tr><td style='height:15px;'>rank " + "    "+myArray[i]+"</td>";
			myTable+="<tr><td style='height:15px;'> " + "    "+myArray2[i]+"</td></tr>";
			myTable+="<tr><td style='height:15px;'> " + " National rank: "+myArray[11]+"</td></tr>";
		}
		
		else{
		//myTable+="<tr><td style='height:15px;'>rank " + i +"    "+myArray[i]+"</td>";
		myTable+="<td style='height:15px;'> " + i +"    "+myArray2[i]+"</td></tr>";
		}
	  }  
	   myTable+="</table>";
	 document.getElementById('mytable').innerHTML = myTable;
	 });
	document.getElementById('svgTexas').addEventListener('click', function(ev){
		svgTexas.style.display = 'none';
		svg1.style.display = 'block';
	})
	/*
	var myArray3    = new Array();
		for (path in svgTexas){	//iterate through all paths in svg to set top counties and reset top counties to states
		  myArray3[j]=$("path, circle").data('info');
		  j++;
		}
		*/
		$("path, circle").mouseleave(function(e) {
  $('#info-box').css('display','none');
});
	
})

document.getElementById('ND').addEventListener('click', function(ev){
	document.getElementById('svg1').style.display = 'none';
	svgNorthdakota.style.display = 'block';
	svgNorthdakota.setAttribute("viewBox", "200 30 120 50"); 
	svgNorthdakota.setAttribute("height", "500"); 
	svgNorthdakota.setAttribute("width", "1200"); 
	var myArray    = new Array();
	  
		myArray[1] = "-";
		myArray[2] = "-";
		myArray[3] = "-";
		myArray[4] = "-";
		myArray[5] = "-";
		myArray[6] = "-";
		myArray[7] = "-";
		myArray[8] = "-";
		myArray[9] = "-";
		var myArray2    = new Array();
		myArray2[1] = "Stutsman";
		myArray2[2] = "Mclean";
		myArray2[3] = "Ramsey";
		myArray2[4] = "Kidder";
		myArray2[5] = "Logan";
		myArray2[6] = "Sheridan";
		myArray2[7] = "Benson";
		myArray2[8] = "Sargent";
		myArray2[9] = "Nelson";
	$("path, circle").mouseenter(function(e) {
	  $('#info-box').css('display','block');
	  $('#info-box').html($(this).data('info2'));
	  var var1 = $(this).data('info').replace('<div>','');
	  var var2 = var1.replace('</div>','');
	  if (typeof $(this).data('info2') != 'undefined'){
	  var var3 = $(this).data('info2').replace('<div>','');
	  var var4 = var3.replace('</div>','');
	  }
		myArray[10] = "";
		myArray[11] = var2;
		myArray2[10] = var4;
		
		var myTable= "<table><tr><td style='height:15px; color: black;'>Rank within state.</td></tr>";
		//myTable+= "<td style='height:15px; color: black;'>Rank within state.</td></tr>";
	  for (var i=1; i<11; i++) {
		if (i==10){
			//myTable+="<tr><td style='height:15px;'>rank " + "    "+myArray[i]+"</td>";
			myTable+="<tr><td style='height:15px;'> " + "    "+myArray2[i]+"</td></tr>";
			myTable+="<tr><td style='height:15px;'> " + " National rank: "+myArray[11]+"</td></tr>";
		}
		
		else{
		//myTable+="<tr><td style='height:15px;'>rank " + i +"    "+myArray[i]+"</td>";
		myTable+="<td style='height:15px;'> " + i +"    "+myArray2[i]+"</td></tr>";
		}
	  }  
	   myTable+="</table>";
	 document.getElementById('mytable').innerHTML = myTable;
	 });
	svgNorthdakota.addEventListener('click', function(ev){
		svgNorthdakota.style.display = 'none';
		svg1.style.display = 'block';
	})
	$("path, circle").mouseleave(function(e) {
  $('#info-box').css('display','none');
});
})

document.getElementById('LA').addEventListener('click', function(ev){
	document.getElementById('svg1').style.display = 'none';
	svgLouisiana.style.display = 'block';
	svgLouisiana.setAttribute("viewBox", "330 235 50 60"); 
	svgLouisiana.setAttribute("height", "500"); 
	svgLouisiana.setAttribute("width", "1200"); 
	var myArray    = new Array();
	  
		myArray[1] = "-";
		myArray[2] = "-";
		myArray[3] = "-";
		myArray[4] = "-";
		myArray[5] = "-";
		myArray[6] = "-";
		myArray[7] = "-";
		myArray[8] = "-";
		myArray[9] = "-";
		var myArray2    = new Array();
		myArray2[1] = "Vermillion";
		myArray2[2] = "Cameron";
		myArray2[3] = "Terrebon";
		myArray2[4] = "Plaquemines";
		myArray2[5] = "Avoyelles";
		myArray2[6] = "St. Bernard";
		myArray2[7] = "St. Tammany";
		myArray2[8] = "Jefferson Davis";
		myArray2[9] = "St. Mary";
	$("path, circle").mouseenter(function(e) {
	  $('#data-info').css('display','block');
	  $('#data-info').html($(this).data('info2'));
	  var var1 = $(this).data('info').replace('<div>','');
	  var var2 = var1.replace('</div>','');
	  if (typeof $(this).data('info2') != 'undefined'){
	    var var3 = $(this).data('info2').replace('<div>','');
	  var var4 = var3.replace('</div>','');
	  }
		myArray[10] = "";
		myArray[11] = var2;
		myArray2[10] = var4;
		
		var myTable= "<table><tr><td style='height:15px; color: black;'>Rank within state.</td></tr>";
		//myTable+= "<td style='height:15px; color: black;'>Rank within state.</td></tr>";
	  for (var i=1; i<11; i++) {
		if (i==10){
			//myTable+="<tr><td style='height:15px;'>rank " + "    "+myArray[i]+"</td>";
			myTable+="<tr><td style='height:15px;'> " + "    "+myArray2[i]+"</td></tr>";
			myTable+="<tr><td style='height:15px;'> " + " National rank: "+myArray[11]+"</td></tr>";
		}
		
		else{
		//myTable+="<tr><td style='height:15px;'>rank " + i +"    "+myArray[i]+"</td>";
		myTable+="<td style='height:15px;'> " + i +"    "+myArray2[i]+"</td></tr>";
		}
	  }  
	   myTable+="</table>";
	 document.getElementById('mytable').innerHTML = myTable;
	 });
	svgLouisiana.addEventListener('click', function(ev){
		svgLouisiana.style.display = 'none';
		svg1.style.display = 'block';
	})
	$("path, circle").mouseleave(function(e) {
  $('#info-box').css('display','none');
});
})

function getBBox(elem){
    var svg1 = document.getElementById('svg1'), e = elem.cloneNode(true);
    e.style.display = "inline";
    svg1.appendChild(e);
    var b = e.getBBox();
    svg1.removeChild(e);
    return b;
}

window.onload = function () {
 var myArray = new Array();
    
    myArray[1] = "Louisiana";
		myArray[2] = "California";
		myArray[3] = "Texas";
		myArray[4] = "Arkansas";
		myArray[5] = "Minnesota";
		myArray[6] = "North Dakota";
		myArray[7] = "Illinois";//tries to translate to finnish
		myArray[8] = "Missouri";
		myArray[9] = "Wisconsin";
    

   
		//var myTable= "<table><tr><td style='height:15px; color: black;'>Rank no.</td>";
		//myTable+= "<td style='height:15px; color: black; text-align: left;'> State</td>";
		//myTable+="<td style='width: 100px; color: black; text-align: left;'>State</td></tr>";
		//myTable+= "<td style='width: 10px; color: black; text-align: left;'> Rank cont...</td>";
		//myTable+="<td style='width: 100px; color: black; text-align: left;'>State</td></tr>";
		/*
		myTable+="<tr><td style='width: 10px;                   '>---------------</td>";
		myTable+="<td     style='width: 10px; text-align: left;'>---------------</td>";
		myTable+="<td     style='width: 100px; text-align: right;'>---------------</td></tr>";
	*/
	  	var myTable= "<table><tr><td style='height:15px; color: black;'>Rank no.</td></tr>";
		//myTable+= "<td style='height:15px; color: black; text-align: left;'> State</td>";
	  for (var i=1; i<11; i++) {
		if (i==10){
			myTable+="<tr><td style='height:15px;'>rank " + "" + "    "+myArray[i]+"</td>";
		//myTable+="<td style='height:15px; text-align: left;'>" + myArray[i] + "</td>";
		}
		else{
		myTable+="<tr><td style='height:15px;'>rank " + i +":    "+myArray[i]+"</td>";
		//myTable+="<td style='height:15px; text-align: left;'>" + myArray[i] + "</td>";
		}
	  }  
	   myTable+="</table>";

	 document.getElementById('mytable').innerHTML = myTable;
}

