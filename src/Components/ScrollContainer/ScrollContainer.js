import React, {useState} from 'react';
import {connect} from 'react-redux'
import {setSelectedHouseRedux} from '../../redux/reducers/houses'
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './ScrollContainer.scss';
import HouseButton from '../HouseButton/HouseButton'

// list of items

function ScrollContainer(props) {
  // const [selected, setSelected] = useState(0)

  const list = props.data
  const houses = props.houses.houses
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
      <MenuItem onClick={() => props.setSelectedHouseRedux(house)}
        text={<HouseButton  selectedHouse={houses.selectedHouse} image={house.image} title={house.address}>{house.address}</HouseButton>}
        key={house.house_id}
      />
    );
  });
  
  
  const Arrow = ({ text, className }) => {
    return (
      <div className='arrow-container'>

      <div
        className={className}
        >{text}</div>
        </div>
    );
  };
  
  const ArrowLeft = Arrow({ text: '', className: 'arrow prev' });
  const ArrowRight = Arrow({ text: '', className: 'arrow next' });
  
  // function onSelect(key) {
  //     setSelected({ selected: key })
  //     // props.setSelectedHouseRedux(key)
  // }
    
    // Create menu from items
    const menu = Menu(list, props.houses.selectedHouse);

    return (
      <div className="scroll-container-parent">
        <ScrollMenu
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={props.houses.selectedHouse}
          // onSelect={onSelect}
        />
      </div>
    );
  
}


const mapDispatchToProps = {setSelectedHouseRedux}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(ScrollContainer)
