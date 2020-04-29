import bar from './script/bar';
import addIcon from './script/addIcon';
import printMe from './script/print';
import * as _ from 'lodash';
import './assets/style/style.css';
import './assets/style/style.scss';

bar();
printMe();
function component() {
    var element = document.createElement('div');
    element.innerHTML = _.join(['Typescript', 'webpack'], ' ');
    element.classList.add('hello');
    addIcon(element);
    return element;
}

function getDivLoadMoreScript() {
    return import('jquery').then(($) => {
        var element = document.createElement('div');
        element.innerHTML = 'Number of body children ' + $('body').children().length;
        return element;
    });
}

document.body.appendChild(component());
getDivLoadMoreScript().then((comp) => {
    document.body.appendChild(comp);
});