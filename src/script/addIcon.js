import iconSrc from '../assets/images/icons/icon_1.jpg';

export default function addIcon(containerElement) {
    var icon = new Image();
    icon.src = iconSrc;
    containerElement.appendChild(icon);
}