export function rbac(...perfisPermitidos) {
  return (req, res, next) => {
    const perfil = req.usuario?.perfil;

    if (!perfil) {
      return res.status(401).json({ erro: 'Usuário não autenticado.' });
    }

    if (!perfisPermitidos.includes(perfil)) {
      return res.status(403).json({ erro: 'Acesso negado para este perfil.' });
    }

    next();
  };
}