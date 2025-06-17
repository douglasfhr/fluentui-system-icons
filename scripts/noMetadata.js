const fs = require('fs');
const path = require('path');

const targetFolder = `${__dirname}/../assets`;

const doesntHaveMetadataFile = (directory) => {
	const files = fs.readdirSync(directory);
	const metadataFiles = files.filter((file) => file === 'metadata.json');
	return metadataFiles.length === 0;
};

const findFolders = (folderPath) => {
	try {
		const directories = fs.readdirSync(folderPath, { withFileTypes: true });

		const noMetadataFolders = directories
			.filter(
				(dirent) =>
					dirent.isDirectory() &&
					doesntHaveMetadataFile(path.join(folderPath, dirent.name))
			)
			.map((dirent) => dirent.name)
			.join(',');

		console.log(`Folders without a 'metadata.json' file: ${noMetadataFolders}`);
	} catch (error) {
		console.error('Error while reading the directory:', error);
	}
};

findFolders(targetFolder);
---------------------------------------
const fs = require('fs');
const path = require('path');

const ASSETS_FOLDER = path.resolve(__dirname, '../assets');

/**
 * Verifica se o diretório não contém o arquivo metadata.json
 * @param {string} directory - Caminho do diretório
 * @returns {boolean}
 */
function doesNotHaveMetadata(directory) {
	try {
		const files = fs.readdirSync(directory);
		return !files.includes('metadata.json');
	} catch (err) {
		console.warn(`Não foi possível acessar ${directory}: ${err.message}`);
		return false;
	}
}

/**
 * Busca diretórios que não possuem um arquivo metadata.json
 * @param {string} folderPath - Caminho da pasta raiz
 */
function listFoldersWithoutMetadata(folderPath) {
	try {
		const entries = fs.readdirSync(folderPath, { withFileTypes: true });

		const foldersWithoutMetadata = entries
			.filter((entry) => 
				entry.isDirectory() &&
				doesNotHaveMetadata(path.join(folderPath, entry.name))
			)
			.map((entry) => entry.name);

		if (foldersWithoutMetadata.length === 0) {
			console.log('✔️ Todos os diretórios possuem o arquivo metadata.json');
		} else {
			console.log(`🚫 Diretórios sem 'metadata.json': ${foldersWithoutMetadata.join(', ')}`);
		}

	} catch (error) {
		console.error(`Erro ao ler o diretório ${folderPath}:`, error.message);
	}
}

listFoldersWithoutMetadata(ASSETS_FOLDER);

