react-native-styduce
=====================
A styling Helper for react native projects
## installation
npm install --save react-native-styduce

## Roadmap
- an option to remove redundant or unusuded style in the resulted style object
- writting test!
- better source code (commenting etc) (sorry that for now it's cryptic)
- more functionality

## usage
`styles.js`
```javascript
const styduce = require('react-native-styduce');
const { createStyle } = styduce;

const exampleStyle = {
  container: {
    backgroundColor: '#000',
    height: 70,
    __heading: {
      height: 20
    },
    $$subPage: {
      backgroundColor: '#fff'
    },
};

/*
  The above exampleStyle will translte to
  {
    container: {
      backgroundColor: '#000',
      height: 70
    },
    container__heading: {
      height: 20,
    },
    container$$subPage: {
      height: 70,
      backgroundColor: '#fff'
  },
*/
export default createStyle(exampleStyle);
```

Philosophy
----------
What i'm trying to do here is to make styling more easy. for me it's easier if there are a single source of style in my react native project. but there are some problem as styling in web is different than styling in react native. in web we can have a multiple class in one DOM. but i have difficulties when i want to follow [BEM](http://getbem.com/naming/) naming conventions. this plugin try to accomodate BEM-like (because it's somehow different) style structuring in react native.
this plugin also support nesting for the naming. for example
```javascript
const exampleStyle = {
  container: {
    __heading: {
      __subHeading: {
      }
    }
  }
  
  createStyle(exampleStyle) 
  //will translate to
  container: {
  ...container style
  }
  container__heading{
  ...container heading style
  }
  container__heading__subheading{
  ...container subheading style
  }
```
**NOTE** that the `container__heading` doesnt inherit from the container. because it's a different block and seems illogical if it inherit from the container. for example, if a header have a margin of 5px, the logo block doesnt have to have a margin of 5px.

Convention
----------
The plugin use two convention for styling. which is `__` (doble underscore) for block. and `$$` for modifier. there is a major difference between the two.
1. Block doesnt inherit from the parent 
2. while $$ (modifier) inherit from the parent
Example: 
```javascript
const style = {
  button: {
    height: 50
    $$active: {
      backgroundColor: '#FFF'
    }
  }
}

createStyle(style)
//will translated to
{
  button: {
    height: 50
  }
  button$$active: {
    height: 50,
    backgroundColor: '#fff',
  }
}
```

## use in component
```javascript
...
import { TouchableOpacity,Text ...} from 'react-native';
import styles from './styles.js'

const sample = ({}) => (
  <TouchableOpacity style={styles.button$$active} >
    <Text> Press Me </Text>
  </TouchableOpacity>
);

export default sample;
```
The downside of this styling approach is if all of our button is having modifier than the main button style become redundant to the styling object. 
