import React from 'react'
import DimBackground from '../DimBackground'

function BackgroundRegistration(props) {
    return (
        <div>
            { props.transporter && <img className="registration-background" src="/content/transporter3.jpg" alt=""/> }
            { props.producer && <img className="registration-background" src="/content/producer.png" alt=""/> }
            { props.wholesaler && <img className="registration-background" src="/content/wholesaler.png" alt=""/> }
            { props.retailer && <img className="registration-background" src="/content/retailer.jpg" alt=""/> }
            { props.rebuyer && <img className="registration-background" src="/content/rebuyer.jpg" alt=""/> }
            { props.login && <img className="registration-background" src="/content/food3.jpg" alt=""/> }
            { props.landing && <img className="registration-background" src="/content/food.jpg" alt=""/> }
            { props.darker && <DimBackground darker/> }
            { props.lighter && <DimBackground lighter/> }
            { ( !props.lighter && !props.darker ) && <DimBackground /> }
        </div>
    )
}

export default BackgroundRegistration
