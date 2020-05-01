import bar from './script/bar';
import addIcon from './script/addIcon';
import printMe from './script/print';
import * as _ from 'lodash';
import * as $ from 'jquery';
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

function numberOfChildrenDiv() {
    var element = document.createElement('div');
    element.innerHTML = 'Number of body children ' + $('body').children().length;
    return element;
}
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
            document.body.appendChild(component());
            document.body.appendChild(numberOfChildrenDiv());
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}