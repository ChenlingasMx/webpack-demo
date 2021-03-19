import _ from 'lodash'
import './main.css'
let element = document.createElement('h1');
element.innerHTML = _.join(['Hello', 'Demo1'], ' ')
document.body.appendChild(element);