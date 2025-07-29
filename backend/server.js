const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Módulo para operações de sistema de arquivos
require('dotenv').config(); // Carrega variáveis de ambiente do .env

const app = express();
const port = process.env.PORT || 3000;

// --- Configuração do Middleware ---
// Para produção, restrinja o CORS apenas para o seu domínio Angular!
// Ex: app.use(cors({ origin: 'https://seu-site-angular.com' }));
app.use(cors()); // Permite requisições de outras origens (seu frontend Angular)
app.use(express.json()); // Permite que a API receba JSON no corpo das requisições
app.use(express.urlencoded({ extended: true })); // Permite que a API receba dados de formulário

// --- Servir arquivos estáticos (imagens) ---
// O caminho '/public' na URL será mapeado para a pasta 'public' dentro da sua API
// Ex: marketing.host2africa.com/api/public/uploads/albuns/minhafoto.jpg
app.use('/public', express.static(path.join(__dirname, 'public')));

// --- Configuração do Banco de Dados MySQL ---
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
        return;
    }
    console.log('Conectado ao banco de dados MySQL com ID:', db.threadId);
});

// --- Configuração do Multer para Uploads ---
// Define onde os arquivos serão armazenados e como serão nomeados
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'public', 'uploads', 'albuns'); // Mudança aqui: 'eventos' para 'albuns'
        // Garante que o diretório de upload exista.
        fs.mkdir(uploadDir, { recursive: true }, (err) => {
            if (err) {
                console.error('Erro ao criar diretório de upload:', err);
                return cb(err);
            }
            cb(null, uploadDir);
        });
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        const fileName = path.basename(file.originalname, fileExtension);
        cb(null, `${fileName}-${uniqueSuffix}${fileExtension}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Apenas arquivos de imagem são permitidos!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // Limite de 10MB por arquivo
});

// --- Rotas da API ---

// Rota de Teste Simples
app.get('/', (req, res) => {
    res.json({ message: 'API de Álbuns de RH funcionando! Acesse /api/albuns para dados.' }); // Mudança aqui
});

// Rota para listar todos os álbuns e suas fotos
app.get('/albuns', (req, res) => { // Mudança aqui: /eventos para /albuns
    // Consulta para pegar álbuns e agrupar as fotos
    // Ajuste aqui para 'albuns' em vez de 'eventos'
    const query = `
        SELECT a.id, a.nome, a.data, a.descricao,
               GROUP_CONCAT(CONCAT('/public/uploads/albuns/', p.url_foto) SEPARATOR ',') AS fotos_urls
        FROM albuns a
        LEFT JOIN fotos p ON a.id = p.album_id
        GROUP BY a.id
        ORDER BY a.data DESC;
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar álbuns:', err.stack); // Mudança aqui
            return res.status(500).json({ error: 'Erro interno do servidor ao buscar álbuns.' }); // Mudança aqui
        }

        const formattedAlbuns = results.map(row => ({ // Mudança aqui
            id: row.id,
            nome: row.nome,
            data: row.data,
            descricao: row.descricao,
            fotos: row.fotos_urls ? row.fotos_urls.split(',') : []
        }));

        res.json(formattedAlbuns);
    });
});

// Rota para buscar um álbum específico por ID
app.get('/albuns/:id', (req, res) => { // Mudança aqui: /eventos/:id para /albuns/:id
    const albumId = req.params.id; // Mudança aqui
    const query = `
        SELECT a.id, a.nome, a.data, a.descricao,
               GROUP_CONCAT(CONCAT('/public/uploads/albuns/', p.url_foto) SEPARATOR ',') AS fotos_urls
        FROM albuns a
        LEFT JOIN fotos p ON a.id = p.album_id
        WHERE a.id = ?
        GROUP BY a.id;
    `;
    db.query(query, [albumId], (err, results) => { // Mudança aqui
        if (err) {
            console.error('Erro ao buscar álbum por ID:', err.stack); // Mudança aqui
            return res.status(500).json({ error: 'Erro interno do servidor ao buscar álbum.' }); // Mudança aqui
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Álbum não encontrado.' }); // Mudança aqui
        }

        const row = results[0];
        const formattedAlbum = { // Mudança aqui
            id: row.id,
            nome: row.nome,
            data: row.data,
            descricao: row.descricao,
            fotos: row.fotos_urls ? row.fotos_urls.split(',') : []
        };
        res.json(formattedAlbum);
    });
});


// Rota para criar um novo álbum (apenas administradores devem ter acesso a esta rota)
app.post('/albuns', (req, res) => { // Mudança aqui: /eventos para /albuns
    // Implementar autenticação/autorização aqui!
    const { nome, data, descricao } = req.body;
    if (!nome || !data) {
        return res.status(400).json({ message: 'Nome e data do álbum são obrigatórios.' }); // Mudança aqui
    }
    // Ajuste aqui para 'albuns' em vez de 'eventos'
    const query = 'INSERT INTO albuns (nome, data, descricao) VALUES (?, ?, ?)';
    db.query(query, [nome, data, descricao], (err, result) => {
        if (err) {
            console.error('Erro ao criar álbum:', err.stack); // Mudança aqui
            return res.status(500).json({ error: 'Erro interno do servidor ao criar álbum.' }); // Mudança aqui
        }
        res.status(201).json({ message: 'Álbum criado com sucesso!', albumId: result.insertId }); // Mudança aqui
    });
});

// Rota para upload de uma nova foto para um álbum existente
// Requisição deve ser multipart/form-data com um campo 'foto'
// ATENÇÃO: Implementar autenticação/autorização para esta rota em produção!
app.post('/albuns/:albumId/upload-foto', upload.single('foto'), (req, res) => { // Mudança aqui
    if (!req.file) {
        return res.status(400).json({ message: 'Nenhuma foto enviada ou tipo de arquivo inválido.' });
    }
    const albumId = req.params.albumId; // Mudança aqui
    const fileNameInPublic = req.file.filename;

    // Salve o nome do arquivo (NÃO a URL completa) no banco de dados.
    // A URL completa será construída no backend quando for requisitada ou no frontend.
    // Ajuste aqui para 'album_id' em vez de 'evento_id'
    const insertQuery = 'INSERT INTO fotos (album_id, url_foto) VALUES (?, ?)';
    db.query(insertQuery, [albumId, fileNameInPublic], (err, result) => { // Mudança aqui
        if (err) {
            console.error('Erro ao salvar URL da foto no BD:', err.stack);
            fs.unlink(req.file.path, (unlinkErr) => {
                if (unlinkErr) console.error('Erro ao remover arquivo:', unlinkErr);
            });
            return res.status(500).json({ error: 'Erro interno do servidor ao processar upload.' });
        }
        res.status(201).json({
            message: 'Foto enviada e registrada com sucesso!',
            fileUrl: `/public/uploads/albuns/${fileNameInPublic}` // Mudança aqui: /eventos para /albuns
        });
    });
});

// Rota para deletar uma foto (requer autenticação e autorização)
app.delete('/fotos/:fotoId', (req, res) => {
    // Implementar autenticação/autorização aqui!
    const fotoId = req.params.fotoId;

    const getFileNameQuery = 'SELECT url_foto FROM fotos WHERE id = ?';
    db.query(getFileNameQuery, [fotoId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar nome da foto para exclusão:', err.stack);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Foto não encontrada.' });
        }

        const fileName = results[0].url_foto;
        // Mudança aqui: 'eventos' para 'albuns'
        const filePath = path.join(__dirname, 'public', 'uploads', 'albuns', fileName);

        const deleteQuery = 'DELETE FROM fotos WHERE id = ?';
        db.query(deleteQuery, [fotoId], (errDb, resultDb) => {
            if (errDb) {
                console.error('Erro ao deletar foto do BD:', errDb.stack);
                return res.status(500).json({ error: 'Erro interno do servidor ao deletar foto.' });
            }
            if (resultDb.affectedRows === 0) {
                return res.status(404).json({ message: 'Foto não encontrada no BD.' });
            }

            fs.unlink(filePath, (errFs) => {
                if (errFs) {
                    console.error('Erro ao deletar arquivo do disco:', errFs);
                }
                res.json({ message: 'Foto deletada com sucesso.' });
            });
        });
    });
});

// --- Tratamento de Erros (Middleware final) ---
app.use((err, req, res, next) => {
    console.error('Erro capturado pelo middleware:', err.stack);
    res.status(500).send('Algo deu errado no servidor!');
});

// --- Iniciar o Servidor ---
app.listen(port, () => {
    console.log(`Servidor Node.js rodando na porta ${port}`);
    console.log(`Acesse http://localhost:${port} para testar localmente.`);
    console.log('Lembre-se de configurar a URL base no seu Angular para https://marketing.host2africa.com/api/');
});