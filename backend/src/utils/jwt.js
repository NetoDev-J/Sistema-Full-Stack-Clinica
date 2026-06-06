import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

export function gerarToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '8h' });
}

export function verificarToken(token) {
  return jwt.verify(token, SECRET);
}