import * as React from 'react';
import { Stepper } from '@progress/kendo-react-layout';
import FormBuilder from './FormBuilder';
import { Button } from '@progress/kendo-react-buttons';

const FormContainer = () => {

    //items can come from API response
    const items = [
        {
            label: "Form 1",
            
        },
        {
            label: "Form 2",
        },
        {
            label: "Form 3",
        },
        {
            label: "Form 4",
        },
        {
            label: "Summary",
        },
    ];
    const [value, setValue] = React.useState(0);
    const handleChange = (e) => {
        console.log("*****", e)
        setValue(e.value);
    };
    return (
        <React.Fragment>
            <Stepper value={value} onChange={handleChange} items={items} />
            {
                value === 0 ? 
                <FormBuilder/> : ''
            }

            <Button themeColor={"primary"}>Previous</Button>
            <Button themeColor={"primary"}>Next</Button>
        </React.Fragment>
    )
};


export default FormContainer