// import React from 'react'
// import { useState } from 'react'
// import { useAuth } from '../../context/AuthContext'
// import { toast } from 'react-hot-toast'
// import { FcGoogle } from "react-icons/fc";
// import './FromFirebase.css'
// import { useNavigate } from 'react-router-dom' // no va

// const FromFirebase = () => {
//     const auth = useAuth()
//     console.log('atuh', auth.user)

//     const { user } = auth
//     const displayName = user ? user.displayName : null;
//     console.log('displayName', displayName);

//     const [emailRegister, setEmailRegister] = useState('')
//     const [passwordRegister, setPasswordRegister] = useState('')
//     console.log('firebaseregister', emailRegister, passwordRegister)
//     const [emailLogin, setEmailLogin] = useState('')
//     // console.log('soy emailLogin', emailLogin)
//     const [passwordLogin, setPasswordLogin] = useState('')
//     console.log('soy login', emailLogin, passwordLogin)

//     const [email, setEmail] = useState('');
//     const [error, setError] = useState(null)
//     const [resetEmailSent, setResetEmailSent] = useState(false)

//     const [showResetForm, setShowResetForm] = useState(false)

//     const handleResetPassword = async (e) => {
//         e.preventDefault();

//         try {
//             await auth.sendPasswordResetEmail(email);
//             setResetEmailSent(true);
//             setError(null);
//         } catch (error) {
//             setResetEmailSent(false);
//             setError(error.message);
//         }
//     };

//     const handlerLogin = (e) => {
//         // toast.success(`${emailLogin}, bienvenido nuevamente!!`)
//         e.preventDefault
//         console.log('entre a login')
//         auth.login(emailLogin, passwordLogin)

//     }

//     const handlerGoogle = async () => {
//         // e.preventDefault();
//         try {
//             await auth.loginWithGoogle();
//         } catch (error) {
//             console.error('Error al iniciar sesión con Google', error);
//             // Manejar el error, puedes mostrar un toast u otra notificación en la interfaz de usuario.
//         }
//     }

//     const handlerLogout = () => {
//         auth.logout()
//     }
//     const handlerRegister = (e) => {
//         // toast.success(`${emailRegister}, se ha registrado con exito`)
//         e.preventDefault
//         console.log('entre a register')
//         auth.register(emailRegister, passwordRegister)
//     }
//     return (

//         <div className="main">
//             {displayName && <h5>gracias por suscirbirte{displayName}</h5>}
//             <input type="checkbox" id="chk" aria-hidden="true" />

//             <div className="login">
//                 <form className="form">
//                     <label
//                         htmlFor="chk"
//                         aria-hidden="true"
//                     >Log in</label>
//                     <input
//                         className="input"
//                         type="email"
//                         name="email"
//                         placeholder="Email"
//                         required=""
//                         onChange={(e) => setEmailLogin(e.target.value)} />
//                     <input
//                         className="input"
//                         type="password"
//                         name="pswd"
//                         placeholder="Password"
//                         required=""
//                         onChange={(e) => setPasswordLogin(e.target.value)} />
//                     <button className='button__form' onClick={(e) => handlerLogin(e)} >Log in</button>
//                     <button className='button__form' onClick={() => handlerGoogle()}>
//                         <FcGoogle className='google__icon' />
//                     </button>


//                     <button className='button__form' onClick={() => handlerLogout()}>Logout</button>

//                 </form>
//             </div >
//             <div>
//                 <h2>¿Olvidó su contraseña?</h2>
//                 {resetEmailSent ? (
//                     <p>Se ha enviado un correo electrónico para restablecer su contraseña.</p>
//                 ) : (
//                     <form onSubmit={handleResetPassword}>
//                         <label>
//                             Correo Electrónico:
//                             <input
//                                 type="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                             />
//                         </label>
//                         <button type="submit">Enviar Correo de Restablecimiento</button>
//                     </form>
//                 )}
//                 {error && <p>Error: {error}</p>}
//             </div>
//             <div className="register">
//                 <form className="form">
//                     <label
//                         htmlFor="chk" aria-hidden="true"
//                     >Register</label>
//                     <input
//                         className="input"
//                         type="email"
//                         name="email"
//                         placeholder="Email"
//                         required=""
//                         onChange={(e) => setEmailRegister(e.target.value)}
//                     />
//                     <input
//                         className="input"
//                         type="password" name="pswd" placeholder="Password"
//                         required=""
//                         onChange={(e) => setPasswordRegister(e.target.value)}
//                     />
//                     <button className='button__form'
//                         onClick={(e) => handlerRegister(e)}
//                     >Registro</button>

//                 </form>

//             </div>
//         </div >

//     )
// }

// export default FromFirebase