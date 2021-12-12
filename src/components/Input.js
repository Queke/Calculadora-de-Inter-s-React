import styled from "styled-components";
import { useField } from "formik";

const Control = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  color: "black";
  display: block;
  margin-bottom: 5px;
`;

const MyInput = styled.input`
  outline: none;
  padding: 8px;
  border: solid 1px #grey;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 5px;
`;
const ErrorMEssages = styled.div`
  color: #red;
`;

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Control>
      <Label>{label}</Label>
      <MyInput {...field} {...props} />
      {meta.touched && meta.error ? (
        <ErrorMEssages>{meta.error}</ErrorMEssages>
      ) : null}
    </Control>
  );
};

export default Input;
