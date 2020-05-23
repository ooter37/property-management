import React, {useState} from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './ScrollContainer.scss';
import HouseButton from '../Functions/HouseButton'

// list of items

export default function ScrollContainer(props) {
  const [selected, setSelected] = useState(0)

  const list = props.data
  const houses = props.houses
//   console.log(props.houses)

  // One item component
  // selected prop will be passed
  const MenuItem = ({ text, selected }) => {
    return (
      <div
        className="menu-item"
      >
        {text}
      </div>
    );
  };
  
  // All items component
  // Important! add unique key
  const Menu = () => houses.map(house => {
    // const { name } = el;
  
    return (
      <MenuItem onClick={() => props.setSelectedHouse(house.house_id)}
        text={<HouseButton  selectedHouse={props.selectedHouse} image={house.image} title={house.address}>{house.address}</HouseButton>}
        key={house.house_id}
      />
    );
  });
  
  
  const Arrow = ({ text, className }) => {
    return (
      <div
        className={className}
      >{text}</div>
    );
  };
  
  const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
  const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });
  
  function onSelect(key) {
      setSelected({ selected: key })
  }
    
    // Create menu from items
    const menu = Menu(list, selected);

    return (
      <div className="App">
        <ScrollMenu
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={selected}
          onSelect={onSelect}
        />
      </div>
    );
  
}