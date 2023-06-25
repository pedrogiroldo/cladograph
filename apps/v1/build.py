import subprocess
import platform

if platform.system() == "Linux":
    subprocess.check_call(["pyinstaller", "--onefile","--icon", "icon.ico", "CladoGraph.py"])
else:
     subprocess.check_call(["pyinstaller", "--onefile", "--icon", "icon.ico", "-w", "CladoGraph.py"])

#  pyinstaller --onefile --noconsole --clean --icon='icon.ico' --add-data 'icon.ico;.' MD2HTML.py