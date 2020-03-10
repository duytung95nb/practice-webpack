import bar from './script/bar';
import _ from 'lodash';
import './assets/style/style.css';
bar();
function component() {
    var element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');
    return element;
}

document.body.appendChild(component());