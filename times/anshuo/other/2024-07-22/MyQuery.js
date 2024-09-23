

// i want a jquery like function that will return a list of elements that match the selector
// using the api of document.getElementByClassName, document.getElementById, document.getElementsByTagName
const MyQuery = (selector, context = document) => {

  // test if the selector is valid and easy。 not easy means it is a complex selector，like ".class1.class2" or ".class1 .class2" or ".class1>.class2" or ".class1+.class2" or ".class1~.class2" or ".class1[attr1='value1']" 

  // so ... how to test if the selector is easy or complex? answer: use regular expression，match the number of the selector
  
  // 所以 jquery 几乎是把 html 现有的 dom 都分分类理了一遍，然后提供一些方便操作他们的 api。

  // if it is easy selector
  // if it is a complex selector
  // split the selector by space
}

