import React from 'react';
import { DropdownItem } from 'reactstrap';

class DropdownItemList extends React.Component {
    

    handleGroupClick = (event) => {
        const value = event.target.value;
        console.log("Period Clicked is : " + value);
        
        this.props.setGroup(value);

        
    }


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
                {this.props.uniquePeriods.map(uniquePeriod => (
                    <DropdownItem 
                        key={uniquePeriod} 
                        name={'Period '+ uniquePeriod} 
                        value={uniquePeriod}
                        onClick={this.handleGroupClick}
                    >
                    Period {uniquePeriod}
                    </DropdownItem>
                ))}
                
                
            </div>

        )
    }
}
export default DropdownItemList;