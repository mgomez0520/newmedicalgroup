#!/usr/bin/env bash
# Instala rustup si cargo no está disponible (útil en entornos CI como Render)
set -e
if command -v cargo >/dev/null 2>&1; then
  echo "cargo ya está instalado"
  exit 0
fi

echo "Instalando rustup..."
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
# Cargar el entorno para el resto del build
export PATH="$HOME/.cargo/bin:$PATH"
rustup default stable
cargo --version

echo "rust instalado"
