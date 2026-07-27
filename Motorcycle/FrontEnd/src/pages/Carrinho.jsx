import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Step from "../components/CheckoutSteps"

const Carrinho = () => {

  const { pathname } = useLocation();

  let step = 1;

  if (pathname.includes("pagamento")) {
    step = 2;
  }

  if (pathname.includes("conclusao")) {
    step = 3;
  }

  return (
    <main className="cart-page">
      <Step step={step} />
      <Outlet />

    </main>
  );
};

export default Carrinho;