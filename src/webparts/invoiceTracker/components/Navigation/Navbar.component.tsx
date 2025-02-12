import * as React from 'react';
import { NavLink } from 'react-router-dom';
 
export interface NavigationProps {
    onNavItemClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}
 
 
class Navigation extends React.Component<NavigationProps> {
 
    async componentDidMount() {
 
    }
 
    public render() {
 
        return (
            <nav>
                <ul>
                    <li id="Estimations" onClick={this.props.onNavItemClick}>
                        <NavLink to="/" exact activeClassName="nav-click" className={""}>
                            <span>New Estimation Form</span>
                        </NavLink>
                    </li>
                    
                </ul>
            </nav>
        );
    }
}
 
export default Navigation;