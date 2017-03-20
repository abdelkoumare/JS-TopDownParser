/* 
TSTART = "{{"
TEND = "}}"
PIPE = "|"
OUTERTEXT = anything, but TSTART, DSTART
INNERTEXT = anything, but TSTART, DSTART, PSTART, PIPE, TEND
DSTART = "{:"
DEND = ":}"
INNERDTEXT = anything, but TSTART, DSTART, PSTART, PIPE, DEND
PSTART = "{{{"
PEND = "}}}"
PNAME = anything, but PIPE, PEND

<outer> ::= (OUTERTEXT |<templateinvocation>|<templatedef>)*
<templateinvocation> ::= TSTART <itext> <targs> TEND
<targs> ::= (PIPE <itext>)*
<itext> ::= (INNERTEXT |<templateinvocation>|<templatedef>|<tparam>)*

<templatedef> ::= DSTART <dtext> (PIPE <dtext>)+ DEND
<dtext> ::= (INNERDTEXT |<templateinvocation>|<templatedef>|<tparam>)*

<tparam> ::= PSTART PNAME PEND
*/

// QUESTION 1 /{{}}

var TSTART = /{{/ ; // 
var TEND = /}}/; // same  for TEND

var DSTART = /{:/;
var DEND= /:}/;


var PIPE = /[|]/

// Outer text is anything, but TSTART, DSTART
var OUTERTEXT = /^(?!.*{{)(^(?!.*{:))/; //.* is used to negate everything inside ()
// Inner text is anything, but TSTART, PIPE, or TEND, DSTART, PSTART
var INNERTEXT =   /^(?!.*{{)(^(?!.*[|]))(^(?!.*}}))(^(?!.*{:))(^(?!.*{{{))/ //
// INNERDTEXT is anything, but TSTART, DSTART, DEND, PIPE, PSTART
var INNERDTEXT =  /^(?!.*{{)(^(?!.*{:))(^(?!.*:}))(^(?!.*[|]))(^(?!.*{{{))/


var PSTART= /{{{/;
var PEND= /}}}/;
var PNAME= /^(?!.*([|])|(}}}))/;

var TEST= /^(?!{{|{:).*$/ // other regex for innertext


	//console.log( "result test regex: \n  " + TEST.test("anfgag"));



// Question 2


function scaner(string,tset){
 
 // The first if statement is with PSTART to solve the problem of overlap we set priorities in the RE's

 if(PSTART.test(string.substr(0,3))){ // We check if the token set PSTART in it's properties
		 // We use the regular expression PSTART.test to check if there is a match
		if(tset.hasOwnProperty("PSTART"))
		return {token: "PSTART", value: string.substr(0,3)} // If there is a match we retrun an object with the token name and the value matched
	}

	// PEND }}} Following our ordering PEnd comes befor TEND
 if(PEND.test(string.substr(0,3))) { 
		if(tset.hasOwnProperty("PEND"))
		return {token: "PEND", value: string.substr(0,3)} 
	}

 //Second case with the TSART following our priority

	if(TSTART.test(string.substr(0,2))){ // We check if the token set TSTART in it's properties
		if(tset.hasOwnProperty("TSTART")) // We use the regular expression TSTART.test to check if there is a match
		return {token: "TSTART", value: string.substr(0,2)} // If there is a match we retrun an object with the token name and the value matched
	}

// DSTART
if(DSTART.test(string.substr(0,2))){ 
		 if(tset.hasOwnProperty("DSTART"))
		return {token: "DSTART", value: string.substr(0,2)} 
	}


// TEND }}
if(TEND.test(string.substr(0,2))) { 
		if(tset.hasOwnProperty("TEND")) 
		return {token: "TEND", value: string.substr(0,2)} 
	}

// DEND :}
if(DEND.test(string.substr(0,2))) { 
		if(tset.hasOwnProperty("DEND"))
		return {token: "DEND", value: string.substr(0,2)} 
	}

//PIPE

if(PIPE.test(string.substr(0,1)))  { 
		 if(tset.hasOwnProperty("PIPE"))
		return {token: "PIPE", value: string.substr(0,1)} 
	}











//OUTERTEXT


var s0= string;
var counter =0;
var val0="";


while(s0){


	if(!OUTERTEXT.test(s0.substr(0,2)))// 0-2 because of Tstart and Tstart
		break

	val0 += s0.charAt(0);
	s0= s0.substr(1);
	
	}
	if(tset.hasOwnProperty("OUTERTEXT")){ 
		return {token:"OUTERTEXT", value: val0} 
		}




// INNERTEXT



		//if(INNERTEXT.test(string.substr(0,1))) 

var s1= string;
var val1="";

while(s1){

	//if(!INNERTEXT.test(s.substr(0,2))) // 0-3 because of Pstart "{{{"
	//	break

	if(PSTART.test(s1.substr(0,3))) // check the ending conditions
		break
	if(TSTART.test(s1.substr(0,2)))
		break
	else if(DSTART.test(s1.substr(0,2)))
		break
	if(TEND.test(s1.substr(0,2)))
		break 
	if(PIPE.test(s1.charAt(0)))
		break
		
	val1= val1+s1.charAt(0);
	s1= s1.substr(1);
	}

if(tset.hasOwnProperty("INNERTEXT")){ 
		return {token: "INNERTEXT", value: val1} 
	}





// INNER D TEXT 

		//if(INNERDTEXT.test(string.substr(0,1))) 

	var s2= string;
	var val2="";

while(s2){

	//if(!INNERDTEXT.test(s.substr(0,2))) // 0-3 because of Pstart "{{{"
	//	break 

		if(PSTART.test(s2.substr(0,3))) // check the ending conditions
		break
	else if(TSTART.test(s2.substr(0,2)))
		break
	else if(DSTART.test(s2.substr(0,2)))
		break
	else if(DEND.test(s2.substr(0,2)))
		break
	else if(PIPE.test(s2.charAt(0)))
		break
		
	val2+= s2.charAt(0);
	s2= s2.substr(1);
	
	}

	if(tset.hasOwnProperty("INNERDTEXT")){ 

		return {token: "INNERDTEXT", value: val2} 
	}





// PNAME 

		//if(PNAME.test(string.substr(0,1))) 
		var s3= string;
		var val3="";

		while(s3){

		if(!PNAME.test(s3.substr(0,3))) // 0-3 because of PEND
			break 
		
	val3= val3+s3.charAt(0);
	s3= s3.substr(1);
	}

	if(tset.hasOwnProperty("PNAME")){ 
		return {token: "PNAME", value: val3} 
	}








}

// TESTING
var tokenset = {TSTART:true , OUTERTEXT:true};
var tokenset2= {INNERDTEXT:true};


/*
console.log(" \n -----------TEST SCAN :  ")
var result1 = scaner("agag",tokenset2);
console.log(result1)
console.log("----------------End test scan----------------\n ")
*/



/*
function scanit(s) {
var sout = ""; 
while(s) {
var t = scaner(s,tokenset);
sout += t.value;
s = s.substr(t.value.length);
}
return sout;
}

console.log(scanit("{{{hellow"));
*/

/*Question 3 

Implement functions to parse WML input. You should (at least) include functions, 
 parseOuter(s)/  parseTemplateInvocation(s) / parseTemplateDef(s)/ parseTparam(s)

each of which receives a string and returns a parse tree (AST) of the result. Note that the input is a
string, so you will need your scan function from the previous question. You may assume the input is
syntactically correct WML text.
The AST should be represented by a hierarchy of objects, one object per grammar rule applied in the
parse. Each object should include a name field a string representation of the rule name (non-terminal),
and have fields for each (non-terminal) child object, including tokens where the content depends on the
input string (OUTERTEXT, INNERTEXT, INNERDTEXT, DNAME, PNAME). Where choice is possible, unused
fields should have the value null.
Some grammar rules have iterated structure, specified by *. In these cases form a linked list, by including
a next field that points to the next instance, terminating in null. For example, the input string "abc {{foo}}def"


<outer> ::= (OUTERTEXT |<templateinvocation>|<templatedef>)*
<templateinvocation> ::= TSTART <itext> <targs> TEND
<targs> ::= (PIPE <itext>)*
<itext> ::= (INNERTEXT |<templateinvocation>|<templatedef>|<tparam>)*

<templatedef> ::= DSTART <dtext> (PIPE <dtext>)+ DEND
<dtext> ::= (INNERDTEXT |<templateinvocation>|<templatedef>|<tparam>)*

<tparam> ::= PSTART PNAME PEND


*/

/*
Here we have the parsing functions. 
The way I designed it is to always call parseOuter to test the parsing behaviour. From the parseOuter function we whill call other parsing function 
depending on the input string and compute the grammar rules. 
It will return a linked list where each node is an object that describes the grammar rules applied 
*/

var counter = 0; // GLOBAL variable counter to keep track of the position in the input string 


function parseOuter(s){



	var tset = {OUTERTEXT:true , TSTART: true , DSTART: true } // Contains the first TOKENS possible in the <outer>
	var object = {name:"outer", OUTERTEXT: null, templateinvocation: null, templatedef: null, next: null}

	var tk = scaner(s.substr(counter),tset) // we want the parseOuter to start at the counter after the incrementations
	console.log("token in Parsouter: ")
	console.log(tk); 

	if (tk.token == "OUTERTEXT"){
		

		counter+= tk.value.length; // increment the counter with the length of the match

		object.OUTERTEXT= tk.value.trim();  // set the value of outerText and trim() to get rid of white spaces

		if(counter<s.length)
		object.next= parseOuter(s); // ITERATION PART TO
		
		// add getting rid of the white space// with trim function

			
	}

	if(tk.token == "TSTART"){

		counter+= 2; // Increment the counter by 2 for "{{"
		object.templateinvocation = parseTemplateInvocation(s)
		
		if(counter<s.length)
			object.next = parseOuter(s) // to continue the recursion
	}
	if(tk.token == "DSTART"){

		counter+=2; // Increment the counter by 2 for "{:"
		object.templatedef = parseTemplateDef(s);
	//	counter+=2 // When we come back from DSTART we have increment by 2 for :} DEND <<<<<<<<<<DOUBLE CHECK

		if(counter<s.length)
			object.next = parseOuter(s) // To continue the recursion

		//object.templateinvocation= parseTemplateDef(s.substr(tk.value.length))
	}

	//while(counter<s.length) // To get rid of while spaces
	//	object.next= parseOuter(s)
	counter =0 ; // Reset the counter for question 4
	return object;

}

/*
var x0 = parseOuter("aa{:baa}aa"); 
console.log("\n ============================================= Parsing functions result============================ \n ")
 console.log(x0);
*/


// TEMPLATE INVOCATION

// <templateinvocation> ::= TSTART <itext> <targs> TEND
function parseTemplateInvocation(s){

//console.log("Hiiiiiii\n\n")

	var tset = {TSTART:true, INNERTEXT: true, PIPE: true, TEND:true}
	var object = {name: "templateinvocation", itext: null, targs: null };



	
		object.itext = parseItext(s); // directly call parseItext
		
		console.log("\n----Itext in template invocation------\n")
		console.log(object.itext); // to prind the object
			console.log("\n---- END Itext in template invocation------\n")


		//after parseItext

		tk= scaner(s.substr(counter),tset);

	if(tk.token== "PIPE"){
		counter+= 1; // for "| "
		object.targs= parseTargs(s);
	}

	return object;



}

/* PARSE ITEXT
*/

// <itext> ::= (INNERTEXT |<templateinvocation>|<templatedef>|<tparam>)* 

function parseItext(s){



	var tset = {INNERTEXT:true, TSTART: true, DSTART: true, PSTART:true, PEND:true, TEND: true, DEND:true}

	var object= {name: "itext", innerText: "", templateinvocation: null, templatedef: null, tparam: null, next : null } 

	tk= scaner(s.substr(counter), tset);

	



	// PSTART in an ITEXT

	if(tk.token=="PSTART"){ 
		counter+=3; // {{{ for PSTART
		
		object.tparam= parseTparam(s);

		object.innerText = null // set the value of InnerText to null and point to Tparam

		console.log("\n------ Tparam in parseItext-----\n")
		console.log(object.tparam) ;
		console.log("\n------ END----------\n")

		var temp = scaner(s.substr(counter),{PEND:true}) //check if it's the end of a taparam

		if(temp.token == "PEND"){

			counter+= 3
			return object
		}
		else 
			object.next= parseItext(s);

	}

	if(tk.token=="TSTART"){ 
	
		counter+= 2; // increment by 2 for {{ TSTART
		object.templateinvocation= parseTemplateInvocation(s);

		object.innerText = null // set the value of InnerText to null and point to Tparam

		console.log("\n------ Template Invocation in parseItext-----\n")
		console.log(object.templateinvocation) ;
		console.log("\n------ END----------\n")

		var temp = scaner(s.substr(counter),{TEND:true}) //check if it's the end of a template invoc

		if(temp.token=="TEND"){

			counter+= 2
			return object
		}
		else 
			object.next= parseItext(s);
		
	} 

	if(tk.token=="DSTART"){ 
		counter+=2; // increment for DSTART {:
		object.templatedef= parseTemplateDef(s);

		object.innerText = null // set the value of InnerText to null and point to Tparam

		console.log("\n------ Template Definition in parseItext-----\n")
		console.log(object.templatedef) ;
		console.log("\n------ END----------\n")

		var temp = scaner(s.substr(counter),{DEND:true}) //check if it's the end of a template def

		if(temp.token == "DEND"){

			counter+= 2
			return object
		}
		else 
			object.next= parseItext(s);
	}
	



while(counter < s.length) // We go thourgh this while loop to implement the interative part of Itext
    	{
		var o = scaner(s.substr(counter),{INNERTEXT: true, DSTART: true, TSTART: true, PSTART: true, TEND:true, PIPE:true}) // we call another scaner
		t = o.value // we store the value of the returned value from the scaner

		if(o.token=="PIPE")
		{
						object.innerText = object.innerText.trim()
			break
		}
		else if(o.token=="INNERTEXT")
                {
                        object.innerText += t
                        counter += t.length
                }     
		else if(o.token=="PSTART")
        	{
						object.innerText = object.innerText.trim()
                	object.next = parseItext(s)
			break
        	}
		else if(o.token=="TSTART")
                {
			object.innerText = object.innerText
                  object.next = parseItext(s)
			break
                }
		else if(o.token=="TEND")
                {       
						object.innerText = object.innerText.trim()
						counter+=2	
                        break
                }
        	else if(o.token=="DSTART")
        	{
			object.innerText = object.innerText.trim()
                	object.next = parseItext(s)
        		break
			} 
    }


	//console.log("\n objectkkk")
	//console.log(object)
	//console.log("\n objectkkk")



	return object; 


}





/*
// templatedef> ::= DSTART <dtext> (PIPE <dtext>)+ DEND
parseTemplateDef


*/


function parseTemplateDef(s){ // 



	var tset= {DSTART:true, INNERDTEXT: true, PIPE: true, DEND:true};

	var object= {name: "templatedef", dtext: null, pipeDtext:null}

	

	// DSTART HAS ALREADY BEEN VERYFIED IN OUTERTEXT (( if we want to testParseTemplate def re-write the code for testingDstart))
	object.dtext= parseDtext(s);
	

	console.log("\n----Dtext in template Definition parseTemplateDef------\n")
	console.log(object.dtext); // to prind the object
	console.log("\n---- END Dtext in template Definition parseTemplateDef ------\n")


	tk= scaner(s.substr(counter),tset);



	if(tk.token=="PIPE"){

		counter+=1;
		object.pipeDtext= parsePipeDtext(s) // Recursive part "+"
	}


	return object

}


/*
// <tparam> ::= PSTART PNAME PEND
PARSE-->TPARAM
*/

function parseTparam(s) {

	var tset= {PSTART:true, PNAME: true, PEND:true}

	var object= {name:"tparam",pname:null}

	var tk= scaner(s.substr(counter),tset)

	if(tk.token=="PNAME"){
		counter+=tk.value.length //increment counter
		object.pname=tk.value.trim()
	}
	if(tk.token=="PEND"){ 
		counter+= 3 // increment counter for "}}}"
		return object
	}

	return object

}
 


 //<targs> ::= (PIPE <itext>)*
// PARSE TARGS

function parseTargs(s){
	var tset = {PIPE:true, INNERTEXT:true};
	var object = {name:"targs", itext: null, next: null}

	object.itext= parseItext(s) ;

	var tk = scaner (s.substr(counter),tset);

	if (tk.token== "PIPE"){
		counter+=1; 
		object.next= parseTargs(s) ;
	}

	return object;


}

/*
	This is a non terminale element that I defined to simplify the work in template def for " (PIPE <dtext>)+"
	I asked the prof he said it's allowed

	PARSEPIPEDTEXT(s)
*/
function parsePipeDtext(s){

	var object = {name:"pipeDtext",dtext:null, next: null}

	var tk = scaner(s.substr(counter),{PIPE:true,INNERDTEXT:true})

	object.dtext= parseDtext(s); // directly call detxt

	if(tk.token=="PIPE"){

		counter+=1;
		object.next= parsePipeDtext(s); //check the recursive part 
	}

	return object 

}



// <dtext> ::= (INNERDTEXT |<templateinvocation>|<templatedef>|<tparam>)*

function parseDtext(s){


	var tset=  {INNERDTEXT:true, TSTART: true, DSTART:true, PSTART: true,TEND:true, PIPE: true, PEND:true, DEND:true, }

	var object= {name:"dtext", innerDtext:"", templateinvocation: null, templatedef: null, tparam:null, next:null }

	

	var tk= scaner(s.substr(counter),tset); 



	// PSTART in an ITEXT

	if(tk.token=="PSTART"){ 

		counter+=3; // {{{ for PSTART
		
		object.tparam= parseTparam(s);

		object.innerDtext = null // set the value of InnerDtext to null and point to Tparam

		console.log("\n------ Tparam in parseDtext-----\n")
		console.log(object.tparam) ;
		console.log("\n------ END----------\n")

		var temp = scaner(s.substr(counter),{PEND:true}) //check if it's the end of a taparam

		if(temp.token == "PEND"){

			counter+= 3
			return object
		}
		else 
			object.next= parseDtext(s);

	}

	if(tk.token=="TSTART"){ 
	
		counter+= 2; // increment by 2 for {{ TSTART
		object.templateinvocation= parseTemplateInvocation(s);

		object.innerDtext = null // set the value of InnerDText to null and point to Tparam

		console.log("\n------ Template Invocation in parseDtext-----\n")
		console.log(object.templateinvocation) ;
		console.log("\n------ END----------\n")

		var temp = scaner(s.substr(counter),{TEND:true}) //check if it's the end of a template invoc

		if(temp.token=="TEND"){

			counter+= 2
			return object
		}
		else 
			object.next= parseDtext(s);
		
	} 

	if(tk.token=="DSTART"){

		counter+=2; // increment for DSTART {:
		object.templatedef= parseTemplateDef(s);

		object.innerDtext = null // set the value of InnerDText to null and point to Tparam

		console.log("\n------ Template Definition in parseDtext-----\n")
		console.log(object.templatedef) ;
		console.log("\n------ END----------\n")

		var temp = scaner(s.substr(counter),{DEND:true}) //check if it's the end of a template def

		if(temp.token == "DEND"){

			counter+= 2
			return object
		}
		else 
			object.next= parseDtext(s);
	}



while(counter<s.length) // We go thourgh this while loop to implement the interative part of Itext
    	{
    		

		var o = scaner(s.substr(counter),{INNERDTEXT: true, DSTART: true, TSTART: true, PSTART: true, DEND:true, PIPE:true}) // we call another scaner
		t = o.value // we store the value of the returned value from the scaner

		if(o.token=="PIPE")
		{
						object.innerDtext = object.innerDtext.trim()
			break
		}

		if(o.token=="DEND"){

			counter+=2

			object.innerDtext= object.innerDtext.trim()
			break //out of while loop

		}

		else if(o.token=="PSTART")
        	{
						object.innerDtext = object.innerDtext.trim()
                	object.next = parseDtext(s)
			break

        	}

        	else if(o.token=="TSTART")
                {
			object.innerDtext = object.innerDtext
                  object.next = parseDtext(s)
				break
                }


		else if(o.token=="INNERDTEXT")
                {
                        object.innerDtext +=t
                        counter += t.length

                        
                }    

		else if(o.token=="DSTART")
        	{
			object.innerDtext = object.innerDtext.trim()
                	object.next = parseDtext(s)
        		break
			} 

		
	
        	

    	}

    	return object;

  }


 
var x0 = parseOuter("COMP{{302}}FALL{{2016}}{:Hard Course:}"); 

console.log("\n ============================================= Parsing functions result============================ \n ")
 console.log(x0);
 console.log("\n ============================================= END --- Parsing functions result============================ \n")
	



/* QUESTION 4 

 4. To verify your parse, define a function, printAST(a) which receives an AST node (as returned from 
any of your functions in the previous question), and returns a string representation of the input. You may
format the string output however you like, but it should be the case that
printAST(parse(s)) == printAST(parse(printAST(parse(s))))

COMMENT : 
- From my Q3, it is assumed that parse(s) --> parseOuter(s) 
- I chekck if each object field has a value with the help of  " if(value)"
---> if(value) : 
will evaluate to true if value is not: null / undefined / NaN / empty string ("") /0 / false
*/

function printAST(a)
{


	//	<outer> ::= (OUTERTEXT |<templateinvocation>|<templatedef>)*

	// case for "OUTER object"
	if(a.name == "outer") // We go in the inverse way by checking all the fields of an "outer" object
	{
		if(a.OUTERTEXT) //Check if it has an outertext VALUE
		{
			if(a.templateinvocation) // then a tepmlete invoaction 
			{
				if(a.next) // next is the recursive part if it is also present , format print outer Text then in TSTART and TEND
				{ 
					
					
					return a.OUTERTEXT + "{{" + printAST(a.templateinvocation) + "}}" + printAST(a.next) // we make recursive call to printAST to go back
				}
			else // if no next value : 
				return a.OUTERTEXT + "{{" + printAST(a.templateinvocation) + "}}"
			}

		 if(a.templatedef) // now if template definition has a vlaue 
			{
				if(a.next)
                                {
                                       return a.OUTERTEXT + "{:" + printAST(a.templatedef) + ":}" + printAST(a.next)
                                }
               else // if no next value
                return a.OUTERTEXT +"{:" + printAST(a.templatedef) + ":}"
			}

		 if(a.next) // if only a a.next in an object having an outer text value 
			{
				return a.OUTERTEXT + printAST(a.next)
			}
			else
			 return a.OUTERTEXT  // ultimate case, only return OUTERTEXT
		} // End of if outertext has a value 

		// --------------

		else if(a.templateinvocation){ // NOW CASE when the outer has null in a.OUTERTEXT and has a value in template invocaiton

			if(a.next) // check if there is a next value
               		return "{{" + printAST(a.templateinvocation) + "}}" + printAST(a.next) 
         		else 
         			return "{{" + printAST(a.templateinvocation) + "}}"
		}

	 if(a.templatedef) //NOW CASE when the outer has null in a.OUTERTEXT and has a value in Template definition
                {
                        if(a.next)
                                return "{:" + printAST(a.templatedef) + ":}" + printAST(a.next)
                        else 
                        	return "{:" + printAST(a.templatedef) + ":}"
                }

	if(a.next) // LAST CASW WHERE all the object fields are empty except a.next 
                	return printAST(a.next) // go to a.next 
		else
		 return ""  // if there is no a.next it's an empty object so return empty string
	} // 


	/* 

			object grammar type : template invocation 
			<templateinvocation> ::= TSTART <itext> <targs> TEND
			--> We follow the logic used in the previous example to go over each object fields

	*/

if(a.name == "templateinvocation") // if the object field is template invocation
	{
		
		// IF THE OBJECT  has an ITEXT  value
		if(a.itext)
		{
			if(a.targs) // if it also has a targs value
			 return printAST(a.itext) + printAST(a.targs)  // print both of just print ITEXT

			else 
			 return printAST(a.itext) // else just return to print AST
		}
		else 
			return "" // else this is an empty object 
	}



	/* FOR OBJECT name Itex----------------------------
	<itext> ::= (INNERTEXT |<templateinvocation>|<templatedef>|<tparam>)*

	*/



	 if(a.name == "itext") // check if theo oject has an Itext value
	{
		if(a.innerText) // check if itext has an INNERTEXT value
		{
			if(a.templateinvocation) // AND template invocation vlaue
			{
				if(a.next) // AND next 
					return a.innerText + "{{" + printAST(a.templateinvocation) + "}}" + printAST(a.next) 
				else 
					return a.innerText+ "{{" + printAST(a.templateinvocation) + "}}" 
			}


		if(a.templatedef) // if has template definition value 
			{
				if(a.next) // ANd a next field
                {
                  return a.innerText + "{:" + printAST(a.templatedef) + ":}" + printAST(a.next) 
                }
                else 
                	return a.innerText +"{:" + printAST(a.templatedef)
			}


		if(a.tparam) // If tparam has a value 
			{
				if(a.next) // AND next value
                {
                 return a.innerText + "{{{" + printAST(a.tparam) + "}}}" + printAST(a.next) 
                }
                else // else juste return tparam value and go back to print AST
                 return a.innerText +"{{{" + printAST(a.tparam) + "}}}"
			}

		if(a.next) // if a next has a relue simply return to printAST with it's value
			{
				return a.innerText + printAST(a.next) 
			}			
			else // else just return 
				return a.innerText
		}


		if(a.templateinvocation) // now it just a template invocation 
                {
                        if(a.next) // AND a.next ?
                                return "{{" + printAST(a.templateinvocation) + "}}" + printAST(a.next)
                        else // just return to parstAT 
                        	return "{{" + printAST(a.templateinvocation) + "}}"
                }

        if(a.templatedef) // if template def
                {
                        if(a.next)
                                return "{:" + printAST(a.templatedef) + ":}" + printAST(a.next)
                        else return "{:" + printAST(a.templatedef) + ":}"
                }

	if(a.tparam) // if tparam has a vaue
		{
			if(a.next)
             return "{{{" + printAST(a.tparam) + "}}}" + printAST(a.next)
            else 
              return "{{{" + printAST(a.tparam) + "}}}"
		}

                else return ""
	} //----- END onf ITEXT---- 


	/*
		Object type of grammar used : TEMPLATE DEF
		<templatedef> ::= DSTART <dtext> (PIPE <dtext>)+ DEND
	*/

 if(a.name == "templatedef") // for template definition we gotta chekc for dtext value and pipe values
	{

		
		if(a.dtext) // if the object has a dtext value
		{
			if(a.dargs)  // AND if it has a dargs value as well
				return printAST(a.dtext) + printAST(a.dargs) 
			else  // Else just return dtext
				return printAST(a.dtext)
		}
		else return "" // just return empty string
	}
	
/*

Object of type DTEXT 

============> This is basically the same thing as Itext but with Dtext and InnerDtext

dtext> ::= (INNERDTEXT |<templateinvocation>|<templatedef>|<tparam>)*

*/


if(a.name == "dtext") 
	{


		if(a.innerDtext)
                {
               if(a.templateinvocation)
                        {
                                if(a.next)
                                        return a.innerDtext + "{{" + printAST(a.templateinvocation) + "}}" + printAST(a.next)
                                else
                                 return a.innerDtext+ "{{" + printAST(a.templateinvocation) + "}}"
                        }

              if(a.templatedef)
                        {
                                if(a.next)
                                {
                                        return a.innerDtext + "{:" + printAST(a.templatedef) + ":}" + printAST(a.next)
                                }
                                else
                                 return a.innerDtext+"{:" + printAST(a.templatedef) + ":}"
                        }

                if(a.tparam)
                        {
                                if(a.next)
                                {
                                        return a.innerDtext + "{{{" + printAST(a.tparam) + "}}}" + printAST(a.next)
                                }
                                else 
                                return a.innerDtext +"{{{" + printAST(a.tparam) + "}}}"
                        }

			 	if(a.next) 
			 		return a.innerDtext + printAST(a.next)
                else 
                	return a.innerDtext

                }



        if(a.templateinvocation)
                {
             		if(a.next)
                        return "{{" + printAST(a.templateinvocation) + "}}" + printAST(a.next)
                        else 
                        	return "{{" + printAST(a.templateinvocation) + "}}"
                }
               if(a.templatedef)
                {
                 if(a.next)
                 	return "{:" + printAST(a.templatedef) + ":}" + printAST(a.next)
                else 
                	return "{:" + printAST(a.templatedef) + ":}"
                }
               if(a.tparam)
                {
                        if(a.next)
                                return "{{{" + printAST(a.tparam) + "}}}" + printAST(a.next)
                        else 
                        		return "{{{" + printAST(a.tparam) + "}}}"
                }
                else return "" // just return empty string 

	}


/*
 		Parse AST for targs objects 
 		<targs> ::= (PIPE <itext>)*
*/


if(a.name == "targs") // check if the name is targs
	{
		if(a.itext) // if it has an Itext value
		{
			if(a.next) // AND A NEXT so return both
				return "|" + printAST(a.itext) + printAST(a.next)
			else  // or else return only the pipe
				return "|" + printAST(a.itext)
		}
	}


/*
 Check if the object type is pipeDtext : 
 This is a non terminale element that I defined to simplify the work in template def for " (PIPE <dtext>)+"
	I asked the prof he said it's allowed

	PARSEPIPEDTEXT(s)

*/

if(a.name == "pipeDtext") // check the name of the element
        {
                if(a.dtext) // check if dtext has a value 
                {
                        if(a.next) //AND next 
                                return "|" + printAST(a.dtext)  + printAST(a.next)
                        else // If not return the pipe and recursively call print AST9 a.ditext)
                        	return "|" + printAST(a.dtext)
                }
        }


/*
		Object of kind of "tparam"
*/

 if(a.name == "tparam") // check the name toaram
	{
		return "{{{" + a.name + "}}}"   // directly return the value of pname
	}

}

console.log("========================PrintAST=========================\n\n\n\n")

//var r = printAST(parseOuter("{:abc:}")) 

//console.log(r)

//var one= ""+printAST(parseOuter("abdelllKKKK"))
//console.log('\n here i am')
//console.log(one)
//counter=0;
//console.log('\n here i am 22222')
//var x = printAST(parseOuter(one))

//var s = "aa{{a}}{:aa:}"

var s = "{:hello:} {{hello2foo1}}"

//console.log(printAST(parseOuter("{:abc:}")))

console.log(printAST(parseOuter(s)) == printAST(parseOuter(printAST(parseOuter(s)))))














