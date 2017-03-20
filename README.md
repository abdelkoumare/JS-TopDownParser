# JS-TopDownParser- Abdel Koumare


This code implements a simple, top-down parser in JavaScript for the “WML” template described in the folder
A(n optional) framework you can use to test the code is provided through the file wml.js

The code answers to the following requirements :

  1. Definition of appropriate regular expressions for recognizing the tokens for the WML grammar developed.
You should define RegExp-type variables for each of the all-capital named tokens.

2. Implement a basic scanner to recognize your tokens within a scan(s,tokenset) function, which re- 
ceives a string and an allowed set of tokens. The tokenset is an object with keys being the token names,
and the value being true. For example, a token set containing just DSTART and DEND would look like
f DSTART: true,
DEND: true g
Your scan function should return an object describing the token at the start of the string. This object
should include (at least) 2 fields,
f token: tokenname,
value: tokenvalue g
Where tokenname is the string name of a token (e.g., "DSTART"), and tokenvalue is a string representing
the literal characters that were used to match the token.
Your scanner should be able to recognize all components of template invocations, definitions, and parameters.
Verify your scanner works. Ensure that given the following driver function, and a string s composed of
characters that would match tokens in TOKENSET, it should be the case that scanit(s)==s.
function scanit(s) f
var sout = ""; f
while(s) f
var t = scan(s,TOKENSET);
sout += t.tokenvalue;
s = s.substr(t.tokenvalue.length);
g
return sout;
g

3. Implement functions to parse WML input. You should (at least) include functions, 
 parseOuter(s)
 parseTemplateInvocation(s)
 parseTemplateDef(s)
 parseTParam(s)
each of which receives a string and returns a parse tree (AST) of the result. Note that the input is a
string, so you will need your scan function from the previous question. You may assume the input is
syntactically correct WML text.
The AST should be represented by a hierarchy of objects, one object per grammar rule applied in the
parse. Each object should include a name field a string representation of the rule name (non-terminal),
and have fields for each (non-terminal) child object, including tokens where the content depends on the
input string (OUTERTEXT, INNERTEXT, INNERDTEXT, DNAME, PNAME). Where choice is possible, unused
fields should have the value null.
Some grammar rules have iterated structure, specified by *. In these cases form a linked list, by including
a next field that points to the next instance, terminating in null. For example, the input string
abcfffooggdef.

4. To verify your parse, define a function, printAST(a) which receives an AST node (as returned from 
any of your functions in the previous question), and returns a string representation of the input. You may
format the string output however you like, but it should be the case that
printAST(parse(s)) == printAST(parse(printAST(parse(s))))
