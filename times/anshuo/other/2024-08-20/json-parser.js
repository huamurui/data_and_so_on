// show me a json parser written in js

const jsonStr = `{
  "name": "John",
  "age": 30,
  "city": "New York"
  "friends": [
    {
      "name": "Jane",
      "age": 25
    },
    {
      "name": "Jack",
      "age": 27
    }
  ]
}`;


class JSONParser {
  constructor(raw) {
    this.raw = raw
    this.loc = {
      col: 0,
      row: 0
    },
    this.index = 0
  }

  remaining() {
    return this.raw.slice(this.index)
  }

  next(str) {
    if (this.remaining().startsWith(str)) {
      this.index += str.length
      this.loc.col += str.length
      return true
    }
    return false
  }

  skip() {
    while (this.raw[this.index] === ' ' || this.raw[this.index] === '\n') {
      if (this.raw[this.index] === '\n') {
        this.loc.col = 0
        this.loc.row++
      } else {
        this.loc.col++
      }
      this.index++
    }
  }

  read(pattern) {
    const match = pattern.exec(this.raw.slice(this.index))
    if(!match) {
      return null
    }
  }

  parse() {
    const result = this.parseObject(this)
    return result
  }

  parseObject() {
    const obj = {}
    this.skip()
    if (!this.next('{')) {
      throw new Error('Expected {')
    }
    this.skip()
    while (!this.next('}')) {
      const key = this.parseString()
      this.skip()
      if (!this.next(':')) {
        throw new Error('Expected :')
      }
      this.skip()
      const value = this.parseValue()
      obj[key] = value
      this.skip()
      if (this.next(',')) {
        this.skip()
      }
    }
    return obj
  }

  parseArray() {
    const arr = []
    this.skip()
    if (!this.next('[')) {
      throw new Error('Expected [')
    }
    this.skip()
    while (!this.next(']')) {
      const value = this.parseValue()
      arr.push(value)
      this.skip()
      if (this.next(',')) {
        this.skip()
      }
    }
    return arr
  }


  parseString() {
    const match = this.read(/"([^"]*)"/)
    if (!match) {
      // throw new Error('Expected string')
    }
    return match[1]
  }

  parseNumber() {
    const match = this.read(/(\d+)/)
    if (!match) {
      throw new Error('Expected number')
    }
    return parseInt(match[1])
  }

  parseValue() {
    this.skip()
    if (this.raw[this.index] === '{') {
      return this.parseObject()
    } else if (this.raw[this.index] === '[') {
      return this.parseArray()
    } else if (this.raw[this.index] === '"') {
      return this.parseString()
    } else if (/\d/.test(this.raw[this.index])) {
      return this.parseNumber()
    } else {
      throw new Error('Expected value')
    }
  }



}  
const parser = new JSONParser(jsonStr)
const result = parser.parse()
console.log(result)