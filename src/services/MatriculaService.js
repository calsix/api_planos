const db = require('../models/db');
const Sanitizer = require('../helpers/sanitizer');

exports.getAllMatriculas = (page, limit) =>  {
    return new Promise((resolve, reject) => {

        let sanitizedPage = Sanitizer.sanitizeNumber(page);
        let sanitizedLimit = Sanitizer.sanitizeNumber(limit);

        const offset = (sanitizedPage - 1) * sanitizedLimit;

        const query = `
            SELECT
            T.ID AS COD_MATRICULA,
            T.DT_INICIO AS DATA_INICIO,
            T.DT_CARENCIA AS DATA_CARENCIA,
            T.ST_UNI_CONSUMIDORA AS UNIDADE_CONSUMIDORA,
            T.ST_CPF_UC AS CPF_UNIDADE_CONSUMIDORA,
            T.ST_OBSERVACAO AS OBSERVACAO,
            T.DT_CANCELAMENTO AS DATA_CANCELAMENTO,
            T.VL_DESC_ACRESC AS VALOR_DESC_ACRESCIMO,
            T.VL_TOTAL AS VALOR_TOTAL,
            T.DM_REM_DEB_AUT AS STATUS_DEB_AUTO,
            T.ST_AGE_DEB_AUT AS AGENCIA_DEB_AUTO,
            T.IN_DIA_VENC_DEB_AUT AS DIA_DEB_AUTO,
            T.ST_CONTA_CORRENTE_DEB_AUT AS CC_DEB_AUTO,
            T.DT_CUD_DEB_AUT AS DATA_CRUD_DEB_AUTO,
            T.DM_STATUS AS STATUS,
            A.DM_TIPO AS TIPO_PESSOA,
            A.ST_NOME1 AS NM_TITULAR,
            A.ST_INS_FEDERAL AS CPF_CNPJ,
            A.ST_INS_ESTADUAL AS RG_INS_ESTADUAL,
            A.ST_INS_MUNICIPAL AS INS_MUNICIPAL,
            A.DT_NASCIMENTO AS DATA_NASCIMENTO,
            A.DM_SEXO AS SEXO,
            A.DM_EST_CIVIL AS ESTADO_CIVIL,
            A.ST_LOGIN AS LOGIN,
            A.ST_SENHA AS SENHA,
            (SELECT ST_NOME FROM SCC0010 WHERE T.ID_PLANO = ID LIMIT 1) AS NM_PLANO,
            (SELECT ST_NOME FROM APP1020 WHERE T.ID_FOR_PAGAMENTO = ID LIMIT 1) AS NM_FOR_PAGAMENTO,
            (SELECT ST_NOME FROM SCC0018 WHERE T.ID_MOT_CANCELAMENTO = ID LIMIT 1) AS NM_MOT_CANCELAMENTO,
            (SELECT ST_NOME1 FROM SCC0018 WHERE T.ID_VEN_PESSOA = ID LIMIT 1) AS NM_VEN_PESSOA,
            B.ST_NOME AS NM_UNI_ATENDIMENTO,
            B.ST_TELEFONE AS FON_UNI_ATENDIMENTO,
            C.ST_NOME AS NM_CIDADE,
            C.ST_ENDERECO AS ENDERECO,
            C.ST_BAIRRO AS BAIRRO,
            C.ST_NUM_IMOVEL AS NUMERO,
            C.ST_CEP AS CEP,
            D.ST_EMAIL AS EMAIL,
            CONCAT('(', D.NI_DDD1, ') ', D.NI_FONE1) AS FONE1,
            CONCAT('(', D.NI_DDD2, ') ', D.NI_FONE2) AS FONE2
            FROM SCC0011 T
            LEFT JOIN app1007 A ON T.ID_CLI_PESSOA = A.ID
            LEFT JOIN SCC0007 B ON T.ID_UNI_ATENDIMENTO = B.ID
            LEFT JOIN APP1026 C ON T.ID_CLI_PESSOA = C.ID_PESSOA
            LEFT JOIN APP1027 D ON T.ID_CLI_PESSOA = D.ID_PESSOA
            LIMIT ${offset}, ${limit}
        `;

        db.query(query, (error, results) => {
            if (error) {
                reject(new Error('Error fetching matriculas: ' + error.message));
            } else {
                resolve(results);
            }
        });
    });
};

exports.getMatriculaById = (id) => {
    return new Promise((resolve, reject) => {
        let sanitizedId = Sanitizer.sanitizeNumber(id);
        const query = `
            SELECT
            T.ID AS COD_MATRICULA,
            T.DT_INICIO AS DATA_INICIO,
            T.DT_CARENCIA AS DATA_CARENCIA,
            T.ST_UNI_CONSUMIDORA AS UNIDADE_CONSUMIDORA,
            T.ST_CPF_UC AS CPF_UNIDADE_CONSUMIDORA,
            T.ST_OBSERVACAO AS OBSERVACAO,
            T.DT_CANCELAMENTO AS DATA_CANCELAMENTO,
            T.VL_DESC_ACRESC AS VALOR_DESC_ACRESCIMO,
            T.VL_TOTAL AS VALOR_TOTAL,
            T.DM_REM_DEB_AUT AS STATUS_DEB_AUTO,
            T.ST_AGE_DEB_AUT AS AGENCIA_DEB_AUTO,
            T.IN_DIA_VENC_DEB_AUT AS DIA_DEB_AUTO,
            T.ST_CONTA_CORRENTE_DEB_AUT AS CC_DEB_AUTO,
            T.DT_CUD_DEB_AUT AS DATA_CRUD_DEB_AUTO,
            T.DM_STATUS AS STATUS,
            A.DM_TIPO AS TIPO_PESSOA,
            A.ST_NOME1 AS NM_TITULAR,
            A.ST_INS_FEDERAL AS CPF_CNPJ,
            A.ST_INS_ESTADUAL AS RG_INS_ESTADUAL,
            A.ST_INS_MUNICIPAL AS INS_MUNICIPAL,
            A.DT_NASCIMENTO AS DATA_NASCIMENTO,
            A.DM_SEXO AS SEXO,
            A.DM_EST_CIVIL AS ESTADO_CIVIL,
            A.ST_LOGIN AS LOGIN,
            A.ST_SENHA AS SENHA,
            (SELECT ST_NOME FROM SCC0010 WHERE T.ID_PLANO = ID LIMIT 1) AS NM_PLANO,
            (SELECT ST_NOME FROM APP1020 WHERE T.ID_FOR_PAGAMENTO = ID LIMIT 1) AS NM_FOR_PAGAMENTO,
            (SELECT ST_NOME FROM SCC0018 WHERE T.ID_MOT_CANCELAMENTO = ID LIMIT 1) AS NM_MOT_CANCELAMENTO,
            (SELECT ST_NOME1 FROM SCC0018 WHERE T.ID_VEN_PESSOA = ID LIMIT 1) AS NM_VEN_PESSOA,
            B.ST_NOME AS NM_UNI_ATENDIMENTO,
            B.ST_TELEFONE AS FON_UNI_ATENDIMENTO,
            C.ST_NOME AS NM_CIDADE,
            C.ST_ENDERECO AS ENDERECO,
            C.ST_BAIRRO AS BAIRRO,
            C.ST_NUM_IMOVEL AS NUMERO,
            C.ST_CEP AS CEP,
            D.ST_EMAIL AS EMAIL,
            CONCAT('(', D.NI_DDD1, ') ', D.NI_FONE1) AS FONE1,
            CONCAT('(', D.NI_DDD2, ') ', D.NI_FONE2) AS FONE2
            FROM SCC0011 T
            LEFT JOIN app1007 A ON T.ID_CLI_PESSOA = A.ID
            LEFT JOIN SCC0007 B ON T.ID_UNI_ATENDIMENTO = B.ID
            LEFT JOIN APP1026 C ON T.ID_CLI_PESSOA = C.ID_PESSOA
            LEFT JOIN APP1027 D ON T.ID_CLI_PESSOA = D.ID_PESSOA
            WHERE T.ID = ${sanitizedId}
        `;

        db.query(query, (error, results) => {
            if (error) {
                reject(new Error('Error fetching matricula: ' + error.message));
            } else {
                resolve(results[0]);
            }
        });
    });
};


exports.getMatriculaByCPF = (cpf) => {
    return new Promise((resolve, reject) => {
        let sanitizedCPF = Sanitizer.sanitizeNumber(cpf);
        const query = `
            SELECT
            T.ID AS COD_MATRICULA,
            T.DT_INICIO AS DATA_INICIO,
            T.DT_CARENCIA AS DATA_CARENCIA,
            T.ST_UNI_CONSUMIDORA AS UNIDADE_CONSUMIDORA,
            T.ST_CPF_UC AS CPF_UNIDADE_CONSUMIDORA,
            T.ST_OBSERVACAO AS OBSERVACAO,
            T.DT_CANCELAMENTO AS DATA_CANCELAMENTO,
            T.VL_DESC_ACRESC AS VALOR_DESC_ACRESCIMO,
            T.VL_TOTAL AS VALOR_TOTAL,
            T.DM_REM_DEB_AUT AS STATUS_DEB_AUTO,
            T.ST_AGE_DEB_AUT AS AGENCIA_DEB_AUTO,
            T.IN_DIA_VENC_DEB_AUT AS DIA_DEB_AUTO,
            T.ST_CONTA_CORRENTE_DEB_AUT AS CC_DEB_AUTO,
            T.DT_CUD_DEB_AUT AS DATA_CRUD_DEB_AUTO,
            T.DM_STATUS AS STATUS,
            A.DM_TIPO AS TIPO_PESSOA,
            A.ST_NOME1 AS NM_TITULAR,
            A.ST_INS_FEDERAL AS CPF_CNPJ,
            A.ST_INS_ESTADUAL AS RG_INS_ESTADUAL,
            A.ST_INS_MUNICIPAL AS INS_MUNICIPAL,
            A.DT_NASCIMENTO AS DATA_NASCIMENTO,
            A.DM_SEXO AS SEXO,
            A.DM_EST_CIVIL AS ESTADO_CIVIL,
            A.ST_LOGIN AS LOGIN,
            A.ST_SENHA AS SENHA,
            (SELECT ST_NOME FROM SCC0010 WHERE T.ID_PLANO = ID LIMIT 1) AS NM_PLANO,
            (SELECT ST_NOME FROM APP1020 WHERE T.ID_FOR_PAGAMENTO = ID LIMIT 1) AS NM_FOR_PAGAMENTO,
            (SELECT ST_NOME FROM SCC0018 WHERE T.ID_MOT_CANCELAMENTO = ID LIMIT 1) AS NM_MOT_CANCELAMENTO,
            (SELECT ST_NOME1 FROM SCC0018 WHERE T.ID_VEN_PESSOA = ID LIMIT 1) AS NM_VEN_PESSOA,
            B.ST_NOME AS NM_UNI_ATENDIMENTO,
            B.ST_TELEFONE AS FON_UNI_ATENDIMENTO,
            C.ST_NOME AS NM_CIDADE,
            C.ST_ENDERECO AS ENDERECO,
            C.ST_BAIRRO AS BAIRRO,
            C.ST_NUM_IMOVEL AS NUMERO,
            C.ST_CEP AS CEP,
            D.ST_EMAIL AS EMAIL,
            CONCAT('(', D.NI_DDD1, ') ', D.NI_FONE1) AS FONE1,
            CONCAT('(', D.NI_DDD2, ') ', D.NI_FONE2) AS FONE2
            FROM SCC0011 T
            LEFT JOIN app1007 A ON T.ID_CLI_PESSOA = A.ID
            LEFT JOIN SCC0007 B ON T.ID_UNI_ATENDIMENTO = B.ID
            LEFT JOIN APP1026 C ON T.ID_CLI_PESSOA = C.ID_PESSOA
            LEFT JOIN APP1027 D ON T.ID_CLI_PESSOA = D.ID_PESSOA
            WHERE A.ST_INS_FEDERAL = ${sanitizedCPF}
        `;

        db.query(query, (error, results) => {
            if (error) {
                reject(new Error('Error fetching matricula: ' + error.message));
            } else {
                resolve(results[0]);
            }
        });
    });
};