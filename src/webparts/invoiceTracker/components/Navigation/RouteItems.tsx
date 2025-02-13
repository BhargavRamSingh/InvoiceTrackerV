// 



import * as React from 'react';
import { Route, Switch} from 'react-router-dom';
import Estimation from '../Forms/Estimations';
 
interface RoutesProps {
    context: any;
    spContext: any;
    props: any;
}
 
const Routes: React.FC<RoutesProps> = ({ context, spContext, props}) => {
 
    const WrapperEstimatioForm = (innerProps: any) => {
        return <Estimation {...props} {...innerProps} />;
    };
 
 
    return (
        <Switch>
            <Route exact path="/" component={WrapperEstimatioForm} />
 
        </Switch>
    );
};
 
export default Routes;
 
 