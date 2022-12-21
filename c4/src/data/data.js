import {BsGrid3X3GapFill} from 'react-icons/bs'


export const links = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'C4',
        icon: <BsGrid3X3GapFill />,
      },
    ],
  }
];

export const center = {
  lat: 20.768755664116235,
  lng: -100.08195041767867
}

export const mapOptions = {
  disableDefaultUI: true,
  minZoom: 12,
  maxZoom: 17,
}