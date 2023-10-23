import React from 'react'
import { Stepper, Step } from "@progress/kendo-react-layout";
import { Card, CardTitle, CardBody, CardActions } from '@progress/kendo-react-layout';
import './index.scss';
import { mockCardList } from '../../constants';
import { Link } from 'react-router-dom';

const CardContainer = () => {

    return (
        <React.Fragment>
            <div className=''>
            <div style={{
                display: 'block',
                justifyContent: 'space-evenly',
                marginTop: 10
            }}>
                <div className='k-card-deck'>

                    { mockCardList.map((details, index) => <Card key={index} style={{
                        width: 200
                    }} >
                        <CardBody>
                            <CardTitle>{details.title}</CardTitle>
                            <p>{details.bodyText}</p>
                        </CardBody>
                        <CardActions>
                            <Link to={'/formContainer'}><span className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-primary">{details.action}</span></Link>
                        </CardActions>
                    </Card>
                  )}   

                </div>
            </div>
            </div>

        </React.Fragment>
    )
}

export default CardContainer
