const o = {p: 42, q: true};
const {p: foo, q: bar} = o;
 
console.log(foo); // 42 
console.log(bar); // true

const {q: bar1, p: foo1} = o;

console.log(foo1); // 42 
console.log(bar1); // true

function drawChart({size = 'big', coords = {x: 0, y: 0}, radius = 25} = {}) {
    console.log(size, coords, radius);
    // do some chart drawing
  }
  
  drawChart({
    coords: {x: 18, y: 30},
    radius: 30
  });

  const metadata = {
    title: 'Scratchpad',
    translations: [
      {
        locale: 'de',
        localization_tags: [],
        last_edit: '2014-04-14T08:43:37',
        url: '/de/docs/Tools/Scratchpad',
        title: 'JavaScript-Umgebung'
      }
    ],
    url: '/en-US/docs/Tools/Scratchpad'
  };
  
  let {
    title: englishTitle, // rename
    translations: [
      {
         title: localeTitle, // rename
      },
    ],
  } = metadata;
  
  console.log(englishTitle); // "Scratchpad"
  console.log(localeTitle);  // "JavaScript-Umgebung"

  const people = [
    {
      name: 'Mike Smith',
      family: {
        mother: 'Jane Smith',
        father: 'Harry Smith',
        sister: 'Samantha Smith'
      },
      age: 35
    },
    {
      name: 'Tom Jones',
      family: {
        mother: 'Norah Jones',
        father: 'Richard Jones',
        brother: 'Howard Jones'
      },
      age: 25
    }
  ];
  
  for (const {name: n, family: {father: f}} of people) {
    console.log('Name: ' + n + ', Father: ' + f);
  }
  
  // "Name: Mike Smith, Father: Harry Smith"
  // "Name: Tom Jones, Father: Richard Jones"

  const props = [
    { id: 1, name: 'Fizz'},
    { id: 2, name: 'Buzz'},
    { id: 3, name: 'FizzBuzz'}
  ];
  
  const [,, { name }] = props;
  
  console.log(name); // "FizzBuzz"

  let {a, b, c} = {a: 10, b: 20, c: 30};
  console.log("a: " + a); // "a"
  console.log("b: " + b); // "b"
  console.log("c: " + c); // "c"
  console.log("order change in object");
   ({a, b, c} = {b: 20, a: 10, c: 30});
  console.log("a: " + a); // "a"
  console.log("b: " + b); // "b"
  console.log("c: " + c); // "c"
  