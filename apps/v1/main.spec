# -*- mode: python ; coding: utf-8 -*-


a = Analysis(
    ['C:/Users/Pedro Giroldo/Documents/Codes/Cladograph-V1/src/main.py'],
    pathex=[],
    binaries=[],
    datas=[('C:/Users/Pedro Giroldo/Documents/Codes/Cladograph-V1/icon.ico', '.'), ('C:/Users/Pedro Giroldo/Documents/Codes/Cladograph-V1/src', 'src/')],
    hiddenimports=[],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
)
pyz = PYZ(a.pure)
splash = Splash(
    'C:/Users/Pedro Giroldo/Documents/Codes/Cladograph-V1/splash_cladograph.png',
    binaries=a.binaries,
    datas=a.datas,
    text_pos=None,
    text_size=12,
    minify_script=True,
    always_on_top=True,
)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    splash,
    splash.binaries,
    [],
    name='main',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=False,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon=['C:\\Users\\Pedro Giroldo\\Documents\\Codes\\Cladograph-V1\\icon.ico'],
)
