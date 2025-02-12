import * as React from 'react';

//import type { IInvoiceTrackerProps } from './IInvoiceTrackerProps';
import { HashRouter as Router } from 'react-router-dom';
import Navigation from "./Navigation/Navbar.component";
import Routes from "./Navigation/RouteItems";

 export interface IInvoiceTrackerProps {
  description: any;
  isDarkTheme: any;
  environmentMessage: any;
  hasTeamsContext: any;
  userDisplayName: any;
  context: any;
  spContext: any;

 }

export default class InvoiceTracker extends React.Component<IInvoiceTrackerProps> {
 
  
  public onNavItemClick(event: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    let navLinks = document.querySelectorAll('.nav-click');
    if (navLinks.length > 0) {
        navLinks.forEach(item => {
            item.className = '';
        });
    }}
  public render(): React.ReactElement<IInvoiceTrackerProps> {
  

    const {
     
    } = this.props;

    return (
         
      <Router>
          <section>
              {/* <Navigation onNavItemClick={this.onNavItemClick} />   */}
              <Navigation onNavItemClick={this.onNavItemClick} />
              <Routes context={this.props.context} spContext={this.props.spContext} props={this.props} />
          </section>
      </Router>
  );
  }
}
