FROM node:20-slim

WORKDIR /

# Instala dependências de build se necessário (sharp, etc)
# RUN apt-get update && apt-get install -y python3 make g++

COPY package*.json ./

RUN npm install --production

# Copia o restante dos arquivos
COPY . .

# Expõe a porta interna
EXPOSE 3000

# Porta padrão para o container
ENV PORT=3000

CMD ["node", "server.js"]
