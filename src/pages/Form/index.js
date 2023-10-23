import * as React from 'react';
import { Stepper } from '@progress/kendo-react-layout';

const FormContainer = () => {
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
        console.log("*****", e.value)
        setValue(e.value);
    };
    return (
        <React.Fragment>
            <Stepper value={value} onChange={handleChange} items={items} />
        </React.Fragment>
    )
};


export default FormContainer