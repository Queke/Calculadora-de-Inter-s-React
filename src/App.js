import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "./components/Input";
import Button from "./components/Button";
import Container from "./components/Container";
import Section from "./components/Section";
import Balance from "./components/Balance";

const CompoundInteresrt = (deposit, contribution, years, rate) => {
  let total = deposit;
  for (let i = 0; i < years; i++) {
    total = (total + contribution) * (rate + 1);
  }

  return Math.round(total);
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const App = () => {
  const [valance, setValance] = useState("");

  const handleSubmit = ({ deposit, contribution, years, rate }) => {
    const val = CompoundInteresrt(
      Number(deposit),
      Number(contribution),
      Number(years),
      Number(rate)
    );
    setValance(formatter.format(val));
  };
  return (
    <Container>
      <Section>
        <Formik
          initialValues={{
            deposit: "",
            contribution: "",
            years: "",
            rate: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            deposit: Yup.number()
              .required("Necesario")
              .typeError("Debe ser un número"),
            contribution: Yup.number()
              .required("Necesario")
              .typeError("Debe ser un número"),
            years: Yup.number()
              .required("Necesario")
              .typeError("Debe ser un número"),
            rate: Yup.number()
              .required("Necesario")
              .typeError("Debe ser un número")
              .min(0, "El valor mínimo debe ser 0")
              .max(1, "El valor máximo es 1"),
          })}
        >
          <Form>
            <Input name="deposit" label="deposito inicial" />
            <Input name="contribution" label="contribución anual" />
            <Input name="years" label="Años" />
            <Input name="rate" label="Interés estimado" />
            <Button type="submit">Calcular</Button>
          </Form>
        </Formik>
        {valance !== "" ? <Balance>Balance final: {valance}</Balance> : null}
      </Section>
    </Container>
  );
};

export default App;
