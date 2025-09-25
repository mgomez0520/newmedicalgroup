Despliegue recomendado: GitHub + Render

1) Crear repo en GitHub y push desde local

```bash
cd "/Users/alejandro/Desktop/NEW MEDICAL"
git init
git add .
git commit -m "Publicar sitio New Medical Group"
git remote add origin git@github.com:TU_USUARIO/TU_REPO.git
git push -u origin main
```

2) En Render
- Crear nuevo Web Service -> conectar al repo -> seleccionar branch `main`.
- Build command: `npm install`
- Start command: `npm start`
- Deploy.

3) Configurar dominio `newmedicalgroup.com.co`
- En Render añade dominio `newmedicalgroup.com.co`.
- Render te dará registros DNS. En tu registrador, añade esos registros (CNAME/A) según las instrucciones.
- Habilita SSL/TLS desde Render.

Notas:
- Si prefieres Vercel o Heroku te doy los pasos equivalentes.
- Si quieres que cree el repo y haga el push por ti, necesito el nombre del repo y acceso (o que ejecutes los comandos localmente).
