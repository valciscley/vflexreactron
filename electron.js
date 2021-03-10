const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

function criarJanela(){
	const janela = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	});

	janela.loadURL(isDev ? 'http://localhost:8080' : `file://${path.join(__dirname, 'prod/index.html')}`);
}

app.whenReady().then(criarJanela);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin'){
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
