import './Withdraw.css';
import {useCallback, useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../GlobalContext';
import {useForm} from 'react-hook-form';

export const Withdraw = () => {
    const {state, withdrawFromAccount, displayToast} = useContext(GlobalContext);
    const {currentUserId, currentUser} = state;
    const {register, handleSubmit, formState: {errors, isValid}, reset} = useForm({
        mode: 'onTouched',
    });

    const [broadcastToast, canBroadcastToast] = useState(null);

    const onSubmit = useCallback(async (data) => {
        reset();

        const user = Object.assign({}, currentUser);
        await withdrawFromAccount(currentUserId, data.sumInput);
        canBroadcastToast(data.sumInput > user.balance ? `Your account is now in overdraft` : `You've successfully withdrawn ${data.sumInput}`);
    }, [currentUser, currentUserId, broadcastToast]);

    useEffect(() => {
        if (broadcastToast) {
            displayToast(broadcastToast);
        }
    }, [broadcastToast]);

    return (<div>
        {currentUser ? <div className='PageWrapper'>
            <div className='Withdraw CardStyling card'>
                <div className='card-header'>Withdraw Form</div>
                <div className='card-text'>Current balance: {currentUser.balance}</div>
                <div className='card-body'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mb-3'>
                            <label htmlFor='sumInput' className='form-label'>Withdraw Amount</label>
                            <input
                                type='text' className='form-control' id='sumInput' placeholder='10'
                                {...register('sumInput', {
                                    required: true, valueAsNumber: true, validate: (value) => {
                                        return value > 0;
                                    }, min: 0,
                                })}>
                            </input>
                            {errors.sumInput?.type === 'required' &&
                                <span className='mt-2'>This field is required</span>}
                            {errors.sumInput?.type === 'validate' &&
                                <span className='mt-2'>This field must be a number</span>}
                            {errors.sumInput?.type === 'min' &&
                                <span className='mt-2'>You cannot withdraw a negative amount</span>}
                        </div>
                        <button
                            type='submit' className='btn btn-primary mb-3' disabled={!isValid}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div> : <p>Please login as user to check your account</p>}
    </div>);
};
