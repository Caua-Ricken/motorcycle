import React from 'react'
import "../../public/css/modalCss/step.css"

const CheckoutSteps = ({step}) => {

  return (
    <div className='step-container'>
         <div className={`step ${step >= 1 ? "active" : ""}`}>
        <div className="circle">1</div>
        <span>Carrinho</span>
      </div>

      <div className={`line ${step >= 2 ? "active" : ""}`}></div>

      <div className={`step ${step >= 2 ? "active" : ""}`}>
        <div className="circle">2</div>
        <span>Pagamento</span>
      </div>

      <div className={`line ${step >= 3 ? "active" : ""}`}></div>

      <div className={`step ${step >= 3 ? "active" : ""}`}>
        <div className="circle">3</div>
        <span>Conclusão</span>
      </div>

    </div>
  )
}

export default CheckoutSteps;