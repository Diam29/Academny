import React from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { validate } from './validate.js'
import './FromFirebase.css';

const FromFirebase = ({ onCloseForm }) => {


    const auth = useAuth();

    const { user } = auth;


    const [emailRegister, setEmailRegister] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');

    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');

    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [resetEmailSent, setResetEmailSent] = useState(false);

    const [showResetForm, setShowResetForm] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(true);

    const [validationErrors, setValidationErrors] = useState({});




    const handleResetPassword = async (e) => {
        e.preventDefault();
        const errors = validate(emailLogin);

        if (Object.keys(errors).length > 0) {
            console.log('Errores de validación:', errors);
            setValidationErrors(errors);
            return;
        }

        try {
            await auth.resetPassword(email);
            setResetEmailSent(true);
            toast.success(`Se ha enviado la solicitud a: ${email}`)
            setError(null);
            setEmailLogin('');
            setPasswordLogin('');
            setShowResetForm(false);
            setShowLoginForm(true);
            onCloseForm();
        } catch (error) {
            setResetEmailSent(false);
        }
    };

    const handlerLogin = async (e) => {
        e.preventDefault();
        const errors = validate(emailLogin, passwordLogin);

        if (Object.keys(errors).length > 0) {
            console.log('Errores de validación:', errors);
            setValidationErrors(errors);
            return;
        }

        try {
            await auth.login(emailLogin, passwordLogin);
            toast.success(`Bienvenido ${emailLogin}`);
            onCloseForm();
        } catch (error) {
            console.error('Error de Firebase:', error);

            if (error.code === 'auth/user-not-found') {
                toast.error = 'Usuario no encontrado. Por favor, verifica tu dirección de correo electrónico.';
            } else if (error.code === 'auth/invalid-email') {
                toast.error = 'Formato de correo electrónico incorrecto. Por favor, verifica tu dirección de correo electrónico.';
            } else if (error.code === 'auth/too-many-requests') {
                toast.error = 'Demasiados intentos de inicio de sesión fallidos. Por favor, inténtalo de nuevo más tarde.';
            } else if (error.code === 'auth/invalid-credential') {
                toast.error('Hay un error en la contraseña, intentelo de nuevo')
            } else {
                console.error('Código de error no manejado:', error.code);
            }
        }
    }

    const handlerGoogle = async (e) => {
        e.preventDefault();
        try {
            await auth.loginWithGoogle();
            toast.success('¡Se ha logueado con éxito!');
            onCloseForm();
        } catch (error) {
            console.error('Error al iniciar sesión con Google', error);
        }
    };

    const handlerLogout = () => {
        auth.logout();
        toast.success('Ha cerrado sesión exitosamente!!')
        onCloseForm();
    };

    const handlerRegister = (e) => {
        e.preventDefault();
        const errors = validate(emailRegister, passwordRegister);

        if (Object.keys(errors).length > 0) {
            console.log('Errores de validación:', errors);
            setValidationErrors(errors);
            return;
        }
        try {
            auth.register(emailRegister, passwordRegister);
            toast.success(`Se ha registrado, ${emailRegister}`)
            onCloseForm();

        } catch (error) {
            console.log('seterrorRegister', error.message)
            throw error
        }
    };

    const showResetPasswordForm = () => {
        setShowResetForm(true);
    };



    return (
        <div className="main">

            <input type="checkbox" id="chk" aria-hidden="true" />

            {showResetForm ? (
                <div className="forgot">
                    <form className='form'>
                        <label htmlFor="chk" aria-hidden="true">
                            Olvidó su Contraseña?
                        </label>
                        <p className='text__forgot'>Ingrese su correo electrónico para restablecer la contraseña:</p>
                        <input
                            className="input"
                            type="email"
                            value={email}
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className='button__reset' type="submit" onClick={handleResetPassword}>
                            Restablecer Contraseña
                        </button>

                    </form>
                </div>
            ) : (

                <div className="login">
                    <form className='form'>
                        <label htmlFor="chk" aria-hidden="true">
                            Log in
                        </label>
                        <input
                            className="input"
                            type="email"
                            name="email"
                            placeholder="Email"
                            autoComplete="email"
                            required=""
                            onChange={(e) => setEmailLogin(e.target.value)}
                        />
                        <input
                            className="input"
                            type="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="new-password"
                            required=""
                            onChange={(e) => setPasswordLogin(e.target.value)}
                        />
                        {validationErrors && (
                            <div className="error__message">
                                {Object.values(validationErrors).map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))}
                            </div>
                        )}
                        <div className='container__buttons'>
                            <button className="button__form" onClick={handlerLogin}>
                                Log in
                            </button>
                            <button className="button__form" onClick={handlerGoogle}>
                                <FcGoogle className="google__icon" />
                            </button>
                        </div>
                        <button className='button__reset' onClick={showResetPasswordForm}>Olvidó su contraseña?</button>

                        <button className="button__form" onClick={handlerLogout}>
                            Cerrar Sesion
                        </button>
                    </form>
                </div>

            )}
            <div className="register">
                <form className='form'>

                    <label htmlFor="chk" aria-hidden="true">
                        Register
                    </label>
                    <input
                        className="input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        required=""
                        onChange={(e) => setEmailRegister(e.target.value)}
                    />
                    <input
                        className="input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required=""
                        autoComplete="new-password"
                        onChange={(e) => setPasswordRegister(e.target.value)}
                    />
                    {validationErrors && (
                        <div className="error__message">
                            {Object.values(validationErrors).map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>
                    )}
                    <button className="button__form" onClick={handlerRegister}>
                        Registro
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FromFirebase;
