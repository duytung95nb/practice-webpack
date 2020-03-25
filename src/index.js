import bar from './script/bar';
import addIcon from './script/addIcon';
import printMe from './script/print';
import _ from 'lodash';
import './assets/style/style.css';
bar();
printMe();
function component() {
    var element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');
    addIcon(element);
    return element;
}

document.body.appendChild(component());