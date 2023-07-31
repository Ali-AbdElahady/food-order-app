import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../store/cart-context"
import { useContext, useEffect, useState } from "react"

const HeaderCartButton = (props) => {

    const [buttonIsHighlighted, setButtonIsHightlighted] = useState(false)

    const cartCtx = useContext(CartContext)
    const { items } = cartCtx

    const btnClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ''}`

    useEffect(() => {
        if (cartCtx.items.length === 0) {
            return
        }
        setButtonIsHightlighted(true)
       const timer = setTimeout(() => { setButtonIsHightlighted(false) }, 300)

       return ()=>{clearTimeout(timer)}
    }, [items])
    const numberOfCartItems = cartCtx.items.reduce((currNumber, item) => { return currNumber + item.amount }, 0)

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
}
export default HeaderCartButton