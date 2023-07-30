import { useContext, useRef } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
import CartContext from "../../store/cart-context";

const MealItemForm = (props) => {
  const inputRef = useRef();
  const cartCtx = useContext(CartContext);
  const submitHandler = (event) => {
    event.preventDefault()
    cartCtx.addItem({ ...props.item, amount: +inputRef.current.value });
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
