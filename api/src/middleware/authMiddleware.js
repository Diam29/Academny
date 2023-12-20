const jwt = require('jsonwebtoken');

// Middleware para autenticar al usuario mediante el token JWT
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'No se proporcionó un token de autenticación' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error al autenticar usuario:', error);
        res.status(401).json({ error: 'Token no válido' });
    }
};




// ...

// Función para generar un token
function generateToken(user) {
    const token = jwt.sign({ userId: user.id }, 'tu_secreto', { expiresIn: '1h' });
    return token;
}

// Ruta para iniciar sesión


module.exports = { authenticateUser, generateToken };
