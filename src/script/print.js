import jquery from 'jquery';
import anotherModule from './another-module';
import bar from './bar';

export default function printMe(text) {
    console.log('I get called from print.js!', text);
    jquery(document);
}