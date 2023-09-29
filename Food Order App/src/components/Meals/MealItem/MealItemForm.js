import classes from './MealItemForm.module.css'
import Input from '../../UI/Input';
import { useRef , useState} from 'react';


const MealItemForm = (props)=>{
    const [amountIsVallid, setAMountIsVallid] = useState(true)
    const amountInputRef = useRef();

    const submitHandler = event =>{
        event.preventDefault();
        const enteredAmount = +amountInputRef.current.value;
        if(enteredAmount.length === 0 
            || enteredAmount < 1 
            || enteredAmount > 5){
                setAMountIsVallid(false)
            return 
        }

        props.onAddToCart(enteredAmount)
    }


    return <form className={classes.form} onSubmit={submitHandler}>
        <Input 
            ref = {amountInputRef}
            label="Amount" 
            input={{
            id:'amount_' + props.id,
            type: 'number',
            min:'1',
            max : '5',
            step: '1',
            defaultValue: '1'
        }} />
        <button >+ Add</button>
        {!amountIsVallid && <p>Please enter a vallid amount between 1 to 5 😉</p>}
    </form>
}
export default MealItemForm;