# 4. Guia de Compra e Conexão de Domínio

O site foi construído para trocar de endereço **sem mexer no código**: basta conectar o domínio na Netlify e atualizar uma variável.

## 1. Escolher o domínio

- Prefira **.com.br** (transmite empresa brasileira e é barato).
- Curto, fácil de ditar por telefone, sem hífen se possível. Sugestões para verificar: `selomagna.com.br`, `selo-magna.com.br`, `selomagnaconsultoria.com.br`.
- Registre também a variação mais provável de erro (ex.: com e sem hífen) para proteger a marca.

## 2. Comprar no Registro.br (recomendado)

1. Acesse **registro.br** e pesquise o nome desejado.
2. Se estiver disponível, clique em **Registrar**. Crie a conta com o **CNPJ** da empresa (para .com.br, o titular precisa ser pessoa jurídica ou física com CPF).
3. Pague o boleto/Pix/cartão. O valor do .com.br é de cerca de **R$ 40 por ano** (confira o valor atualizado no próprio site). Dá para pagar vários anos de uma vez.
4. Ative a **renovação automática** para não perder o domínio.

## 3. Conectar o domínio à Netlify

**Na Netlify:**
1. **Domain management → Add a domain** → digite `selomagna.com.br` → **Verify** → **Add domain**.
2. A Netlify vai sugerir usar o **Netlify DNS** e mostrar 4 endereços de servidores (algo como `dns1.p0X.nsone.net`). Deixe essa tela aberta.

**No Registro.br:**
1. Entre em **registro.br → Painel → seu domínio**.
2. Em **DNS**, clique em **Alterar servidores DNS**.
3. Cole os 4 servidores informados pela Netlify e salve.

**Aguarde:** a propagação leva de alguns minutos a até 24 horas. A Netlify emite o **HTTPS (cadeado)** automaticamente quando termina.

**Na Netlify, depois de propagar:**
1. Defina `www.selomagna.com.br` ou `selomagna.com.br` como **Primary domain** (o outro redireciona automaticamente).
2. Em **Environment variables**, troque `NEXT_PUBLIC_SITE_URL` para `https://www.selomagna.com.br`.
3. **Deploys → Trigger deploy**. Pronto: sitemap, Google e links de compartilhamento passam a usar o novo endereço.

## 4. Depois de conectar

- No **Search Console**, adicione a nova propriedade (domínio) e envie o `sitemap.xml` de novo.
- Atualize o endereço no **Perfil da Empresa no Google**, LinkedIn, Instagram e assinatura de e-mail.
- No Brevo, **autentique o domínio** (Remetentes e domínios → Domínios) para que os e-mails não caiam no spam.

## 5. E-mail com o domínio (contato@selomagna.com.br)

Opções:
- **Google Workspace** ou **Microsoft 365** (pagos, mais completos).
- **Zoho Mail** (tem plano gratuito limitado).

O provedor escolhido vai pedir para criar registros **MX** e **TXT**. Como o DNS estará na Netlify, crie esses registros em **Netlify → Domain management → DNS records → Add new record**, copiando exatamente o que o provedor indicar.
