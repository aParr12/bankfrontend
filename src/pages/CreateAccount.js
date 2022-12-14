import './CreateAccount.css';
import {useForm} from 'react-hook-form';
import {useContext, useState} from 'react';
import {GlobalContext} from '../GlobalContext';

export const CreateAccount = () => {
    const {addUser, displayToast} = useContext(GlobalContext);
    const [accountCreated, setAccountCreated] = useState(false);
    const {register, handleSubmit, formState: {errors, isValid}, reset} = useForm({
        mode: 'onTouched',
    });

    const onSubmit = ({nameInput, emailInput, passwordInput}) => {
        addUser({name: nameInput, email: emailInput, password: passwordInput})
            .then(() => {
                setAccountCreated(true);
                return displayToast('Account successfully added');
            })
            .then(() => {
                window.location.pathname = '/'
            });
    };

    const handleAddNewAccount = () => {
        reset();
        setAccountCreated(false);
    };

    return (<div className='PageWrapper'>
            <div className='CreateAccount CardStyling card'>
                <div className='card-header'>Create Account</div>
                <div className='card-body'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mb-3'>
                            <label htmlFor='nameInput' className='form-label'>Name</label>
                            <input
                                type='text'
                                className={errors.nameInput ? 'form-control is-invalid' : 'form-control'}
                                id='nameInput'
                                placeholder='e.g. John Doe'
                                {...register('nameInput', {required: true})}>
                            </input>
                            {errors.nameInput && <span className='mt-2'>This field is required</span>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='emailInput' className='form-label'>Email</label>
                            <input
                                type='email'
                                className={errors.emailInput ? 'form-control is-invalid' : 'form-control'}
                                id='emailInput'
                                placeholder='e.g. john.doe@email.com'
                                {...register('emailInput', {required: true})}>
                            </input>
                            {errors.emailInput && <span className='mt-2'>This field is required</span>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='passwordInput' className='form-label'>Password</label>
                            <input
                                type='password'
                                className={errors.passwordInput ? 'form-control is-invalid' : 'form-control'}
                                id='passwordInput'
                                {...register('passwordInput', {required: true, minLength: 8})}>
                            </input>
                            {errors.passwordInput?.type === 'required' &&
                                <span className='mt-2'>This field is required</span>}
                            {errors.passwordInput?.type === 'minLength' &&
                                <span className='mt-2'>Your password must be at least 8 characters</span>}
                        </div>
                        <button
                            type='submit' className='btn btn-primary mb-3' disabled={!isValid}
                        >
                            Create Account
                        </button>
                    </form>
                    {accountCreated && <button
                        className='btn btn-secondary mb-3' onClick={handleAddNewAccount}
                    >
                        Add another account </button>}
                </div>
            </div>
        </div>);
};
