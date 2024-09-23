// first JSON parser
function parse(text) {
  let ch = " ";
  /* 
    this's position is index, and also col/ln number.
  */
  let position = 0;

  function next(c) {
    if (c && ch !== c) {
      throw SyntaxError(
        `expected current char was \`${c}\`, but got ${ch} at position ${position}`
      );
    }

    position += 1;
    ch = text.charAt(position);
    return ch;
  }

  function skip() {
    while (ch <= " ") {
      position += 1;
      ch = text.charAt(position);
    }
  }

  function string() {
    let string = "";
    skip();

    if (ch === '"') {
      while (next()) {
        if (ch === '"') {
          next(); // manually next char.
          return string;
        } else if (ch === "\\") {
          next();
          if (escape[ch]) {
            string += escape[ch];
          }
        } else {
          string += ch;
        }
      }
    }

    throw new SyntaxError(
      "Unexpected token while parsing string at position " + position
    );
  }


  /* 
    object is a recursive structure, so we need to call value() function recursively.


  */
  function object() {
    let key = "";
    const object = {};
    if (ch === "{") {
      next("{");
      skip();

      if (ch === "}") {
        next("}");
        return Object.create(null);
      }

      while (ch) {
        key = string();
        skip();
        next(":");
        object[key] = value();
        skip();
        if (ch === "}") {
          next("}");

          return object;
        }

        next(",");
        skip();
      }
    }
  }

  function array() {
    const array = [];
    if (ch === "[") {
      next("[");
      skip();

      if (ch === "]") {
        // terminate
        next("]");
        return array;
      }

      while (ch) {
        array.push(value());
        skip();
        console.log(ch);

        if (ch === "]") {
          next("]");
          return array;
        }
        next(",");
        skip();
      }
    }
  }

  function keyword() {
    const keywords = ["true", "false", "null"];
    switch (ch) {
      case "t":
        keywords[0].split("").forEach((char) => next(char));
        return true;
      case "f":
        keywords[1].split("").forEach((char) => next(char));
        return false;
      case "n":
        keywords[2].split("").forEach((char) => next(char));
        return null;
      default:
        throw new SyntaxError("unexpected token at position " + position);
    }
  }

  function number() {
    let string = "";

    if (ch === "-") {
      string = "-";
    }
    while (ch >= "0" && ch <= "9") {
      string += ch;
      next();
    }

    if (ch === ".") {
      string += ".";
      while (next() && ch >= "0" && ch <= "9") {
        string += ch;
        next();
      }
    }

    return parseInt(string, 10);
  }

  /* 
    value is the main function that will be called recursively.

  */
  function value() {
    skip();
    switch (ch) {
      case "{":
        return object();
      case '"':
        return string();
      case "-":
        return number();
      case "[":
        console.log("array");
        return array();
      default:
        return ch >= "0" && ch <= "9" ? number() : keyword();
    }
  }

  ch = text.charAt(0);
  let result = value();
  return result;
}

const jsonStr = `{
  "name": "John Doe",
  "age": 30,
  "email": "1:2:3:4:5",
  "friends": [
    {
      "name": "Jane Doe",
      "age": 25
    },
    {
      "name": "Jim Doe",
      "age": 20
    }
  ]
}`;

const result = parse(jsonStr);
console.log(result);


/* 
JSON BNF
JSON is a data interchange format for transmitting data.

json = [ object eof ]

object = [ '{' members? '}' ]

members = [ pair [',' pair]* ]

pair = [ string ':' value ]

value =
[
    string
    | number
    | object
    | array
    | "true"
    | "false"
    | "null"
]

string = '"' [ char [ char ]* ] '"'

char = any unicode character except " or \ or control-character
       | '\"'
       | '\\'
       | '\/'
       | '\b'
       | '\f'
       | '\n'
       | '\r'
       | '\t'
       | '\u' + four-hex-digits

array = [ '[' elements? ']' ]

elements = [ value [',' value]* ]

number = [ @ignore("null") [int frac? exp?] ]

int = [ '-'?
    [
        digit1_9s
        | digit
    ]
]

frac = [ '.' digits ]

exp = [ e digits ]

digit = [ '0'..'9' ]

digit1_9 = [ '1'..'9' ]

digits = [ digit+ ]

digit1_9s = [ digit1_9 digits ]

e = [ ['e'|'E'] ['+'|'-']? ]
http://pythonhosted.org/pyrser/tutorial1.html
verified at json.org
*/