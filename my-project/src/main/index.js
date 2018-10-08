'use strict'

import { app, BrowserWindow, Menu, Tray, shell, ipcMain } from 'electron';
const { autoUpdater } = require('electron-updater');
const path = require('path');
const url = require('url');
const feedUrl = `http://bitbus.club:80` // 更新包位置
// const feedUrl = `http://bitbus.club:80` // 更新包位置
let login_Window,webContents,childWindow;
//托盘对象
let appTray = null;
let win_Option = {
  width: 1388,
  height: 900,
  show: false,
  frame: false,
  transparent: true,
};
let login_Option = {  //  登录窗口
  height: 500,
  width:454 ,
  show: false,
  titleBarStyle: 'hidden',
  frame: false,
  resizable:false,
  transparent: true,
  maxWidth:454,
  maxHeight:500
};
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}


const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`;

function createWindow () {
  login_Window = new BrowserWindow(login_Option);//  登录窗口
  login_Window.loadURL(winURL);
  webContents = login_Window.webContents;
  // 打开开发者工具。
  // webContents.openDevTools();
  widowObj(login_Window,true);
  win_event();
}
//内容窗口
function win_event() {
  webContents.on('new-window', function (event, url, fname, disposition, options) {
    childWindow = new BrowserWindow(win_Option);
    childWindow.loadURL(url);
    widowObj(childWindow);
    ipcMain.on('clerar-appTray',function(e,message) {
         appTrayObj(childWindow);
    });
     event.preventDefault();

  });
}
//窗口初始化
function widowObj(obj,type) {
  //由于 Electron 本质是一个浏览器，需要加载非网页部分的资源。因此，我们可以先隐藏窗口。渲染进程开始渲染页面的那一刻,显示窗口
  obj.on('ready-to-show', function () {
    obj.show();
    obj.focus();
  });
  // 当 window 被关闭，这个事件会被触发。
  obj.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    obj = null
  });
}
app.on('ready', () => {
  createWindow();
  checkForUpdates()
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (login_Window === null) {
    createWindow()
  }
})
//登录
ipcMain.on('maxmin-logn',function(e,message) {//1是最小，2是全屏，3是还原，4是关闭
  switch (message){
    case 1:
      login_Window.minimize();
      break;
    case 4:
      app.quit();
      app.quit();
      break;
  }

});
//内容
ipcMain.on('maxmin',function(e,message) {//1是最小，2是全屏，3是还原，4是关闭
  switch (message){
    case 1:
      childWindow.minimize();
      childWindow.setSkipTaskbar(false);
      break;
    case 2:
      childWindow.setFullScreen(true);
      break;
    case 3:
      childWindow.setFullScreen(false);
      break;
    case 4:
      childWindow.minimize();
      childWindow.setSkipTaskbar(true);
      // app.quit();
      // app.quit();
      break;
  }

});

//创建托盘
function appTrayObj(obj) {
  if(appTray){//如果有托盘了~销毁
    appTray.destroy();
  }
  let trayMenuTemplate = [
    {
      label: '账户切换',
      click: function () {
        createWindow();
        childWindow.close();
        appTray.destroy();
        appTray=null;
      }
    },

    {
      label: '关于',
      click: function () {
        shell.openExternal('http://bitbus.club/');
      }
    },{
      label: '退出',
      click: function () {
        app.quit();
        app.quit();//因为程序设定关闭为最小化，所以调用两次关闭，防止最大化时一次不能关闭的情况
      }
    }
  ];
  let trayIcon = path.join(__dirname, '/static/img/favicon.ico');
   appTray = new Tray(trayIcon);//app.ico是app目录下的ico文件

  //图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
  appTray.setToolTip('我的托盘图标');
  //设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu);
  //单击右下角小图标显示应用
  // obj.setSkipTaskbar(true);
  appTray.on('click', function () {
    // obj.setSkipTaskbar(true);
    obj.show();
  });
}
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/* / 主进程监听渲染进程传来的信息 */
/* / 主进程监听渲染进程传来的信息 */
// ipcMain.on('update', (e, arg) => {
//   // checkForUpdates()
// });
let versions='';
let checkForUpdates = () => {
  // 配置安装包远端服务器
  autoUpdater.setFeedURL(feedUrl);

  // 下面是自动更新的整个生命周期所发生的事件
  autoUpdater.on('error', function (message) { // 检查失败
    sendUpdateMessage('error', message)
  })
  autoUpdater.on('checking-for-update', function (message) { // 正在检查
    sendUpdateMessage('checking-for-update', message)
  })
  autoUpdater.on('update-available', function (message) { // 检查到新版本
      versions=message;
      sendUpdateMessage('updateavailable', message)
  })
  autoUpdater.on('update-not-available', function (message) { // 最新版本
    sendUpdateMessage('update-not-available', message)
  })

    // 更新下载进度事件
    autoUpdater.on('download-progress', function (progressObj) {
      // progressObj，下载速度（bytesPerSecond）、已下载百分比（percent）、已传输（transferred）、文件大小（total）等参数，
      if(versions!=''){
        sendUpdateMessage('updateavailable', versions)
        versions='';
      }
      sendUpdateMessage('downloadProgress', progressObj)
    })
    // 更新下载完成事件
    autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
      // sendUpdateMessage('isUpdateNow')
      autoUpdater.quitAndInstall()
    })
  // // // // //执行自动更新检查
    autoUpdater.checkForUpdates();
}

// 主进程主动发送消息给渲染进程函数
function sendUpdateMessage (message, data) {
  webContents.send('message', { message, data })
}
