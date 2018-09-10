import React from 'react'
import DimBackground from './DimBackground'

function BackgroundRegistration(props) {
    return (
        <div>
        { props.transporter && <img className="registration-background" src="/content/transporter3.jpg" alt=""/> }
        { props.producer && <img className="registration-background" src="/content/producer.png" alt=""/> }
        { props.wholesaler && <img className="registration-background" src="/content/wholesaler.png" alt=""/> }
        { props.retailer && <img className="registration-background" src="/content/retailer.jpg" alt=""/> }
        { props.rebuyer && <img className="registration-background" src="/content/rebuyer.jpg" alt=""/> }
        <DimBackground />
        </div>
    )
}

export default BackgroundRegistration
