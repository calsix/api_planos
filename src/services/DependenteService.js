const db = require('../models/db');
const Sanitizer = require('../helpers/sanitizer');

exports.getAllDependentes = (page, limit) =>  {
    return new Promise((resolve, reject) => {

        let sanitizedPage = Sanitizer.sanitizeNumber(page);
        let sanitizedLimit = Sanitizer.sanitizeNumber(limit);

        const offset = (sanitizedPage - 1) * sanitizedLimit;

        const query = `
        SELECT
            t.ID AS id_dependente,
            t.ST_NOME AS nome_dependente,
            t.ID_PARENTESCO AS id_parentesco,
            t.DT_NASCIMENTO AS data_nascimento,
            t.ID_PLANO_PESSOA AS id_plano_pessoa,
            a.ST_NOME AS nome_parentesco,
            c.ID AS id_plano,
            c.ST_NOME AS nome_plano,
            b.ID_CLI_PESSOA AS id_pessoa,
            b.DM_STATUS AS status,
            TIMESTAMPDIFF(YEAR, t.DT_NASCIMENTO, CURDATE()) AS idade,
            (CASE
            WHEN (TIMESTAMPDIFF(YEAR, t.DT_NASCIMENTO, CURDATE()) >= a.NI_IDADE) THEN a.VL_ADICIONAL
            ELSE 0
            END) AS acrescimo,
            (CASE
                WHEN ISNULL(t.DT_CARENCIA) THEN (b.DT_INICIO + INTERVAL c.NI_CARENCIA MONTH)
                ELSE t.DT_CARENCIA
            END) AS carencia,
            (select  d.ST_NOME1 from app1007 d where d.ID = b.ID_VEN_PESSOA limit 1) AS nm_vendedor
        FROM
            scc0013 t
            LEFT JOIN scc0008 a ON a.ID = t.ID_PARENTESCO
            LEFT JOIN scc0011 b ON b.ID = t.ID_PLANO_PESSOA
            LEFT JOIN scc0010 c ON c.ID = b.ID_PLANO
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

exports.getDependenteById = (id) => {
    return new Promise((resolve, reject) => {
        let sanitizedId = Sanitizer.sanitizeNumber(id);
        const query = `
        SELECT
            t.ID AS id_dependente,
            t.ST_NOME AS nome_dependente,
            t.ID_PARENTESCO AS id_parentesco,
            t.DT_NASCIMENTO AS data_nascimento,
            t.ID_PLANO_PESSOA AS id_plano_pessoa,
            a.ST_NOME AS nome_parentesco,
            c.ID AS id_plano,
            c.ST_NOME AS nome_plano,
            b.ID_CLI_PESSOA AS id_pessoa,
            b.DM_STATUS AS status,
            TIMESTAMPDIFF(YEAR, t.DT_NASCIMENTO, CURDATE()) AS idade,
            (CASE
            WHEN (TIMESTAMPDIFF(YEAR, t.DT_NASCIMENTO, CURDATE()) >= a.NI_IDADE) THEN a.VL_ADICIONAL
            ELSE 0
            END) AS acrescimo,
            (CASE
                WHEN ISNULL(t.DT_CARENCIA) THEN (b.DT_INICIO + INTERVAL c.NI_CARENCIA MONTH)
                ELSE t.DT_CARENCIA
            END) AS carencia,
            (SELECT d.ST_NOME1 FROM app1007 d WHERE d.ID = b.ID_VEN_PESSOA LIMIT 1) AS nm_vendedor
        FROM
            scc0013 t
            LEFT JOIN scc0008 a ON a.ID = t.ID_PARENTESCO
            LEFT JOIN scc0011 b ON b.ID = t.ID_PLANO_PESSOA
            LEFT JOIN scc0010 c ON c.ID = b.ID_PLANO
            WHERE T.ID_PLANO_PESSOA = ${sanitizedId}
        `;

        db.query(query, (error, results) => {
            if (error) {
                reject(new Error('Error fetching matricula: ' + error.message));
            } else {
                resolve(results);
            }
        });
    });
};
