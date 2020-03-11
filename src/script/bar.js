import text from '../assets/values/textFile.txt';
import data from '../assets/values/data.xml';

export default function bar() {
    console.log("Bar runs");
    console.log("Text in text file", text);
    console.log("Data in xml file", data);
}