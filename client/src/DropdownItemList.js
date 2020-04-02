import React from 'react';
import { DropdownItem } from 'reactstrap';

class DropdownItemList extends React.Component {
    state = {
        selectionGroup: '',
        searchValue: '',
    };

    handleGroupClick = (event) => {
        const value = event.target.value;
        console.log("Period Clicked is : " + value);

        this.setState({
            searchValue: value,
        });
    }

    selectText = "Select " + this.state.searchValue;

    render() {
        return (
            <div>
                <DropdownItem 
                        key={0} 
                        name={'PeriodAll'} 
                        value={'PeriodAll'}
                        onClick={this.handleGroupClick}
                >
                All
                </DropdownItem>
                <DropdownItem divider />
                {this.props.slides.map(slide => (
                    <DropdownItem 
                        key={slide.id} 
                        name={'Period '+ slide.period} 
                        value={slide.period}
                        onClick={this.handleGroupClick}
                    >
                    Period {slide.period}
                    </DropdownItem>
                ))}
                
                
            </div>

        )
    }
}
export default DropdownItemList;