Comandos:

pm2 logs service-homologacao [--lines 1000]
pm2 env 0: mostra as variaveis de ambiente
pm2 monit: conjunto avançado de dados em torno da integridade do aplicativo
pm2 reload all: recarrega a configuração do aplicativo, como as variáveis de ambiente.
pm2 show NomeDoApp: mostra informações sobre a aplicação.
pm2 restart all: reinicia todos os aplicativos em execução.
pm2 kill all: mata todos os aplicativos em execução.
pm2 flush: libera todos os dados de log, disponibilizando espaço em disco.
pm2 logs app: saída de logs somente de um aplicativo específico.
pm2 logs: saída de logs de todos os aplicativos em execução.
pm2 ls: lista processos
pm2 delete <api>